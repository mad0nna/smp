<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Repositories\DatabaseRepository;
use App\Repositories\KOTRepository;
use Illuminate\Support\Facades\Cache;
use App\Models\Company;
use App\Models\User;
use App\Mail\NotifyAddedCompanySuperAdminUser;
use App\Http\Controllers\BillingController;
use App\Models\Opportunity as ModelsOpportunity;
use App\Services\API\Salesforce\Model\Account;
use App\Services\API\Salesforce\Model\Contact;
use App\Services\API\Salesforce\Model\Opportunity;
use Illuminate\Support\Facades\Log;

class CompanyService
{
    public function __construct()
    {
        $this->mysql = new DatabaseRepository();
        $this->company = new Company();
    }

    public function getUsageData($companyID, $kotToken, $kotUsageData)
    {
        $usage = Cache::remember("{$companyID}:serviceUsage:data", now()->addHour(), function () use ($companyID, $kotUsageData, $kotToken) {
            $usageData = [
                'serviceUsageDate' => '',
                'numberOfEmployees' => 0, //Get qty from Zoura data usage
                'numberOfSubscribers' => 0, // Get from Salesforce projected users
                'numberOfActiveKOTUsers' => 0, // Get total registered users from KOT
            ];

            try {
                $usageData['serviceUsageDate'] = $kotUsageData;
                $usageData['numberOfSubscribers'] = $this->getNumberSubscribers($companyID);
                $usageData['numberOfActiveKOTUsers'] = (int)(new KOTRepository)->getAllQtyEmployees($kotToken, date("Y-m-d", strtotime("last day of previous month")));
                $invoice = (new BillingController)->getLatestInvoiceDetails($companyID);

                if ($invoice) {
                    $usageData['numberOfEmployees'] = $invoice['quantity'];
                }

                return $usageData;

            } catch(\Exception $e) {
                return $e->getMessage();
            }
        });

        return $usage;
    }

    public function getNumberSubscribers($companyID)
    {
        $subscribersCount = Cache::remember("{$companyID}:subscribersCount:data", now()->addHour(), function () use ($companyID) {
            $companySubscription = (new Opportunity)->getNumberOfSubscriber($companyID);
            if (empty($companySubscription)) {
                Log::error('Did not find Opportunity type KING OF TIME 勤怠管理  in salesforce');
                return false;
            }
            $companySubscription = reset($companySubscription);

            return $companySubscription['KoT_regardingusercount__c'];
        });

        return $subscribersCount;
    }


    public function getDetailsByID($companyID)
    {
        $companyDetails = Cache::remember("{$companyID}:company:details", now()->addMinutes(5), function () use ($companyID) {
            $companyInformation = $this->mysql->getCompanyDetailsByID($companyID);
            if (!empty($companyInformation)) {
                return reset($companyInformation);
            }
            return (new Account)->findByID($companyID);
        });

        return json_encode($companyDetails);
    }

    public function getAllDetailsInSFByID($companyID)
    {
        $companyInformation = (new Account)->findByCompanyCode($companyID);
        if ($companyInformation) {
            $adminDetails = (new Contact)->getAdminByAccountId($companyInformation['Id']);
            $opportunity = (new Opportunity)->getNumberOfSubscriber($companyInformation['Id']);
            $companyInformation['contact'] = $adminDetails;
            $companyInformation['opportunity'] = $opportunity;

            return $companyInformation;
        }

        return false;
    }

    public function getCompanyByCode($company_code)
    {
        return $this->company->with(['users'])->with('opportunities')->where('company_code', '=', $company_code)->get();
    }

    public function getCompanyById($id)
    {
        return $this->company->with(['users'])->with('opportunities')->find($id);
    }

