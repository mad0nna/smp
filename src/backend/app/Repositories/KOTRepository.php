<?php

namespace App\Repositories;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Support\Facades\Log;

class KOTRepository {

  public function getAllQtyEmployees($token, $month)
  {
    $oClient = new Client();
    try{
      $oResponse = $oClient->get(
          env('KOT_HOST')."/v1.0/employees?date=".$month."&includeResigner=true",
          [
              'headers' => array(
                  'Content-Type' => 'application/json',
                  'Authorization'=> 'Bearer ' . $token
              ),
              'synchronous' => true
          ]
      );
      $oBody = $oResponse->getBody();
      $users = json_decode($oBody->getContents(), true);
      $qty = (is_array($users)) ? count($users) : 0;

      return $qty;

    } catch(ClientException $reqExcep) {
      Log::error('Cannot connect to KOT service');
      return false;
    }
  }

  public function getLogUsersInAMonth($token, $month)
  {
    $oClient = new Client();
    try{
      $oResponse = $oClient->get(
          env('KOT_HOST')."/v1.0/monthly-workings/".$month,
          [
              'headers' => array(
                  'Content-Type' => 'application/json',
                  'Authorization'=> 'Bearer ' . $token
              ),
              'synchronous' => true
          ]
      );
      $oBody = $oResponse->getBody();
      $users = json_decode($oBody->getContents(), true);
      $qty = 0;
      foreach ($users as $u) {
        
        if ($u['workingCount'] > 0) {
          $qty++;
        }
      }

      return $qty;


    } catch(ClientException $reqExcep) {
      return false;
    }     
  }
     
}
