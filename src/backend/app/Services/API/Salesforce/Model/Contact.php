<?php
namespace App\Services\API\Salesforce\Model;

use App\Services\API\Salesforce\Model\Model;

class Contact extends Model
{
    public function findById($contactID) {
        $adminDetails = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Id='" . $contactID . "'+LIMIT+1");
        if (isset($adminDetails['status']) && !$adminDetails['status']) {
            return $adminDetails;
        }
        return reset($adminDetails['records']);
    }
    
    public function findByAccountID($accountID) {
        $contacts = $this->client->get('/services/data/v34.0/sobjects/contact/' . $accountID . '?fields=Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate');
        if (isset($contacts['status']) && !$contacts['status']) {
            return $contacts;
        }
        return $contacts;
    }

    public function findByEmail($email) {
        $adminDetails = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Email='" . $email . "'+Order+By+CreatedDate+ASC+LIMIT+1");
        if (isset($adminDetails['status']) && !$adminDetails['status']) {
            return $adminDetails;
        }
        return reset($adminDetails['records']);
    }

    public function findByEmailAndAccountId($email, $companyId) {
        $adminDetails = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Email='" . $email . "'+AND+AccountId='".$companyId."'+Order+By+CreatedDate+ASC+LIMIT+1");
        if (isset($adminDetails['status']) && !$adminDetails['status']) {
            return $adminDetails;
        }
        return reset($adminDetails['records']);
    }

    public function getAdminByAccountId($accountId) {
        $adminDetails = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+AccountId='" . $accountId . "'+And+admin__c=true+Order+By+CreatedDate+ASC+LIMIT+1");
        if (isset($adminDetails['status']) && !$adminDetails['status']) {
            return $adminDetails;
        }
        return reset($adminDetails['records']);
    }

    public function getAdminByContactId($contactID) {
        $adminDetails = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, Id, FirstName, LastName, Email, Title, MobilePhone, section__c, admin__c, CreatedDate+from+Contact+WHERE+Id='" . $contactID . "'+And+admin__c=true+Order+By+CreatedDate+ASC+LIMIT+1");
        if (isset($adminDetails['status']) && !$adminDetails['status']) {
            return $adminDetails;
        }
        return reset($adminDetails['records']);
    }

    

    public function create($data) {
        return $this->client->create('/services/data/v34.0/sobjects/contact', $data);
    }

    public function update($data, $contactID) {
        return $this->client->patch("/services/data/v34.0/sobjects/contact/{$contactID}", $data);
    }

    public function delete($contactID) {
        return $this->client->delete("/services/data/v34.0/sobjects/contact/{$contactID}");
    }    

}
?>