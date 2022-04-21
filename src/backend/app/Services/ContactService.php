<?php

namespace App\Services;

use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Contact;

class ContactService
{
    public function __construct()
    {
        $this->mysql = new DatabaseRepository();
    }

    public function getCompanyAdminDetails($companyID, $accountID = '')
    {
        $adminDetails = $this->getCompanyAdminDetailsByContactID($accountID);
        if (!empty($adminDetails)) {
            $adminDetails['ableToEdit'] = true;
            return $adminDetails;
        }
        
        $adminDetails = $this->getCompanyAdminDetailsInDB($companyID);
        if (!empty($adminDetails)) {
            $adminDetails['ableToEdit'] = false;
            return $adminDetails;
        }

        $adminDetails = (new Contact)->getAdminByContactId($accountID);
        if ($adminDetails) {
            $adminDetails['ableToEdit'] = true;
            return json_encode($adminDetails);
        }
        $adminDetails = (new Contact)->getAdminByAccountId($companyID);
        $adminDetails['ableToEdit'] = false;
        return json_encode($adminDetails);
    }



    private function getCompanyAdminDetailsByContactID($contactID)
    {
        $adminDetails = $this->mysql->getCompanyAdminDetailsByContactID($contactID);
        if (!empty($adminDetails)) {
            return reset($adminDetails);
        }

        return $adminDetails;
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
