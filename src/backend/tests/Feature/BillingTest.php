<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class BillingTest extends TestCase
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
     * BillingTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();
    }

    /**
     * Unpaid billing information test success
     */
    public function testUnpaidBillingInformationSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getUnpaidBillingInformation');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Unpaid billing information test fail wrong company input
     */
    public function testUnpaidBillingInformationFailWrongInput()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';
        $incorrectCompanyName = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        Session::put('companyName', $incorrectCompanyName);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;
        self::$sessionData['companyName'] = $incorrectCompanyName;;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getUnpaidBillingInformation');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get invoice index success
     */
    public function testGetInvoiceIndexSuccess()
    {
        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getBilling');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get invoice index success
     */
    public function testGetInvoiceIndexFail()
    {
        // purposely using different input
        $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

        Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
        self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getBilling');

        $response->assertStatus(500);
        $result = json_decode((string) $response->getContent());
    }

    /**
     * Get invoice index success with list or an empty list
     */
    public function testGetInvoicePDFSuccess()
    {
        $invoiceList = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getBilling');

        if (!empty($invoiceList)) {
            $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                                ->withHeaders([
                                    'invoiceFileId' => $invoiceList[0]['body'],
                                    'invoiceNumber' => $invoiceList[0]['invoiceNumber'],
                                    'accountNumber' => $invoiceList[0]['accountNumber'],
                                ])
                                ->json('POST', '/company/getInvoicePDF');

            $response->assertStatus(200);
            $result = json_decode((string) $response->getContent());
        } else {
            $this->assertEmpty($invoiceList);
        }
    }

    /**
     * Get invoice index success with wrong input
     */
    public function testGetInvoicePDFWrongInput()
    {
        $invoiceList = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                            ->json('GET', '/company/getBilling');

        if (!empty($invoiceList)) {
            $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
                                ->withHeaders([
                                    'invoiceFileId' => 'randomString123456',
                                    'invoiceNumber' => 'randomString123456',
                                    'accountNumber' => 'randomString123456',
                                ])
                                ->json('POST', '/company/getInvoicePDF');

            $response->assertStatus(500);
            $result = json_decode((string) $response->getContent());
        } else {
            $this->assertEmpty($invoiceList);
        }
    }
}
