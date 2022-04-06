<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AdminCompanyTest extends TestCase
{
    /** @var Object */
    private static $ADMIN;

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

    /** @var string */
    private static $KEYWORD = 's';

    /** @var string */
    private static $TOTAL;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::find(1);

        self::$ADMIN = $user;
        self::$companyID = $user->company->id;
        self::$salesforceCompanyID = $user->company->account_id;
        self::$email = $user->email;
        self::$salesforceContactID = $user->account_code;
        self::$CompanyContactFirstname = $user->first_name;
        self::$CompanyContactLastname = $user->last_name;
        self::$companyName = $user->company->name;
        self::$kotToken = $user->company->token;
        self::$kotStartDate = $user->company->kot_billing_start_date;

        Auth::login(self::$ADMIN);
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
    // search by keyword
    // search with limit

    /**
     * Company Index Search success
     */
    public function testCompanyIndexSearchSuccess()
    {
        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/admin/company?page=1&limit=10&keyword=');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());

        $this->assertEquals($result->success, true);
    }

    /**
     * Company Index Search with no results
     */
    public function testCompanyIndexSearchNoResults()
    {
        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/admin/company?page=1&limit=10&keyword=randomString1234');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals(0, count($result->data));
        $this->assertEquals(1, $result->lastPage);
    }

    /**
     * Company Index Search by keyword
     */
    public function testCompanyIndexSearchByKeyword()
    {
        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/admin/company?page=1&limit=10&keyword=' . self::$KEYWORD);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());


        // verify if the keyword exists either in first name, last name or email
        foreach ($result->data as $company) {
            $hasKeyword = false;

            if (strpos(strtolower($company->name), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($company->companyCode), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($company->industry), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($company->contactNum), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            foreach ($company->admin as $admin) {
                if (strpos(strtolower($admin->email), self::$KEYWORD) !== false) {
                    $hasKeyword = true;
                }
            }

            $this->assertTrue($hasKeyword);
        }

        // store total for limit testing
        self::$TOTAL = $result->pageCount;
    }

    /**
     * Search company code test success
     */
    public function testSearchByCompanyCodeSuccessAvailable()
    {
        $params = [
            'code' => '12345',
        ];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/searchCompanyCode', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->success, true);
        $this->assertEquals($result->exists, false);
    }
}
