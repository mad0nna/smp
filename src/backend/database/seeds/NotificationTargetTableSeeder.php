<?php

use Illuminate\Database\Seeder;
use App\Models\NotificationTarget;

class NotificationTargetTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        NotificationTarget::create([
            'user_id' => 3,
            'notification_type' => 'zendesk',
            'article_id' => 360038337374,
            'article_seen_timestamp' => '2021-01-21 06:30:38'
        ]);
    }
}
