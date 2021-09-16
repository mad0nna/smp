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

        $list = [];

        foreach ($invoices as $key => $invoiceItem) {

            if (strtolower($invoiceItem['status']) === "posted") {
                $bill_data = $invoices[$key]['invoiceDate'];
                $file = $company->files()->where('month_of_billing', $invoiceItem['invoiceDate'])->first();

                $invoices[$key]['billingCSVFileId'] = $file === null ? null : $file->id;
                $invoices[$key]['billingCSVFileName'] = $file === null ? null : $file->name;
                $invoices[$key]['dueDate'] = Carbon::createFromFormat('Y-m-d', $invoiceItem['dueDate'])->format('Y年m月d日');
                $invoices[$key]['invoiceDate'] = (new DateManager)->toJP($invoiceItem['invoiceDate']);
                $invoices[$key]['amount'] = number_format($invoiceItem['amount']);
                $invoices[$key]['paymentDate'] = '未払い';
                $invoices[$key]['invoicePDF'] = env('ZUORA_HOST') . $invoiceItem['body'];

                //$invoice = $this->getInvoiceDetails($invoiceItem['id']);
                //$invoices[$key]['subscriptionName'] = $invoice['subscriptionName'];
                //$invoices[$key]['quantity'] = $invoice['quantity'];

                array_push($list, $invoices[$key]);
            }
        }
        return $list;
    }

    public function getLatestInvoiceDetails($accountID)
    {
        $invoices = $this->getInvoices($accountID);
        
        if (count($invoices)) {
            return $this->getInvoiceDetails($invoices[0]['id']);
        }

        return false;        
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

    private function getInvoiceDetails($invoiceId)
    {
        $invoice = (new Invoice)->getInvoiceDetails($invoiceId);
        if (!$invoice['success']) {
            return false;
        }

        foreach ($invoice['invoiceItems'] as $item) {
            if ($item['productName'] === "KING OF TIME") {
                return $item;
            }
        }

        return false;
    }

    public function getAccountUsageData($companyID)
    {
        $accountInfo = $this->getAccountInfo($companyID);
        
        if (!$accountInfo) {
            MessageResult::error("The company id doesn't exist!");
        }

        $accountID = $accountInfo['id'];
        $usage = null;
        $data_usage = [];
        $i = 0;

        do {

            $usage = $this->getUsage($accountID, $i);

            if (count($usage)) {
                $data_usage = array_merge($data_usage, $usage['usage']);         
            }
            $i++;
        } while ($usage === false || (count($usage) && isset($usage['nextPage']) !== false));

        return $data_usage;
    }

    private function getUsage($accountID, $page) {
        $usage = (new Usage)->findByAccountId($accountID, $page);

        if (!$usage['success']) {
            return false;
        }

        return $usage;
    }
}
