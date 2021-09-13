<?php
namespace App\Services\API\Salesforce\Model;

use App\Services\API\Salesforce\Model\Model;

class Opportunity extends Model
{
    public function getLatest($accountID) {
        $opportunity = $this->client->get("/services/data/v34.0/query/?q=SELECT+Name, ID__c, Type, Amount, StageName, Zen__c, Id, RecordTypeId, CreatedDate,AccountId+from+Opportunity+WHERE+AccountId='" . $accountID . "'+And+RecordTypeId='01210000000QSBPAA4'+Order+By+CreatedDate+DESC+LIMIT+1");
        if (isset($opportunity['status']) && !$opportunity['status']) {
            return $opportunity;
        }
        return reset($opportunity['records']);
    }

    public function update($accountID, $data) {
        return $this->client->patch("/services/data/v34.0/sobjects/Opportunity/{$accountID}", $data);
    }

    public function findByAccountID($accountID, $limit = '', $skip = '') {
        $opportunity = $this->client->get("/services/data/v34.0/query/?q=SELECT+Field133__c,Field141__c,ApplicationDay__c,KoT_startBillingMonth__c,KoT_shiharaihouhou__c,KoT_hanbaikeiro__c,AccountId+from+Opportunity+WHERE+AccountId='" . $accountID . "'+And+(StageName='成立'+or+StageName='展開中')+LIMIT+" . $limit . '+offset+' . $skip);
        if (isset($opportunity['status']) && !$opportunity['status']) {
            return $opportunity;
        }
        return $opportunity['records'];
    }
    
    public function getNumberOfSubscriber($accountId) {
        $subscriberData = $this->client->get("/services/data/v34.0/query/?q=SELECT+Field133__c,Field141__c,KoT_regardingusercount__c,ApplicationDay__c,KoT_startBillingMonth__c, KoT_shiharaihouhou__c,KoT_hanbaikeiro__c,AccountId+from+Opportunity+WHERE+AccountId='" . $accountID . "'+And+TYPE='KOT - ASP'+order by+CloseDate+desc+LIMIT+1");
        if (isset($subscriberData['status']) && !$subscriberData['status']) {
            return $subscriberData;
        }
        return $subscriberData['records'];
    }




}
?>