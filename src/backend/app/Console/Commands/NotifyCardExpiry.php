<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\Notification;
use App\Models\NotificationTarget;
use App\Models\Opportunity;
use Illuminate\Console\Command;

class NotifyCardExpiry extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notify:cardExpiry';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $companies = Company::with(['opportunities' => function ($query) {
            $query->where('expmm', date("m"))
            ->where('expyr', date("y"))
            ->get();
        }, 'users'])
        ->get()
        ->toArray();

        foreach ($companies as $key => $company) {
            if(empty($company['opportunities'])) {
                continue;
            }
            foreach ($company['users'] as $key => $user) {
                NotificationTarget::create([
                    'user_id' => $user['id'],
                    'notification_type' => 'payment',
                    'notification_id'=> '1',
                    'notification_seen_timestamp' => null,
                    'article_id' => null,
                    'article_seen_timestamp' => null
                ]);
            }
        }
    }

}
