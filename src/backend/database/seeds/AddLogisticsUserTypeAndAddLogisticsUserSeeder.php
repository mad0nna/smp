<?php

use Carbon\Carbon;
use App\Models\User;
use App\Models\UserType;
use App\Models\UserStatus;
use Illuminate\Database\Seeder;

class AddLogisticsUserTypeAndAddLogisticsAdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data =  [
            'name' => 'Logistics Admin',
            'dashboard_url' => '/logistics/dashboard',
            'type_alias' => ''
        ];

        $userTypeExists = UserType::where('name', 'Logistics Admin')->first();

        if (!$userTypeExists instanceof UserType) {
            $logisticUserType = UserType::create($data);
        } else {
            $this->command->comment('User type is already existing, seeding attempt was ignored.');
        }

        $userExists = User::where('username', 'logistics@sprobe.com')->first();

        if (!$userExists instanceof User) {
            $status = UserStatus::where('name', config('user.statuses.active'))->first();

            User::create([
                // 'account_code' => '-',
                'username' => 'logistics@sprobe.com',
                'email' => 'logistics@sprobe.com',
                'contact_num' => '12345678',
                'password' => Hash::make('Password2021!'),
                // 'company_id' => '1',  // maybe can be removed?
                'first_name' => 'Logistics',
                'last_name' => 'Admin',
                'user_status_id' => $status->id,
                'user_type_id' => $logisticUserType->id,
                'email_verified_at' => Carbon::now(),
                'name' => 'Logistics Admin',
                ]
            );
        } else {
            $this->command->comment('User is already existing, seeding attempt was ignored.');
        }
    }
}
