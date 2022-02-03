<?php
namespace App\Services;

use App\Models\Company;
use App\Models\Opportunity;
use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Opportunity as ModelOpportunity;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
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
        $companyInfo = Company::where('account_id', $salesforceCompanyID)->get()->toArray();
        $result = Opportunity::where('company_id', $companyInfo[0]['id'])->update($data);
        if ($result) {
            $opportunity = Opportunity::where('company_id', $companyInfo[0]['id'])->get()->toArray();
            Cache::forget($salesforceCompanyID.":company:details");
            if ((new ModelOpportunity)->update($opportunity[0]['opportunity_code'], ['KoT_shiharaihouhou__c' => $this->method['credit_card']])) {
                return ['status' => true];
            }
        return ['status' => false];
        }
    }

    public function setBankTransferMethod($salesforceCompanyID, $companyID) {
        $data = [
            'payment_method' => $this->method['bank_transfer'],
            'card_brand' => '',
            'last_four_digit' => '',
            'expmm' => '',
            'expyr' => ''
        ];
        $companyInfo = Company::where('account_id', $salesforceCompanyID)->get()->toArray();
        $result = Opportunity::where('company_id', $companyID)->update($data);
        if ($result) {
            $opportunity = Opportunity::where('company_id', $companyID)->get()->toArray();
            Cache::forget($salesforceCompanyID.":company:details");
            if ((new ModelOpportunity)->update($opportunity[0]['opportunity_code'], ['KoT_shiharaihouhou__c' => $this->method['bank_transfer']])) {
                return ['status' => true];
            }
        }
        return ['status' => false];
        }

    public function getPaymentMethodDetails($salesforceCompanyID) {
        $dbRepository = new DatabaseRepository();
        return $dbRepository->getPaymentMethod($salesforceCompanyID);
    }

    /**
     * Directly update order status via Query Builder
     * After pay through credit card
     */
    public function updateOrderStatus($params) 
    {
        $sendID = $params['sendId'];
        $orderBaseId = explode('-',$sendID)[0];


        DB::beginTransaction();
        try {
            DB::table('mshop_order_base_product')
                ->where('baseid', $orderBaseId)
                ->update([
                    'statuspayment'=> 6,
                    'status'=> 4,
                    'ctime' => Carbon::now()
                ]);

            // update modified time
            DB::table('mshop_order_base')
                ->where('id', $orderBaseId)
                ->update([
                    'mtime' => Carbon::now()
                ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => $e->getMessage()
            ]);
        }

        DB::commit();

        return response()->json([
            'status' => true,
        ]);

    }

}
?>