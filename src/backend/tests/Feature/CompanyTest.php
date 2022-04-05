<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class CompanyTest extends TestCase
{
    /** @var Object */
    private static $COMPANY_ADMIN;

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

    public function setUp(): void
    {
        parent::setUp();

        $user = User::find(3);

        self::$COMPANY_ADMIN = $user;
        self::$companyID = $user->company->id;
        self::$salesforceCompanyID = $user->company->account_id;
        self::$email = $user->email;
        self::$salesforceContactID = $user->account_code;
        self::$CompanyContactFirstname = $user->first_name;
        self::$CompanyContactLastname = $user->last_name;
        self::$companyName = $user->company->name;
        self::$kotToken = $user->company->token;
        self::$kotStartDate = $user->company->kot_billing_start_date;

        Auth::login(self::$COMPANY_ADMIN);
        Session::put('companyID', self::$companyID);
        Session::put('salesforceCompanyID', self::$salesforceCompanyID);
        Session::put('email', self::$email);
        Session::put('salesforceContactID', self::$salesforceContactID);
        Session::put('CompanyContactFirstname', self::$CompanyContactFirstname);
        Session::put('CompanyContactLastname', self::$CompanyContactLastname);
        Session::put('companyName', self::$companyName);
        Session::put('kotToken', self::$kotToken);
        Session::put('kotStartDate', self::$kotStartDate);
    }

    public function tearDown(): void
    {
        parent::tearDown();
        Auth::logout();

        Session::forget('salesforceCompanyID');
        Session::forget('salesforcgetUsageDataeContactID');
        Session::forget('CompanyContactLastname');
        Session::forget('companyName');
        Session::forget('kotToken');
        Session::forget('kotStartDate');
        Session::forget('email');
    }

    /**
     * CompanyTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();
    }

    /**
     * Get Service Usage test success
     */
    public function testGetServiceUsageSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession([
            'companyID' => self::$companyID,
            'salesforceComppanyID' => self::$salesforceCompanyID,
            'email' => self::$email,
            'salesforceContactID' => self::$salesforceContactID,
            'CompanyContactFirstname' => self::$CompanyContactFirstname,
            'CompanyContactLastname' => self::$CompanyContactLastname,
            'companyName' => self::$companyName,
            'kotToken' => self::$kotToken,
            'kotStartDate' =>  self::$kotStartDate,
        ])
        ->json('GET', '/company/getServiceUsage');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get Service Usage test fail
     */
    public function testGetServiceUsageFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';
        $companyName = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        Session::put('companyName', $companyName);

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession([
            'companyID' => self::$companyID,
            'salesforceComppanyID' => self::$salesforceCompanyID,
            'email' => self::$email,
            'salesforceContactID' => self::$salesforceContactID,
            'CompanyContactFirstname' => self::$CompanyContactFirstname,
            'CompanyContactLastname' => self::$CompanyContactLastname,
            'companyName' => self::$companyName,
            'kotToken' => self::$kotToken,
            'kotStartDate' =>  self::$kotStartDate,
        ])
        ->json('GET', '/company/getServiceUsage');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }
}
