<?php

use App\Models\AimeosLocale;
use App\Models\AimeosLocaleSite;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AimeosLocaleCurrencySeeder extends Seeder
{
    public function run()
    {
        $dt = new DateTime();

        Schema::disableForeignKeyConstraints();
        DB::table('mshop_locale')->truncate();
        DB::table('mshop_locale_site')->truncate();

        $rows = [
            [
                'id' => 1,
                'siteid' => '1.',
                'langid' => 'en',
                'currencyid' => 'EUR',
                'pos' => 0,
                'status' => 0,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ],
            [
                'id' => 2,
                'siteid' => '1.',
                'langid' => 'ja',
                'currencyid' => 'JPY',
                'pos' => 0,
                'status' => 1,
                'mtime' => $dt,
                'ctime' => $dt,
                'editor' => 'idaten',
            ]
        ];

        foreach ($rows as $row) {
            AimeosLocale::create($row);
        }

        AimeosLocaleSite::create([
            'id' => 1,
            'parentid' => 0,
            'siteid' => '1.',
            'code' => 'default',
            'label' => 'default',
            'icon' => '',
            'config' => '{}',
            'supplierid' => '',
            'theme' => '',
            'level' => 0,
            'nleft' => 1,
            'nright' => 2,
            'status' => 1,
            'mtime' => $dt,
            'ctime' => $dt,
            'editor' => 'idaten',
        ]);

        DB::table('mshop_locale_currency')->where('id', 'JPY')->update(['status' => 1]);
        DB::table('mshop_locale_language')->where('id', 'ja')->update(['status' => 1]);
        

        Schema::enableForeignKeyConstraints();
    }
}
