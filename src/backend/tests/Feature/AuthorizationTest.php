<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthorizationTest extends TestCase
{
    /** @var Object */
    private static $USER;

    /**
     * Session Login Data
     *
     * @var string
     */
    private static $companyID;
    private static $salesforceCompanyID;
    private static $email;
    private static $salesforceContactID;
    private static $CompanyContactFirstname;
    private static $CompanyContactLastname;
    private static $companyName;
    private static $kotToken;
    private static $kotStartDate;
    private static $sessionData;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::where('username', 'pineda.pcb@sprobe.com')->firstOrFail();

        self::$USER = $user;
        self::$companyID = $user->company->id;
        self::$salesforceCompanyID = $user->company->account_id;
        self::$email = $user->email;
        self::$salesforceContactID = $user->account_code;
        self::$CompanyContactFirstname = $user->first_name;
        self::$CompanyContactLastname = $user->last_name;
        self::$companyName = $user->company->name;
        self::$kotToken = $user->company->token;
        self::$kotStartDate = $user->company->kot_billing_start_date;

        Auth::login($user);
        Session::put('salesforceCompanyID', self::$salesforceCompanyID);
        Session::put('email', self::$email);
        Session::put('salesforceContactID', self::$salesforceContactID);
        Session::put('companyContactFirstname', self::$CompanyContactFirstname);
        Session::put('companyContactLastname', self::$CompanyContactLastname);
        Session::put('companyName', self::$companyName);
        Session::put('kotToken', self::$kotToken);
        Session::put('kotStartDate', self::$kotStartDate);

        self::$sessionData = [
            'companyID' => self::$companyID,
            'salesforceComppanyID' => self::$salesforceCompanyID,
            'email' => self::$email,
            'salesforceContactID' => self::$salesforceContactID,
            'companyContactFirstname' => self::$CompanyContactFirstname,
            'companyContactLastname' => self::$CompanyContactLastname,
            'companyName' => self::$companyName,
            'kotToken' => self::$kotToken,
            'kotStartDate' =>  self::$kotStartDate,
        ];
    }

    public function tearDown(): void
    {
        Auth::logout();
        Session::forget('salesforceCompanyID');
        Session::forget('salesforceContactID');
        Session::forget('CompanyContactLastname');
        Session::forget('companyName');
        Session::forget('kotToken');
        Session::forget('kotStartDate');
        Session::forget('email');
        session()->invalidate();

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
     * Login authorization test
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
     * Login authorization test with wrong credentials
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
     * Login authorization test with no email but with password present
     */
    public function testLoginAuthorizationWithNoEmailButWithPassword()
    {
        $params = [
            'username' => '',
            'password' => 'randomstring1234',
        ];

        $response = $this->json('POST', '/', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Login authorization test with email but with no password present
     */
    public function testLoginAuthorizationWithEmailButWithNoPassword()
    {
        $params = [
            'username' => 'admin@tcg.sprobe.ph',
            'password' => '',
        ];

        $response = $this->json('POST', '/', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Login authorization test with email but with no password present
     */
    public function testLoginAuthorizationWithIncorrectKeyAndValue()
    {
        $params = [
            'invalidkeyusername' => 'invalidemail',
            'invalidkeypassword' => '------------',
        ];

        $response = $this->json('POST', '/', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Logout authorization test
     */
    public function testLogoutAuthorization()
    {
        $response = $this->json('GET', '/logout');

        $response->assertStatus(302);
        $response->assertRedirect('/');
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Zendesk SSO authorization with empty email in session
     *
     * must add --stderr to CLI before doing php unit to work
     */
    public function testZendeskSSOAuthorizationEmptyEmailInSession()
    {
        // purposely using different input
        $incorrectEmail= '';

        Session::put('email', $incorrectEmail);
        self::$sessionData['email'] = $incorrectEmail;

        $response = $this->actingAs(self::$USER)->withSession(self::$sessionData)
                            ->json('GET', '/sso/zendesk');

        $response->assertStatus(404);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Zendesk SSO authorization
     *
     * must add --stderr to CLI before doing php unit to work
     */
    public function testZendeskSSOAuthorization()
    {
        $response = $this->actingAs(self::$USER)->withSession(self::$sessionData)
                            ->json('GET', '/sso/zendesk');

        $response->assertStatus(200);
        $response->assertLocation('/');
        $result = json_decode((string) $response->getContent());
    }
}
