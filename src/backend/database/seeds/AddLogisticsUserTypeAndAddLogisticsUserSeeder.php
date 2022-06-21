<?php

use Carbon\Carbon;
use App\Models\User;
use App\Models\UserType;
use App\Models\UserStatus;
use Illuminate\Database\Seeder;

class AddLogisticsUserTypeAndAddLogisticsUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data =  [
            'name' => 'Logistics',
            'dashboard_url' => '/logistics/dashboard',
            'type_alias' => ''
        ];

        $status = UserStatus::where('name', config('user.statuses.active'))->first();
        $logisticUserType = UserType::create($data);

        User::create([
            // 'account_code' => '-',
            'username' => 'logistics@sprobe.com',
            'email' => 'logistics@sprobe.com',
            'contact_num' => '12345678',
            'password' => Hash::make('Password2021!'),
            // 'company_id' => '1',  // maybe can be removed?
            'first_name' => 'logistics',
            'last_name' => 'admin',
            'user_status_id' => $status->id,
            'user_type_id' => $logisticUserType->id,
            'email_verified_at' => Carbon::now(),
            'name' => 'Logistics Admin',
            ]
        );
    }
}
