<?php
namespace App\Services;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Hash;
use App\Repositories\SalesforceRepository;
use App\Repositories\DatabaseRepository;
use App\Repositories\KOTRepository;
use Illuminate\Support\Facades\Cache;
use App\Models\Company;
use App\Models\User;
use App\Models\Opportunity;
use App\Mail\NotifyAddedCompanySuperAdminUser;
use App\Http\Controllers\BillingController;
use Exception;

class CompanyService
{
    public function __construct()
    {
        $this->salesForce = new SalesforceRepository();
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
    
                if (date("Y-m-d") === date("Y-m-d", strtotime("first day of this month")) && (int)date("H") < 10) {       
                    $usageData['numberOfActiveKOTUsers'] = (int)(new KOTRepository)->getAllQtyEmployees($kotToken, date("Y-m-d", strtotime('-2 month')));
                    $billing = (new BillingController)->getAccountUsage($companyID, date("Y-m", strtotime('-2 month')));
                    
                    if ($billing) {
                        $usageData['numberOfEmployees'] = $billing['quantity'];
                    }
                } else {
                    $usageData['numberOfActiveKOTUsers'] = (int)(new KOTRepository)->getAllQtyEmployees($kotToken, date("Y-m-d", strtotime("last day of previous month")));
                    $billing = (new BillingController)->getAccountUsage($companyID, date("Y-m", strtotime("last day of previous month")));

                    if ($billing) {
                        $usageData['numberOfEmployees'] = $billing['quantity'];
                    }
                }

                return $usageData;

            } catch(Exception $e) {
                return $usageData;
            } 
            
        });

        return $usage;
    }

    public function getNumberSubscribers($companyID)
    {
        $subscribersCount = Cache::remember("{$companyID}:subscribersCount:data", now()->addHour(), function () use ($companyID) {
            $companySubscription = (new SalesforceRepository)->getCompanyTAContract($companyID);
            if (empty($companySubscription)) {
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

            return $this->salesForce->getCompanyDetailsByCompanyID($companyID);
        });

        return json_encode($companyDetails);
    }

    public function getDetailsInSFByID($companyID)
    {
        $companyInformation = json_decode($this->salesForce->getCompanyDetailsByID($companyID), true);
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            return $companyInformation;
        }
        unset($companyInformation['attributes']);

        return $companyInformation;
    }

    public function getAllDetailsInSFByID($companyID)
    {
        $companyInformation = $this->salesForce->getCompanyDetailsByID($companyID);

        if ($companyInformation) {
            $adminDetails = $this->salesForce->getCompanyAdminDetails($companyInformation['Id']);
            $opportunity = $this->salesForce->getCompanyTAContract($companyInformation['Id']);

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

        // initialize query
        $query = $this->company;

        // if keyword is provided
        if (array_key_exists('keyword', $conditions) && strlen($conditions['keyword'])) {
            $query = $query->join('users', function ($join) use ($conditions) {                
                $join->on('users.company_id', '=', 'companies.id');
            }); 
            
            $query = $query->where('name', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('company_code', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('industry', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('companies.contact_num', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('users.email', 'LIKE', "%{$conditions['keyword']}%")
                        ->select(['users.id AS user_id', 'users.contact_num as user_contact_num', 'companies.*']);

            $results = $query->with(['users' => function ($query) {            
                $query->where('user_type_id', '=', 3);
            }])->skip($skip)->orderBy('companies.id', 'desc')->paginate($limit);

        } else {
            $results = $query->with(['users' => function ($query) use ($conditions) {            
                $query->where('user_type_id', '=', 3);
            }])->skip($skip)->orderBy('companies.id', 'desc')->paginate($limit);
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
        $opportunity = new Opportunity();

        DB::beginTransaction();

        try {
            $data['status'] = 'active';
            $_company = $this->company->create($data);
            $pw = substr(md5(microtime()), rand(0, 26), 8);
            $pw_hash = Hash::make($pw);
            $invite_token = Hash::make(time() . uniqid());

            if (!$data['contact_email']) {
                return false;
            }
            $formData = [
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
                'account_code' => $data['account_code']
            ];
            $_user = $user->create($formData);
            $this->mysql->makeUserWidgetSettings($_user->id);
            Mail::to($data['contact_email'])->send(new NotifyAddedCompanySuperAdminUser($formData, $pw, $invite_token));

            if (isset($data['opportunity']) && $data['opportunity_code'] && $data['negotiate_code']) {
                $formDataOpportunity = [
                    'opportunity_code' => $data['opportunity_code'],
                    'negotiate_code' => $data['negotiate_code'],
                    'company_id' => $_company->id,
                    'record_type_code' => $data['record_type_code'],
                    'type' => $data['type'],
                    'name' => isset($data['opportunity']) ? $data['opportunity']['name'] : '',
                    'stage' => isset($data['opportunity']) ? $data['opportunity']['stagename'] : '',
                    'sf_created_date' => isset($data['opportunity']) ? date('Y-m-d H:i:s', strtotime($data['opportunity']['createddate'])) : '',

                ];
                $_opportunity = $opportunity->create($formDataOpportunity);
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
            $company = Company::findOrfail($id)->update($data);
        } catch (Exception $e) {
            throw $e;
        }

        return $company;
    }

    public function updateSaveAccount($id, $sf_id, $data, $sf_record = null)
    {
        DB::beginTransaction();

        try {
            $company = Company::findOrfail($id)->update($data);
            if ($sf_id) {
                $r1 = $this->salesForce->updateCompanyDetails($data, $sf_id, false); //default true to use sf column format, false for db column format.
            }

            DB::commit();
        } catch (Exception $e) {
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
