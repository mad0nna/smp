<?php
namespace App\Services\API\Salesforce\Model;

use App\Services\API\Salesforce\Salesforce;

class Model
{
    public function __construct()
    {
        $this->client = new Salesforce;
    }
}
?>