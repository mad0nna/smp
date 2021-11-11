<?php
namespace App\Services;

use App\Models\Company;
use App\Services\API\Salesforce\Model\Account;
use Illuminate\Support\Facades\Cache;
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
        'credit_card' => '90：クレジット',
        'bank_transfer' => '1：振込'
    ];
    public function setCreditCardMethod($cardInfo) {
        if ($cardInfo['result'] != $this->success) {
            return;
        }
        $companyID = $cardInfo['sendpoint'];
        $exp = $cardInfo['yuko'];
        $data = [
            'payment_method' => $this->method['credit_card'],
            'card_brand' => $this->cardBrand[$cardInfo['cardbrand']],
            'last_four_digit' => $cardInfo['cardnumber'],
            'expmm' => $exp[0] . $exp[1],
            'expyr' => $exp[2] . $exp[3]
        ];
        $result = Company::where('account_id' , $companyID)->update($data);
        if ($result) {
            return $this->changePaymentMethodInSF('90：クレジット', $companyID);
        }
        return ['status' => false];
    }

    public function setBankTransferMethod($salesforceCompanyID) {
        $data = [
            'payment_method' => $this->method['bank_transfer'],
            'card_brand' => '',
            'last_four_digit' => '',
            'expmm' => '',
            'expyr' => ''
        ];
        $result = Company::where('account_id', $salesforceCompanyID)->update($data);
        if ($result) {
            Cache::forget($salesforceCompanyID.":company:details");
            return $this->changePaymentMethodInSF($this->method['bank_transfer'], $salesforceCompanyID);
        }
        return ['status' => true];
    }

    private function changePaymentMethodInSF($method, $salesforceCompanyID) {
        $company = new Account();
        if ($company->update(['PaymentMethod__c' => $method], $salesforceCompanyID)) {
            return ['status' => true];
        }
        return ['status' => false];
    }
}
?>