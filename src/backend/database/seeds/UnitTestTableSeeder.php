<?php

use Carbon\Carbon;
use App\Models\User;
use App\Models\Company;
use App\Models\UserStatus;
use App\Models\WidgetSettings;
use Illuminate\Database\Seeder;

class UnitTestTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $companyExists = Company::where('account_id', '0010l00001IFH5GAAX')->first();

        if (!$companyExists instanceof Company) {
            $data = [
                'company_code' => 'cyolab',
                'name' => '株式会社町田',
                'contact_num' => '031234567',
                'website' => 'https://www.h-t.co.jp',
                'industry' => '建設',
                'billing_street' => '虎ノ門4-1-28 虎ノ門タワーズオフィス17F',
                'billing_city' => '港区',
                'billing_state' => '東京都',
                'billing_postal_code' => '105-0001',
                'billing_country' => 'Japan',
                'zen_org_name' => '【】株式会社町田',
                'account_id' => '0010l00001IFH5GAAX',
                'kot_billing_start_date' => '2021-05-01',
                'account_id' => '0010l00001IFH5GAAX',
                'token' => 'f7e9f5c132fd4cc197ebca87757f7fbd',
            ];

            $company = Company::create($data);
            $user = $this->_createCompanyAdmin($company->id);
            $this->_createWidgetSettings($user->id);
        } else {
            $this->command->comment('Company is already existing, seeding attempt was ignored.');
        }
    }


    /**
     * Creates a Company admin for the newly created company for unit testing
     *
     * @param int $id company id
     */
    private function _createCompanyAdmin(int $companyId)
    {
        // retrieve user status
        $status = UserStatus::where('name', config('user.statuses.active'))->first();

        $user = User::create([
            'account_code' => '0030l00000g4k23AAA',
            'username' => 'pineda.pcb@sprobe.com',
            'email' => 'pineda.pcb@sprobe.com',
            'contact_num' => '45678965',
            'password' => Hash::make('Password2021!'),
            'company_id' => $companyId,
            'name' => 'pineda.pcb@sprobe.com',
            'company_name' => '株式会社町田',
            'first_name' => 'Aurelio',
            'last_name' => 'CronaUpdated',
            'user_status_id' => $status->id,
            'user_type_id' => 3,
            'email_verified_at' => Carbon::now(),
        ]);

        return $user;
    }

    /**
     * Creates a Company admin for the newly created company for unit testing
     *
     * @param int $id user id
     */
    private function _createWidgetSettings(int $userId)
    {
        $widget = new WidgetSettings();
        $widget->coordinates = $widget->getCompanyDefaultCoordinates();
        $widget->user_id = $userId;
        $widget->save();
    }
}
