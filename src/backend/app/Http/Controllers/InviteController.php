<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use App\Services\UserService;
use App\Http\Requests\AcceptInviteRequest;

class InviteController extends Controller
{
    /** @var App\Services\UserService */
    protected $userService;

    /**
     * InviteController constructor.
     *
     * @param App\Services\UserService $userService
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Renders the password form for invited user
     *
     * @param Illuminate\Http\Request $request
     * @param Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('invite.accept', ['token' => $request->input('token')]);
    }

    /**
     * Process the Invite Acceptance
     *
     * @param App\Http\Requests\AcceptInviteRequest $request
     * @param Illuminate\Http\Response
     */
    public function accept(AcceptInviteRequest $request)
    {
        $request->validated();

        // accept the invite
        $user = $this->userService
                    ->acceptInvite(
                        $request->getToken(),
                        $request->getPassword(),
                    );

        // login the user automatically and redirect to homepage
        Auth::login($user);

        session()->flash('status', 'Your account is now activated.');

        return redirect('/home');
    }
}
