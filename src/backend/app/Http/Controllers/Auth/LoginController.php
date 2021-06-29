<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use App\Exceptions;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /** @var App\Services\UserService */
    protected $userService;

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo;

    /**
     * Create a new controller instance.
     * 
     * @param User $user
     * @param UserService $userService
     * @param UserType $userType
     * @return void
     */
    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }
    
    public function username()
    {
        return 'username'; 
    }

     /**
     * Shows login page
     * 
     * @param Request $request
     * 
     */
    public function login()
    { 
        if (! Auth::user()) {
            if (isset($_GET['invite_token'])) {
                $user = User::where('invite_token', $_GET['invite_token'])->update(['email_verified_at' => Carbon::now(),'user_status_id' => 1]);
            } 
            
            return view('index');
        }
            
        return redirect(Auth::user()->type->dashboard_url);   
    }

     /**
     * Authenticate user and create token
     * 
     * @param LoginRequest $request
     * 
     */
    public function authenticate(LoginRequest $request)
    {
        try{
            $request->validated();
            $credentials = $request->only('username', 'password');
            $result = $this->userService->log($credentials);
             if ( $result['status'] != 200) {
                return redirect()->back()->with('status', $result['error']);
             }
            
            if (Auth::user()->email_verified_at === null) {
                Auth::logout();
                return redirect()->back()->with('status', 'アカウントをアクティブ化するには、正しいURLが必要です。');
            }

             Session::put('salesforceCompanyID', Auth::user()->company->account_id);
             Session::put('salesforceContactID', Auth::user()->account_code);
            return redirect(Auth::user()->type->dashboard_url);

        } catch (Exception $e) {
            return redirect()->back()->with('status', $e);
        }
    }

    /**
     * Logout
     * 
     * @param Request $request
     * 
     */
    public function logout()
    { 
        try {
            Auth::logout();
            Session::forget('salesforceCompanyID');
             Session::forget('salesforceContactID');
            session()->invalidate();
            session()->regenerateToken();
            return redirect('/');
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'code' => 500,
                'error' => $e->getMessage(),
            ];
        } // @codeCoverageIgnoreEnd

    }


}
