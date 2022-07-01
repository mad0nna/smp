<?php

namespace Tests\Feature;

use App\Models\ActivationToken;
use Tests\TestCase;
use App\Models\User;
use App\Models\UserStatus;
use App\Services\UserService;
use App\Exceptions\ActivationTokenNotFoundException;

class AccountActivationTest extends TestCase
{
    /** @var Array */
    private static $data = [
        'first_name' => 'John',
        'last_name' => 'Doe',
        'email' => 'John@test.com',
        'password' => '!p4ssW0rd',
    ];

    /** @var App\Models\User */
    private static $user;

    /** @var String*/
    private static $token;

    /** @var UserService */
    private static $service;

    public function setUp(): void
    {
        $this->markTestSkipped('all tests in this file are invactive for this server configuration!');

        parent::setUp();

        self::$service = new UserService(new User);
        
        $status = UserStatus::where('name', 'Pending')->first();

        self::$data['user_status_id'] = $status->id;

        self::$data['email'] = uniqid() . '@testasdasd.com';

        // create user
        self::$user = self::$service->create(self::$data);

        // get the token
        self::$token = ActivationToken::where('user_id', self::$user->id)->first();
    }

    protected function tearDown(): void 
    {
        // delete test account
        self::$user->delete();
     
        parent::tearDown();
    }

    /**
     * A successful account activation
     */
    public function testActivate()
    {
        $response = $this->json('POST', '/' . config('app.api_version') . '/activate', ['token' => self::$token->token]);
        $response->assertStatus(200);
        $result = $response->getData();
        $this->assertEquals('Active', $result->data->status);
    }

    /**
     * Account that is already activated / Invalid Activation token.
     */
    public function testInvalidToken()
    {
        $response = $this->json('POST', '/' . config('app.api_version') . '/activate', ['token' => self::$token->token]);
        $response->assertStatus(500);
        $result = $response->getData();
        $this->assertEquals((new ActivationTokenNotFoundException)->getMessage(), $result->error);
    }
}
