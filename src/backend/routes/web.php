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
});

Route::get('/login', function () {
  $query = request()->query();
  if ($query["type"] === "company") {
    return view('companyLogin');
  }
})->name('login');
