<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosLocale extends Model
{
    protected $table = 'mshop_locale';

    public $timestamps = false;

    protected $fillable = ['id', 'siteid', 'langid', 'currencyid', 'pos', 'status', 'mtime', 'ctime', 'editor'];
}

