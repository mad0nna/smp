<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Services\BillingService;
use App\Services\Utilities\MessageResult;

class BillingController extends Controller
{
    public function index(BillingService $billingService) {
        return $billingService->getBilling(Session::get('salesforceCompanyID'));
    }

    public function getInvoicePDF(Request $request, BillingService $billingService) {
        $invoiceFileId = $request->header("invoiceFileId");
        $invoiceNumber = $request->header("invoiceNumber");
        $accountNumber = $request->header("accountNumber");
        if (empty($invoiceFileId) && empty($invoiceNumber) && empty($accountNumber)) {
            return MessageResult::error('Invoice cannot be downloaded!');
        }
        $pdfRawData = $billingService->getInvoicePDF($invoiceFileId);
        $fileName = $invoiceNumber.'_'.$accountNumber.".pdf";
        if(!is_dir('temp')){
            mkdir('temp', 0755);
        }
        $myfile = fopen('temp/'.$fileName, "w") or die("Unable to open file!");
        fwrite($myfile, $pdfRawData);
        fclose($myfile);
        return $fileName;
    }
    
    public function getAccountUsageData(BillingService $billingService) {
        return $billingService->getAccountUsageData(Session::get('salesforceCompanyID'));
    }

    public static function getAccountUsage($company_account_id) {
        $billingService = new BillingService;
        return $billingService->getAccountUsageData($company_account_id);
    }

}
