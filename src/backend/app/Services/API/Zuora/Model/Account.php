<?php

namespace App\Services\API\Zuora\Model;

class Account extends Model
{
    public function find($id)
    {
        return $this->client->get("/v1/accounts/{$id}");
    }
}
