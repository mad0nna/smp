<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
// Default API Homepage
Route::get('/', 'API\HomeController');

Route::middleware('auth:api')
    ->get('/profile', function (Request $request) {
        return response()->json($request->user());
    });

// user logout
Route::delete('oauth/token', 'Auth\TokenController@delete')->middleware('auth:api');

Route::post('register', 'API\UserController@register');

Route::post('activate', 'API\UserController@activate');

// Routes for Forget and Reset Password
Route::post('password/forgot', 'Auth\PasswordController@forgot');
Route::post('password/reset', 'Auth\PasswordController@reset');

// users route
Route::prefix('users')
    ->group(function () {
        Route::get('/', 'API\UserController@index');
        Route::post('/', 'API\UserController@create');
        Route::get('{id}', 'API\UserController@read');
        Route::put('{id}', 'API\UserController@update');
        Route::delete('{id}', 'API\UserController@delete');
    });
