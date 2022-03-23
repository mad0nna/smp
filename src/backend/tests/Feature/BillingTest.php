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
     * Unpaidbilling test success
     */
    public function testUnpaidBillingInformationSuccess()
    {
        Auth::login(self::$COMPANY_ADMIN);
        Session::put('companyID', Auth::user()->company->id);
        Session::put('salesforceCompanyID', Auth::user()->company->account_id);
        Session::put('email', Auth::user()->email);
        Session::put('salesforceContactID', Auth::user()->account_code);
        Session::put('CompanyContactFirstname', Auth::user()->first_name);
        Session::put('CompanyContactLastname', Auth::user()->last_name);
        Session::put('companyName', Auth::user()->company->name);
        Session::put('kotToken', Auth::user()->company->token);
        Session::put('kotStartDate', Auth::user()->company->kot_billing_start_date);

        $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession([
                            'companyID' => self::$companyID,
                            'salesforceCompanyID' => self::$salesforceCompanyID,
                            'email' => self::$email,
                            'salesforceContactID' => self::$salesforceContactID,
                            'CompanyContactFirstname' => self::$CompanyContactFirstname,
                            'CompanyContactLastname' => self::$CompanyContactLastname,
                            'companyName' => self::$companyName,
                            'kotToken' => self::$kotToken,
                            'kotStartDate' =>  self::$kotStartDate,
                        ])
                        ->json('GET', '/company/getUnpaidBillingInformation');

        $response->assertStatus(200);
        $result = json_decode((string) $response->getContent());

        Auth::logout();
    }
}
