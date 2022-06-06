<?php

namespace App\Services;

use Hash;
use Mail;
use App\Models\User;
use RuntimeException;
use App\Models\UserStatus;
use App\Mail\ForgotPassword;
use App\Mail\PasswordChange;
use InvalidArgumentException;
use App\Models\PasswordReset;
use App\Exceptions\InvalidPasswordResetTokenException;

class PasswordService
{
    /** @var App\Models\PasswordReset */
    protected $passwordReset;

    /** @var App\Services\UserService */
    protected $userService;

    /**
     * PasswordReset constructor.
     *
     * @param App\Models\PasswordReset $passwordReset
     * @param App\Services\UserService $userService
     */
    public function __construct(PasswordReset $passwordReset, UserService $userService)
    {
        $this->passwordReset = $passwordReset;
        $this->userService = $userService;
    }

    /**
     * Handles the Forgot Password request of the User
     *
     * @param string $email
     * @return PasswordReset
     */
    public function forgot(string $email)
    {
        // if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        //     throw new InvalidArgumentException('ご入力されたメールアドレスはサブスク韋駄天に存在しません。ご確認のうえ再入力してください。');
        // }

        // check if user exists
        $user = $this->userService->findByEmail($email);

        // generate new token
        $token = $this->passwordReset
                    ->create([
                        'email' => $email,
                        'token' => Hash::make(uniqid() . time()),
                    ]);

        $token->user = $user;

        // send password reset link email notification to user
        Mail::to($user)->send(new ForgotPassword($token));

        return $token;
    }

    /**
     * Handles the Reset Password request of the User
     *
     * @param array $data
     * @return PasswordReset
     */
    public function reset(array $data)
    {
        if (!array_key_exists('token', $data)) {
            throw new InvalidArgumentException('tokenを入力してください。');
        }

        if (!array_key_exists('password', $data)) {
            throw new InvalidArgumentException('パスワードを入力してください。');
        }

        // validate if token is valid
        $token = $this->passwordReset
                    ->where('token', $data['token'])
                    ->first();

        if (!($token instanceof PasswordReset)) {
            throw new InvalidPasswordResetTokenException;
        }

        // get active user status
        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        if (!($status instanceof UserStatus)) {
            throw new RuntimeException('ユーザーステータスを取得することができませんでした。');
        }

        // retrieve user to fetch new password
        $user = $this->userService->findByEmail($token->email);

        // update user password
        $user->update([
            'password' => Hash::make($data['password']),
            'login_attempts' => 0, // reset failed attempts
            'user_status_id' => $status->id, // update user status
        ]);

        // revoke the token
        $token->delete();

        // send successful password reset email notification to user
        Mail::to($user)->send(new PasswordChange($user));

        // return user
        return $user;
    }
}
