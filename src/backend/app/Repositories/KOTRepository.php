<?php

namespace App\Repositories;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Exception\ClientException;

class KOTRepository {

    public static function getAllEmployees($token)
    {
      $companyDetails = Cache::remember("KOT_{$token}:employees", now()->addHour(1), function() use($token) {
        $oClient = new Client();
        try{
          $oResponse = $oClient->get(
              env('KOT_HOST')."/v1.0/employees?date=".date("Y-m-d")."&includeResigner=true",
              [
                  'headers' => array(
                      'Content-Type' => 'application/json',
                      'Authorization'=> 'Bearer ' . $token
                  ),
                  'synchronous' => true
              ]
          );
          $oBody = $oResponse->getBody();
          return json_decode($oBody->getContents(), true);

        } catch(ClientException $reqExcep) {
          return false;
        }
      });

      return $companyDetails;
  }

  
     
}