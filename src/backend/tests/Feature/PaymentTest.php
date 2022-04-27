<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PaymentTest extends TestCase
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
    private static $sessionData;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::where('username','machida@tcg.sprobe.ph')->firstOrFail();

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

        self::$sessionData = [
            'companyID' => self::$companyID,
            'salesforceComppanyID' => self::$salesforceCompanyID,
            'email' => self::$email,
            'salesforceContactID' => self::$salesforceContactID,
            'CompanyContactFirstname' => self::$CompanyContactFirstname,
            'CompanyContactLastname' => self::$CompanyContactLastname,
            'companyName' => self::$companyName,
            'kotToken' => self::$kotToken,
            'kotStartDate' =>  self::$kotStartDate,
        ];
    }

    public function tearDown(): void
    {
        parent::tearDown();
        Auth::logout();
        Session::forget('salesforceCompanyID');
        Session::forget('salesforceContactID');
        Session::forget('CompanyContactLastname');
        Session::forget('companyName');
        Session::forget('kotToken');
        Session::forget('kotStartDate');
        Session::forget('email');
        session()->invalidate();
    }

    /**
     * PaymentTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
    $this->createApplication();
    }

    /**
     * Get payment result success
     */
    public function testGetResultSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/contractslist');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get payment result fail
     */
    public function testGetResultFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/contractslist');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }
}
