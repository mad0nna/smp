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
                'message' => 'ご登録のクレジットカードの有効期限が間もなく切れます。更新を行ってください。',
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
