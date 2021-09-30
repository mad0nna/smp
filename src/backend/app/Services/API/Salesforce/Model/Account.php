<?php
namespace App\Services\API\Salesforce\Model;

use App\Services\API\Salesforce\Model\Model;

class Account extends Model
{
    public function findByID($accountId) {
        $companyInformation = $this->client->get('/services/data/v34.0/sobjects/account/' . $accountId . '?fields=Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c,
        field41__c, kot_sales_phase__c, ServerName__c, HT_NEWCD__c, Field35__c, KoT_fps__c, Field19__c, Field20__c, KotCompanyCode__c, KOT_shubetsu__c, DP_ID__c, No__c, ID__c, PaymentMethod__c, LastModifiedDate, NumberOfEmployees, RecordTypeId');
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            return $companyInformation;
        }
        return $companyInformation;
    }

    public function findByCompanyCode($companyCode) {
        $companyInformation = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, Id, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c,
        Field41__c, kot_sales_phase__c, ServerName__c, HT_NEWCD__c, Field35__c, KoT_fps__c, Field19__c, Field20__c, KotCompanyCode__c, KOT_shubetsu__c, DP_ID__c, No__c, ID__c, PaymentMethod__c, LastModifiedDate, NumberOfEmployees, RecordTypeId+from+Account+WHERE+KotCompanyCode__c='" . $companyCode . "'+LIMIT+200");
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            return $companyInformation;
        }
        unset($companyInformation['records'][0]['attributes']);
        return $companyInformation['records'][0];
    }

    public function update($companyData, $accountId) {
        return $this->client->patch("/services/data/v34.0/sobjects/Account/{$accountId}", $companyData);
    }

    

}
?>