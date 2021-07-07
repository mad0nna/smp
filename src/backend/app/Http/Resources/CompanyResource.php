<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserResource;
use App\Http\Resources\OpportunityResource;

class CompanyResource extends JsonResource
{
    public $preserveKeys = true;

    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'companyCode' => $this->company_code,
            'name' => $this->name,
            'contactNum' => $this->contact_num,
            'website' => $this->website,
            'industry' => $this->industry,
            'zenOrgName' => $this->zen_org_name,
            'billingStreet' => $this->billing_street,
            'billingCity' => $this->billing_city,
            'billingState' => $this->billing_state,
            'billingPostalCode' => $this->billing_postal_code,
            'billingCountry' => $this->billing_country,
            'customerClassification' => $this->customer_classification,            
            'status' => $this->status,
            'accountId' => $this->account_id,
            'negotiateCode' => isset($this->opportunities[0]) ? $this->opportunities[0]['negotiate_code'] : '',            
            'opportunityCode' => isset($this->opportunities[0]) ? $this->opportunities[0]['opportunity_code'] : '',
            'recordTypeCode' => strlen($this->sf_records) > 2 ? json_decode($this->sf_records)->field35__c : '',
            'type' => isset($this->opportunities[0]) ? $this->opportunities[0]['type'] : '',
            'industrySub' => $this->industry_sub,
            'industrySub2' => $this->industry_sub2,
            'kotTransType' => $this->kot_trans_type,
            'paymentMethod' => $this->payment_method,
            'createdAt' => $this->created_at->format('d/m/Y'),
            'updatedAt' => $this->updated_at->format('d/m/Y'),
            'admin' => UserResource::collection($this->users),
            'opportunity' => OpportunityResource::collection($this->opportunities),
            'sfRecords' => json_decode($this->sf_records),
        ];
    }

    public function filterFromDbToFront($data)
    {
        return [
            'id' => $data['id'],
            'companyCode' => $data['company_code'],
            'name' => $data['name'],
            'contactNum' => $data['contact_num'] ?? "",
            'website' => $data['website'],
            'industry' => $data['industry'] ?? "",
            'zenOrgName' => $data['zen_org_name'] ?? "",
            'billingStreet' => $data['billing_street'],
            'billingCity' => $data['billing_city'],
            'billingState' => $data['billing_state'],
            'billingPostalCode' => $data['billing_postal_code'],
            'billingCountry' => $data['billing_country'],
            'customerClassification' => $data['customer_classification'] ?? "",            
            'status' => $data['status'] ?? "",   
            'accountId' => $data['account_id'] ?? "",
            'industrySub' => $data['industry_sub'] ?? "",   
            'industrySub2' => $data['industry_sub2'] ?? "",   
            'kotTransType' => $data['kot_trans_type'] ?? "",   
            'paymentMethod' => $data['payment_method'] ?? "", 
            'sfRecords' => $data['sf_records'] ?? [],
            'recordTypeCode' => $data['record_type_code'],
        ];
    }

    public function filterFromSFToFront($data, $company_code = "")
    {
        return [
            'id' => "",
            'companyCode' => $company_code,
            'name' => $data['Name'],
            'contactNum' => $data['Phone'],
            'website' => $data['Website'],
            'industry' => $data['Industry'],
            'zenOrgName' => $data['Zendeskaccount__c'],
            'customerClassification' => $data['KoT_fps__c'],            
            'billingStreet' => $data['BillingStreet'],
            'billingCity' => $data['BillingCity'],
            'billingState' => $data['BillingState'],
            'billingPostalCode' => $data['BillingPostalCode'],            
            'billingCountry' => $data['BillingCountry'],
            'billingAddress' => $data['BillingStreet'].' '.$data['BillingCity'].' '.$data['BillingState'].' '.$data['BillingPostalCode'].' '.$data['BillingCountry'],
            'negotiateCode' => $data['ID__c'],
            'recordTypeCode' => $data['Field35__c'],
            'type' => $data['KoT_fps__c'],
            'industrySub' => $data['Field19__c'],
            'industrySub2' => $data['Field20__c'],
            'kotTransType' => $data['KOT_shubetsu__c'],
            'paymentMethod' => $data['PaymentMethod__c'],
            'accountId' => $data['opportunity']['AccountId'] ? $data['opportunity']['AccountId'] : '',
            'opportunityCode' => $data['opportunity']['ID__c'] ? $data['opportunity']['ID__c'] : '',
            'admin' => [[
                'contactId' => isset($data['contact']['Id']) ? $data['contact']['Id'] : '',
                'email' => isset($data['contact']['Email']) ? $data['contact']['Email'] : '',
                'firstName' => isset($data['contact']['FirstName']) ? $data['contact']['FirstName'] : '',
                'lastName' => isset($data['contact']['LastName']) ? $data['contact']['LastName'] : '',
                'contactNum' => isset($data['contact']['MobilePhone']) ? $data['contact']['MobilePhone'] : '',
                ]],
            'sfRecords' => $this->convertToLowerCase($data)
        ];
    }

    private function convertToLowerCase($data) {
        $items = [];
        foreach ($data as $col => $val) {
            
            if ($col == 'opportunity' && is_array($val)) { //to case items in opportunity   
                foreach ($val as $c => $v) {                    
                    $items['opportunity'][strtolower($c)] = $v;
                }
            } else if ($col == 'contact' && is_array($val)) {  //to case items in contact
                foreach ($val as $c => $v) {                
                    $items['contact'][strtolower($c)] = $v;
                }
            } else {
                $items[strtolower($col)] = $val;
            }
        }

        if (isset($items['opportunity']['attributes'])) {
            unset($items['opportunity']['attributes']);
        }
        if (isset($items['contact']['attributes'])) {
            unset($items['contact']['attributes']);
        }

        return $items;
    }

}
