<?php

use Illuminate\Database\Seeder;
use App\Models\Opportunity;

class OpportunityTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        Opportunity::create([
            'id' => 1,
            'opportunity_code' => '0060l00000Iv5ffAAB',
            'negotiate_code' => '0060l00000Iv5ff',
            'company_id' => 3,
            'record_type_code' => '01210000000QSBPAA4',
            'amount' => '1000',
            'type' => 'KOT - ASP',
            'name' => '株式会社町田-kot',
            'stage' => '展開中',
            'zen_negotiate_owner' => 'test zen owner',
            'sf_created_date' => '2021-05-28 09:07:37',
        ]);
    }
}
