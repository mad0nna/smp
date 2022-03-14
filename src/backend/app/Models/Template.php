<?php

namespace App\models;

use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    protected $table = 'invoice_templates';
    protected $fillable = ['template_name', 'aws_s3_link'];

    public function targets()
    {
        return $this->hasMany(\App\Models\TemplateTarget::class);
    }
}
