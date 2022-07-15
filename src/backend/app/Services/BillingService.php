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
                // PDF
                $invoices[$key]['dueDate'] = Carbon::createFromFormat('Y-m-d', $invoiceItem['dueDate'])->format('Y年m月d日');
                $invoices[$key]['invoiceDate'] = (new DateManager)->toJP($invoiceItem['invoiceDate']);
                $invoices[$key]['amount'] = number_format($invoiceItem['amount']);
                $invoices[$key]['paymentDate'] = '未払い';
                $invoices[$key]['invoicePDF'] = env('ZUORA_HOST') . $invoiceItem['body'];

                // CSV
                $csvFilePath = $company->files()->where('invoice_number', $invoiceItem['invoiceNumber'])->first();

                $invoices[$key]['billingCSVFilePathId'] = $csvFilePath === null ? null : $csvFilePath->id;
                $invoices[$key]['billingCSVFileName'] = $csvFilePath === null ? null : $invoiceItem['invoiceNumber'] . '-' . $company->account_id . '.zip';

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
        $unpaidBillingInformation = Cache::remember("{$salesforceCompanyID}:unpaidbBillingInformation", now()->addMinutes(5), function () use ($companyName, $salesforceCompanyID) {
            $data = [];
            $results = (new Report)->getUnpaidBillingInformation($companyName);

            foreach($results['factMap'] as $factMaps) {
                foreach($factMaps['rows'] as $row) {
                    if ($row['dataCells'] && $row['dataCells'][6]['value'] === $salesforceCompanyID) {

                        // current billed information
                        $data['due_billed_deadline_date'] = Carbon::createFromDate($row['dataCells'][0]['value'])->format('Y年m月d日');
                        $data['due_billed_payment_period'] = Carbon::createFromDate($results['groupingsDown']['groupings'][0]['value'])->format('Y年m月d日');
                        $data['total_billed_amount'] = number_format($row['dataCells'][12]['value']['amount']);

                        // breaks out of the double forloop once found a match
                        break 2;
                    }
                }
            }

            return $data;
        });

        return $unpaidBillingInformation;
    }
}
