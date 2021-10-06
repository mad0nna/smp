<?php

namespace App\Services;

use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Contact;
use Illuminate\Support\Facades\Cache;

class ContactService
{
    public function __construct()
    {
        $this->mysql = new DatabaseRepository();
    }

    public function getCompanyAdminDetails($companyID, $accountID = '')
    {
        $oCached = Cache::remember("{$companyID}:admin:details", now()->addMinutes(5), function () use ($companyID, $accountID) {
            $adminDetails = $this->getCompanyAdminDetailsInDB($companyID);
            if (!empty($adminDetails)) {
                $adminDetails['ableToEdit'] = $accountID === $adminDetails['Id'];
                $adminDetails['admin__c'] = '3';

                return $adminDetails;
            }
            $adminDetails = (new Contact)->getAdminByAccountId($companyID);
            $adminDetails['ableToEdit'] = $accountID === $adminDetails['Id'];

            return json_encode($adminDetails);
        });

        return $oCached;
    }

    private function getCompanyAdminDetailsInDB($companyID)
    {
        $adminDetails = $this->mysql->getCompanyAdminDetailsByID($companyID);
        if (!empty($adminDetails)) {
            return reset($adminDetails);
        }

        return $adminDetails;
    }
}
