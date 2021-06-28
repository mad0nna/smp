<?php

namespace App\Repositories;
use GuzzleHttp\Client;

class ZendeskRepository {
    public function __construct()
    {
        $this->oClient = new Client();
    }
    public function getArticles($currentYear) {
        $oResponse = $this->oClient->get(
            env('ZENDESK_HOST')."/api/v2/help_center/articles/search.json?query=created_after={$currentYear}-01-01&updated_after={$currentYear}-01-01&sort_by=created_at,updated_at",
            [
                'headers' => array(
                    'Content-Type' => 'application/json',
                ),
                'synchronous' => true
            ]
        );
        $oBody = $oResponse->getBody();
        return json_decode($oBody->getContents(), true);
    }
}