<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Opportunity extends Model
{
    protected $table = 'opportunities';
    protected $fillable = [
        'opportunity_code',
        'negotiate_code',
        'company_id',
        'record_type_code',
        'amount',
        'type',
        'name',
        'stage',
        'zen_negotiate_owner',
        'sf_created_date',
        'payment_method',
        'card_brand',
        'last_four_digit',
        'expmm',
        'expyr'
    ];

    public function salesforceFormat()
    {
        return [
            'Amount' => $this->amount,
            'ID__c' => $this->negotiate_code,
            'Id' => $this->opportunity_code,
            'Name' => $this->name,
            'RecordTypeId' => $this->record_type_code,
            'StageName' => $this->stage,
            'Type' => $this->type,
            'Zen__c' => $this->zen_negotiate_owner,
        ];
    }
}
