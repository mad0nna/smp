<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'file_path',
        'invoice_number',
        'company_id',
        'updated_at',
    ];
}
