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

use Illuminate\Support\Facades\Route;

Route::get('/', 'Auth\LoginController@login')->name('login');
Route::post('/', 'Auth\LoginController@authenticate')->name('auth');
Route::get('/logout', 'Auth\LoginController@logout');

Route::prefix('salesforce')->group(function () {
    Route::post('getCompanyDetails', 'CompanyController@getCompanyDetails');
    Route::post('getCompanyAdminDetails', 'CompanyController@getCompanyAdminDetails');
    Route::get('getCompanyAdminDetailsbyEmail', 'UserController@searchSF');
    Route::post('getUpdatedDataForEditCompanyDetails', 'CompanyController@getUpdatedDataForEditCompanyDetails');
    Route::put('updateAdminByEmail', 'UserController@updateAdminByEmail');
    Route::delete('deleteSFAdmin', 'UserController@destroyInSF');
    Route::post('updateCompanyDetails', 'CompanyController@updateCompanyDetails');
    Route::post('getOpportunityDetails', 'CompanyController@getOpportunityDetails');
});

  Route::group(['prefix' => 'company',  'middleware' => 'company'], function () {
      Route::view('/widgetSettings', 'widgetSettings');
      Route::get('/getCoordinates', 'WidgetController@getCompanyCoordinates');
      Route::post('/saveCoordinates', 'WidgetController@saveCoordinates');
      Route::post('/resetCoordinates', 'WidgetController@resetCoordinates');
      Route::get('/getServiceUsage', 'CompanyController@getServiceUsage');
      Route::get('/getServiceUsageDate', 'CompanyController@getServiceUsageDate');
      Route::get('/getLoggedinUser/{field}', 'CompanyController@getLoggedinUser');
      Route::view('/dashboard', 'dashboard');
      Route::get('/contracts', 'ContractController@list');
      Route::get('/contractslist', 'ContractController@index');
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
      Route::put('updateAdmin', 'UserController@update');
      Route::delete('deleteAdmin', 'UserController@destroy');
      Route::get('getLoggedUserInfo', 'UserController@userinfo');
      Route::get('findInSFByEmail', 'UserController@findInSFByEmail');
      Route::view('/notifications', 'notifications');
      Route::get('/searchSFContactByUserId', 'UserController@searchSFContactByUserId');
      Route::get('/getBilling', 'BillingController@index');
      Route::post('/getInvoicePDF', 'BillingController@getInvoicePDF');
      Route::get('/getUsage', 'BillingController@getAccountUsageData');
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
  });

  Route::prefix('sales')->group(function () {
      Route::view('/dashboard', 'sales.dashboard')->name('dashboard');
      Route::view('/companies', 'sales.companies');
      Route::view('/billing', 'sales.billing');
      Route::view('/account', 'sales.account');
      Route::view('/account', 'sales.account');
  });

  Route::view('sales/account', 'sales.account');
  Route::view('sales/contact', 'sales.contact');

  Route::prefix('password')->group(function () {
      Route::get('forgot', 'Auth\PasswordController@forgot')->middleware('guest');
      Route::post('email', 'Auth\PasswordController@email')->name('password.email');
      Route::post('reset', 'Auth\PasswordController@update')->name('password.update');
      Route::get('reset', 'Auth\PasswordController@reset')->middleware('guest');
  });

  Route::group(['prefix' => 'admin',  'middleware' => 'admin'], function () {
      Route::get('company', 'CompanyController@index');
      Route::post('company/searchCompanyCode', 'CompanyController@searchCompanyCode');
      Route::post('company/searchCompanyId', 'CompanyController@searchCompanyId');
      Route::post('company/saveAddedCompany', 'CompanyController@saveAddedCompany');
      Route::post('company/updateSaveAccount', 'CompanyController@updateSaveAccount');
      Route::post('company/resendEmailInvite', 'CompanyController@resendEmailInvite');
  });
