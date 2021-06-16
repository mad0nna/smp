<?php

use Illuminate\Database\Seeder;
use App\Models\UserStatus;
use App\Models\UserType;

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

        $types = [];

        foreach (config('user.types') as $type) {
            $types[] = $type;
        }

        UserType::insert($types);
    }
}
