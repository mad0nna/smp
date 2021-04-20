<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * Show the profile for the given user.
     *
     * @return Illuminate\Http\Response
     */
    public function __invoke()
    {
        return response()->json($this->response);
    }
}
