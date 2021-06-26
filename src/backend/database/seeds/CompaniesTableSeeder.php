<?php

use Illuminate\Database\Seeder;
use App\Models\Company;
use App\Models\User;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                "id"=>'1',
                'company_code' => 'c1',
                'name' => 'Sprobe',
                'contact_num' => NULL,
                "website" => '',
                'industry' => '',
                'billing_street' => '',
                'billing_city' => '',
                'billing_state' => '',
                'billing_postal_code' => '',
                'billing_country' => '',
                'zen_org_name' => NULL,
            ],
            [
                "id"=>'2',
                'company_code' => 'c2',
                'name' => 'H&T',
                'contact_num' => NULL,
                "website" => '',
                'industry' => '',
                'billing_street' => '',
                'billing_city' => '',
                'billing_state' => '',
                'billing_postal_code' => '',
                'billing_country' => '',
                'zen_org_name' => NULL,
            ],
            [
                "id"=>'3',
                'company_code' => 'c3',
                'name' => '株式会社町田',
                'contact_num' => '031234567',
                "website" => 'https://www.h-t.co.jp',
                'industry' => '建設',
                'billing_street' => '虎ノ門4-1-28 虎ノ門タワーズオフィス17F',
                'billing_city' => '港区',
                'billing_state' => '東京都',
                'billing_postal_code' => '105-0001',
                'billing_country' => 'Japan',
                'zen_org_name' => '【】株式会社町田1',
            ]
        ];

        foreach ($data as $item) {
            Company::create($item);
        }

        User::where("account_code", '0030l00000g4k23AAA')
        ->update([
            'company_id' => 3
        ]);
        
    }
}
