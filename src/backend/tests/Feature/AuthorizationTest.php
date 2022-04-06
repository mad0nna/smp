<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuthorizationTest extends TestCase
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
     * Login test authorization
     */
    public function testLoginAuthorization()
    {
        $params = [
            'username' => 'admin@tcg.sprobe.ph',
            'password' => 'Password2021!',
        ];

        $response = $this->json('POST', '/', $params);

        $response->assertStatus(302);
        $response->assertRedirect('admin/dashboard');
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Login test authorization with wrong credentials
     */
    public function testLoginAuthorizationWrongCredentials()
    {
        $params = [
            'username' => 'admin@tcg.sprobe.ph',
            'password' => 'randomstring1234',
        ];

        $response = $this->json('POST', '/', $params);

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Login test authorization with wrong credentials
     */
    public function testLogoutAuthorization()
    {
        $response = $this->json('GET', '/logout');

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $result = json_decode((string) $response->getContent());
    }
}
