<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => 'zuora.api'], function () {
    Route::post('/zuora', 'FileController@upload');
});

Route::get('/', 'Auth\LoginController@login')->name('login');
Route::post('/', 'Auth\LoginController@authenticate')->name('auth');
Route::get('/logout', 'Auth\LoginController@logout');
Route::get('/zeusLandingPage', function (Request $request) {
    return redirect($request->redirectTo);
});
Route::get('/getLoggedinUser', 'CompanyController@getLoggedinUser');


Route::group(['prefix' => 'company',  'middleware' => 'company'], function () {
    Route::post('getCompanyDetails', 'CompanyController@getCompanyDetails');
    Route::post('getCompanyAdminDetails', 'CompanyController@getCompanyAdminDetails');
    Route::post('getOpportunityDetails', 'CompanyController@getOpportunityDetails');
    Route::post('getUpdatedDataForEditCompanyDetails', 'CompanyController@getUpdatedDataForEditCompanyDetails');
    Route::post('updateCompanyDetails', 'CompanyController@updateCompanyDetails');
    Route::put('updateAdminByEmail', 'UserController@updateAdminByEmail');
    Route::get('getCompanyAdminDetailsbyEmail', 'UserController@searchSF');
    Route::view('/account/profile/', 'companyAdminProfile');
    Route::view('/widgetSettings', 'widgetSettings');
    Route::get('/getCoordinates', 'WidgetController@getCompanyCoordinates');
    Route::post('/saveCoordinates', 'WidgetController@saveCoordinates');
    Route::post('/resetCoordinates', 'WidgetController@resetCoordinates');
    Route::get('/getServiceUsage', 'CompanyController@getServiceUsage');
    Route::get('/getServiceUsageDate', 'CompanyController@getServiceUsageDate');
    Route::view('/dashboard', 'dashboard');
    Route::get('/contracts', 'ContractController@list');
    Route::post('/contractslist', 'ContractController@index');
    Route::get('/billing', 'BillingController@list');
    Route::get('/accountslist', 'UserController@list');
    Route::get('/accountslist/profile', 'UserController@list');
    Route::view('/companyProfile', 'companyProfile');
    Route::get('getCompanyAdmins', 'UserController@index');
    Route::view('/companyProfileEdit', 'companyProfileEdit');
    Route::get('/getNotification', 'NotificationController@getAllNotification');
    Route::post('/seenNotification', 'NotificationController@seenNotification');
    Route::post('addCompanyAdmin', 'UserController@store');
    Route::post('resendEmailInvite', 'UserController@invite');
    Route::delete('deleteAdmin', 'UserController@destroy');
    Route::get('getLoggedUserInfo', 'UserController@userinfo');
    Route::get('findInSFByEmail', 'UserController@findInSFByEmail');
    Route::view('/notifications', 'notifications');
    Route::post('/getContactDetails', 'UserController@getContactDetails');
    Route::get('/getBilling', 'BillingController@index');
    Route::post('/getInvoicePDF', 'BillingController@getInvoicePDF');
    Route::get('/getUsage', 'BillingController@getAccountUsageData');
    Route::post('downloadBillingHistoryCSV', 'FileController@downloadBillingHistoryCSV');
    Route::view('/methodofpayment', 'methodOfPayment');
    Route::get('/getUnpaidBillingInformation', 'BillingController@getUnpaidBillingInformation');

    Route::view('/setting/widget', 'company.widgetSetting');
    Route::view('/setting/payment/method', 'company.methodOfPayment');
    Route::view('/setting/password', 'company.passwordSetting');

    // Company Shop
    Route::view('/productDetail', 'companyProductDetail');
    Route::view('/cart', 'companyCart');
    Route::get('/shop', 'ShoppingController@shop');
    Route::get('/getUnpaidOrders', 'CompanyController@getUnpaidOrders');
});

Route::group(['prefix' => 'admin', 'middleware' => 'admin'], function () {
    Route::view('/dashboard', 'admin.dashboard')->name('dashboard');
    Route::view('/accounts', 'admin.accounts');
    Route::view('/accounts/profile', 'admin.accounts');
    Route::get('/accounts/sales/detail', function () {
        return view('admin.salesDetail');
    });
    Route::get('/accounts/company/detail', function () {
        return view('admin.companyDetail');
    });
    Route::get('company', 'CompanyController@index');
    Route::post('company/searchCompanyCode', 'CompanyController@searchCompanyCode');
    Route::post('company/searchCompanyId', 'CompanyController@searchCompanyId');
    Route::post('company/saveAddedCompany', 'CompanyController@saveAddedCompany');
    Route::post('company/updateSaveAccount', 'CompanyController@updateSaveAccount');
    Route::post('company/resendEmailInvite', 'CompanyController@resendEmailInvite');
    Route::view('/settings', 'admin.settings');

    Route::post('/uploadNewProductInventoryCsv', 'ShoppingController@uploadNewProductInventoryCsv');
    Route::post('/uploadUpdateStockInventoryCsv', 'ShoppingController@uploadUpdateStockInventoryCsv');
    // invoice Template
    Route::view('/settings/invoice/detail', 'admin.invoiceDetail');
    Route::get('template/getListOfCompany', 'CompanyController@index');
    Route::post("template/uploadNewTemplate", 'TemplateController@uploadNewTemplate');
    Route::get("template/getListOfTemplate", 'TemplateController@getListOfTemplate');
    Route::post("template/getTemplateDetail", 'TemplateController@getTemplateDetail');
    Route::post('template/updateTemplate', 'TemplateController@updateTemplate');
});

// This route is for testing purposes.
Route::get('template/fillData', 'TemplateController@fillData');


Route::prefix('sales')->group(function () {
    Route::view('/dashboard', 'sales.dashboard')->name('dashboard');
    Route::view('/companies', 'sales.companies');
    Route::view('/billing', 'sales.billing');
    Route::view('/account', 'sales.account');
    Route::view('/account', 'sales.account');
    Route::view('/contact', 'sales.contact');
});

// Route for Logistics User
Route::prefix('logistics')->group(function () {
    Route::view('dashboard', 'logistics.dashboard')->name('logistics.dashboard');
});

Route::prefix('password')->group(function () {
    Route::get('forgot', 'Auth\PasswordController@forgot')->middleware('guest');
    Route::post('email', 'Auth\PasswordController@email')->name('password.email');
    Route::post('reset', 'Auth\PasswordController@update')->name('password.update');
    Route::get('reset', 'Auth\PasswordController@reset')->middleware('guest');
    Route::post('change', 'Auth\PasswordController@change');
});

Route::group(['prefix' => 'sso'], function () {
    Route::get('zendesk', 'Auth\LoginController@zendeskSSO');
});

Route::group(['prefix' => 'payment'], function () {
    Route::get('status', 'PaymentController@getResult');
    Route::get('setMethodCreditCard', 'PaymentController@changeMethodToCard');
    Route::post('setMethodBankTransfer', 'PaymentController@changeMethodToBank');
    Route::post('getPaymentMethod', 'PaymentController@getPaymentMethodDetails');
    Route::get('creditCardPayment', 'PaymentController@creditCardPayment');
});

Route::get('service-check', 'ServiceCheckController');
