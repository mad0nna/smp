<?php

namespace App\Repositories;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;
use GuzzleHttp\Exception\ClientException;

class KOTRepository
{
    public function getAllEmployees($token)
    {
        $companyDetails = Cache::remember("KOT_{$token}:employees", now()->addHour(1), function () use ($token) {
            $oClient = new Client();

            try {
                $oResponse = $oClient->get(
              env('KOT_HOST') . '/v1.0/employees?date=' . date('Y-m-d') . '&includeResigner=true',
              [
                  'headers' => [
                      'Content-Type' => 'application/json',
                      'Authorization' => 'Bearer ' . $token,
                  ],
                  'synchronous' => true,
              ]
          );
                $oBody = $oResponse->getBody();

                return json_decode($oBody->getContents(), true);
            } catch (ClientException $reqExcep) {
                return false;
            }
        });

        return $companyDetails;
    }

    public static function getLogUsersInAMonth($token, $month)
    {
        $companyDetails = Cache::remember("KOT_{$token}:LogUsersInAMonth", now()->addHour(1), function () use ($token, $month) {
            $oClient = new Client();

            try {
                $oResponse = $oClient->get(
              env('KOT_HOST') . '/v1.0/monthly-workings/' . $month,
              [
                  'headers' => [
                      'Content-Type' => 'application/json',
                      'Authorization' => 'Bearer ' . $token,
                  ],
                  'synchronous' => true,
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
            } catch (ClientException $reqExcep) {
                return false;
            }
        });

        return $companyDetails;
    }
}
