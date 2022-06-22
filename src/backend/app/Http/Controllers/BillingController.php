<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Services\BillingService;
use App\Services\OpportunityService;
use App\Services\Utilities\MessageResult;
use App\Models\User;

class BillingController extends Controller
{
    public function index(BillingService $billingService)
    {
        return $billingService->getBilling(Session::get('salesforceCompanyID'));
    }

    public function getLatestInvoiceDetails($companyID) {   
        $billingService = new BillingService;
        $zuoraInfo =  $billingService->getAccountInfo($companyID); 

        if (is_array($zuoraInfo)) {
            return $billingService->getLatestInvoiceDetails($zuoraInfo['id']);
        } else {
            return null;
        }
        
    }

    public function list()
    {
        $user = User::with(['company'])->find(Auth::user()->id);
        $user_data['companyName'] = $user['company'] ?  $user['company']['name'] : '';

        return view('companyBilling', ['user_data' => $user_data]);
    }

    public function getInvoicePDF(Request $request, BillingService $billingService)
    {
        $invoiceFileId = $request->header('invoiceFileId');
        $invoiceNumber = $request->header('invoiceNumber');
        $accountNumber = $request->header('accountNumber');
        if (empty($invoiceFileId) && empty($invoiceNumber) && empty($accountNumber)) {
            return MessageResult::error('Invoice cannot be downloaded!');
        }
        $pdfRawData = $billingService->getInvoicePDF($invoiceFileId);
        $fileName = $invoiceNumber . '_' . $accountNumber . '.pdf';
        if (!is_dir('temp')) {
            mkdir('temp', 0755);
        }
        $myfile = fopen('temp/' . $fileName, 'w') or die('Unable to open file!');
        fwrite($myfile, $pdfRawData);
        fclose($myfile);

        return $fileName;
    }

    public function getAccountUsageData(BillingService $billingService)
    {
        return $billingService->getAccountUsageData(Session::get('salesforceCompanyID'));
    }

    /**
     * Gets Unbilled information of the company belonging to logged in user
     *
     * @param App\Services\BillingService
     * @return Response
     */
    public function getUnpaidBillingInformation(BillingService $billingService, OpportunityService $opportunityService)
    {
        try {

            $this->response['data']['is_bank_transfer'] = false;
            $paymentMethod = $opportunityService->getLatestKOTOpportunityPaymentMethod(Session::get('salesforceCompanyID'));

            if ($paymentMethod === null || $paymentMethod !== 'クレジット') {
                $this->response['data'] = $billingService->getUnpaidBillingInformation(Session::get('companyName'), Session::get('salesforceCompanyID'));
                $this->response['data']['is_bank_transfer'] = true;
            }

            $this->response['code'] = 200;
        } catch (\Exception $e) {
            $this->response = [
                'code' => 500,
                'error' => $e->getMessage(),
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }
}
