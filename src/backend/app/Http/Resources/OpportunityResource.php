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
}
