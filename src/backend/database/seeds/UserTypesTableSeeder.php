<?php

use Illuminate\Database\Seeder;
use App\Models\UserType;

class UserTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $types = [];

        foreach (config('user.types') as $type) {
            $types[] = $type;
        }

        UserType::insert($types);
    }
}
