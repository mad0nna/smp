<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class TemplateTarget extends Model
{
    protected $table = 'invoice_templates_target';
    protected $fillable = ['company_id', 'template_id', 'created_at', 'updated_at'];

    public function template()
    {
        return $this->hasMany(Template::class);
    }

    public function company()
    {
        return $this->hasMany(Company::class);
    }
}
