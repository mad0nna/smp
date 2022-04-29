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

    public function getResult(Request $request, PaymentService $paymentService)
    {
        Log::info('payment test', $request->all());
        $cgiResult = $request->all();
        if ($cgiResult['result'] != $this->failed) {

            if ($cgiResult['sendid'] == 'changePaymentMethodTEST') {
                    $paymentService->setCreditCardMethod($request->all());
            } else {
                // order payment update here
                $paymentService->updateOrderStatus($request->all());
            }
        }
    }

    public function changeMethodToCard()
    {
        Cache::forget(Session::get('salesforceCompanyID').":company:details");
        return view('zeusPayment',
        [
            'host' => env('ZEUS_HOST'),
            'salesforceCompanyID' => Session::get('salesforceCompanyID'),
            'contactNumber'=> Auth::user()->contact_num,
            'email' => Auth::user()->email,
            'amount' => 0,
            'clientIP' => env('ZEUS_CLIENT_IP'),
            'sendID' => 'changePaymentMethodTEST',
            'redirectTo' => '/company/dashboard'
        ]);
    }


    public function creditCardPayment(Request $request)
    {
        Cache::forget(Session::get('salesforceCompanyID').":company:details");
        return view('zeusPayment',
        [
            'host' => env('ZEUS_HOST'),
            'salesforceCompanyID' => Session::get('salesforceCompanyID'),
            'contactNumber'=> Auth::user()->contact_num,
            'email' => Auth::user()->email,
            'amount' => $request->amount,
            'clientIP' => env('ZEUS_CLIENT_IP'),
            'sendID' => 'creditCardPayment-'.$request->orderId,
            'redirectTo' => '/company/dashboard'
        ]);
    }

    public function changeMethodToBank(PaymentService $paymentService)
    {
        try {
            $result = $paymentService->setBankTransferMethod(Session::get('salesforceCompanyID'), Session::get('companyID'));
            $this->response = $result;
            $this->response['code'] = $result['status'] == true ? 200 : 500;
        } catch(UnauthorizedException $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    public function getPaymentMethodDetails(PaymentService $paymentService)
    {
        try {
            $result = $paymentService->getPaymentMethodDetails(Session::get('salesforceCompanyID'));
            $this->response = $result;
            $this->response['code'] = $result == true ? 200 : 500;
        } catch(UnauthorizedException $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }
}