<?php

namespace App\Services;

use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Opportunity;
use Illuminate\Support\Facades\Cache;

class OpportunityService
{
    public function __construct()
    {
        $this->mysql = new DatabaseRepository();
    }

    public function getLatestKOTOpportunityDetails($companyID)
    {
        $opportunity = Cache::remember("{$companyID}:opportunity:details:latest", now()->addMinutes(5), function () use ($companyID) {
            $opportunityDetail = $this->mysql->getLatestKOTOpportunityDetails($companyID);
            if (!empty($opportunityDetail)) {
                return reset($opportunityDetail);
            }
            return (new Opportunity)->getLatest($companyID);
        });

        return json_encode($opportunity);
    }

    /**
     * Function that returns the selected company's, opportunity payment method
     *
     * @param string $companyID salesforce account id
     * @return string $paymentMethod
     */
    public function getLatestKOTOpportunityPaymentMethod(string $companyID)
    {
        $paymentMethod = Cache::remember("{$companyID}:opportunity:paymentMethod:latest", now()->addMinutes(5), function () use ($companyID) {
            $opportunity = (new Opportunity)->getLatest($companyID);

            return $opportunity['KoT_shiharaihouhou__c'];
        });

        return $paymentMethod;
    }
}
