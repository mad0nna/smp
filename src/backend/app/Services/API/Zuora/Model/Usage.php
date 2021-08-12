<?php
namespace App\Services\API\Zuora\Model;

class Usage extends Model
{
    public function findByAccountId($id)
    {
        return $this->client->get("/v1/usage/accounts/{$id}");
    }
}
