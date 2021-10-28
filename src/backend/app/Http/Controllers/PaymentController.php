<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function getResult(Request $request) {
        dd($request->all());
    }
}
