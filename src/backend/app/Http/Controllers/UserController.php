<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Services\UserService;
use App\Http\Requests\SearchUserRequest;
use App\Http\Requests\User\CreateRequest;
use App\Http\Requests\User\UpdateRequest;

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

        // enable api middleware
        $this->middleware(['auth', 'verified']);
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

        $conditions = [
            'keyword' => $request->getKeyword(),
            'page' => $request->getPage(),
            'limit' => $request->getLimit(),
        ];

        $users = $this->userService->search($conditions);

        return view('users.index', ['users' => $users]);
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
     * @param  \Illuminate\Http\CreateRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CreateRequest $request)
    {
        $request->validated();

        $formData = [
            'first_name' => $request->getFirstName(),
            'last_name' => $request->getLastName(),
            'email' => $request->getEmail(),
        ];

        // create the user
        $this->userService->create($formData);

        session()->flash('users_nofication', 'User has been created successfully!');

        return redirect('/users');
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
    public function update(UpdateRequest $request)
    {
        $request->validated();

        $formData = [
            'id' => $request->getId(),
            'first_name' => $request->getFirstName(),
            'last_name' => $request->getLastName(),
            'email' => $request->getEmail(),
        ];

        // perform user update
        $this->userService->update($formData);

        session()->flash('users_nofication', 'User has been updated successfully!');

        return redirect('/users/' . $request->getId());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // perform delete
        $this->userService->delete((int) $id);

        session()->flash('users_nofication', 'User has been deleted!');

        return redirect('/users');
    }
}
