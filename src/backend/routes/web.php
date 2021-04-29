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

Route::view('/', 'index');
Route::view('/dashboard', 'dashboard');
Route::view('/widgetsettings','widgetSettings');

Route::view('/company/contracts', 'contracts');
Route::view('/company/billing', 'companyBilling');
Route::view('/companyProfile', 'companyProfile');

Route::get('/login', function () {
  $query = request()->query();
  if ($query["type"] === "company") {
    return view('companyLogin');
  }
})->name('login');
