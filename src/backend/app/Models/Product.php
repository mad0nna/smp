<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'mshop_product';
    public $timestamps = false;

    protected $fillable = [
        'type',
        'code',
        'label',
        'url',
        'barcode',
        'standard1',
        'standard2',
        'delivery_slip_display',
        'inventory_alert_qty',
        'siteid',
        'dataset',
        'config',
        'scale',
        'rating',
        'ratings',
        'instock',
        'status',
        'mtime',
        'ctime',
        'editor',
        'target'
    ];
}
