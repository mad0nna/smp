<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Session;
use Carbon\Carbon;
use Firebase\JWT\JWT;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
     */
    public function login()
    {
        if (!Auth::user()) {
            if (isset($_GET['invite_token'])) {
                $user = User::with('company')->where('email_verified_at', '=', null)->where('invite_token', '=', $_GET['invite_token'])->first();
                if ($user && ($user['user_type_id'] == 4 || $user['user_type_id'] == 3) && $user['user_status_id'] === 5) {
                    $salesforceFormat = [
                        'FirstName' => $user['first_name'],
                        'LastName' => $user['last_name'],
                        'MobilePhone' => $user['contact_num'],
                        'Email' => $user['email'],
                        'Title' => $user['title'],
                    ];
                    $sf_user = $this->userService->contactVerification($salesforceFormat, $user['company']['account_id']);
                    if ($sf_user) {
                        User::where('invite_token', $_GET['invite_token'])->update(['email_verified_at' => Carbon::now(), 'user_status_id' => 1, 'account_code' => $sf_user['Id'], 'invite_token' => '', 'temp_pw' => '']);
                    }
                    $protocol = ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] != 'off') || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
                    $currentURL = $protocol . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
                    $key = 'page';
                    // Remove specific parameter from query string
                    $filteredURL = preg_replace('~(\?|&)' . $key . '=[^&]*~', '$1', $currentURL);
                    return redirect($filteredURL);
                }
                if ($user && $user['user_status_id'] === 1) {
                    return redirect(Auth::user()->type->dashboard_url);
                }
            }
            return view('index');
        }

        return redirect(Auth::user()->type->dashboard_url);
    }

    /**
     * Authenticate user and create token
     *
     * @param LoginRequest $request
     */
    public function authenticate(LoginRequest $request)
    {
        try {
            $request->validated();
            $credentials = $request->only('username', 'password');
            $result = $this->userService->log($credentials);
            if ($result['status'] != 200) {
                return redirect()->back()->with('status', $result['error']);
            }

            if (Auth::user()->email_verified_at === null) {
                Auth::logout();

                return redirect()->back()->with('status', '招待メール記載の利用開始ボタンよりログインしてください。');
            }

            Session::put('email', Auth::user()->email);
            Session::put('CompanyContactFirstname', Auth::user()->first_name);
            Session::put('CompanyContactLastname', Auth::user()->last_name);

            if (Auth::user()->type->name !== config('user.types.logistics.name')) {
                Session::put('companyID', Auth::user()->company()->first()->id);
                Session::put('salesforceCompanyID', Auth::user()->company()->first()->account_id);
                Session::put('email', Auth::user()->email);
                Session::put('salesforceContactID', Auth::user()->account_code);
                Session::put('CompanyContactFirstname', Auth::user()->first_name);
                Session::put('CompanyContactLastname', Auth::user()->last_name);
                Session::put('companyName', Auth::user()->company()->first()->name);
                Session::put('kotToken', Auth::user()->company()->first()->token);
                Session::put('kotStartDate', Auth::user()->company()->first()->kot_billing_start_date);
            }

            return redirect(Auth::user()->type->dashboard_url);
        } catch (Exception $e) {
            return redirect()->back()->with('status', $e);
        }
    }

    /**
     * Logout
     *
     * @param Request $request
     */
    public function logout()
    {
        try {
            Auth::logout();
            Session::forget('salesforceCompanyID');
            Session::forget('salesforceContactID');
            Session::forget('CompanyContactLastname');
            Session::forget('companyName');
            Session::forget('kotToken');
            Session::forget('kotStartDate');
            Session::forget('email');
            session()->invalidate();
            session()->regenerateToken();

            return redirect('/');
        } catch (Exception $e) {
            $this->response = [
                'code' => 500,
                'error' => $e->getMessage(),
            ];
        }
    }

    public function zendeskSSO()
    {
        if (empty(Session::get('email'))) {
            abort("404");
        }
        $now = time();

        $token = array(
            "jti"   => md5($now . rand()),
            "iat"   => $now,
            "email" => Session::get('email'),
            "name"  => Session::get('CompanyContactFirstname') . ' ' . Session::get('CompanyContactLastname'),
            "organization" => Session::get('companyName'),
        );
        $jwt = JWT::encode($token, env('ZENDESK_SSO_SECRET'));

        $newRequest = env('ZENDESK_SSO_HOST') . '/hc/ja/requests/new';

        $params = http_build_query([
            'jwt' => $jwt,
            'return_to' => $newRequest,
        ]);

        $location = env('ZENDESK_SSO_HOST') . "/access/jwt?" . $params;
        header("Location: " . $location);
    }
}
