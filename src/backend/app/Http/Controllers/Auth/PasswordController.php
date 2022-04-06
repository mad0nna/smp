<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\PasswordService;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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

        return redirect()->back()->with(['status' => 'ご入力されたメールアドレスはサブスク韋駄天に存在しません。ご確認のうえ再入力してください。', 'error' => true]);
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
            return redirect('/');
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        if ($this->response['code'] === 200) {
            return redirect()->back()->with('status', 'パスワードの更新に成功しました。新しいパスワードを使用し、ログインしてください。');
        }

        return redirect()->back()->with('status', $this->response['error']);
    }

    public function change(Request $request) {
        $passwords = $request->all();
        $accountId = Auth::user()->account_code;
        $pattern = '/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/';
        $hasEmpty = false;
        $response = [
            'errors' => [],
            'status' => false,
            'message' => ''
        ];
        foreach ($passwords as $key => $value) {
            if (empty($value)) {
                $hasEmpty = true;
                $response['errors'][$key] = '必須フィールド';
            }
        }
        if ($hasEmpty) {
            return $response;
        }
        if (!Hash::check($passwords['oldPassword'], Auth::user()->password)) {
            $response['errors']['oldPassword'] = 'パスワードが間違っています';
            return $response;
        }
        if ($passwords['newPassword'] !== $passwords['newPassword2']) {
            $response['errors']['newPassword'] = 'パスワードが一致しません';
            $response['errors']['newPassword2'] = 'パスワードが一致しません';
            return $response;
        }
        if (!preg_match($pattern, $passwords['newPassword'])) {
            $response['errors']['newPassword'] = 'パスワードは以下の内容を有する必要があります。　1文字以上の大文字、1文字以上の特殊記号を含む最低8桁以上の英数字';
            $response['errors']['newPassword2'] = 'パスワードは以下の内容を有する必要があります。　1文字以上の大文字、1文字以上の特殊記号を含む最低8桁以上の英数字';
            return $response;
        }
        $newPassword = Hash::make($passwords['newPassword']);
        try {
            User::where('account_code' , $accountId)->update(
                [
                    'password' => $newPassword
                ]
            );
            $response['message'] = 'パスワードの変更に成功しました';
            $response['status'] = true;
            return $response;
        } catch (QueryException $e) {
            $response['message'] = 'パスワードの変更に失敗しました';
            return $response;
            $e->getMessage();
        }
    }
}
