<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\ProfileUpdateRequest;
use App\Http\Requests\UpdatePasswordRequest;

class ProfileController extends Controller
{
    /** @var App\Services\UserService */
    protected $userService;

    /**
     * ProfileController constructor.
     *
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->middleware('auth');
        $this->userService = $userService;
    }

    /**
     * Displays the User Profile
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('profile.show', ['user' => $request->user()]);
    }

    /**
     * Displays the User Profile
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        return view('profile.edit', ['user' => $request->user()]);
    }

    /**
     * Displays the User Profile
     *
     * @param Illuminate\Http\Request $request
     * @return Illuminate\Http\Response
     */
    public function update(ProfileUpdateRequest $request)
    {
        $request->validated();

        $formData = [
            'id' => $request->getUserId(),
            'first_name' => $request->getFirstName(),
            'last_name' => $request->getLastName(),
            'email' => $request->getEmail(),
            'avatar' => $request->getAvatar(),
        ];

        // perform profile update
        $this->userService->update($formData);

        session()->flash('profile_updated', 'Your Profile has been updated successfully!');

        return redirect('/profile');
    }

    /**
     * Show Edit Password Form
     *
     * @return Illuminate\Http\Response
     */
    public function editPassword()
    {
        return view('profile.password');
    }

    /**
     * Perform password update
     *
     * @param App\Http\Requests\UpdatePasswordRequest $request
     * @return Illuminate\Http\Response
     */
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $request->validated();

        $formData = [
            'id' => $request->getUserId(),
            'password' => $request->getPassword(),
        ];

        // perform profile update
        $this->userService->update($formData);

        session()->flash('profile_updated', 'Your password has been updated successfully!');

        return redirect('/profile');
    }
}
