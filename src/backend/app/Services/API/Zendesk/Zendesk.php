<?php

namespace App\Services\API\Zendesk;

use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Services\API\Zuora\Exceptions\UnauthorizedAccessException;

class Zendesk
{
    private $client;

    public function __construct()
    {
        $this->hosts = array(
            env('ZENDESK_TA_HOST', 'https://ta-kingoftime.zendesk.com'),
            env('ZENDESK_SL_HOST', 'https://sl-kingoftime.zendesk.com'),
            env('ZENDESK_DA_HOST', 'https://da-kingoftime.zendesk.com'),
            env('ZENDESK_HR_HOST', 'https://hr-kingoftime.zendesk.com'),
        );
        $this->client = new Client();
    }

    public function post($path, $data = [], $headers = [])
    {
        try {
            $request = $this->client->post(
                $path,
                [
                    'headers' => array_merge(
                        [
                            'Content-Type' => 'application/x-www-form-urlencoded',
                            'Accept' => 'application/json',
                        ],
                        $headers
                    ),
                    'form_params' => $data,
                    'synchronous' => true,
                ]
            );

            return json_decode($request->getBody()->getContents(), true);
        } catch (ClientException $e) {
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);
            // Other Exceptions aside from Authentication
            throw new Exception($response['message']);
        }
    }

    public function get($path, $headers = [])
    {
        try {
            $request = $this->client->get(
                $path,
                [
                    'headers' => array_merge(
                        $headers,
                        [
                            'Accept' => 'application/json',
                        ]
                    ),
                    'synchronous' => true,
                ]
            );

            return json_decode($request->getBody()->getContents(), true);
        } catch (ClientException $e) {
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);
            // Other Exceptions aside from Authentication
            throw new Exception($response['message']);
        }
    }
}
