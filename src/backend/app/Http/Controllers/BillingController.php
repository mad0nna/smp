<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Services\BillingService;
use App\Services\Utilities\MessageResult;

class BillingController extends Controller
{
    public function index(Request $request, BillingService $billingService) {
        return $billingService->getBilling(Session::get('salesforceCompanyID'));
    }

    public function getInvoicePDF(Request $request, BillingService $billingService) {
        $invoice = $request->header("invoiceFileId");
        if (empty($invoice)) {
            return MessageResult::error('Invoice cannot be downloaded!');
        }
        $pdfRawData = $billingService->getInvoicePDF($invoice);
        $fileName = 'INVOICE - ' . str_replace('/v1/files/', '', $invoice) . '.pdf';
        if(!is_dir('temp')){
            mkdir('temp', 0755);
        }
        $myfile = fopen('temp/'.$fileName, "w") or die("Unable to open file!");
        fwrite($myfile, $pdfRawData);
        fclose($myfile);
        return $fileName;
    }
    
    public function getAccountUsageData(Request $request, BillingService $billingService) {
        return $billingService->getAccountUsageData(Session::get('salesforceCompanyID'));
    }
}
