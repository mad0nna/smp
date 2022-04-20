<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Company;
use Illuminate\Support\Facades\DB;
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
    private static $newlyCreatedContactID;

    /** @var string */
    private static $newlyCreatedCompanyID;

    /** @var array */
    private static $arrayAddCompanyParams;

    /** @var array */
    private static $arrayUpdateCompanyParams;

    public function setUp(): void
    {
        parent::setUp();

        $user = User::where('username', 'admin@tcg.sprobe.ph')->firstOrFail();

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


        // verify if the keyword exists either in name, company code, industry, contact number or email
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
    }

    /**
     * Search company code test available
     */
    public function testSearchByCompanyCodeAvailable()
    {
        $params = [
            'code' => '12345',
        ];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/searchCompanyCode', $params);

        // saves the details for adding later
        $codeResult = json_decode($response->getContent(), $associative = true);
        self::$arrayAddCompanyParams = $codeResult['data'];

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->success, true);
        $this->assertEquals($result->exists, false);
    }

    /**
     * Search company code test used code and exisiing
     */
    public function testSearchByCompanyCodeUsed()
    {
        $params = [
            'code' => 'Sprobe',
        ];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/searchCompanyCode', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->success, true);
        $this->assertEquals($result->exists, true);
        $this->assertEquals($result->data, 'ご入力されたKoT企業コードは既に登録されています');
    }

    /**
     * Search company code test with non-existant code
     */
    public function testSearchByCompanyCodeNotExisting()
    {
        $params = [
            'code' => 'asdfjklk;123',
        ];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/searchCompanyCode', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->success, false);
        $this->assertEquals($result->exists, false);
        $this->assertEquals($result->data, 'コードが見つかりません');
    }

    /**
     * Searches up company id given company code
     */
    public function testSearchCompanyIDSuccess()
    {
        $params = [
            'company_id' => 1,
            'company_code' => 'Sprobe',
        ];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/searchCompanyId', $params);

        // saves the details for updating later
        $codeResult = json_decode($response->getContent(), $associative = true);
        self::$arrayUpdateCompanyParams = $codeResult['data'];

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get updated data for edit company details wrong input
     */
    public function testSearchCompanyIDWrongInput()
    {
        $params = [
            'company_id' => 999999999,
            'company_code' => 'invalidCompanyCode',
        ];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/searchCompanyId', $params);

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Saves a new company and company admin  by super admin success
     */
    public function testSaveAddedCompanySuccess()
    {
        $params = self::$arrayAddCompanyParams;

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/saveAddedCompany', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->success, true);

        DB::beginTransaction();

        try {
            // delete newly created rows after unit testing
            $user = User::where('account_code', $params['contactID'])->first();

            if ($user instanceof User) {
                $user->delete();
            }

            $company = Company::where('account_id', $params['companyID'])->first();

            if($company instanceof Company) {
                $company->delete();
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
        }
    }

    /**
     * Attempts to save a new company and company admin by super admin with empty parameters
     */
    public function testSaveAddedCompanyEmptyParameters()
    {
        $params = [];

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/saveAddedCompany', $params);

        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }


    /**
     * Attempts to save a new company and company admin by super admin with no contact email provided
     */
    public function testSaveAddedCompanyWithNoContactEmail()
    {
        $params = self::$arrayAddCompanyParams;
        $params['admin'][0]['email'] = '';

        $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/admin/company/saveAddedCompany', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals($result->success, false);
    }

    // /**
    //  * Updates an existing company and company admin details by super admin success
    //  */
    // public function testUpdateSaveCompanySuccess()
    // {
    //     $params = self::$arrayUpdateCompanyParams;
    //     $params['name'] = "Sprobe Updated";

    //     $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
    //                         ->json('POST', '/admin/company/updateSaveAccount', $params);

    //     $response->assertStatus(200);
    //     $result = json_decode((string) $response->getContent());

    //     $this->assertEquals($result->success['status'], true);
    // }

    // /**
    //  * Updates an existing company and company admin with empty parameters
    //  */
    // public function testUpdateSaveCompanyWithEmptyParameters()
    // {
    //     $params = [];
    //     $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
    //                         ->json('POST', '/admin/company/updateSaveAccount', $params);

    //     $response->assertStatus(500);
    //     $result = json_decode((string) $response->getContent());
    // }

    // /**
    //  * Updates an existing company and company admin details by super admin with no salesforce id
    //  */
    // public function testUpdateSaveCompanyWithNoSalesforceId()
    // {
    //     $params = self::$arrayUpdateCompanyParams;
    //     $params['accountId'] = "";

    //     $response = $this->actingAs(self::$ADMIN)->withSession(self::$sessionData)
    //                         ->json('POST', '/admin/company/updateSaveAccount', $params);

    //     $response->assertStatus(500);
    //     $result = json_decode((string) $response->getContent());
    //     $this->assertEquals($result->status, false);
    // }
}
