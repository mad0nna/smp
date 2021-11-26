<?php

namespace App\Console\Commands;

use App\Models\Company;
use App\Models\Notification;
use App\Models\NotificationTarget;
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
        
        $companies = Company::leftJoin('opportunities', 'opportunities.company_id', '=', 'company_id')
        ->leftJoin('users', 'users.company_id', '=', 'companies.id')
        ->where('expmm', date("m"))
        ->where('expyr', date("y"))
        ->where('company_code', "!=", 'Sprobe')
        ->where('status', 'active')
        ->select('users.id')
        ->get()->toArray();

        foreach($companies as $companyWithExpiringCard) {
            NotificationTarget::create([
                'user_id' => $companyWithExpiringCard['id'],
                'notification_type' => 'payment',
                'notification_id'=> '1',
                'notification_seen_timestamp' => null,
                'article_id' => null,
                'article_seen_timestamp' => null
            ]);
        }
    }

}
