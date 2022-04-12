<?php

namespace App\Services;

use App\Repositories\DatabaseRepository;
use App\Models\AimeosOrder;
use Illuminate\Support\Facades\Cache;

class OrderService
{
    public function __construct()
    {
        $this->mysql = new DatabaseRepository();
    }

    public static function getUnpaidOrders($userId)
    {
        $oCached = Cache::remember("{$userId}:unpaidOrders", now()->addMinutes(5), function () use ($userId) {
           return AimeosOrder::with(['orders' => function($q) use ($userId) {
                            $q->select('*');   
                            $q->where('customerid', '=', $userId);
                        }])->where('datepayment','=', null)->get();

        });

        return $oCached;
    }

}
