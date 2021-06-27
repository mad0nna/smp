<?php

namespace App\Http\Controllers;

use Hash;
use Exception;
use App\Models\User;
use App\Services\UserService;
use App\Services\ContactService;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\SearchUserRequest;
use App\Http\Requests\SearchUserinSFRequest;
use App\Http\Requests\User\CreateRequest;
use App\Http\Requests\User\UpdateRequest;
use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Resources\UserResource;
use App\Repositories\SalesforceRepository;

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
        $this->salesForce = new SalesforceRepository();
        $this->userService = $userService;

        // enable api middleware
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Retrieves the List of Company admins
     *  
     */
    public function searchSF(SearchUserinSFRequest $request) {
        try{
            $results = $this->userService->findinSFByEmail($request->email);
            $this->response = array_merge($results, $this->response);
        }catch (Exception $e) {
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
            // dd($conditions);

            $results = $this->userService->search($conditions);

            $this->response = [
                'success' => true,
                'data'    => UserResource::collection($results),
                'pageCount' => $results->total(),
                'lastPage' => $results->lastPage(),
                'message' => 'Company admin retrieved successfully.',
                'code'    => 200,
            ];
            //$this->response = array_merge($results, $this->response);
        }catch (Exception $e) {
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
        try{
            $sf = $request->all();
            $pw = substr(md5(microtime()),rand(0,26),8);
            $pw_hash = Hash::make($pw);
            $invite_token = Hash::make(time() . uniqid());

            $formData = [
                'username' => $sf['Email'] ? $sf['Email'] : '',
                'first_name' => $sf['FirstName'] ? $sf['FirstName'] : '',
                'last_name' => $sf['LastName'] ? $sf['LastName'] : '',
                'email' =>  $sf['Email'] ? $sf['Email'] : '',
                'contact_num' => $sf['MobilePhone'] ? $sf['MobilePhone'] : '',
                'title' => $sf['Title'] ? $sf['Title'] : '',
                'user_type_id' => 4,
                'user_status_id' => 5,
                'password' => $pw_hash,   
                'temp_pw' => $pw,
                'invite_token' => $invite_token
            ];
            
            // create the user
            $user = $this->userService->create($formData);

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
    public function show($id)
    {
        try {
            $user = $this->userService->findById((int) $id);
        } catch (Exception $e) {
            abort(404, $e->getMessage());
        }

        return view('users.show', ['user' => $user]);
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
            $user = $this->userService->findById((int) $id);
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
        try{
            $data = $request->all();
                $formData = [
                    'username' => $data['email'] ? $data['email'] : '',
                    'first_name' => $data['firstname'] ? $data['firstname'] : '',
                    'last_name' => $data['lastname'] ? $data['lastname'] : '',
                    'email' =>  $data['email'] ? $data['email'] : '',
                    'contact_num' => $data['phone'] ? $data['phone'] : '',
                    'title' => $data['position'] ? $data['position'] : '',
                    'user_type_id' => $data['userTypeId'],
                ];
            // perform user update
            $user=$this->userService->update($formData);
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
    public function updateSF(Request $request)
    {
        try{
            $data = $request->all();
            $email = $data['Email'];
            $adminInformation = $this->salesForce->getCompanyAdminDetailsbyEmail($email);
            $accountID = $adminInformation['Id'];    
            $response = $this->salesForce->updateAdminDetails($data,$accountID);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
    } // @codeCoverageIgnoreEnd
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
        try{
            $user = $request->all();
            dd($user);
            $id = $user['id'];
            // perform delete

            $user = $this->userService->delete((int) $id);
            return response()->json($this->response, $this->response['code']);
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd
    }

     /**
     * Cleans array and remove empty indexes
     *
     * @param array $data
     * @return array $data
     */
    function stripEmptyCustom($data)
    {
        foreach ($data as $key => $value) {
            // if (is_array($data[$key])) {
            //     $data[$key] = stripEmptyCustom($data[$key]);
            // }

            if (empty($value)) {
                unset($data[$key]);
            }
        }

        return $data;
    }
}
