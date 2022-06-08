<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\PasswordReset;

class PasswordResetTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
    }

    public function tearDown(): void
    {
        parent::tearDown();
    }

    /**
     * AuthorizationTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();
    }

    /**
     * Password reset send email request success
     */
    public function testPasswordResetSendEmailRequest()
    {
        $params = [
            'email' => 'admin@tcg.sprobe.ph',
        ];

        $response = $this->json('POST', 'password/email', $params);

        $response->assertStatus(302);
        $response->assertSessionHas('status', 'パスワード再設定用メールの送信に成功しました。メールボックスをご確認ください。');
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Password reset send email request success with a non-existant email
     */
    public function testPasswordResetSendEmailWithNonExistantEmail()
    {
        $params = [
            'email' => 'nonexistingemail@gmail.com',
        ];

        $response = $this->json('POST', 'password/email', $params);


        $response->assertStatus(302);
        $response->assertSessionHas('status', 'ご入力されたメールアドレスはサブスク韋駄天に存在しません。ご確認のうえ再入力してください。');
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Password reset send email request invalid email
     */
    public function testPasswordResetSendEmailWoithInvalidEmail()
    {
        $params = [
            'email' => 'admin tcg.sprobe.ph',
        ];

        $response = $this->json('POST', 'password/email', $params);

        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Password reset update success
     */
    public function testPasswordResetUpdateSuccess()
    {

        $passwordReset = PasswordReset::where('email', 'admin@tcg.sprobe.ph')->orderBy('created_at', 'DESC')->first();

        $params = [
            'token' => $passwordReset->token,
            'password' => 'Password2021!',
            'password_confirmation' => 'Password2021!',
        ];

        $response = $this->json('POST', 'password/reset', $params);

        $response->assertStatus(302);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Password reset update incorrect password confirmation
     */
    public function testPasswordResetUpdateIncorrectPasswordConfirmation()
    {
        $passwordReset = PasswordReset::latest()->first();

        $params = [
            'token' => $passwordReset->token,
            'password' => 'Password2021!',
            'password_confirmation' => 'incorrectpassword',
        ];

        $response = $this->json('POST', 'password/reset', $params);

        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Password reset update invalid token
     */
    public function testPasswordResetUpdate()
    {
        $params = [
            'token' => 'invalidToken',
            'password' => 'Password2021!',
            'password_confirmation' => 'Password2021!',
        ];

        $response = $this->json('POST', 'password/reset', $params);

        $response->assertSessionHas('status', ' 無効/期限切れのパスワードリセットトークン。');
        $response->assertStatus(302);
        $result = json_decode((string) $response->getContent());
    }
}
