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
use App\Repositories\SalesforceRepository;
use App\Exceptions\UserNotFoundException;
use App\Exceptions\UserNotCreatedException;
use App\Exceptions\UserStatusNotFoundException;
use App\Exceptions\ActivationTokenNotFoundException;
use App\Traits\Uploadable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\UploadedFile;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;

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
    public function __construct(User $user, Application $app)
    {
        $this->user = $user;
        $this->salesForce = new SalesforceRepository();
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

        // initialize query
        $query = $this->user;

        if ($company_id) {
            $query = $query->where(function ($query) use ($company_id) {
                $query->select('company_id')->where('company_id', $company_id);
            })->where(function ($query) use ($conditions) {
                $query->where('first_name', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('last_name', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('username', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('account_code', 'LIKE', "%{$conditions['keyword']}%")
                ->orWhere('email', 'LIKE', "%{$conditions['keyword']}%");
            });
        } else {
            // if keyword is provided
            if (array_key_exists('keyword', $conditions)) {
                $query = $query->where('first_name', 'LIKE', "%{$conditions['keyword']}%")
                            ->orWhere('last_name', 'LIKE', "%{$conditions['keyword']}%")
                            ->orWhere('username', 'LIKE', "%{$conditions['keyword']}%")
                            ->orWhere('account_code', 'LIKE', "%{$conditions['keyword']}%")
                            ->orWhere('email', 'LIKE', "%{$conditions['keyword']}%");
            }
        }

        // perform user search
        $results = $query->skip($skip)
                        ->orderBy('id', 'DESC')
                        ->paginate($limit);

        //append query to pagination routes
        $results->withPath('/company/accountslist?' . http_build_query([
                        'keyword' => $conditions['keyword'],
                        'limit' => $limit,
                    ])
                );

        return $results;
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

    /**
     * Updates user in the database
     *
     * @param array $params
     * @return App\Models\User $user
     */
    public function update(array $params)
    {
        // retrieve user information
        $user = $this->user->where('username', $params['username'])->first();
        if ($user instanceof User) {
            $user->fill($params);
            $user->save();
        }

        // if (array_key_exists('password', $params)) {
        //     // update user password if provided in request or retain the current password
        //     $params['password'] = strlen($params['password']) > 0 ?
        //                             Hash::make($params['password']) :
        //                             $user->password;
        // }

        // // upload avatar if present
        // if (array_key_exists('avatar', $params)) {
        //     $params['avatar'] = ($params['avatar'] instanceof UploadedFile) ?
        //                         config('app.storage_disk_url') . '/' . $this->uploadOne($params['avatar'], 'avatars') :
        //                         $user->avatar;
        // }

        // perform update
        $user->update($params);

        return $user;
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
     * Retrieves a user from Salesforce by email
     *
     * @param string $email
     * @return User $user
     */
    public function findInSFByEmail($email)
    {
        try {
            $companyAdmin = $this->salesForce->getCompanyAdminDetailsbyEmail($email);
            if (isset($companyAdmin['status']) && !$companyAdmin['status']) {
                return json_encode($companyAdmin);
            }

            return $companyAdmin;
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
            $user = $this->user->findOrFail($id);
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

    public function contactVerification($user, $companyID)
    {
        $exisitngData = $this->salesForce->getCompanyAdminDetailsbyEmail($user['Email']);
        if ($exisitngData === false) {
            $user['AccountId'] = $companyID;
            $creationStatus = $this->salesForce->createContact($user);
            if ($creationStatus) {
                return $exisitngData;
            }
            return false;
        }
        $contactID = $exisitngData['Id'];
        $result = json_decode($this->salesForce->updateAdminDetails($user, $contactID));
        if ($result->status) {
            return $exisitngData;
        }
        return false;
    }
}
