<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class OpportunityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'opportunityCode' => $this->opportunity_code,
            'negotiateCode' => $this->negotiate_code,
            'companyId' => $this->company_id,
            'recordTypeCode' => $this->record_type_code,
            'amount' => $this->amount,
            'type' => $this->type,
            'name' => $this->name,
            'stage' => $this->stage,
            'zenNegotiateOwner' => $this->zen_negotiate_owner,
            'createdAt' => $this->created_at->format('d/m/Y'),
            'updatedAt' => $this->updated_at->format('d/m/Y'),
        ];
    }
    

    public static function parseSFOpportunityColumnToDbColumn($data) {
        return [
            'opportunity_code' => $data['Id'],
            'negotiate_code' => $data['ID__c'],
            'record_type_code' => $data['RecordTypeId'],
            'amount' => $data['Amount'],
            'type' => $data['Type'],
            'name' => $data['Name'],
            'stage' => $data['StageName'],
            'zen_negotiate_owner' => $data['KoT_hanbaikeiro__c'],
            'payment_method' => $data['KoT_shiharaihouhou__c'],
        ];
    }
}
