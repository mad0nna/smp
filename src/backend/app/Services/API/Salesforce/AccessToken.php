<?php
namespace App\Services\API\Salesforce;

use App\Services\API\BaseAPIService;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class AccessToken extends BaseAPIService
{
    public function __construct()
    {
        $this->salesForceApi();
        $this->oClient = new Client();
    }

    public function getToken()
    {
        return Cache::remember('tokens:salesforce', now()->addHours(1), function () {
            $oResponse = $this->oClient->post(
                'https://test.salesforce.com/services/oauth2/token',
                [
                    'headers' => [
                        'Content-Type' => 'application/x-www-form-urlencoded',
                        'Accept' => 'application/json',
                    ],
                    'form_params' => [
                        'grant_type' => 'password',
                        'client_id' => $this->aAPIs['salesforce']['sClientID'],
                        'client_secret' => $this->aAPIs['salesforce']['sClientKey'],
                        'username' => $this->aAPIs['salesforce']['sUsername'],
                        'password' => $this->aAPIs['salesforce']['sPassword'] . $this->aAPIs['salesforce']['sSecurityToken'],
                    ],
                    'synchronous' => true,
                ]
            );
            $oResponse = json_decode($oResponse->getBody(), true);

            return $oResponse;
        });
    }
}
