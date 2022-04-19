<?php

use App\Models\AimeosUserGroup;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AimeosUserGroupAndSettingsSeeder extends Seeder
{
    public function run()
    {
        $this->call(AimeosLocaleCurrencySeeder::class);
        $this->call(AimeosPluginSeeder::class);
        $this->call(AimeosServicesSeeder::class);
        $this->call(AimeosUserGroupSeeder::class);
    }
}
