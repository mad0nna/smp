<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'username' => $this->username,
            'fullName' => $this->full_name,
            'firstName' => $this->first_name,
            'lastName' => $this->last_name,
            'email' => $this->email,
            'title' => $this->title,
            'userStatusId' => $this->user_status_id,
            'contactNum' => $this->contact_num,
            'userTypeId' => $this->user_type_id,
            'emailVerifiedAt' => $this->email_verified_at,            
            'createdAt' => $this->created_at->format('d/m/Y'),
            'updatedAt' => $this->updated_at->format('d/m/Y'),
            'type' => isset($this->type) ? $this->type['name'] : '',
        ];
    }
}
