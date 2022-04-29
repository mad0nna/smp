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

        // for now this test requires the user "santos.ma@sprobe.com" from salesforce
        // since it has a working zues payment change for local testing
        // kindly go to super admin and add company > "demo" code to continue testing
        $user = User::where('username','santos.ma@sprobe.com')->firstOrFail();

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
     * Get Payment Method Details Success
     */
    public function testGetPaymentMethodDetailsSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/payment/getPaymentMethod');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get Payment Method Details Fail
     */
    public function testGetPaymentMethodDetailsFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/payment/getPaymentMethod');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Change method to bank transfer  Success
     */
    public function testChangeMethodToBankSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/payment/getPaymentMethod');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Change method to bank transfer fail
     */
    public function testChangeMethodToBankFail()
    {
        // purposely using different input
        $incorrectCompanyID = 'aaaaaaaaaa';
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

        Session::put('companyID', $incorrectCompanyID);
        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['companyID'] = $incorrectCompanyID;
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/payment/getPaymentMethod');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }
}
