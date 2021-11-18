<?php
namespace App\Services;

use App\Models\Company;
use App\Models\Opportunity;
use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Opportunity as ModelOpportunity;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class PaymentService {
    
    private $success = 'OK';
    private $cardBrand = [
        'V' => 'VISA',
        'M' => 'MasterCard',
        'J' => 'JCB',
        'A' => 'AMEX',
        'D' => 'Diners',
        'P' => 'Proper Card'
    ];
    private $method = [
        'credit_card' => 'クレジット',
        'bank_transfer' => '口座振替'
    ];
    public function setCreditCardMethod($cardInfo) {
        if ($cardInfo['result'] != $this->success) {
            return;
        }
        $salesforceCompanyID = $cardInfo['sendpoint'];
        $exp = $cardInfo['yuko'];
        $data = [
            'payment_method' => $this->method['credit_card'],
            'card_brand' => $this->cardBrand[$cardInfo['cardbrand']],
            'last_four_digit' => $cardInfo['cardnumber'],
            'expmm' => $exp[0] . $exp[1],
            'expyr' => $exp[2] . $exp[3]
        ];
        $companyInfo = Company::where('account_id', $salesforceCompanyID)->get();
        Log::info('payment test', ['test' => $companyInfo->id]);
        // $result = Opportunity::where('company_id', $companyID)->get()->toArray();
        // if ($result) {
        //     $opportunity = Opportunity::where('company_id', $companyID)->get()->toArray();
        //     Cache::forget($salesforceCompanyID.":company:details");
        //     return $this->changePaymentMethodInSF($this->method['credit_card'], $opportunity[0]['opportunity_code']);
        // }
        // return ['status' => false];
    }

    public function setBankTransferMethod($salesforceCompanyID, $companyID) {
        $data = [
            'payment_method' => $this->method['bank_transfer'],
            'card_brand' => '',
            'last_four_digit' => '',
            'expmm' => '',
            'expyr' => ''
        ];
        $result = Opportunity::where('company_id', $companyID)->update($data);
        if ($result) {
            $opportunity = Opportunity::where('company_id', $companyID)->get()->toArray();
            Cache::forget($salesforceCompanyID.":company:details");
            return $this->changePaymentMethodInSF($this->method['bank_transfer'], $opportunity[0]['opportunity_code']);
        }
        return ['status' => true];
    }

    private function changePaymentMethodInSF($method, $salesforceOpportunityID) {
        $opportunity = new ModelOpportunity();
        if ($opportunity->update($salesforceOpportunityID, ['KoT_shiharaihouhou__c' => $method])) {
            return ['status' => true];
        }
        return ['status' => false];
    }

    public function getPaymentMethodDetails($salesforceCompanyID) {
        $dbRepository = new DatabaseRepository();
        return $dbRepository->getPaymentMethod($salesforceCompanyID);
    }
}
?>