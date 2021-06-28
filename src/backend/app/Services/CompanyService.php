<?php
namespace App\Services;

use DB;
use Mail;
use Hash;
use App\Repositories\SalesforceRepository;
use App\Repositories\DatabaseRepository;
use Illuminate\Support\Facades\Cache;
use App\Models\Company;
use App\Models\User;
use App\Models\Opportunity;
use App\Mail\NotifyAddedCompanySuperAdminUser;
use App\Services\UserService;


class CompanyService {
    public function __construct() {
        $this->salesForce = new SalesforceRepository();
        $this->mysql = new DatabaseRepository();
        $this->company = new Company();
    }
    
    public function getDetailsByID($companyID) {
        $companyDetails = Cache::remember("{$companyID}:company:details", now()->addMinutes(5), function() use($companyID) {
            $companyInformation = $this->mysql->getCompanyDetailsByID($companyID);
            if (!empty($companyInformation)) {
                return reset($companyInformation);
            }
            return $this->salesForce->getCompanyDetailsByCompanyID($companyID);
        });
        return json_encode($companyDetails);
    }

    public function getDetailsInSFByID($companyID) {
        $companyInformation = json_decode($this->salesForce->getCompanyDetailsByID($companyID), true);       
        if (isset($companyInformation["status"]) && !$companyInformation["status"]) {
            return $companyInformation;
        }
        unset($companyInformation["attributes"]);
        return $companyInformation;
    }

    public function getAllDetailsInSFByID($companyID) {
        $companyInformation = $this->salesForce->getCompanyDetailsByID($companyID); 
        
        if ($companyInformation) {
            $adminDetails = $this->salesForce->getCompanyAdminDetails($companyInformation['Id']); 
            $opportunity = $this->salesForce->getLatestKOTOpportunityDetails($companyInformation['Id']);
        
            $companyInformation["contact"] = $adminDetails;
            $companyInformation["opportunity"] = $opportunity;

            return $companyInformation;
        } else {
            return false;
        }
    }

    public function getCompany($company_code) {
        return $this->company->with(['users'])->with('opportunities')->where('company_code', '=', $company_code)->get();
    }

    public function getCompaniesWithAdminUser($conditions) {
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
        if (array_key_exists('keyword', $conditions)) {
            $query = $query->where('name', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('company_code', 'LIKE', "%{$conditions['keyword']}%")
                        ->orWhere('contact_num', 'LIKE', "%{$conditions['keyword']}%");
        };

        // perform user search
        $results = $query->with('opportunities')->with(['users' => function ($query) {
            $query->with('type')->where('user_type_id', '=', 3)->get();
          }])->skip($skip)->orderBy('id', 'desc')->paginate($limit);

        // append query to pagination routes
        $results->withPath('/admin/accounts?' . http_build_query([
                        'keyword' => $conditions['keyword'],
                        'limit' => $limit,
                    ])
                );

        return $results;
    }
    

    public function addCompanyToDB($data) {
        $user = new User();
        $opportunity = new Opportunity();

        DB::beginTransaction();

        try {
            $data['status'] = 'active';
            $_company = $this->company->create($data);
            $pw = substr(md5(microtime()),rand(0,26),8);
            $pw_hash = Hash::make($pw);
            $invite_token = Hash::make(time() . uniqid());

            if ($data['contact_email']) {
                $formData = [
                    'company_id' => $_company->id,
                    'username' => $data['contact_email'],
                    'email' => $data['contact_email'],
                    'password' => $pw_hash,
                    'first_name' => $data['contact_first_name'],
                    'last_name' => $data['contact_last_name'],
                    'contact_num' => $data['contact_contact_num'],
                    'user_type_id' => 3,
                    'user_status_id' => 1,
                    'temp_pw' => $pw,      
                    'invite_token' => $invite_token,
                    'company_name' =>  $data['name'],
                ];
                $_user = $user->create($formData);
                Mail::to($data['contact_email'])->send(new NotifyAddedCompanySuperAdminUser($formData, $pw, $invite_token));
            
            } else {
                return false;
            }

            if (isset($data['opportunity']) && $data['opportunity_code'] &&  $data['negotiate_code'] ) {
                $formDataOpportunity = [
                    'opportunity_code' => $data['opportunity_code'],
                    'negotiate_code' => $data['negotiate_code'],
                    'company_id' => $_company->id,
                    'record_type_code' => $data['record_type_code'],
                    'type' => $data['type'], 
                    'name' => isset($data['opportunity']) ? $data['opportunity']['name'] : '', 
                    'stage' => isset($data['opportunity']) ? $data['opportunity']['stagename'] : '',     
                    'sf_created_date' => isset($data['opportunity']) ? date("Y-m-d H:i:s",strtotime($data['opportunity']['createddate'])) : '',  
                            
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

    public function updateSaveAccount($id, $sf_id, $data, $sf_record, $isPullFromSf = true) {

        DB::beginTransaction();
        try {
            $company = Company::findOrfail($id)->update($data);
            if ($isPullFromSf && $sf_id['account_id']) {
              $r1 = $this->salesForce->updateCompanyDetails($data, $sf_id['account_id'], false); //default true to use sf column format, false for db column format.
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            throw $e;
        }

        return $company;
    }

    public function resendEmailInvite($user_id) {
        $user = User::findOrFail($user_id);
        Mail::to($user->email)->send(new NotifyAddedCompanySuperAdminUser($user, $user->temp_pw, $user->invite_token));
        return true;
    }

}