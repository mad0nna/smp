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

use App\Http\Controllers\API\SalesforceController;
use Illuminate\Support\Facades\Route;

Route::get('/', 'Auth\LoginController@login')->name('login');
Route::post('/', 'Auth\LoginController@authenticate')->name('auth');
Route::get('/logout', 'Auth\LoginController@logout');

Route::prefix('salesforce')->group(function() {
  Route::post('getCompanyDetails', "CompanyController@getCompanyDetails");
  Route::post('getCompanyAdminDetails', "CompanyController@getCompanyAdminDetails");
  Route::post('getUpdatedDataForEditCompanyDetails', "CompanyController@getUpdatedDataForEditCompanyDetails");
  Route::post('updateCompanyDetails', "CompanyController@updateCompanyDetails");
  Route::post('getOpportunityDetails', 'CompanyController@getOpportunityDetails');
});
Route::view('/widgetSettings','widgetSettings');

  Route::group(['prefix' => 'company',  'middleware' => 'company'],function() {

      Route::view('/dashboard', 'dashboard')->name('companydashboard');
      Route::view('/contracts', 'contracts');
      Route::view('/billing', 'companyBilling');
      Route::view('/companyProfile', 'companyProfile');
  });

  Route::group(['prefix'=>'admin', 'middleware' => 'admin'], function() {
      Route::view('/dashboard', 'admin.dashboard')->name('dashboard');
      Route::view('/accounts', 'admin.accounts');
      Route::get('/accounts/sales/detail', function() {
          return view('admin.salesDetail');
      });
      Route::get('/accounts/company/detail', function() {
          return view('admin.companyDetail');
      });
  });

  Route::prefix('sales')->group(function() {
    Route::view('/dashboard', 'sales.dashboard')->name('dashboard');
    Route::view('/companies', 'sales.companies');
    Route::view('/billing', 'sales.billing');
    Route::view('/account', 'sales.account');
  });

  Route::view('sales/account', 'sales.account');
  
  Route::prefix('password')->group(function() {
    Route::get('forgot', 'Auth\PasswordController@forgot')->middleware('guest');
    Route::post('email', 'Auth\PasswordController@email')->name('password.email');
    Route::post('reset', 'Auth\PasswordController@update')->name('password.update');
    Route::get('reset', 'Auth\PasswordController@reset')->middleware('guest');
  });
