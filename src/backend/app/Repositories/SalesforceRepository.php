<?php
namespace App\Repositories;

use App\Services\API\Salesforce\AccessToken;
use App\Services\Utilities\MessageResult;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class SalesforceRepository {

    public function __construct()
    {
        $this->tokens = (new AccessToken())->getToken();
        $this->oClient = new Client();
    }

    public function getCompanyDetailsByCompanyID($sfCompanyID) {
        try {    
            $oResponse = $this->oClient->get(     
                env('SALESFORCE_HOST').'/services/data/v34.0/sobjects/account/'.$sfCompanyID. '?fields=Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c',          
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    'synchronous' => true
                ]
            );
            $oBody = $oResponse->getBody();
            $companyInformation = json_decode($oBody->getContents(), true);
            if (isset($companyInformation["status"]) && !$companyInformation["status"]) {
                return $companyInformation;
            }
            return $companyInformation;
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->getCompanyDetailsByCompanyID($sfCompanyID);
            } else {
                return MessageResult::error("Error while requesting company details from Salesforce.");
            }
        }
    }

    public function getCompanyDetailsByID($sfCompanyID) {
        try {
            $oResponse = $this->oClient->get(               
                env('SALESFORCE_HOST')."/services/data/v34.0/query/?q=SELECT+Name, Id, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c,
                HT_NEWCD__c, Field35__c, KoT_fps__c, Field19__c, Field20__c, KotCompanyCode__c, KOT_shubetsu__c, DP_ID__c, No__c, ID__c, PaymentMethod__c, LastModifiedDate, NumberOfEmployees, RecordTypeId+from+Account+WHERE+KotCompanyCode__c='".$sfCompanyID."'+LIMIT+200",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    'synchronous' => true
                ]
            );
            $oBody = $oResponse->getBody();
            $companyInformation = json_decode($oBody->getContents(), true);
            if (isset($companyInformation["status"]) && !$companyInformation["status"]) {
                return $companyInformation;
            }
            unset($companyInformation["records"][0]["attributes"]);
            return reset($companyInformation["records"]);
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->getCompanyDetailsByID($sfCompanyID);
            } else {
                return MessageResult::error("Error while requesting company details from Salesforce.");
            }
        }
    }

    public function getCompanyAdminDetails($sfCompanyID) {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST')."/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, CreatedDate+from+Contact+WHERE+AccountId='" . $sfCompanyID . "'+And+admin__c=true+Order+By+CreatedDate+ASC+LIMIT+1",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    'synchronous' => true
                ]
            );
            $oBody = $oResponse->getBody();
            $adminDetails = json_decode($oBody->getContents(), true);
            if (isset($adminDetails["status"]) && !$adminDetails["status"]) {
                return $adminDetails;
            }
            return reset($adminDetails["records"]);
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->getCompanyAdminDetails($sfCompanyID);
            } else {
                return MessageResult::error("Error while requesting company admin details from Salesforce.");
            }
        }
    }

    /**
     * Getting Company Admin Details by email
     * @param $email string
     * @return $companyDetails string
     */
    public function getCompanyAdminDetailsbyEmail($email) {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST')."/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Email='" . $email . "'+Order+By+CreatedDate+ASC+LIMIT+1",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    'synchronous' => true
                ]
            );
            $oBody = $oResponse->getBody();
            $adminDetails = json_decode($oBody->getContents(), true);          
            if (isset($adminDetails["status"]) && !$adminDetails["status"]) {
                return $adminDetails;
            }
            return reset($adminDetails["records"]);
            
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->getCompanyAdminDetails($email);
            } else {
                return MessageResult::error("Error while requesting company admin details from Salesforce.");
            }
        }
    }

    public function updateCompanyDetails($newValues, $companyID,$sf_column_format = true) {
        try{
            $data = [];

            if ($sf_column_format) {
                $data = [
                    "Name" => $newValues["companyName"],
                    "Phone" => $newValues["contactNumber"],
                    "Website" => $newValues["website"],
                    "Industry" => $newValues["industry"],
                    "BillingPostalCode" =>  $newValues["postalCode"],
                    "BillingStreet" => $newValues["street"],
                    "BillingCity" => $newValues["city"],
                    "BillingState" => $newValues["state"],
                    "BillingCountry" => $newValues["country"]
                ];
            } else {
                $data = [
                    "Name" => $newValues["name"],
                    "Zendeskaccount__c" => $newValues["zen_org_name"],                    
                ];
            }

            $oResponse = $this->oClient->patch(
                env('SALESFORCE_HOST')."/services/data/v34.0/sobjects/Account/{$companyID}",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    "json" => $data
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }
            return MessageResult::error("Error while updating company details in Salesforce.");
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->updateCompanyDetails($newValues, $companyID, $sf_column_format);
            } else {
                return MessageResult::error("Error while updating company details in Salesforce.");
            }
        }
    }

    public function updateAdminDetails($newValues, $accountID, $sf_column_format = true, $is_update = true) {
        try{
            $data = [];
            if ($sf_column_format) {
                $data = [
                    "FirstName" => $newValues["FirstName"],
                    "LastName" => $newValues["LastName"],
                    "first_kana__c" => $newValues["FirstName"] !== "" ? $newValues["FirstName"] : "-",
                    "last_kana__c" => $newValues["LastName"] !== "" ? $newValues["LastName"] : "-",
                    "MobilePhone" => $newValues["MobilePhone"],
                    "Email" => $newValues["Email"],
                    "Title" => $newValues["Title"],
                    "admin__c" => $newValues["admin__c"] === "3" ? true : false,
                ];
            } else {
                $data = [                    
                    "AccountId" => ($newValues["account_id"] !== "" && $newValues["account_id"] !== null) ? $newValues["account_id"] :  $accountID,
                    "FirstName" => $newValues["first_name"] !== "" ? $newValues["first_name"] : "-",
                    "LastName" => $newValues["last_name"] !== "" ? $newValues["last_name"] : "-",  
                    "first_kana__c" => $newValues["first_name"] !== "" ? $newValues["first_name"] : "-",
                    "last_kana__c" => $newValues["last_name"] !== "" ? $newValues["last_name"] : "-",                     
                    "MobilePhone" => ($newValues["contact_num"] !== ""  && $newValues["contact_num"] !== null) ? $newValues["contact_num"] : "",
                    "Email" => $newValues["email"] !== "" ? $newValues["email"] : "",
                    "admin__c" => $newValues["user_type_id"] === "3" ? true : false,
                ];
            }

            if ($is_update) {
                $oResponse = $this->oClient->patch(
                    env('SALESFORCE_HOST')."/services/data/v34.0/sobjects/contact/{$accountID}",
                    [
                        'headers' => array(
                            'Content-Type' => 'application/json',
                            'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                        ),
                        "json" => $data
                    ]
                );  
            } else {
                $oResponse = $this->oClient->post(
                    env('SALESFORCE_HOST')."/services/data/v34.0/sobjects/contact",
                    [
                        'headers' => array(
                            'Content-Type' => 'application/json',
                            'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                        ),
                        "json" => $data
                    ]
                );
            }
            
            if ($oResponse->getStatusCode() == 204 || $oResponse->getStatusCode() == 201) {
                return MessageResult::success();
            }
            return MessageResult::error("Error while updating admin details in Salesforce.");
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->updateAdminDetails($newValues, $accountID, $sf_column_format, $is_update);
            } else {
                return MessageResult::error("Error while updating admin details in Salesforce.");
            }
        }
    }

    public function deleteAdmin($accountID) {
        try{
            $oResponse = $this->oClient->delete(
                env('SALESFORCE_HOST')."/services/data/v34.0/sobjects/contact/{$accountID}",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    // "json" => $data
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }
            return MessageResult::error("Error deleting admin in Salesforce.");
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->deleteAdmin($accountID);
            } else {
                return MessageResult::error("Error deleting admin in Salesforce.");
            }
        }
    }
    
    public function updateOpportunityDetails($newValues, $accountID, $sf_column_format = true) {
        try{
            $data = [];
            if ($sf_column_format) {
                $data = [
                    "Name" => $newValues["zenOrgName"],
                    "StageName" => $newValues["accountType"],
                    "RecordTypeId" => $newValues["zendeskAccountId"],
                ];
            } else {
                $data = [
                    "Name" => $newValues["zen_org_name"] ?? "",
                    "StageName" => $newValues["account_type"] ?? "",
                    "RecordTypeId" => $newValues["zendesk_account_id"] ?? "",
                ];
                $accountID = $newValues["zendesk_opportunity_id"];
            }

            $oResponse = $this->oClient->patch(
                env('SALESFORCE_HOST')."/services/data/v34.0/sobjects/Opportunity/{$accountID}",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    "json" => $data
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }
            return MessageResult::error("Error while updating opportunity details in Salesforce.");
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->updateOpportunityDetails($newValues, $accountID, $sf_column_format);
            } else {
                return MessageResult::error("Error while updating opportunity details in Salesforce.");
            }
        }
    }

    public function getLatestKOTOpportunityDetails($accountID) {
        try{
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST')."/services/data/v34.0/query/?q=SELECT+Name, ID__c, Type, Amount, StageName, Zen__c, Id, RecordTypeId, CreatedDate,AccountId+from+Opportunity+WHERE+AccountId='".$accountID."'+And+RecordTypeId='01210000000QSBPAA4'+Order+By+CreatedDate+DESC+LIMIT+1",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    )
                ]
            );
            
            $oBody = $oResponse->getBody();
            $opportunityDetail = json_decode($oBody->getContents(), true);
            if (isset($opportunityDetail["status"]) && !$opportunityDetail["status"]) {
                return $opportunityDetail;
            }
            return reset($opportunityDetail["records"]);
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->getLatestKOTOpportunityDetails($accountID);
            } else {
                return MessageResult::error("Error while getting latest KOT contract details in Salesforce.");
            }
        }
    }
}