<?php

namespace App\Http\Controllers;

use Hash;
use Exception;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SearchUserRequest;
use App\Http\Requests\SearchUserInSFRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Contact;
use App\Services\API\Zuora\Exceptions\UnauthorizedAccessException;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /** @var App\Services\UserService */
    protected $userService;

    /**
     * UserController constructor.
     *
     * @param App\Services\UserService $userService
     */
    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
        $this->dbRepo = new DatabaseRepository();

        // enable api middleware
        $this->middleware(['auth', 'verified']);
    }

    public function list()
    {
        $user = User::with(['company'])->find(Auth::user()->id);
        $user_data['companyName'] = $user['company'] ?  $user['company']['name'] : '';

        return view('accountslist', ['user_data' => $user_data]);
    }

    /**
     * Retrieves the Company admin details from salesforce
     */
    public function findInSFByEmail(SearchUserInSFRequest $request)
    {
        try {
            $user = (new Contact)->findByEmailAndAccountId($request->email, Session::get('salesforceCompanyID'));
            $this->response['data'] = $this->getSFResource($user);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    public function getContactDetails(Request $request)
    {
        try {
            $this->response['data'] = $this->userService->findById($request->id);
            $this->response['data']['canEdit'] = Auth::user()->user_type_id === 3 || (Auth::user()->id == $request->id);
            $this->response['data']['authorityTransfer'] = Auth::user()->user_type_id === 3;
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Retrieves the List of Users
     *
     * @param App\Http\Requests\SearchUserRequest $request
     * @return \Illuminate\Http\Response
     */
    public function index(SearchUserRequest $request)
    {
        $request->validated();

        try {
            $conditions = [
                'keyword' => $request->getKeyword(),
                'page' => $request->getPage(),
                'limit' => $request->getLimit(),
            ];
            $results = $this->userService->search($conditions, Auth::user()->company_id);
            $this->response = [
                'success' => true,
                'data' => $results->items(),
                'isSuperAdmin' => (Auth::user()->user_type_id === 3) ? true : false,
                'adminID' => Auth::user()->id,
                'pageCount' => $results->total(),
                'lastPage' => $results->lastPage(),
                'message' => 'Company admin retrieved successfully.',
                'code' => 200,
            ];
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $sf = $request->all();
            $isExists = $this->userService->findByEmail($sf['email']);
            if(!empty($isExists)) {
                return response()->json(['message' => 'SMPにすでに存在する電子メール'], 409);
            }
            $pw = substr(md5(microtime()), rand(0, 26), 8);
            $pw_hash = Hash::make($pw);
            $invite_token = Hash::make(time() . uniqid());
            $company = Auth::user()->company_id;
            if ($sf['isPartial']) {
                $formData = [
                    'username' => $sf['email'] ? $sf['email'] : '',
                    'first_name' => $sf['firstname'] ? $sf['firstname'] : '',
                    'last_name' => $sf['lastname'] ? $sf['lastname'] : '',
                    'email' => $sf['email'] ? $sf['email'] : '',
                    'user_type_id' => 4,
                    'company_id' => $company,
                    'user_status_id' => 5,
                    'password' => $pw_hash,
                    'temp_pw' => $pw,
                    'invite_token' => $invite_token,
                    'user_type_id' => $sf['user_type_id'] ?? ''
                ];
            } else {
                $formData = [
                    'username' => $sf['email'] ? $sf['email'] : '',
                    'first_name' => $sf['first_name'] ? $sf['first_name'] : '',
                    'last_name' => $sf['last_name'] ? $sf['last_name'] : '',
                    'email' => $sf['email'] ? $sf['email'] : '',
                    'contact_num' => $sf['contact_num'] ? $sf['contact_num'] : '',
                    'title' => $sf['title'] ? $sf['title'] : '',
                    'user_type_id' => 4,
                    'company_id' => $company,
                    'user_status_id' => 5,
                    'password' => $pw_hash,
                    'temp_pw' => $pw,
                    'invite_token' => $invite_token,
                    'account_code' => $sf['account_code'] ? $sf['account_code'] : '',
                    'user_type_id' => $sf['user_type_id'] ?? ''
                ];
            }


            // create the user
            $user = $this->userService->create($formData);

            //make a default widget settings for new user
            $this->dbRepo->makeUserWidgetSettings($user->id);

            $this->response['data'] = new UserResource($user);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                    'error' => $e->getMessage(),
                    'code' => 500,
                ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        try {
            $data = $request->all();
            $email = $data['email'];
            $user = $this->userService->findByEmail($email);
            $this->response['data'] = new UserResource($user);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    public function getSFResource($result)
    {
        return [
            'account_code' => $result['Id'],
            'username' => $result['Email'],
            'fullName' => $result['Name'],
            'first_name' => $result['FirstName'],
            'last_name' => $result['LastName'],
            'email' => $result['Email'],
            'title' => $result['Title'],
            'user_status_id' => 5,
            'contact_num' => $result['MobilePhone'],
            'user_type_id' => $result['admin__c'] ? 3 :4,
            'source' => 'salesforce',
        ];
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        try {
            $user = $this->userService->findByEmail((int) $id);
        } catch (Exception $e) {
            abort(404, $e->getMessage());
        }

        return view('users.edit', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\UpdateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try {
            $data = $request->all();
            $formData = [
                    'username' => $data['email'] ? $data['email'] : '',
                    'first_name' => $data['firstname'] ? $data['firstname'] : '',
                    'last_name' => $data['lastname'] ? $data['lastname'] : '',
                    'email' => $data['email'] ? $data['email'] : '',
                    'contact_num' => $data['phone'] ? $data['phone'] : '',
                    'title' => $data['position'] ? $data['position'] : '',
                    'user_type_id' => $data['userTypeId'],
                ];
            // perform user update
            $user = $this->userService->update($formData);
            $this->response['data'] = new UserResource($user);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd
        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Update user in Salesforce.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function updateAdminByEmail(Request $request)
    {
        try {
            $data = $request->all();
            $salesforceData = [
                'Email' => $data['Email'],
                'FirstName' => $data['FirstName'],
                'LastName' => $data['LastName'],
                'MobilePhone' => $data['MobilePhone'],
                'Title' => $data['Title'],
            ];
            $formData = [
                'first_name' => $data['FirstName'] ? $data['FirstName'] : '',
                'last_name' => $data['LastName'] ? $data['LastName'] : '',
                'email' => $data['Email'] ? $data['Email'] : '',
                'contact_num' => $data['MobilePhone'] ? $data['MobilePhone'] : '',
                'title' => $data['Title'] ? $data['Title'] : '',
                'username' => $data['username'] ? $data['username'] : '',
            ];

            if ($data['changeRole']) {
                $salesforceData['admin__c'] = $data['admin__c'] == 3 ? true : false;
                $formData['user_type_id'] = $data['admin__c'];
            }

            $response = (new Contact)->update($salesforceData, $data['Id']);
            if (!$response['status']) {
                return $response;
            }
            if (Session::get('salesforceContactID') == $data['Id']) {
                Session::put('CompanyContactFirstname', $data['FirstName']);
                Session::put('CompanyContactLastname', $data['LastName']);
            }
            $user = User::where('account_code', $data['Id']);
            if ($user->update($formData)) {
                return ['status' => true, 'data' => $user];
            }
            return ['status' => false];
        } catch (Exception $e) {
            $this->response = [
                'status' => false,
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        try {
            $user = $request->all();
            if (Session::get('companyID') === '') {
                throw new UnauthorizedAccessException();
            }

            $id = $user['admin']['id'];
            // perform delete

            $user = $this->userService->delete((int) $id);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd
        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Resend email invite
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function invite(Request $request)
    {
        $result = $this->userService->resendEmailInvite($request->id);

        $response = [
          'success' => $result,
        ];

        return response()->json($response, $result ? 200 : 400);
    }

    /**
     * Get logged user Info
     *
     * @return \Illuminate\Http\Response
     */
    public function userinfo()
    {
        try {
            $id = Auth::user()->id;

            // retrieve user
            $result = User::findorfail($id);
            $response['data'] = new UserResource($result);
            $this->response = array_merge($response, $this->response);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd
        return response()->json($this->response, $this->response['code']);
    }
}
