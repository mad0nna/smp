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
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
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
        $incorrectCompanyName = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        Session::put('companyName', $incorrectCompanyName);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;
        self::$sessionData['companyName'] = $incorrectCompanyName;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getServiceUsage');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get Service Usage Date test success
     */
    public function testGetServiceUsageDateSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getServiceUsageDate');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get logged in user test success
     */
    public function testGetLoggedInUserSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/getLoggedinUser');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get company details test success
     */
    public function testGetCompanyDetailsSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getCompanyDetails');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get company details test fail
     */
    public function testGetCompanyDetailsFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getCompanyDetails');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get company admin details test success
     */
    public function testGetCompanyAdminDetailsSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getCompanyAdminDetails');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get company admin details test fail
     */
    public function testGetCompanyAdminDetailsFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';
        $incorrectSalesforceContactID = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        Session::put('salesforceContactID', $incorrectSalesforceContactID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;
        self::$sessionData['salesforceContactID'] = $incorrectSalesforceContactID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getCompanyAdminDetails');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get opportunity details test success
     */
    public function testGetOpportunityDetailsSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getOpportunityDetails');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get opportunity details test fail
     */
    public function testGetOpportunityDetailsFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';
        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getOpportunityDetails');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get updated data for edit company details test success
     */
    public function testGetUpdatedDataForEditCompanyDetailsSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getUpdatedDataForEditCompanyDetails');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get updated data for edit company details fail
     */
    public function testGetUpdatedDataForEditCompanyDetailsFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getUpdatedDataForEditCompanyDetails');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }
}
