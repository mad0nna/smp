<?php

namespace App\Services;

use App\Repositories\SalesforceRepository;
use App\Repositories\DatabaseRepository;
use Illuminate\Support\Facades\Cache;

class OpportunityService {
    public function __construct()
    {
        $this->salesForce = new SalesforceRepository();
        $this->mysql = new DatabaseRepository();
    }

    public function getLatestKOTOpportunityDetails($companyID) {
        $opportunity = Cache::remember("{$companyID}:opportunity:details:latest", now()->addMinutes(5), function() use($companyID) {
            $opportunityDetail = $this->mysql->getLatestKOTOpportunityDetails($companyID);
            if (!empty($opportunityDetail)) {
                return reset($opportunityDetail);
            }
            $opportunityDetail = json_decode($this->salesForce->getLatestKOTOpportunityDetails($companyID), true);
            if (isset($opportunityDetail["status"]) && !$opportunityDetail["status"]) {
                return $opportunityDetail;
            }
            return reset($opportunityDetail["records"]);
        });
        return json_encode($opportunity);
    }
}