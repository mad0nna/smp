<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

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
            'recordTypeCode' => isset($this->record_type_code) ? $this->record_type_code : '',
            'type' => isset($this->opportunities[0]) ? $this->opportunities[0]['type'] : '',
            'industrySub' => $this->industry_sub,
            'industrySub2' => $this->industry_sub2,
            'kotTransType' => $this->kot_trans_type,
            'paymentMethod' => $this->payment_method,
            'createdAt' => $this->created_at->format('d/m/Y'),
            'updatedAt' => $this->updated_at->format('d/m/Y'),
            'admin' => UserResource::collection($this->users),
            'opportunity' => OpportunityResource::collection($this->opportunities)
        ];
    }

    public function filterFromDbToFront($data)
    {
        return [
            'id' => $data['id'],
            'companyCode' => $data['company_code'],
            'name' => $data['name'],
            'contactNum' => $data['contact_num'] ?? '',
            'website' => $data['website'],
            'industry' => $data['industry'] ?? '',
            'zenOrgName' => $data['zen_org_name'] ?? '',
            'billingStreet' => $data['billing_street'],
            'billingCity' => $data['billing_city'],
            'billingState' => $data['billing_state'],
            'billingPostalCode' => $data['billing_postal_code'],
            'billingCountry' => $data['billing_country'],
            'customerClassification' => $data['customer_classification'] ?? '',
            'status' => $data['status'] ?? '',
            'accountId' => $data['account_id'] ?? '',
            'industrySub' => $data['industry_sub'] ?? '',
            'industrySub2' => $data['industry_sub2'] ?? '',
            'kotTransType' => $data['kot_trans_type'] ?? '',
            'paymentMethod' => $data['payment_method'] ?? '',
            'sfRecords' => $data['sf_records'] ?? [],
            'recordTypeCode' => $data['record_type_code'] ?? '',
            'token' => $data['token'] ?? '',
            'kotBillingStartDate' => $data['kot_billing_start_date'] ?? '',
        ];
    }

    public static function filterFromSFToFront($data, $company_code = '')
    {
        return [
            'id' => $data['Id'] ?? '',
            'companyID' => $data['Id'] ?? '',
            'contactID' => $data['contact']['Id'] ?? '',
            'kot_billing_start_date' => $data['Field41__c'] ?? '',
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
            'billingAddress' => $data['BillingStreet'] . ' ' . $data['BillingCity'] . ' ' . $data['BillingState'] . ' ' . $data['BillingPostalCode'] . ' ' . $data['BillingCountry'],
            'negotiateCode' => $data['ID__c'],
            'recordTypeCode' => $data['Field35__c'],
            'type' => $data['KoT_fps__c'],
            'industrySub' => $data['Field19__c'],
            'industrySub2' => $data['Field20__c'],
            'kotTransType' => $data['KOT_shubetsu__c'],
            'paymentMethod' => $data['PaymentMethod__c'],
            'accountId' => $data['Id'],
            'admin' => [[
                'contactId' => $data['contact']['Id'] ?? '',
                'email' => $data['contact']['Email'] ?? '',
                'firstName' => $data['contact']['FirstName'] ?? '',
                'lastName' => $data['contact']['LastName'] ?? '',
                'contactNum' => $data['contact']['MobilePhone'] ?? '',
                ]],
            'opportunity' => $data['opportunity']
        ];
    }

    private static function convertToLowerCase($data)
    {
        $items = [];
        foreach ($data as $col => $val) {
            if ($col == 'opportunity' && is_array($val)) { //to case items in opportunity
                foreach ($val as $c => $v) {
                    $items['opportunity'][strtolower($c)] = $v;
                }
            } elseif ($col == 'contact' && is_array($val)) {  //to case items in contact
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


    public static function parseSfCompanyColumnToDbColumn($data)
    {
        return [
        'account_id' => $data['Id'],
        'name' => $data['Name'],
        'contact_num' => $data['Phone'],
        'website' => $data['Website'],
        'industry' => $data['Industry'],
        'industry_sub' => $data['Field19__c'],
        'industry_sub2' => $data['Field20__c'],
        'zen_org_name' => $data['Zendeskaccount__c'],
        'billing_street' => $data['BillingStreet'],
        'billing_city' => $data['BillingCity'],
        'billing_state' => $data['BillingState'],
        'billing_postal_code' => $data['BillingPostalCode'],
        'billing_country' => $data['BillingCountry'],
        'payment_method' => $data['PaymentMethod__c'],
        'kot_trans_type' => $data['KOT_shubetsu__c'],
        'industry_sub' => $data['Field19__c'],
        'industry_sub2' => $data['Field20__c'],
        'record_type_code' => $data['Field35__c'],
      ];
    }
}
