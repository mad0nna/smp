<?php

use Illuminate\Database\Seeder;
use App\Models\UserStatus;

class UserStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [];

        foreach (config('user.statuses') as $key => $value) {
            $statuses[] = ['name' => $value];
        }

        UserStatus::insert($statuses);
    }
}
