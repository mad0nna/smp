<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Company;
use App\Models\User;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\UserResource;
use App\Services\API\Salesforce\Model\Account;
use App\Services\API\Salesforce\Model\Contact;
use App\Services\API\Salesforce\Model\Opportunity;

class SalesforceSync extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'salesforce:sync';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Call all db company with users record and request to salesforce and update local db from pulled data.';

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
    public function handle(Company $company)
    {
        $companies = $company->with(['users' => function ($query) {
            $query->where('user_type_id', '>', 2)->where('user_status_id', '=', 1)->get();
        }])->get();

        try {
            foreach ($companies as $c) {
                $company = (new Account)->findByID($c['account_id']);

                if (is_array($company)) {
                    $adminDetails = (new Contact)->getAdminByAccountId($company['Id']);
                    $opportunity = (new Opportunity)->getNumberOfSubscriber($company['Id']);

                    if (is_array($adminDetails)) {
                        $company['contact'] = $adminDetails;
                    }

                    if (is_array($opportunity)) {
                        $company['opportunity'] = $opportunity;
                    }
                    $_company = CompanyResource::parseSfCompanyColumnToDbColumn($company);
                    $result1 = Company::find($c['id'])->update($_company);

                    foreach ($c['users'] as $u) {
                        if ($u['account_code']) {
                            $user = (new Contact)->findByAccountID($u['account_code']);
                            if ($user) {
                                $_user = UserResource::parseSfContactColumnToDbColumn($user);
                                $result2 = User::find($u['id'])->update($_user);
                            }
                        }
                    }
                }
            }
            $this->info('Database successfully sync from salesforce pulled records.');
        } catch (Exception $e) {
            $this->info('Error while syncing records.');

            throw $e;
        }
    }
}
