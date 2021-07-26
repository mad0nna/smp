<?php

namespace App\Services\API\Zuora\Model;

use App\Services\API\Zuora\Zuora;

class Account extends Model
{
    public function find($id)
    {
        return $this->client->get("/v1/accounts/{$id}");
    }
}
