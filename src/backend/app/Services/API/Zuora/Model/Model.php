<?php

namespace App\Services\API\Zuora\Model;

use App\Services\API\Zuora\Zuora;

class Model
{
    public $client;

    public function __construct()
    {
        $this->client = new Zuora;
    }
}
