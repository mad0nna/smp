<?php

use App\Models\Notification;
use Illuminate\Database\Seeder;

class NotificationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        $dt = new DateTime();
        $data = [
            [
                'id' => '1',
                'message' => 'Your card will be expired soon. Please update your credit card',
                'level' => '1',
                'created_at' => $dt,
                'updated_at' => $dt
            ]
            ];

            foreach ($data as $item) {
                Notification::create($item);
            }
    }
}
