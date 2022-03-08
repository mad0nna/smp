<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosPlugin extends Model
{
    protected $table = 'mshop_plugin';

    public $timestamps = false;

    protected $fillable = ['id', 'siteid', 'type', 'label', 'provider', 'config', 'pos', 'status', 'mtime', 'ctime', 'editor'];
}

