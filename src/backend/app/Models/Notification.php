<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    //
    protected $table = 'notifications';

    public $timestamps = false;

    protected $fillable = ['message', 'level', 'created_at', 'updated_at'];
}

