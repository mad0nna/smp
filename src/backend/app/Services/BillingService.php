<?php

namespace App\Services;

use App\Models\Company;
use App\Services\Utilities\DateManager;
use App\Services\Utilities\MessageResult;
use Illuminate\Support\Facades\Cache;
use App\Services\API\Zuora\Model\Account;
use App\Services\API\Zuora\Model\Invoice;
use App\Services\API\Zuora\Model\Usage;
use Illuminate\Support\Carbon;

class BillingService
{
    /**
     * BillingService constructor.
     */
    public function __construct()
    {
    }

    public function getBilling($companyID)
    {
        $accountInfo = $this->getAccountInfo($companyID);
        if (!$accountInfo) {
            MessageResult::error("The company id doesn't exist!");
        }

        $accountID = $accountInfo['id'];
        $invoices = $this->getInvoices($accountID);
        if (!$invoices) {
            MessageResult::error('There something wrong while getting invoices');
        }

        $company = Company::where('account_id', $companyID)->first();
        if (!($company instanceof Company)) {
            MessageResult::error("The company id doesn't exist!");
        }

        foreach ($invoices as $key => $invoiceItem) {
            $file = $company->files()->where('month_of_billing', $invoiceItem['invoiceDate'])->first();

            $invoices[$key]['billingCSVFileId'] = $file === null ? null : $file->id;
            $invoices[$key]['billingCSVFileName'] = $file === null ? null : $file->name;
            $invoices[$key]['dueDate'] = Carbon::createFromFormat('Y-m-d', $invoiceItem['dueDate'])->format('Y年m月d日');
            $invoices[$key]['invoiceDate'] = (new DateManager)->toJP($invoiceItem['invoiceDate']);
            $invoices[$key]['amount'] = number_format($invoiceItem['amount']);
            $invoices[$key]['paymentDate'] = '未払い';
            $invoices[$key]['invoicePDF'] = env('ZUORA_HOST') . $invoiceItem['body'];
        }

        return $invoices;
    }

    public function getAccountInfo($companyID)
    {
        $accountDetails = Cache::remember("{$companyID}:zuora:accountDetails", now()->addDay(1), function () use ($companyID) {
            $accountInfo = (new Account)->find($companyID);
            if (!$accountInfo['success']) {
                return false;
            }

            return $accountInfo['basicInfo'];
        });

        return $accountDetails;
    }

    public function getInvoicePDF($invoiceFile)
    {
        return (new Invoice)->downloadInvoice($invoiceFile);
    }

    private function getInvoices($accountID)
    {
        $invoiceList = Cache::remember("{$accountID}:zuora:invoices", now()->addHour(1), function () use ($accountID) {
            $invoices = (new Invoice)->findByAccountId($accountID);
            if (!$invoices['success']) {
                return false;
            }

            return $invoices['invoices'];
        });

        return $invoiceList;
    }

    public function getAccountUsageData($companyID)
    {
        $accountInfo = $this->getAccountInfo($companyID);
        if (!$accountInfo) {
            MessageResult::error("The company id doesn't exist!");
        }
        $accountID = $accountInfo['id'];
        $usage = (new Usage)->findByAccountId($accountID);
        if (!$usage['success']) {
            return false;
        }

        return $usage['usage'];
    }
}
