<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosService extends Model
{
    //
    protected $table = 'mshop_service';

    public $timestamps = false;

    protected $fillable = ['siteid', 'type', 'code', 'label', 'provider', 'start', 'end', 'config', 'pos', 'status', 'mtime', 'ctime', 'editor'];
}

