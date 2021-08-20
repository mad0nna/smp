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
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'title' => $this->title,
            'user_status_id' => $this->user_status_id,
            'contact_num' => $this->contact_num,
            'user_type_id' => $this->user_type_id,
            'emailVerifiedAt' => $this->email_verified_at,
            'account_code' => $this->account_code,
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
            'source' => 'database',
        ];
    }

    public static function parseSfContactColumnToDbColumn($result)
    {
        return [
            'account_code' => $result['Id'],
            'first_name' => $result['FirstName'],
            'last_name' => $result['LastName'],
            'email' => $result['Email'],
            'title' => $result['Title'],
            'contact_num' => $result['MobilePhone'],
            'user_type_id' => $result['admin__c'] ? 3 :4,
        ];
    }
}
