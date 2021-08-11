<?php

use Carbon\Carbon;
use App\Models\User;
use App\Models\UserStatus;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // retrieve user status
        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        // create the system admin
        $this->_createSystemAdmin();

        //create the HT admin
        $this->_createHTAdmin();

        //create the Company admin
        $this->_createCompanyAdmin();
    }

    private function _createSystemAdmin()
    {
        // retrieve user status
        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        // create the system admin
        User::create([
            'account_code' => '0030l00000g5JSjAAM',
            'username' => 'admin@tcg.sprobe.ph',
            'email' => 'admin@tcg.sprobe.ph',
            'contact_num' => '123',
            'password' => Hash::make('Password2021!'),
            'company_id' => '1',
            'first_name' => 'sprobe',
            'last_name' => 'admin',
            'user_status_id' => $status->id,
            'user_type_id' => '1',
            'email_verified_at' => Carbon::now(),
        ]);
    }

    private function _createHTAdmin()
    {
        // retrieve user status
        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        User::create([
            'account_code' => '0030l00000g4wweAAA',
            'username' => 'susumu@gmail.com',
            'email' => 'susumu@gmail.com',
            'contact_num' => '1234',
            'password' => Hash::make('Password2021!'),
            'company_id' => '2',
            'first_name' => 'Tomeoku',
            'last_name' => 'Susumu',
            'user_status_id' => $status->id,
            'user_type_id' => '2',
            'email_verified_at' => Carbon::now(),
        ]);
    }

    private function _createCompanyAdmin()
    {
        // retrieve user status
        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        User::create([
            'account_code' => '0030l00000g4k23AAA',
            'username' => 'machida@tcg.sprobe.ph',
            'email' => 'machida@tcg.sprobe.ph',
            'contact_num' => '12345',
            'password' => Hash::make('Password2021!'),
            'company_id' => '3',
            'first_name' => 'Allan',
            'last_name' => 'Brock',
            'user_status_id' => $status->id,
            'user_type_id' => '3',
            'email_verified_at' => Carbon::now(),
        ]);
    }
}
