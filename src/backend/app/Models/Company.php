<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['company_code', 'name', 'contact_num', 'website', 'industry', 'billing_street', 'billing_city', 'biling_state', 'billing_postal_code', 'billing_country'];

    /**
     * Retrieve all Users under this company
     *
     * @return App\Models\User[]
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function salesforceFormat() {
        return [       
            'Industry' => $this->industry, 
            'Name' => $this->name, 
            'Phone' => $this->contact_num, 
            'Website' => $this->website, 
            'BillingStreet' => $this->billing_street, 
            'BillingCity' => $this->billing_city,
            'BillingState' => $this->billing_state,
            'BillingPostalCode' => $this->billing_postal_code,
            'BillingCountry' => $this->billing_country,
            'Id' => $this->company_code,
            'Zendeskaccount__c' => $this->zen_org_name
        ];
    }
}
