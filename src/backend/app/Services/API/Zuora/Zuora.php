<?php

namespace App\Services\API\Zuora;

use Illuminate\Support\Facades\Session;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Services\API\Zuora\Exceptions\UnauthorizedAccessException;

class Zuora
{
    private $host;
    private $key;
    private $secret;
    private $client;
    private $retries = 0;
    private $max_retries = 3;
    private $access_token;

    public function __construct()
    {
        $this->host = env('ZUORA_HOST', 'https://rest.test.zuora.com');
        $this->key = env('ZUORA_KEY', null);
        $this->secret = env('ZUORA_SECRET', null);
        $this->client = new Client(['base_uri' => $this->host]);

        if (!Session::get('zuora-accessToken')) {
            $this->authenticate();
        } else {
            $this->access_token = Session::get('zuora-accessToken');
        }
    }

    public function authenticate()
    {
        $token = $this->post('/oauth/token', [
            'grant_type' => 'client_credentials',
            'client_id' => $this->key,
            'client_secret' => $this->secret,
        ]);

        Session::put('zuora-accessToken', $token['access_token']);
        $this->access_token = $token['access_token'];
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
            $code = $e->getResponse()->getStatusCode();
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);

            if (in_array($code, [400, 401])) {
                $this->retries++;

                // prevent infinite retries/loop
                if ($this->retries < $this->max_retries) {
                    // attempt to get new token
                    $this->authenticate();

                    // retry the failed request
                    return $this->post($path, $data, $headers);
                }

                throw new UnauthorizedAccessException($response['message']);
            }

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
                            'Authorization' => "Bearer {$this->access_token}",
                        ]
                    ),
                    'synchronous' => true,
                ]
            );

            return json_decode($request->getBody()->getContents(), true);
        } catch (ClientException $e) {
            $code = $e->getResponse()->getStatusCode();
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);

            if (in_array($code, [400, 401])) {
                $this->retries++;

                // prevent infinite retries/loop
                if ($this->retries < $this->max_retries) {
                    // attempt to get new token
                    $this->authenticate();

                    // retry the failed request
                    return $this->get($path, $headers);
                }

                throw new UnauthorizedAccessException($response['message']);
            }

            // Other Exceptions aside from Authentication
            throw new Exception($response['message']);
        }
    }

    public function getFile($path, $headers = [])
    {
        try {
            $request = $this->client->get(
                $path,
                [
                    'headers' => array_merge(
                        $headers,
                        [
                            'Accept' => 'application/pdf',
                            'Authorization' => "Bearer {$this->access_token}",
                        ]
                    ),
                    'synchronous' => true,
                ]
            );

            return $request->getBody();
        } catch (ClientException $e) {
            $code = $e->getResponse()->getStatusCode();
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);

            if (in_array($code, [400, 401])) {
                $this->retries++;

                // prevent infinite retries/loop
                if ($this->retries < $this->max_retries) {
                    // attempt to get new token
                    $this->authenticate();

                    // retry the failed request
                    return $this->getFile($path, $headers);
                }

                throw new UnauthorizedAccessException($response['message']);
            }

            // Other Exceptions aside from Authentication
            throw new Exception($response['message']);
        }
    }
}
