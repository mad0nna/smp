<?php

namespace App\Services\API\Salesforce;

use Illuminate\Support\Facades\Session;
use Exception;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\ClientException;
use App\Services\API\Zuora\Exceptions\UnauthorizedAccessException;
use Illuminate\Support\Facades\Log;

class Salesforce
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
        $this->host = env('SALESFORCE_HOST', null);
        $this->key = env('SALESFORCE_KEY', null);
        $this->secret = env('SALESFORCE_SECRET', null);
        $this->username = env('SALESFORCE_USERNAME', null);
        $this->password = env('SALESFORCE_PASSWORD', null);
        $this->security_token = env('SALESFORCE_SECURITY_TOKEN');
        $this->client = new Client(['base_uri' => $this->host]);
        if (!Session::get('salesforce-accessToken')) {
            $this->authenticate();
        } else {
            $this->access_token = Session::get('salesforce-accessToken');
        }
    }

    public function authenticate()
    {
        $token = $this->post('/services/oauth2/token', [
            'grant_type' => 'password',
            'client_id' => $this->key,
            'client_secret' => $this->secret,
            'username' => $this->username,
            'password' => $this->password . $this->security_token
        ]);

        Session::put('salesforce-accessToken', $token['access_token']);
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
            throw new Exception($response[0]['message']);
        }
    }

    public function create($path, $data, $headers = []) 
    {
        try {
            $request = $this->client->post(
            $path,
            [
                'headers' => array_merge(
                    [
                        'Content-Type' => 'application/json',
                        'Authorization' => 'Bearer ' . $this->access_token,
                    ],
                    $headers
                ),
                'json' => $data,
            ]
        );
        if ($request->getStatusCode() == 204 || $request->getStatusCode() == 201) {
            return [
                'status' => true,
                'message' => 'Successfully updated'
            ];
        }
        return [
            'status' => false
        ];
        }catch (ClientException $e) {
            $code = $e->getResponse()->getStatusCode();
            $response = json_decode($e->getResponse()->getBody()->getContents(), true);
            if (in_array($code, [400, 401])) {
                $this->retries++;

                // prevent infinite retries/loop
                if ($this->retries < $this->max_retries) {
                    // attempt to get new token
                    $this->authenticate();

                    // retry the failed request
                    return $this->create($path, $data, $headers);
                }
                dd($response);
                throw new UnauthorizedAccessException($response['message']);
            }

            // Other Exceptions aside from Authentication
            throw new Exception($response[0]['message']);
        }
    }

    public function delete($path, $headers = [])
    {
        try {
            $request = $this->client->delete(
                $path,
                [
                    'headers' => array_merge(
                        [
                            'Content-Type' => 'application/json',
                            'Authorization' => 'Bearer ' . $this->access_token,
                        ],
                        $headers
                    )
                ]
            );

            if ($request->getStatusCode() == 204 || $request->getStatusCode() == 201) {
                return [
                    'status' => true,
                    'message' => 'Successfully deleted'
                ];
            }
            return [
                'status' => false
            ];
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
                    return $this->delete($path, $headers);
                }

                throw new UnauthorizedAccessException($response['message']);
            }

            // Other Exceptions aside from Authentication
            throw new Exception($response[0]['message']);
        }
    }

    public function patch($path, $data, $headers = [])
    {
        try {
            $request = $this->client->patch(
                $path,
                [
                    'headers' => array_merge(
                        [
                            'Content-Type' => 'application/json',
                            'Authorization' => 'Bearer ' . $this->access_token
                        ],
                        $headers
                    ),
                    'json' => $data,
                ]
            );

            if ($request->getStatusCode() == 204 || $request->getStatusCode() == 201) {
                return [
                    'status' => true,
                    'message' => 'Successfully updated'
                ];
            }
            return [
                'status' => false
            ];
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
                    return $this->patch($path, $data, $headers);
                }

                throw new UnauthorizedAccessException($response['message']);
            }

            // Other Exceptions aside from Authentication
            throw new Exception($response[0]['message']);
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
                            'Content-Type' => 'application/json',
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
            throw new Exception($response[0]['message']);
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
            throw new Exception($response[0]['message']);
        }
    }

    /**
     * Function that gets Salesforce Report
     *
     * @param string $path URL
     * @param string $data Raw JSON data
     * @param array $headers
     *
     * @return array
     */
    public function getSalesforceReport(string $path, string $data, $headers = [])
    {
        try {
            $request = $this->client->post(
                $path,
                [
                    'headers' => array_merge(
                        $headers,
                        [
                            'Content-Type' => 'application/json',
                            'Accept' => '*/*',
                            'Authorization' => 'Bearer ' . $this->access_token,
                        ]
                    ),
                    'synchronous' => true,
                    'body' => $data,
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
            throw new Exception($response[0]['message']);
        }
    }
}
