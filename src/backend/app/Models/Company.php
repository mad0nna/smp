<?php

namespace App\Models;

use App\models\TemplateTarget;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['company_code', 'name', 'contact_num', 'website', 'industry', 'billing_street', 'billing_city', 'biling_state', 'billing_postal_code', 'billing_country',
                           'status', 'token', 'zen_org_name', 'industry_sub', 'industry_sub2', 'account_id', 'kot_trans_type', 'payment_method', 'kot_billing_start_date', 'record_type_code', 'phase', 'server_name'];

    public function template() {
        return $this->hasOne(Template::class);
    }

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
            'PaymentMethod__c' => $this->payment_method,
            'card_brand' => $this->card_brand,
            'last_four_digit' => $this->last_four_digit,
            'expmm' => $this->expmm,
            'expyr' => $this->expyr,

        ];
    }

    public function templateTarget() {
        return $this->hasOne(TemplateTarget::class);
    }
}
