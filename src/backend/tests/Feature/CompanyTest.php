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

        $user = User::where('username','pineda.pcb@sprobe.com')->firstOrFail();

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

    /**
     * Updates company details success
     */
    public function testUpdateCompanyDetailsSuccess()
    {
        $params = [
            'adminDetails' => [
                'Email' => 'pineda.pcb@sprobe.com',
                'FirstName' => 'Aurelio',
                'Id' => '0030l00000g4k23AAA',
                'LastName' => 'CronaUpdated',
                'MobilePhone' => '12345678910',
                'Title' => 'Title updated',
                'admin__c' => true,
                'section__c' => '管理',
            ],
            'companyDetails' => [
                'city' => '港区',
                'companyName' => '株式会社町田updated',
                'contactNumber' => '12345678910',
                'country' => 'Japan',
                'industry' => '建設',
                'postalCode' => '1234567',
                'state' => '東京都',
                'street' => '虎ノ門4-1-28 虎ノ門タワーズオフィス',
                'website' => 'https://www.h-t.co.jp',
            ],
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/updateCompanyDetails', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->status, true);
    }

    /**
     * Updates company details wrong parameters
     */
    public function testUpdateCompanyDetailsWrongParameters()
    {
        $params = [
            'invalidkey' => 'invalidvalue'
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/updateCompanyDetails', $params);

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Updates company details on existing email
     */
    public function testUpdateCompanyDetailsExistingEmail()
    {
        $params = [
            'adminDetails' => [
                'Email' => 'admin@tcg.sprobe.ph',
                'FirstName' => 'Aurelio',
                'Id' => '0030l00000g4k23AAA',
                'LastName' => 'CronaUpdated',
                'MobilePhone' => '12345678910',
                'Title' => 'Title updated',
                'admin__c' => true,
                'section__c' => '管理',
            ],
            'companyDetails' => [
                'city' => '港区',
                'companyName' => '株式会社町田updated',
                'contactNumber' => '12345678910',
                'country' => 'Japan',
                'industry' => '建設',
                'postalCode' => '1234567',
                'state' => '東京都',
                'street' => '虎ノ門4-1-28 虎ノ門タワーズオフィス',
                'website' => 'https://www.h-t.co.jp',
            ],
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/updateCompanyDetails', $params);

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Updates company details on invalid email
     */
    public function testUpdateCompanyDetailsInvalidEmail()
    {
        $params = [
            'adminDetails' => [
                'Email' => 'invalidEmail',
                'FirstName' => 'Aurelio',
                'Id' => '0030l00000g4k23AAA',
                'LastName' => 'CronaUpdated',
                'MobilePhone' => '12345678910',
                'Title' => 'Title updated',
                'admin__c' => true,
                'section__c' => '管理',
            ],
            'companyDetails' => [
                'city' => '港区',
                'companyName' => '株式会社町田updated',
                'contactNumber' => '12345678910',
                'country' => 'Japan',
                'industry' => '建設',
                'postalCode' => '1234567',
                'state' => '東京都',
                'street' => '虎ノ門4-1-28 虎ノ門タワーズオフィス',
                'website' => 'https://www.h-t.co.jp',
            ],
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/updateCompanyDetails', $params);

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Updates company details on empty contact and company id
     */
    public function testUpdateCompanyDetailsEmptyContactAndCompanyId()
    {
        // purposely using different input
        $emptySalesforceCompanyID = '';
        $emptySalesforceContactID = '';

        Session::put('salesforceCompanyID', $emptySalesforceCompanyID);
        Session::put('salesforceContactID', $emptySalesforceContactID);
        self::$sessionData['salesforceCompanyID'] = $emptySalesforceCompanyID;
        self::$sessionData['salesforceContactID'] = $emptySalesforceContactID;

        $params = [
            'adminDetails' => [
                'Email' => 'pineda.pcb@sprobe.com',
                'FirstName' => 'Aurelio',
                'Id' => '0030l00000g4k23AAA',
                'LastName' => 'CronaUpdated',
                'MobilePhone' => '12345678910',
                'Title' => 'Title updated',
                'admin__c' => true,
                'section__c' => '管理',
            ],
            'companyDetails' => [
                'city' => '港区',
                'companyName' => '株式会社町田updated',
                'contactNumber' => '12345678910',
                'country' => 'Japan',
                'industry' => '建設',
                'postalCode' => '1234567',
                'state' => '東京都',
                'street' => '虎ノ門4-1-28 虎ノ門タワーズオフィス',
                'website' => 'https://www.h-t.co.jp',
            ],
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/updateCompanyDetails', $params);

        $response->assertStatus(200);
        $response->assertJson($params, $strict = false);
        $result = json_decode((string) $response->getContent());
    }
}
