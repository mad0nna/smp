<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductStock extends Model
{
    protected $table = 'mshop_stock';
    public $timestamps = false;
    
    protected $fillable = [        
        'siteid',
        'prodid',
        'type',
        'stocklevel',
        'backdate',
        'timeframe',
        'mtime',
        'ctime',
        'editor',
    ];
}
