<?php
namespace App\Services\API;

class BaseAPIService {
    public $aAPIs = [];

    public function salesForceApi() {
        $this->aAPIs['salesforce'] = array(
           'sClientID' => env('SF_KEY'),
           'sClientKey' => env('SF_SECRET'),
           'sUsername' => env('SF_USERNAME'),
           'sPassword' => env('SF_PASSWORD'),
           'sSecurityToken' => env('SF_SECURITY_TOKEN')
        );
    }
}