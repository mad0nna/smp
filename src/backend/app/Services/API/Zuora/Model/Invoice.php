<?php

namespace App\Services\API\Zuora\Model;

use App\Services\API\Zuora\Zuora;

class Invoice extends Model
{
    public function findByAccountId($id)
    {
        return $this->client->get("/v1/transactions/invoices/accounts/{$id}");
    }

    public function downloadInvoice($invoiceFileID) 
    {
        return $this->client->getFile($invoiceFileID);
    }
 }
