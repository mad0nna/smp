<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserStatusesTableSeeder::class);
        $this->call(UserTypesTableSeeder::class);
        $this->call(CompaniesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(NotificationSeeder::class);
        // $this->call(OpportunityTableSeeder::class);
        // $this->call(widgetSettingsSeeder::class);
        // $this->call(NotificationTargetTableSeeder::class);
        // $this->call(FilesTableSeeder::class);
    }
}
