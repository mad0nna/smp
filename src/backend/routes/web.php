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

Route::view('/', 'index');
Route::view('/widgetsettings','widgetSettings');

Route::prefix('company')->group(function() {

    Route::view('/dashboard', 'dashboard');
    Route::view('/contracts', 'contracts');
    Route::view('/billing', 'companyBilling');
    Route::view('/companyProfile', 'companyProfile');
});

Route::prefix('admin')->group(function() {
    Route::view('/dashboard', 'admin.dashboard');
    Route::view('/accounts', 'admin.accounts');
    Route::get('/accounts/sales/{salesId}', function() {
        return view('admin.salesDetail');
    });
    Route::get('/accounts/company/{companyId}', function() {
        return view('admin.companyDetail');
    });
});

Route::prefix('sales')->group(function() {
  Route::view('/dashboard', 'sales.dashboard');
  Route::view('/companies', 'sales.companies');
  Route::view('/billing', 'sales.billing');
  Route::view('/account', 'sales.account');
});

Route::get('/login', function () {
  $query = request()->query();
  if ($query["type"] === "company") {
    return view('companyLogin');
  } else if ($query["type"] === "sales") {
    return view('sales.salesLogin');
  }
})->name('login');


