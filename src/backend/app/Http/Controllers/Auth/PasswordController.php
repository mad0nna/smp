<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\PasswordService;
use App\Http\Controllers\Controller;

class PasswordController extends Controller
{
    /** @var App\Services\PasswordService */
    private $passwordService;

    /**
     * PasswordController constructor.
     *
     * @param App\Services\PasswordService $passwordService
     */
    public function __construct(PasswordService $passwordService)
    {
        parent::__construct();
        $this->passwordService = $passwordService;
    }

    /**
     * Shows forgot page
     *
     * @param Request $request
     */
    public function forgot()
    {
        return view('auth.passwords.email');
    }

    /**
     * Shows reset page
     *
     * @param Request $request
     */
    public function reset(Request $request)
    {
        if ($request->token <> null) {
            return view('auth.passwords.reset')->with('token', $request->token);
        }

        return redirect('/');
    }

    /**
     * Handles the forgot password request
     *
     * @param Request $request
     * @return Response
     */
    public function email(ForgotPasswordRequest $request)
    {
        $request->validated();

        try {
            $result = $this->passwordService->forgot($request->getEmail());
            $this->response['token'] = $result->token;
            $this->response['code'] === 200;
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }
        if ($this->response['code'] === 200) {
            return redirect()->back()->with('status', 'パスワード再設定用メールの送信に成功しました。
        メールボックスをご確認ください。');
        }

        return redirect()->back()->with('status', 'ご入力されたメールアドレスはサブスク韋駄天に存在しません。ご確認のうえ再入力してください。');
    }

    /**
     * Handles the reset password request
     *
     * @param Request $request
     * @return Response
     */
    public function update(ResetPasswordRequest $request)
    {
        $request->validated();

        try {
            $formData = [
                'token' => $request->getToken(),
                'password' => $request->getPassword(),
            ];

            // perform password reset
            $this->passwordService->reset($formData);
            $this->response['reset'] = true;
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        if ($this->response['code'] === 200) {
            return redirect()->back()->with('status', 'パスワードの更新に成功しました。新しいパスワードを使用し、ログインしてください。');
        }

        return redirect()->back()->with('status', $this->response['code'] . $this->response['error']);
    }
}
