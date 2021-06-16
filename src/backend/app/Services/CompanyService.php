<?php
namespace App\Services;

use App\Repositories\SalesforceRepository;
use App\Repositories\DatabaseRepository;
use Illuminate\Support\Facades\Cache;

class CompanyService {
    public function __construct() {
        $this->salesForce = new SalesforceRepository();
        $this->mysql = new DatabaseRepository();
    }
    

    /**
     * Getting Company Details by ID
     * @param $companyID string
     * @return $companyDetails string
     */
    public function getDetailsByID($companyID) {
        $companyDetails = Cache::remember("{$companyID}:company:details", now()->addMinutes(5), function() use($companyID) {
            $companyInformation = $this->mysql->getCompanyDetailsByID($companyID);
            if (!empty($companyInformation)) {
                return reset($companyInformation);
            }
            $companyInformation = $this->getDetailsInSFByID($companyID);
            return $companyInformation;
        });
        return json_encode($companyDetails);
    }

    private function getDetailsInSFByID($companyID) {
        $companyInformation = json_decode($this->salesForce->getCompanyDetailsByID($companyID), true);
        if (isset($companyInformation["status"]) && !$companyInformation["status"]) {
            return $companyInformation;
        }
        unset($companyInformation["attributes"]);
        return $companyInformation;
    }
}