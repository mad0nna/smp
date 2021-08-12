<?php

namespace App\Services\API\Zuora\Model;

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
