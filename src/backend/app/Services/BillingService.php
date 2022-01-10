<?php

namespace App\Services;

use App\Models\Company;
use App\Services\API\Salesforce\Model\Account as ModelAccount;
use App\Services\Utilities\DateManager;
use App\Services\Utilities\MessageResult;
use Illuminate\Support\Facades\Cache;
use App\Services\API\Zuora\Model\Account;
use App\Services\API\Zuora\Model\Invoice;
use App\Services\API\Zuora\Model\Usage;
use App\Services\API\Salesforce\Model\Report;
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
                $file = $company->files()->where('month_of_billing', $invoiceItem['invoiceDate'])->first();

                $invoices[$key]['billingCSVFileId'] = $file === null ? null : $file->id;
                $invoices[$key]['billingCSVFileName'] = $file === null ? null : $file->name;
                $invoices[$key]['dueDate'] = Carbon::createFromFormat('Y-m-d', $invoiceItem['dueDate'])->format('Y年m月d日');
                $invoices[$key]['invoiceDate'] = (new DateManager)->toJP($invoiceItem['invoiceDate']);
                $invoices[$key]['amount'] = number_format($invoiceItem['amount']);
                $invoices[$key]['paymentDate'] = '未払い';
                $invoices[$key]['invoicePDF'] = env('ZUORA_HOST') . $invoiceItem['body'];
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
        Cache::forget("{$companyID}:zuora:accountDetails");
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

    /**
     * Function that gets Unpaid Billing Information
     * of logged in user's company from salesforce report
     *
     * @param string $companyName
     * @param string $salesforceCompanyID Company account_id
     * @return array $data
     */
    public function getUnpaidBillingInformation(string $companyName, string $salesforceCompanyID)
    {
        $data = [];
        $results = (new Report)->getUnpaidBillingInformation($companyName);

        // current unpaid billing information
        $data['due_billed_amount'] = '';
        $data['due_billed_deadline_date'] = '';
        $data['due_billed_payment_period'] = '';
        // last month unpaid billing information
        $data['due_last_billed_amount'] = '';
        $data['due_last_billed_deadline_date'] = '';
        $data['due_last_billed_payment_period'] = '';
        $data['total_billed_amount'] = '';

        foreach($results['factMap'] as $factMaps) {
            foreach($factMaps['rows'] as $row) {
                if ($row['dataCells'] && $row['dataCells'][6]['value'] === $salesforceCompanyID) {
                    // current billed information
                    $data['due_billed_amount'] = $row['dataCells'][10]['label'];
                    $data['due_billed_deadline_date'] = Carbon::createFromDate($row['dataCells'][0]['value'])->format('Y年m月d日');
                    $data['due_billed_payment_period'] = Carbon::createFromDate($results['groupingsDown']['groupings'][0]['value'])->format('Y年m月d日');

                    // last month billed payment information if it exists
                    if ($row['dataCells'][11]['value'] != null) {
                        $data['due_last_billed_amount'] = $row['dataCells'][11]['label'];
                        $data['due_last_billed_deadline_date'] = Carbon::createFromDate($row['dataCells'][0]['value'])->subMonth()->format('Y年m月d日');
                        $data['due_last_billed_payment_period'] = Carbon::createFromDate($results['groupingsDown']['groupings'][0]['value'])->format('Y年m月d日');
                    }

                    $data['total_billed_amount'] = number_format($row['dataCells'][12]['value']['amount']);

                    // breaks out of the double forloop once found a match
                    break 2;
                }
            }
        }

        return $data;
    }
}
