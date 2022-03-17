<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CatalogList extends Model
{
    protected $table = 'mshop_catalog_list';
    public $timestamps = false;
    
    protected $fillable = [
        'parentid',     
        'siteid',
        'key',
        'type',
        'domain',
        'refid',
        'config',
        'pos',
        'status',
        'mtime',
        'ctime',
        'editor',
    ];
}
