<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AimeosOrder extends Model
{
    protected $table = 'mshop_order';

    public $timestamps = false;

    protected $fillable = ['id', 'baseid', 'siteid', 'relatedid', 'type', 'datepayment', 'datedelivery', 'statuspayment', 'statusdelivery', 'cdate', 'cmonth', 'cweek', 'cwday', 'chour', 'ctime', 'mtime', 'editor'];

    public function orders()
    {
        return $this->hasOne(AimeosOrderBase::class, 'id', 'baseid');
    }

}

