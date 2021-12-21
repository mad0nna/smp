<?php
namespace App\Services\API\Salesforce\Model;

use App\Services\API\Salesforce\Model\Model;

class Report extends Model
{
    /**
     * Function that retrieves the unpaid billing information
     *
     * @param string $companyName Company name
     * @return mixed
     */
    public function getUnpaidBillingInformation(string $companyName)
    {
        $salesforceReportId = env('SALESFORCE_REPORT_ID', null);

        // Request parameters for Salesforce Report in retrieving latest unpaid billing information
        $requestData = '{
            "reportMetadata": {
                "reportFilters": [
                    {
                        "value": "'. $companyName .'",
                        "operator": "equals",
                        "column": "ACCOUNT.NAME"
                    }
                ],
                "sortBy":[
                    {
                        "sortColumn":"Case.BO8613__c",
                        "sortOrder":"Desc"
                    }
                ],
                "groupingsDown": [
                    {
                        "dateGranularity": "None",
                        "name": "Case.BO774531__c",
                        "sortAggregate": null,
                        "sortOrder": "Desc"
                    }
                ]
            }
        }';

        return $this->client->getSalesforceReport('/services/data/v37.0/analytics/reports/' . $salesforceReportId, $requestData);
    }
}
