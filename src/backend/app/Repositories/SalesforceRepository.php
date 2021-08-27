<?php
namespace App\Repositories;

use App\Services\API\Salesforce\AccessToken;
use App\Services\Utilities\MessageResult;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;

class SalesforceRepository
{
    public function __construct()
    {
        $this->tokens = (new AccessToken())->getToken();
        $this->oClient = new Client();
    }

    public function getCompanyDetailsByCompanyID($sfCompanyID)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . '/services/data/v34.0/sobjects/account/' . $sfCompanyID . '?fields=Name, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c,
                field41__c, kot_sales_phase__c, ServerName__c, HT_NEWCD__c, Field35__c, KoT_fps__c, Field19__c, Field20__c, KotCompanyCode__c, KOT_shubetsu__c, DP_ID__c, No__c, ID__c, PaymentMethod__c, LastModifiedDate, NumberOfEmployees, RecordTypeId',
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'synchronous' => true,
                ]
            );
            $oBody = $oResponse->getBody();
            $companyInformation = json_decode($oBody->getContents(), true);
            if (isset($companyInformation['status']) && !$companyInformation['status']) {
                return $companyInformation;
            }

            return $companyInformation;
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getCompanyDetailsByCompanyID($sfCompanyID);
            }

            return MessageResult::error('Error while requesting company details from Salesforce.');
        }
    }

    public function getCompanyDetailsByID($sfCompanyID)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Name, Id, BillingStreet, BillingCity, BillingState, BillingPostalCode, BillingCountry, Phone, Website, Industry, Zendeskaccount__c,
                Field41__c, kot_sales_phase__c, ServerName__c, HT_NEWCD__c, Field35__c, KoT_fps__c, Field19__c, Field20__c, KotCompanyCode__c, KOT_shubetsu__c, DP_ID__c, No__c, ID__c, PaymentMethod__c, LastModifiedDate, NumberOfEmployees, RecordTypeId+from+Account+WHERE+KotCompanyCode__c='" . $sfCompanyID . "'+LIMIT+200",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'synchronous' => true,
                ]
            );

            $oBody = $oResponse->getBody();
            $companyInformation = json_decode($oBody->getContents(), true);
            if (isset($companyInformation['status']) && !$companyInformation['status']) {
                return $companyInformation;
            }
            unset($companyInformation['records'][0]['attributes']);

            return reset($companyInformation['records']);
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getCompanyDetailsByID($sfCompanyID);
            }

            return MessageResult::error('Error while requesting company details from Salesforce.');
        }
    }

    public function getCompanyAdminDetails($sfCompanyID)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+AccountId='" . $sfCompanyID . "'+And+admin__c=true+Order+By+CreatedDate+ASC+LIMIT+1",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'synchronous' => true,
                ]
            );

            $oBody = $oResponse->getBody();
            $adminDetails = json_decode($oBody->getContents(), true);
            if (isset($adminDetails['status']) && !$adminDetails['status']) {
                return $adminDetails;
            }

            return reset($adminDetails['records']);
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getCompanyAdminDetails($sfCompanyID);
            }

            return MessageResult::error('Error while requesting company admin details from Salesforce.');
        }
    }

    public function getCompanyAdminById($contactID) {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Id='" . $contactID . "'+LIMIT+1",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'synchronous' => true,
                ]
            );

            $oBody = $oResponse->getBody();
            $adminDetails = json_decode($oBody->getContents(), true);
            if (isset($adminDetails['status']) && !$adminDetails['status']) {
                return $adminDetails;
            }

            return reset($adminDetails['records']);
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getCompanyAdminDetails($sfCompanyID);
            }

            return MessageResult::error('Error while requesting company admin details from Salesforce.');
        }
    }

    public function createContact($newValues)
    {
        try {
            $oResponse = $this->oClient->post(
                env('SALESFORCE_HOST') . '/services/data/v34.0/sobjects/contact',
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'json' => $newValues,
                ]
            );

            if ($oResponse->getStatusCode() == 204 || $oResponse->getStatusCode() == 201) {
                return true;
            }
            return false;
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();
                return $this->createContact($newValues);
            }
            return false;
        }
    }


    /**
     * Getting Company Admin Details by email
     * @param $email string
     * @return $companyDetails string
     */
    public function getCompanyAdminDetailsbyEmail($email)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Email='" . $email . "'+Order+By+CreatedDate+ASC+LIMIT+1",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'synchronous' => true,
                ]
            );
            $oBody = $oResponse->getBody();
            $adminDetails = json_decode($oBody->getContents(), true);
            if (isset($adminDetails['status']) && !$adminDetails['status']) {
                return $adminDetails;
            }

            return reset($adminDetails['records']);
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getCompanyAdminDetails($email);
            }

            return MessageResult::error('Error while requesting company admin details from Salesforce.');
        }
    }

    public function updateCompanyDetails($newValues, $companyID, $sf_column_format = true)
    {
        try {
            $data = [];

            if ($sf_column_format) {
                $data = [
                    'Name' => $newValues['companyName'],
                    'Phone' => $newValues['contactNumber'],
                    'Website' => $newValues['website'],
                    'Industry' => $newValues['industry'],
                    'BillingPostalCode' => $newValues['postalCode'],
                    'BillingStreet' => $newValues['street'],
                    'BillingCity' => $newValues['city'],
                    'BillingState' => $newValues['state'],
                    'BillingCountry' => $newValues['country'],
                ];
            } else {
                $data = [
                    'Name' => $newValues['name'],
                    'Phone' => $newValues['contact_num'],
                    'Website' => $newValues['website'],
                    'Industry' => $newValues['industry'],
                    'BillingPostalCode' => $newValues['billing_postal_code'],
                    'BillingStreet' => $newValues['billing_street'],
                    'BillingCity' => $newValues['billing_city'],
                    'BillingState' => $newValues['billing_state'],
                    'BillingCountry' => $newValues['billing_country'],
                    'Website' => $newValues['website'],
                ];
            }

            $oResponse = $this->oClient->patch(
                env('SALESFORCE_HOST') . "/services/data/v34.0/sobjects/Account/{$companyID}",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'json' => $data,
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }

            return MessageResult::error('Error while updating company details in Salesforce.');
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->updateCompanyDetails($newValues, $companyID, $sf_column_format);
            }

            return MessageResult::error('Error while updating company details in Salesforce.');
        }
    }

    public function updateAdminDetails($newValues, $contactID)
    {
        try {
            $data = [
                'FirstName' => $newValues['FirstName'],
                'LastName' => $newValues['LastName'],
                'MobilePhone' => $newValues['MobilePhone'],
                'Email' => $newValues['Email'],
                'Title' => $newValues['Title'],
            ];

            $oResponse = $this->oClient->patch(
                env('SALESFORCE_HOST') . "/services/data/v34.0/sobjects/contact/{$contactID}",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'json' => $data,
                ]
                );

            if ($oResponse->getStatusCode() == 204 || $oResponse->getStatusCode() == 201) {
                return MessageResult::success();
            }

            return MessageResult::error('Error while updating admin details in Salesforce.');
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->updateAdminDetails($newValues, $contactID);
            }

            return MessageResult::error('Error while updating admin details in Salesforce.');
        }
    }

    public function deleteAdmin($accountID)
    {
        try {
            $oResponse = $this->oClient->delete(
                env('SALESFORCE_HOST') . "/services/data/v34.0/sobjects/contact/{$accountID}",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    // "json" => $data
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }

            return MessageResult::error('Error deleting admin in Salesforce.');
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->deleteAdmin($accountID);
            }

            return MessageResult::error('Error deleting admin in Salesforce.');
        }
    }

    public function updateOpportunityDetails($newValues, $accountID, $sf_column_format = true)
    {
        try {
            $data = [];
            if ($sf_column_format) {
                $data = [
                    'Name' => $newValues['zenOrgName'],
                    'StageName' => $newValues['accountType'],
                    'RecordTypeId' => $newValues['zendeskAccountId'],
                ];
            } else {
                $data = [
                    'Name' => $newValues['zen_org_name'] ?? '',
                    'StageName' => $newValues['account_type'] ?? '',
                    'RecordTypeId' => $newValues['zendesk_account_id'] ?? '',
                ];
                $accountID = $newValues['zendesk_opportunity_id'];
            }

            $oResponse = $this->oClient->patch(
                env('SALESFORCE_HOST') . "/services/data/v34.0/sobjects/Opportunity/{$accountID}",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                    'json' => $data,
                ]
            );
            if ($oResponse->getStatusCode() == 204) {
                return MessageResult::success();
            }

            return MessageResult::error('Error while updating opportunity details in Salesforce.');
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->updateOpportunityDetails($newValues, $accountID, $sf_column_format);
            }

            return MessageResult::error('Error while updating opportunity details in Salesforce.');
        }
    }

    public function getLatestKOTOpportunityDetails($accountID)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Name, ID__c, Type, Amount, StageName, Zen__c, Id, RecordTypeId, CreatedDate,AccountId+from+Opportunity+WHERE+AccountId='" . $accountID . "'+And+RecordTypeId='01210000000QSBPAA4'+Order+By+CreatedDate+DESC+LIMIT+1",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                ]
            );

            $oBody = $oResponse->getBody();
            $opportunityDetail = json_decode($oBody->getContents(), true);
            if (isset($opportunityDetail['status']) && !$opportunityDetail['status']) {
                return $opportunityDetail;
            }

            return reset($opportunityDetail['records']);
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getLatestKOTOpportunityDetails($accountID);
            }

            return MessageResult::error('Error while getting latest KOT contract details in Salesforce.');
        }
    }

    public function getContracts($sfCompanyID, $skip, $limit)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Field133__c,Field141__c,ApplicationDay__c,KoT_startBillingMonth__c,KoT_shiharaihouhou__c,KoT_hanbaikeiro__c,AccountId+from+Opportunity+WHERE+AccountId='" . $sfCompanyID . "'+And+(StageName='成立'+or+StageName='展開中')+LIMIT+" . $limit . '+offset+' . $skip,
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                ]
            );

            $oBody = $oResponse->getBody();
            $opportunity = json_decode($oBody->getContents(), true);
            if (isset($opportunity['status']) && !$opportunity['status']) {
                return $opportunity;
            }

            return $opportunity['records'];
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getContracts($sfCompanyID);
            }

            return MessageResult::error('Error while getting KOT contracts list in Salesforce.');
        }
    }

    //Get company time and attendance contract to check total number of subscribe user for the contract which will use in pie chart.
    public function getCompanyTAContract($companyID)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . "/services/data/v34.0/query/?q=SELECT+Field133__c,Field141__c,KoT_regardingusercount__c,ApplicationDay__c,KoT_startBillingMonth__c, KoT_shiharaihouhou__c,KoT_hanbaikeiro__c,AccountId+from+Opportunity+WHERE+AccountId='" . $companyID . "'+And+TYPE='KOT - ASP'+order by+CloseDate+desc+LIMIT+1",
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                ]
            );

            $oBody = $oResponse->getBody();
            $opportunity = json_decode($oBody->getContents(), true);
            if (isset($opportunity['status']) && !$opportunity['status']) {
                return $opportunity;
            }

            return $opportunity['records'];
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();
            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getContracts($sfCompanyID);
            }

            return false;
        }
    }

    public function getContact($account_code)
    {
        try {
            $oResponse = $this->oClient->get(
                env('SALESFORCE_HOST') . '/services/data/v34.0/sobjects/contact/' . $account_code . '?fields=Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate',
                [
                    'headers' => [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->tokens['access_token'],
                    ],
                ]
            );

            if ($oResponse->getStatusCode() == 200) {
                $result = json_decode($oResponse->getBody(), true);

                return $result;
            }

            return false;
        } catch (ClientException $reqExcep) {
            $statusCode = $reqExcep->getResponse()->getStatusCode();

            if ($statusCode === 401) {
                $this->tokens = (new AccessToken())->getToken();

                return $this->getContact($account_code);
            }

            return false;
        }
    }
}
