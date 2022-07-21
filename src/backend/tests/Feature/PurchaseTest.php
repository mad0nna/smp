<?php

namespace Tests\Feature;

use Tests\TestCase;
use Tests\TestHelperJapi;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class PurchaseTest extends TestCase
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
    private static $token;

    private $context;
	private $object;
	private $view;

    public function setUp(): void
    {
        parent::setUp();

        // for now this test requires the user "santos.ma@sprobe.com" from salesforce API
        // since it has a working zues payment change for local testing
        // kindly go to super admin and add company > "demo" code, before executing tests
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
        Session::start();
        self::$token = csrf_token();
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

        $this->context = TestHelperJapi::getContext();
		$this->view = $this->context->getView();

		$this->object = new \Aimeos\Client\JsonApi\Basket\Standard( $this->context, 'basket' );
		$this->object->setView( $this->view );
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

        \Aimeos\Controller\Frontend\Basket\Factory::injectController( '\Aimeos\Controller\Frontend\Basket\Standard', null );
    }

    /**
     * PaymentTest constructor.
     */
    public function __construct()
    {
        parent::__construct();
        $this->createApplication();
    }

    
	public function testDelete()
	{
		$body = '{"data": {"attributes": {"order.base.comment": "test"}}}';
		$request = $this->view->request()->withBody( $this->view->response()->createStreamFromString( $body ) );
        dd($request);
		$response = $this->object->patch( $request, $this->view->response() );
		$result = json_decode( (string) $response->getBody(), true );

		$this->assertEquals( 'test', $result['data']['attributes']['order.base.comment'] );


		$response = $this->object->delete( $request, $this->view->response() );
		$result = json_decode( (string) $response->getBody(), true );

		$this->assertEquals( 200, $response->getStatusCode() );
		$this->assertEquals( 1, count( $response->getHeader( 'Allow' ) ) );
		$this->assertEquals( 1, count( $response->getHeader( 'Content-Type' ) ) );

		$this->assertEquals( 1, $result['meta']['total'] );
		$this->assertEquals( 'basket', $result['data']['type'] );
		$this->assertGreaterThan( 9, count( $result['data']['attributes'] ) );
		$this->assertEquals( '', $result['data']['attributes']['order.base.comment'] );

		$this->assertArrayNotHasKey( 'errors', $result );
	}

    /**
     * Get Payment Method Details Success
     */
    // public function testPurchaseItem()
    // {
    //     // Session::start();
    //     // $token = csrf_token();
    //     // $token = substr(md5(microtime()), rand(0, 26), 50);
    //     $token = self::$token;

    //     $payload = [
    //         "data" => [
    //             [
    //                 "attributes" => [
    //                     "product.id" => "1",
    //                     'quantity' => 1,
    //                     'stocktype' => "default",
    //                 ]
    //             ]
    //         ]
    //     ];
    //     // dd($data);
    //     $response = $this->actingAs(self::$COMPANY_ADMIN)
    //                     ->json('POST', '/jsonapi/basket?id=default&related=product&_token=' . $token, $payload);
    //     dd($response);
    //     $response->assertStatus(200);
    //     $result = json_decode((string) $response->getContent());
    // }

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

    // Disabled for now account used for staging testing
    // /**
    //  * Change method to bank transfer  Success
    //  */
    // public function testChangeMethodToBankSuccess()
    // {
    //     $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
    //                         ->json('POST', '/payment/setMethodBankTransfer');

    //     $response->assertStatus(200);
    //     $result = json_decode((string) $response->getContent());
    // }

    // /**
    //  * Change method to bank transfer fail
    //  */
    // public function testChangeMethodToBankFail()
    // {
    //     // purposely using different input
    //     $incorrectCompanyID = 'aaaaaaaaaa';
    //     $incorrectSalesforceCompanyID = 'aaaaaaaaaa';

    //     Session::put('companyID', $incorrectCompanyID);
    //     Session::put('salesforceCompanyID', $incorrectSalesforceCompanyID);
    //     self::$sessionData['companyID'] = $incorrectCompanyID;
    //     self::$sessionData['salesforceCompanyID'] = $incorrectSalesforceCompanyID;

    //     $response = $this->actingAs(self::$COMPANY_ADMIN)->withSession(self::$sessionData)
    //                         ->json('POST', '/payment/setMethodBankTransfer');

    //     $response->assertStatus(500);
    //     $result = json_decode((string) $response->getContent());
    // }
}
