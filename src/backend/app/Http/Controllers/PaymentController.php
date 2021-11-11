<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;
use Illuminate\Support\Facades\Cache;
class PaymentController extends Controller
{
    private $failed = 'NG';
    public function getResult(Request $request, PaymentService $paymentService) {
        Log::info('payment test', $request->all());
        $cgiResult = $request->all();
        if ($cgiResult['result'] != $this->failed) {

        }
        $paymentService->setCreditCardMethod($request->all());
    }

    public function changeMethodToCard() {
        Cache::forget(Session::get('salesforceCompanyID').":company:details");
        return view('zeusPayment', 
        [
            'salesforceCompanyID' => Session::get('salesforceCompanyID'),
            'contactNumber'=> Auth::user()->contact_num,
            'email' => Auth::user()->email,
            'amount' => 0,
            'clientIP' => 2019001618,
            'sendID' => 'changePaymentMethodTEST'
        ]);
    }

    public function changeMethodToBank(PaymentService $paymentService) {
        try {
            return $paymentService->setBankTransferMethod(Session::get('salesforceCompanyID'));
        } catch(UnauthorizedException $e) {
            return $e->getMessage();
        }
    }
}