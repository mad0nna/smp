<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosLocaleSite extends Model
{
    protected $table = 'mshop_locale_site';

    public $timestamps = false;

    protected $fillable = ['id', 'parentid', 'siteid', 'code', 'label', 'icon', 'logo', 'config', 'supplierid', 'theme', 'level', 'nleft', 'nright', 'status', 'mtime', 'ctime', 'editor'];
}

