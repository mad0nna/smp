<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Company;
use App\Models\User;
use App\Models\Opportunity as ModelsOpportunity;
use App\Http\Resources\CompanyResource;
use App\Http\Resources\OpportunityResource;
use App\Http\Resources\UserResource;
use App\Services\API\Salesforce\Model\Account;
use App\Services\API\Salesforce\Model\Contact;
use App\Services\API\Salesforce\Model\Opportunity;
use Illuminate\Support\Facades\Log;

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
    public function handle()
    {
        $companies = Company::with(['users' => function ($query) {
            $query->where('user_type_id', '>', 2)
            ->where('account_code', '!=', "")
            ->get();
        }])
        ->with(['opportunities'])
        ->where('id', '>', 1)
        ->get()
        ->toArray();
            foreach ($companies as $c) {
                try {
                    // Sync the COMPANY DATA from Salesforce to SMP Database
                    $companyData = (new Account)->findByID($c['account_id']);
                    $parsedCompanyData = CompanyResource::parseSfCompanyColumnToDbColumn($companyData);
                    Company::where('account_id', $parsedCompanyData['account_id'])->update($parsedCompanyData);
                    
                    // Sync the OPPORTUNITY DATA from Salesforce to SMP Database
                    $opportunityData = (new Opportunity)->getNumberOfSubscriber($c['account_id']);
                    $opportunityData = reset($opportunityData);
                    $parsedOpportunityData = OpportunityResource::parseSFOpportunityColumnToDbColumn($opportunityData);
                    ModelsOpportunity::where('opportunity_code', $parsedOpportunityData['opportunity_code'])->update($parsedOpportunityData);

                    // Sync the USER DATA from Salesforce to SMP Database
                    foreach($c['users'] as $key => $u) {
                        $user = (new Contact)->findByAccountID($u['account_code']);
                        $parsedUserData = UserResource::parseSfContactColumnToDbColumn($user);
                        $parsedUserData['company_name'] = $parsedCompanyData['name'];
                        User::where('account_code', $parsedUserData['account_code'])->update($parsedUserData);
                    }
                    $this->info('Database successfully sync from salesforce pulled records.');
                } catch (\Exception $e) {
                    Log::error('Error while requesting to sf the account of '.$c['account_id'].' Error: '.$e->getMessage());
                }
            }
    }
}
