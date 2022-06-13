<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\File;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Storage;

class FileTest extends TestCase
{
    /** @var Object */
    private static $COMPANY_ADMIN;

    /**
     * Session Login Data
     *
     * @var string
     */
    private static $zuoraAccessToken;
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

        self::$zuoraAccessToken= config('app.zuora_api_token');

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
     * FileTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();
    }

    /**
     * File Test Upload test success
     */
    public function testFileUpload()
    {
        $file = UploadedFile::fake()->create('file.csv');

        $params = [
            'file' => $file,
            'month_of_billing' => '2020-01',
            'salesforce_id' => self::$salesforceCompanyID,
        ];

        $response = $this->withHeaders([
                            'authorization-zuora' => self::$zuoraAccessToken,
                            'accept' => 'application/json'
                        ])->json('POST', '/zuora', $params);

        $response->assertStatus(200);

        $result = json_decode((string) $response->getContent());
    }

    /**
     * File Test Upload test invalid file format
     */
    public function testFileUploadInvalidFileFormat()
    {
        $file = UploadedFile::fake()->create('file.pdf');

        $params = [
            'file' => $file,
            'month_of_billing' => '2020-01',
            'salesforce_id' => self::$salesforceCompanyID,
        ];

        $response = $this->withHeaders([
                            'authorization-zuora' => self::$zuoraAccessToken,
                            'accept' => 'application/json'
                        ])->json('POST', '/zuora', $params);

        // error code for invalid input
        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * File Test Download test success
     */
    public function testFileDownloadSuccess()
    {
        $latestFile = File::latest()->first();
        $params = [
            'id' => $latestFile->id,
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/downloadBillingHistoryCSV', $params);

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());

        $this->deleteLatestFile();
    }

    /**
     * File Test Download test fail on invalid parameters
     */
    public function testFileDownloadInvalidFileParameters()
    {
        $params = [
            '__ID' => '99999999',
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('POST', '/company/downloadBillingHistoryCSV', $params);

        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * File Test Download test fail on id that does not exist
     */
    public function testFileDownloadInvalidFileId()
    {
        $params = [
            'id' => 99999999,
        ];

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                        ->json('POST', '/company/downloadBillingHistoryCSV', $params);

        $response->assertStatus(422);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Helper function that deletes a newly created file
     */
    private function deleteLatestFile()
    {
        DB::beginTransaction();

        try {
            // delete newly created file
            $file = File::latest()->first();

            if ($file instanceof File) {
                $file->delete();
            }

            DB::commit();
        } catch (\Throwable $th) {
            DB::rollback();

            throw $th;
        }
    }
}
