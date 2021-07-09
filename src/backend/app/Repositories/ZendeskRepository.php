<?php

namespace App\Repositories;
use GuzzleHttp\Client;

class ZendeskRepository {
    public function __construct()
    {
        $this->oClient = new Client();
    }

    public function getArticles($currentYear = '') {
        $oResponse = $this->oClient->get(
            env('ZENDESK_TA_HOST')."/api/v2/help_center/articles/search.json?query=&created_after={$currentYear}-01-01&updated_after={$currentYear}-01-01&sort_by=created_at,updated_at",
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

    public function getArticlesFromTA($currentYear = '') {
        $oResponse = $this->oClient->get(
            env('ZENDESK_TA_HOST')."/api/v2/help_center/articles/search.json?query=&created_after={$currentYear}-01-01&updated_after={$currentYear}-01-01&sort_by=created_at,updated_at&section=360002490514, 360008939594, 900000896806, 360006253414, 360006270613, 360011812753",
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

    public function getArticlesFromSL($currentYear = '') {
        $oResponse = $this->oClient->get(
            env('ZENDESK_SL_HOST')."/api/v2/help_center/articles/search.json?query=&created_after={$currentYear}-01-01&updated_after={$currentYear}-01-01&sort_by=created_at,updated_at&section=360003200594, 360003200674, 900001894083, 360007526974, 360007526934, 360010969954",
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

    public function getArticlesFromDA($currentYear = '') {
        $oResponse = $this->oClient->get(
            env('ZENDESK_DA_HOST')."/api/v2/help_center/articles/search.json?query=&created_after={$currentYear}-01-01&updated_after={$currentYear}-01-01&sort_by=created_at,updated_at&section=360003214693, 360012095533, 900001894103, 360007592593, 360007592573, 360010969914",
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

    public function getArticlesFromHR($currentYear = '') {
        $oResponse = $this->oClient->get(
            env('ZENDESK_HR_HOST')."/api/v2/help_center/articles/search.json?query=&created_after={$currentYear}-01-01&updated_after={$currentYear}-01-01&sort_by=created_at,updated_at&section=360003200814, 360010969994, 900000896906, 360007592733, 360007549314, 360010969974",
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