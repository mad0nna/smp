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

    public function getCompanyDetailsByID($sfCompanyID) {
        try {
            $oResponse = $this->oClient->get(
                env('SF_HOST').'/services/data/v34.0/sobjects/account/'.$sfCompanyID. '?fields=Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c',
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    'synchronous' => true
                ]
            );
            $oBody = $oResponse->getBody();
            return $oBody->getContents();
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
                env('SF_HOST')."/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, CreatedDate+from+Contact+WHERE+AccountId='" . $sfCompanyID . "'+And+admin__c=true+Order+By+CreatedDate+ASC+LIMIT+1",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    'synchronous' => true
                ]
            );
            $oBody = $oResponse->getBody();
            return $oBody->getContents();
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

    public function updateCompanyDetails($newValues, $companyID) {
        try{
            $oResponse = $this->oClient->patch(
                env('SF_HOST')."/services/data/v34.0/sobjects/Account/{$companyID}",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    "json" => [
                        "Name" => $newValues["companyName"],
                        "Phone" => $newValues["contactNumber"],
                        "Website" => $newValues["website"],
                        "Industry" => $newValues["industry"],
                        "BillingPostalCode" =>  $newValues["postalCode"],
                        "BillingStreet" => $newValues["street"],
                        "BillingCity" => $newValues["city"],
                        "BillingState" => $newValues["state"],
                        "BillingCountry" => $newValues["country"]
                    ]
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
                return $this->updateCompanyDetails($newValues, $companyID);
            } else {
                return MessageResult::error("Error while updating company details in Salesforce.");
            }
        }
    }

    public function updateAdminDetails($newValues, $accountID) {
        try{
            $oResponse = $this->oClient->patch(
                env('SF_HOST')."/services/data/v34.0/sobjects/contact/{$accountID}",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    ),
                    "json" => [
                            "FirstName" => $newValues["FirstName"],
                            "LastName" => $newValues["LastName"],
                            "MobilePhone" => $newValues["MobilePhone"],
                            "Email" => $newValues["Email"],
                        ]
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }
            return MessageResult::error("Error while updating admin details in Salesforce.");
        } catch(ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->updateAdminDetails($newValues, $accountID);
            } else {
                return MessageResult::error("Error while updating admin details in Salesforce.");
            }
        }
    }

    public function getLatestKOTOpportunityDetails($accountID) {
        try{
            $oResponse = $this->oClient->get(
                env('SF_HOST')."/services/data/v34.0/query/?q=SELECT+Name, ID__c, Type, Amount, StageName, Zen__c, Id, RecordTypeId, CreatedDate+from+Opportunity+WHERE+AccountId='".$accountID."'+And+RecordTypeId='01210000000QSBPAA4'+Order+By+CreatedDate+DESC+LIMIT+1",
                [
                    'headers' => array(
                        'Content-Type' => 'application/json',
                        'Authorization'=> 'Bearer ' . $this->tokens["access_token"]
                    )
                ]
            );
            
            $oBody = $oResponse->getBody();
            return $oBody->getContents();
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