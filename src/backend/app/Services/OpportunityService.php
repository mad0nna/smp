<?php

namespace App\Services;

use App\Repositories\SalesforceRepository;
use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Opportunity;
use Illuminate\Support\Facades\Cache;

class OpportunityService
{
    public function __construct()
    {
        $this->salesForce = new SalesforceRepository();
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
}
