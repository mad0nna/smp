<?php

use App\Models\AimeosPlugin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AimeosPluginSeeder extends Seeder
{
    public function run()
    {
        $dt = new DateTime();

        Schema::disableForeignKeyConstraints();
        DB::table('mshop_plugin')->truncate();

        $rows = [
            [
                'id' => 1,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Limits maximum amount of products',
                'provider' => 'ProductLimit',
                'config' => '{"single-number-max":10,"total-number-max":100,"single-value-max":{"EUR":"1000.00"},"total-value-max":{"EUR":"10000.00"}}',
                'pos' => 10,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 2,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Checks for deleted products',
                'provider' => 'ProductGone',
                'config' => '[]',
                'pos' => 20,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 3,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Checks for products out of stock',
                'provider' => 'ProductStock',
                'config' => '[]',
                'pos' => 30,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 4,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Checks for changed product prices',
                'provider' => 'ProductPrice',
                'config' => '[]',
                'pos' => 40,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 5,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Adds addresses/delivery/payment to basket',
                'provider' => 'Autofill',
                'config' => '{"address":1,"useorder":1,"orderaddress":1,"orderservice":1,"delivery":1,"payment":0}',
                'pos' => 50,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 6,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Updates delivery/payment options on basket change',
                'provider' => 'ServicesUpdate',
                'config' => '[]',
                'pos' => 60,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 7,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Free shipping above threshold',
                'provider' => 'Shipping',
                'config' => '{"threshold":{"EUR":"1.00"}}',
                'pos' => 70,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 8,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Checks for necessary basket limits',
                'provider' => 'BasketLimits',
                'config' => '{"min-products":1,"max-products":100,"min-value":{"EUR":"1.00"},"max-value":{"EUR":"10000.00"}}',
                'pos' => 80,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 9,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Country and state tax rates',
                'provider' => 'Taxrates',
                'config' => '{"country-taxrates":{"US":"5.00","AT":"20.00"},"state-taxrates":{"CA":"6.25"}}',
                'pos' => 90,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 10,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Coupon update',
                'provider' => 'Coupon',
                'config' => '[]',
                'pos' => 100,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 11,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Checks for required addresses (billing/delivery)',
                'provider' => 'AddressesAvailable',
                'config' => '{"payment":1}',
                'pos' => 110,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 12,
                'siteid' => '1.',
                'type' => 'order',
                'label' => 'Checks for required services (delivery/payment)',
                'provider' => 'ServicesAvailable',
                'config' => '{"payment":1,"delivery":1}',
                'pos' => 120,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ]
        ];

        foreach ($rows as $row) {
            AimeosPlugin::create($row);
        }

        Schema::enableForeignKeyConstraints();
    }
}
