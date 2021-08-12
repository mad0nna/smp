<?php
namespace App\Services\API;

class BaseAPIService
{
    public $aAPIs = [];

    public function salesForceApi()
    {
        $this->aAPIs['salesforce'] = [
           'sClientID' => env('SALESFORCE_KEY'),
           'sClientKey' => env('SALESFORCE_SECRET'),
           'sUsername' => env('SALESFORCE_USERNAME'),
           'sPassword' => env('SALESFORCE_PASSWORD'),
           'sSecurityToken' => env('SALESFORCE_SECURITY_TOKEN'),
        ];
    }

    public function zuoraApi()
    {
        $this->aAPIs['zuora'] = [
            'sClientID' => env('ZUORA_KEY'),
            'sClientKey' => env('ZUORA_SECRET'),
        ];
    }
}
