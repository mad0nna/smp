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
    protected $fillable = ['company_code', 'name', 'contact_num', 'website', 'industry', 'billing_street', 'billing_city', 'biling_state', 'billing_postal_code', 'billing_country',
                           'status', 'token', 'zen_org_name', 'sf_records', 'industry_sub', 'industry_sub2', 'account_id', 'kot_trans_type', 'payment_method', 'kot_billing_start_date', ];

    /**
     * Retrieve all Users under this company
     *
     * @return App\Models\User[]
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function opportunities()
    {
        return $this->hasMany(Opportunity::class);
    }

    public function files()
    {
        return $this->hasMany(File::class);
    }

    public function salesforceFormat()
    {
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
            'Zendeskaccount__c' => $this->zen_org_name,
        ];
    }
}
