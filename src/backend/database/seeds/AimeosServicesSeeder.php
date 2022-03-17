<?php

use App\Models\AimeosService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AimeosServicesSeeder extends Seeder
{
    public function run()
    {
        $dt = new DateTime();
        $rows = [
            [
                'siteid' => '1.',
                'type' => 'delivery',
                'code' => 'demo-pickup',
                'label' => 'Click & Collect',
                'provider' => 'Standard,Time,Supplier',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 0,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'delivery',
                'code' => 'demo-dhl',
                'label' => 'DHL',
                'provider' => 'Standard',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 1,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'delivery',
                'code' => 'demo-dhlexpress',
                'label' => 'DHL Express',
                'provider' => 'Standard',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 2,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'delivery',
                'code' => 'demo-fedex',
                'label' => 'Fedex',
                'provider' => 'Standard',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 3,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'delivery',
                'code' => 'demo-tnt',
                'label' => 'TNT',
                'provider' => 'Standard',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 4,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'payment',
                'code' => 'demo-invoice',
                'label' => 'Invoice',
                'provider' => 'PostPay',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 0,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'payment',
                'code' => 'demo-sepa',
                'label' => 'Direct debit',
                'provider' => 'DirectDebit',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 1,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'payment',
                'code' => 'demo-paypal',
                'label' => 'PayPal',
                'provider' => 'PayPalExpress',
                'start' => NULL,
                'end' => NULL,
                'config' => '{"paypalexpress.AccountEmail":"selling2@metaways.de","paypalexpress.ApiUsername":"unit_1340199666_biz_api1.yahoo.de","paypalexpress.ApiPassword":"1340199685","paypalexpress.ApiSignature":"A34BfbVoMVoHt7Sf8BlufLXS8tKcAVxmJoDiDUgBjWi455pJoZXGoJ87","paypalexpress.PaypalUrl":"https:\/\/www.sandbox.paypal.com\/webscr&cmd=_express-checkout&useraction=commit&token=%1$s","paypalexpress.ApiEndpoint":"https:\/\/api-3t.sandbox.paypal.com\/nvp"}',
                'pos' => 2,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'payment',
                'code' => 'demo-cashondelivery',
                'label' => 'Cash on delivery',
                'provider' => 'PostPay',
                'start' => NULL,
                'end' => NULL,
                'config' => '[]',
                'pos' => 3,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ],
            [
                'siteid' => '1.',
                'type' => 'payment',
                'code' => 'demo-prepay',
                'label' => 'Prepayment',
                'provider' => 'PrePay,Reduction',
                'start' => NULL,
                'end' => NULL,
                'config' => '{"reduction.basket-value-min":{"EUR":"200.00"},"reduction.percent":3}',
                'pos' => 4,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten'
            ]

        ];
        Schema::disableForeignKeyConstraints();
        DB::table('mshop_service')->truncate();
        Schema::enableForeignKeyConstraints();
           
        foreach ($rows as $row) {
            AimeosService::create($row);
        }
    }
}
