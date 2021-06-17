<?php
namespace App\Services\API;

class BaseAPIService {
    public $aAPIs = [];

    public function salesForceApi() {
        $this->aAPIs['salesforce'] = array(
           'sClientID' => env('SALESFORCE_KEY'),
           'sClientKey' => env('SALESFORCE_SECRET'),
           'sUsername' => env('SALESFORCE_USERNAME'),
           'sPassword' => env('SALESFORCE_PASSWORD'),
           'sSecurityToken' => env('SALESFORCE_SECURITY_TOKEN')
        );
    }
}