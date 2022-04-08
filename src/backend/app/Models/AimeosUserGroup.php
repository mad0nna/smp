<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosUserGroup extends Model
{
    protected $table = 'users_list';

    public $timestamps = false;

    protected $fillable = ['parentid', 'siteid', 'key', 'type', 'domain', 'refid', 'start', 'end', 'config', 'pos', 'status', 'ctime', 'editor'];

}