    public function getCompaniesWithAdminUser($conditions)
    {
        // default to 1 if page not provided
        $page = 1;
        $limit = config('search.results_per_page');

        if (array_key_exists('page', $conditions) === true) {
            $page = $conditions['page'];
        }

        if (array_key_exists('limit', $conditions) === true) {
            $limit = $conditions['limit'];
        }

        $skip = ($page > 1) ? ($page * $limit - $limit) : 0;
        if (array_key_exists('keyword', $conditions) && strlen($conditions['keyword'])) {
            $results = $this->company->whereHas('users', function ($query) use ($conditions)  {
                return $query
                        ->where(function ($query) {
                            $query->where('user_type_id', '!=', 1);
                        })
                        ->where(function ($query) use ($conditions) {
                        $query->where('name', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('company_code', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('industry', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('companies.contact_num', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('users.email', 'LIKE', "%{$conditions['keyword']}%");
                        })
                        ->select(['users.id AS user_id', 'users.contact_num as user_contact_num', 'companies.*']);
            })->skip($skip)->orderBy('companies.id', 'desc')->paginate($limit);
        } else {
            $results =  $this->company->whereHas('users', function ($query)  {
                return $query->where('user_type_id', '!=', 1);
            })
            ->skip($skip)
            ->orderBy('companies.id', 'desc')
            ->paginate($limit);
        }     

        // append query to pagination routes
        $results->withPath('/admin/accounts?' . http_build_query([
                        'keyword' => $conditions['keyword'],
                        'limit' => $limit,
                    ])
                );

        return $results;
    }


    public function addCompanyToDB($data)
    {
        $user = new User();
        $company = new Company();
        $opportunity = new ModelsOpportunity();
        DB::beginTransaction();

        try {
            $data['status'] = 'active';
            $data['account_id'] = $data["companyID"];
            $_company = $company->create($data);
            $pw = substr(md5(microtime()), rand(0, 26), 8);
            $pw_hash = Hash::make($pw);
            $invite_token = Hash::make(time() . uniqid());

            if (!$data['contact_email']) {
                return false;
            }
            $userData = [
                'company_id' => $_company->id,
                'username' => $data['contact_email'],
                'email' => $data['contact_email'],
                'password' => $pw_hash,
                'first_name' => $data['contact_first_name'],
                'last_name' => $data['contact_last_name'],
                'contact_num' => $data['contact_contact_num'],
                'user_type_id' => 3,
                'user_status_id' => 5,
                'temp_pw' => $pw,
                'invite_token' => $invite_token,
                'company_name' => $data['name'],
                'account_code' => $data['account_code'],
                'name' => $data['contact_email']
            ];
            $_user = $user->create($userData);
            $this->mysql->makeUserWidgetSettings($_user->id);
            Mail::to($data['contact_email'])->send(new NotifyAddedCompanySuperAdminUser($userData, $pw, $invite_token));

            if (isset($data['opportunity'])) {
                $formDataOpportunity = [
                    'opportunity_code' => $data['opportunity'][0]['Id'],
                    'negotiate_code' => $data['opportunity'][0]['ID__c'],
                    'company_id' => $_company->id,
                    'record_type_code' => $data['opportunity'][0]['RecordTypeId'],
                    'amount' => $data['opportunity'][0]['Amount'],
                    'type' => $data['opportunity'][0]['Type'],
                    'name' => $data['opportunity'][0]['Name'],
                    'stage' => $data['opportunity'][0]['StageName'],
                    'zen_negotiate_owner' => $data['opportunity'][0]['Zen__c'],
                    'payment_method' => $data['opportunity'][0]['KoT_shiharaihouhou__c'],
                    'sf_created_date' => isset($data['opportunity']) ? date('Y-m-d H:i:s', strtotime($data['opportunity'][0]['CreatedDate'])) : '',
                ];
                $opportunity->create($formDataOpportunity);
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();

            throw $e;
        }

        return true;
    }

    public function updateTableFromSf($id, $data)
    {
        try {
            return Company::findOrfail($id)->update($data);
        } catch (\Exception $e) {
            throw $e;
        }
    }

    public function updateSaveAccount($dbId, $data)
    {
        DB::beginTransaction();

        try {
            $status = ['status' => false];
            $company = Company::findOrfail($dbId)->update($data);
            if ($data['sfAccountId'] && $company) {
                $formattedData = [
                    'Name' => $data['name'],
                    'Phone' => $data['contact_num'],
                    'Website' => $data['website'],
                    'Industry' => $data['industry'],
                    'BillingPostalCode' => $data['billing_postal_code'],
                    'BillingStreet' => $data['billing_street'],
                    'BillingCity' => $data['billing_city'],
                    'BillingState' => $data['billing_state'],
                    'BillingCountry' => $data['billing_country'],
                ];
                $status = (new Account)->update($formattedData, $data['sfAccountId']);
            }

            DB::commit();
            return $status;
        } catch (\Exception $e) {
            DB::rollback();

            throw $e;
        }

        return $company;
    }

    public function resendEmailInvite($user_id)
    {
        $user = User::findOrFail($user_id);
        Mail::to($user->email)->send(new NotifyAddedCompanySuperAdminUser($user, $user->temp_pw, $user->invite_token));

        return true;
    }
}
