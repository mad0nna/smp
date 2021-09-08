<?php
namespace App\Services\API\Zuora\Model;

class Usage extends Model
{
    public function findByAccountId($id, $page = null)
    {
        if ($page === null) {
            return $this->client->get("/v1/usage/accounts/{$id}");
        } else {
            return $this->client->get("/v1/usage/accounts/{$id}?page=".$page);
        }
        
    }
}
