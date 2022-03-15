<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosOrderBase extends Model
{
    protected $table = 'mshop_order_base';

    public $timestamps = false;

    protected $fillable = ['id', 'siteid', 'customerid', 'sitecode', 'langid', 'currencyid', 'price', 'costs', 'rebate', 'tax', 'taxflag', 'customerref', 'comment', 'ctime', 'mtime', 'editor'];

}

