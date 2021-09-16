<?php

namespace App\Services\API\Zuora\Model;

class Invoice extends Model
{
    public function findByAccountId($id)
    {
        return $this->client->get("/v1/transactions/invoices/accounts/{$id}");
    }

    public function getInvoiceDetails($id)
    {
        return $this->client->get("/v1/invoices/{$id}/items");      
    }

    public function downloadInvoice($invoiceFileID)
    {
        return $this->client->getFile($invoiceFileID);
    }
}
