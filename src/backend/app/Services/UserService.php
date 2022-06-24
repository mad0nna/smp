<?php

namespace App\Services;

use DB;
use Mail;
use Hash;
use Auth;
use Exception;
use Carbon\Carbon;
use App\Models\User;
use App\Models\ActivationToken;
use App\Models\UserStatus;
use App\Mail\InviteUser;
use App\Exceptions\UserNotFoundException;
use App\Exceptions\UserNotCreatedException;
use App\Exceptions\UserStatusNotFoundException;
use App\Exceptions\ActivationTokenNotFoundException;
use App\Services\API\Salesforce\Model\Contact;
use App\Traits\Uploadable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Session;

class UserService
{
    use Uploadable;

    /**
     * @var App\Models\User
     */
    protected $user;

    /**
     * @var UserStatus
     */
    protected $userStatus;


    /**
     * UserService constructor.
     *
     * @param App\Models\User $user
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * List users by conditions
     *
     * @param array $conditions
     * @return array $results
     */
    public function search(array $conditions, $company_id = null)
    {
        // default to 1 if page not provided
        $page = 1;
        $limit = config('search.results_per_page');

        if (array_key_exists('page', $conditions) === true) {
            $page = $conditions['page'];
        }

        if (array_key_exists('limit', $conditions) === true) {
            $limit = $conditions['limit'];
        }

        $skip = ($page > 1) ? ($page * $limit - $limit) : 0;
            return User::join('companies', 'companies.id', '=', 'company_id')->join('user_types', 'user_types.id', '=', 'user_type_id')
        ->join('user_statuses', 'user_statuses.id', '=', 'user_status_id')
                ->where('company_id', '=', $company_id)
                ->select('companies.*', 'companies.id as company_id' , 'user_types.*', 'user_types.id as type_id', 'user_statuses.*', 'user_statuses.id as status_id', 'users.*')
                ->where(function($query) use($conditions){
                $query->where('first_name', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('last_name', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('username', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('account_code', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('email', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('title', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('user_types.type_alias', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('user_statuses.status_alias', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('users.contact_num', 'LIKE', "%{$conditions['keyword']}%");
                })
                ->skip($skip)
                ->orderBy('users.id', 'DESC')
                ->paginate($limit)
            ->withPath('/company/accountslist?' . http_build_query([
                'keyword' => $conditions['keyword'],
                'limit' => $limit,
            ]));
    }

    /**
     * Creates a new user in the database
     *
     * @param array $params
     * @return App\Models\User $user
     */
    public function create(array $params)
    {
        DB::beginTransaction();

        try {
            $status = UserStatus::where('name', config('user.statuses.pending'))->first();

            if (!($status instanceof UserStatus)) {
                throw new UserStatusNotFoundException;
            }
            $params['user_status_id'] = $status->id;
            $user = $this->user->create($params);

            if (!($user instanceof User)) {
                throw new UserNotCreatedException;
            }

            $temp_pw = $params['temp_pw'];
            $token = $params['invite_token'];

            // send email
            Mail::to($user)->send(new InviteUser($user, $temp_pw, $token));
            DB::commit();
        } catch (Exception $e) {
            DB::rollback();

            throw $e;
        }

        return $user;
    }

    public function removeAdminPermission($account_code) {
        $user = $this->user->where('account_code', $account_code);
        return $user->update(['user_type_id' => 4]);
    }

    /**
     * Updates user in the Salesforce
     *
     * @param array $params
     * @return App\Models\User $user
     */
    public function updateSF(array $params)
    {
        // retrieve user information
        $user = $this->user->where('username', $params['username'])->first();
        if ($user instanceof User) {
            $user->fill($params);
            $user->save();
        }

        // perform update
        $user->update($params);

        return $user;
    }

    /**
     * Deletes the user in the database
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id)
    {
        // retrieve user
        $user = $this->user->findOrFail($id);

        // perform delete
        $user->delete();

        return true;
    }

    /**
     * Service function that activates the user account.
     *
     * @param array $params User parameters
     * @return User $user
     */
    public function acceptInvite($token, $password)
    {
        $activationToken = ActivationToken::with('user.status')
                                            ->where('token', $token)
                                            ->where('revoked', false)
                                            ->first();

        if (!($activationToken instanceof ActivationToken)) {
            throw new ActivationTokenNotFoundException;
        }

        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        if (!($status instanceof UserStatus)) {
            throw new UserStatusNotFoundException;
        }

        // change user status to active
        $user = $activationToken->user;
        $user->update([
            'password' => Hash::make($password),
            'user_status_id' => $status->id,
            'email_verified_at' => Carbon::now(),
        ]);

        // delete the token
        $activationToken->delete();

        // retrieve updated user details
        $user->status = $status;

        return $user;
    }

    /**
     * Retrieves a user by email
     *
     * @param string $email
     * @return User $user
     */
    public function findByEmail(string $email)
    {
        try {
            // retrieve the user
            $user = $this->user
                        ->where('email', $email)
                        ->firstOrFail();
        } catch (Exception $e) {
            $user = null;
        }

        return $user;
    }

    /**
     * Retrieves a verified user by email
     *
     * @param string $email
     * @return User $user
     */
    public function findVerifiedUserByEmail(string $email)
    {
        try {
            // retrieve the user
            $user = $this->user
                        ->where('email', $email)
                        ->where('user_status_id', 1)
                        ->firstOrFail();
        } catch (Exception $e) {
            $user = null;
        }

        return $user;
    }

    /**
     * Retrieves a user from Salesforce by email
     *
     * @param string $email
     * @return User $user
     */
    public function findInSFByEmail($email)
    {
        try {
            $companyAdmin = (new Contact)->findByEmail($email);
            if (isset($companyAdmin['status']) && !$companyAdmin['status']) {
                return json_encode($companyAdmin);
            }

            return $companyAdmin;
        } catch (UserNotFoundException $e) {
            throw new UserNotFoundException;
        }
    }

    public function findInSFById($contactID)
    {
        try {
            return (new Contact)->findById($contactID);
        } catch (UserNotFoundException $e) {
            throw new UserNotFoundException;
        }
    }

    /**
     * Retrieves a user by id
     *
     * @param int $id
     * @return User $user
     */
    public function findById(int $id)
    {
        try {
            // retrieve the user
            $user = $this->user->where('id', '=', $id)->where('company_id', '=', Session::get('companyID'))->first();

            if (!($user instanceof User)) {
                throw new UserNotFoundException;
            }

        } catch (ModelNotFoundException $e) {
            throw new UserNotFoundException;
        }

        return $user;
    }

    /**
     * Attempt to create an access token using user credentials
     *
     * @param string $credentials
     */
    public function log($credentials)
    {
        try {
            if (Auth::attempt($credentials)) {
                $users = auth()->user();
                $tokenResult = $users->createToken('Personal Access Token');
                $result = ['status' => 200];
                $result['access_token'] = $tokenResult->accessToken;
                $result['token_type'] = 'Bearer';
                Cache::put('token:login', Auth::user()->id);
            } else {
                $result = [
                            'status' => 500,
                            'error' => 'メールアドレスまたはパスワードが無効です。',
                        ];
            }

            return $result;
        } catch (UserNotFoundException $e) {
            throw new UserNotFoundException;
        }
    }

    /**
     * Resend email invite
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function resendEmailInvite($id)
    {
        $user = User::findOrFail($id);
        Mail::to($user)->send(new InviteUser($user, $user->temp_pw, $user->invite_token));

        return true;
    }

    public function firstOrNew($user, $companyID)
    {
        $exisitngData = (new Contact)->findByEmail($user['Email']);
        if ($exisitngData === false) {
            $user['AccountId'] = $companyID;
            $creationStatus = (new Contact)->create($user);
            if ($creationStatus) {
                return (new Contact)->findByEmail($user['Email']);;
            }
            return false;
        }
        return $exisitngData;
    }

    public function getAdminDetails($sfCompanyID) {
        return User::where('user_type_id', '3')->whereHas('company', function($company) use ($sfCompanyID) {
            $company->where('account_id', $sfCompanyID);
        })->get();
    }
}
