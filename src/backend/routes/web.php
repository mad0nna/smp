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

// Load All Login, Register, Verify Email, Forget & Reset Password Routes
Auth::routes(['verify' => true]);

Route::get('/home', 'HomeController@index')->name('home');

// Profile Routes
Route::get('/profile', 'ProfileController@index')->name('profile');
Route::put('/profile', 'ProfileController@update')->name('profile.update');
Route::get('/profile/edit', 'ProfileController@edit')->name('profile.edit');
Route::get('/profile/password/edit', 'ProfileController@editPassword');
Route::put('/profile/password', 'ProfileController@updatePassword')->name('profile.password.update');

// User Routes
Route::resource('/users', 'UserController');

// Handle User created in the dashboard Not Manual Signup
Route::get('/invite', 'InviteController@index');
Route::post('/invite', 'InviteController@accept')->name('accept.invite');
