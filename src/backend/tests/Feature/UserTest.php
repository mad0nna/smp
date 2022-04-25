<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class UserTest extends TestCase
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

    /** @var int */
    private static $userId;

    /** @var array */
    private static $arrayAddCompanyParams;

    /** @var string */
    private static $KEYWORD = 's';

    public function setUp(): void
    {
        parent::setUp();

        $user = User::where('username','machida@tcg.sprobe.ph')->firstOrFail();

        self::$COMPANY_ADMIN = $user;
        self::$userId = $user->id;
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
     * Get user index success
     */
    public function testGetUserIndexSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getCompanyAdmins?page=1&limit=10&keyword=');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get user index with no search results
     */
    public function testGetInvoiceIndexSearchNoResults()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getCompanyAdmins?page=1&limit=10&keyword=randomString1234');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
        $this->assertEquals(0, count($result->data));
        $this->assertEquals(1, $result->lastPage);
    }

    /**
     * User Index Search by keyword
     */
    public function testUserIndexSearchByKeyword()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getCompanyAdmins?page=1&limit=10&keyword=' . self::$KEYWORD);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());


        // verify if the keyword exists either in first name, last name,
        // title, type, email or contact number
        foreach ($result->data as $user) {
            $hasKeyword = false;

            if (strpos(strtolower($user->first_name), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($user->last_name), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($user->title), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($user->email), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            if (strpos(strtolower($user->contact_num), self::$KEYWORD) !== false) {
                $hasKeyword = true;
            }

            $this->assertTrue($hasKeyword);
        }
    }

    /**
     * Find user in salesforce by email
     */
    public function testFindInSalesforceByEmailSuccess()
    {
        $params = [
            'email' => 'admin@tcg.sprobe.ph',
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/findInSFByEmail', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Find user in salesforce by email with incorrect parameters
     */
    public function testFindInSalesforceByEmailIncorrectParameters()
    {
        $params = [
            'key' => 'value'
        ];
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/findInSFByEmail', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Find user in salesforce by email with no email
     */
    public function testFindInSalesforceByEmailNoEmail()
    {
        $params = [
            'email' => ''
        ];
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/findInSFByEmail', $params);
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Gets the users contact details success
     */
    public function testGetContactDetailsSuccess()
    {
        $params = [
            'id' => self::$userId,
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getContactDetails', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Gets the users contact details with non-existing id
     */
    public function testGetContactDetailsNonExistingId()
    {
        $params = [
            'id' => 99999999,
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/getContactDetails', $params);

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Stores a new user successfully and deletes it after
     */
    public function testUserStoreSuccess()
    {
        $findSFByEmailParams = [
            'email' => 'test123@test.com',
        ];

        $findSFByEmailResponse = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                                      ->json('GET', '/company/findInSFByEmail', $findSFByEmailParams);

        $findSFByEmailResult = json_decode($findSFByEmailResponse->getContent(), $associative = true);

        $params = $findSFByEmailResult['data'];
        $params['isPartial'] = 0;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/addCompanyAdmin', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());

        $email = $result->data->email;
        $this->deleteUserByEmail($email);
    }

    /**
     * Stores a new user in partial state and deletes it after
     */
    public function testUserStorePartial()
    {
        $findSFByEmailParams = [
            'email' => 'test123@test.com',
        ];

        $findSFByEmailResponse = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                                      ->json('GET', '/company/findInSFByEmail', $findSFByEmailParams);

        $findSFByEmailResult = json_decode($findSFByEmailResponse->getContent(), $associative = true);

        $params = $findSFByEmailResult['data'];
        $params['firstname'] = $findSFByEmailResult['data']['first_name'];
        $params['lastname'] = $findSFByEmailResult['data']['last_name'];
        $params['isPartial'] = 1;


        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/addCompanyAdmin', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());

        $email = $result->data->email;
        $this->deleteUserByEmail($email);
    }

    /**
     * Attempts to store a new user with an existing email
     */
    public function testUserStoreEmailExists()
    {
        $findSFByEmailParams = [
            'email' => 'admin@tcg.sprobe.ph',
        ];

        $findSFByEmailResponse = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                                      ->json('GET', '/company/findInSFByEmail', $findSFByEmailParams);

        $findSFByEmailResult = json_decode($findSFByEmailResponse->getContent(), $associative = true);

        $params = $findSFByEmailResult['data'];
        $params['isPartial'] = 0;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/addCompanyAdmin', $params);

        $response->assertStatus(409);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Attempts to store a new user with wrong input
     */
    public function testUserStoreWrongInput()
    {
        $params = [
            'key' => 'value',
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/addCompanyAdmin', $params);

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Helper function that deletes a newly created user by email
     */
    private function deleteUserByEmail(string $email)
    {
        DB::beginTransaction();

        try {
            // delete newly created rows after unit testing
            $user = User::where('email', $email)->first();

            if ($user instanceof User) {
                $user->delete();
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
        }
    }
}
