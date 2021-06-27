<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CompanyService;
use App\Services\ContactService;
use App\Services\DataSynchronizer;
use App\Services\OpportunityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Http\Resources\CompanyResource;
use App\Http\Requests\SearchCompanyRequest;

class CompanyController extends Controller
{
    public function __construct()
    {

    }
    public function getCompanyDetails(CompanyService $companyService) {
        return $companyService->getDetailsByID(Session::get('salesforceCompanyID'));
    }

    public function updateCompanyDetails(Request $request, DataSynchronizer $synchronizer) {
        return $synchronizer->updateCompanyAndAdminDetails($request->all(), Session::get('salesforceCompanyID'), Session::get("salesforceContactID"));
    }
    

    public function getCompanyAdminDetails(ContactService $contactService) {
        return $contactService->getCompanyAdminDetails(Session::get('salesforceCompanyID'), Session::get("salesforceContactID"));
    }

    public function getOpportunityDetails(OpportunityService $opportunityService) {
        return $opportunityService->getLatestKOTOpportunityDetails(Session::get('salesforceCompanyID'));
    }

    public function getUpdatedDataForEditCompanyDetails(DataSynchronizer $synchronizer) {
        return $synchronizer->getUpdatedDataForEditCompanyDetails(Session::get('salesforceCompanyID'));
    }

    public function index(SearchCompanyRequest $request, CompanyService $companyService)
    {
        $request->validated();
        try {
            $conditions = [
                'keyword' => $request->getKeyword(),
                'page' => $request->getPage(),
                'limit' => $request->getLimit(),
            ];

            $company = $companyService->getCompaniesWithAdminUser($conditions);

            $this->response = [
                'success' => true,
                'data'    => CompanyResource::collection($company),
                'pageCount' => $company->total(),
                'lastPage' => $company->lastPage(),
                'message' => 'Company with admin retrieved successfully.',
                'code'    => 200,
            ];
            
            return response()->json($this->response, $this->response['code']);

        }catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);    

    } 

    public function searchCompanyCode(Request $request, CompanyService $companyService)
    {
      $result = $companyService->getAllDetailsInSFByID($request->code); 
      if ($result) {
        $data = (new CompanyResource([]))->filterFromSFToFront($result, $request->code);
      }
      
      if (isset($request->includeCompanyDBRecord)) {
        $company = $companyService->getCompany($request->code);
        $data['id'] = $company[0]['id'];
      }

      $response = [
        'success' => true,
        'isPullFromSf' => $result ? true : false,
        'data'    => $data,
        'dbData' => (isset($request->includeCompanyDBRecord)) ? CompanyResource::collection($company) : null,
      ];

      return response()->json($response, 200);
    }

    public function saveAddedCompany(Request $request, CompanyService $companyService)
    {
      $formData = $request->validate([
          'companyCode' => ['required', 'unique:companies,company_code'],
          'name' => ['required'],
      ]);

      $formData = $this->getRecord($request);
      $result = $companyService->addCompanyToDB($formData);
 
      $response = [
        'success' => $result
      ];

      return response()->json($response, 200);
    }

    public function updateSaveAccount(Request $request, CompanyService $companyService)
    {
      $id = $request['id'];
      $formData = $this->getRecord($request);
      $admin = $this->getAdminRecord(isset($request['admin'][0]) ? array_values($request['admin'])[0] : []); 
      $sf_id = $this->getSfId($request['sfRecords']);  
      $sf_record = $request['sfRecords'];
      $formData['admin'] = $admin;

      $result = $companyService->updateSaveAccount($id, $sf_id, $formData, $sf_record, $request['isPullFromSf']);

      $response = [
        'success' => $result
      ];

      return response()->json($response, $result ? 200 : 400);
    }


    public function resendEmailInvite(Request $request, CompanyService $companyService)
    {
      $result = $companyService->resendEmailInvite($request->user_id);
 
      $response = [
        'success' => $result
      ];

      return response()->json($response, $result ? 200 : 400);
    }
    

    private  function getRecord($request) 
    {
      return [
        'company_code' => isset($request['companyCode']) ? $request['companyCode'] : '',
        'name' => isset($request['name']) ? $request['name'] : '',
        'contact_num' => isset($request['contactNum']) ? $request['contactNum'] : '',
        'website' => isset($request['website']) ? $request['website'] : '',
        'industry' => isset($request['industry']) ? $request['industry'] : '',
        'industry_sub' => isset($request['industrySub']) ? $request['industrySub'] : '',
        'industry_sub2' => isset($request['industrySub2']) ? $request['industrySub2'] : '',
        'zen_org_name' => isset($request['zenOrgName']) ? $request['zenOrgName'] : '',
        'billing_street' => isset($request['billingStreet']) ? $request['billingStreet'] : '',
        'billing_city' => isset($request['billingCity']) ? $request['billingCity'] : '',
        'billing_state' => isset($request['billingState']) ? $request['billingState'] : '',
        'billing_postal_code' => isset($request['billingPostalCode']) ? $request['billingPostalCode'] : '',
        'billing_country' => isset($request['billingCountry']) ? $request['billingCountry'] : '',
        'license_version' => isset($request['licenseVersion']) ? $request['licenseVersion'] : '',
        'billing_address' => isset($request['billingAddress']) ? $request['billingAddress'] : '',
        'token' => isset($request['token']) ? $request['token'] : '',
        'contact_first_name' => isset($request['sfRecords']['contact']['firstname']) ? $request['sfRecords']['contact']['firstname'] : '',
        'contact_last_name' => isset($request['sfRecords']['contact']['lastname']) ? $request['sfRecords']['contact']['lastname'] : '',
        'contact_email' => isset($request['sfRecords']['contact']['email']) ? $request['sfRecords']['contact']['email'] : '',
        'contact_contact_num' => isset($request['sfRecords']['contact']['mobilephone']) ? $request['sfRecords']['contact']['mobilephone'] : '',
        'account_id' => isset($request['accountId']) ? $request['accountId'] : '',
        'negotiate_code' => isset($request['negotiateCode']) ? $request['negotiateCode'] : '',
        'company_code' => isset($request['companyCode']) ? $request['companyCode'] : '',
        'record_type_code' => isset($request['recordTypeCode']) ? $request['recordTypeCode'] : '',
        'type' => isset($request['type']) ? $request['type'] : '',
        'kot_trans_type' => isset($request['kotTransType']) ? $request['kotTransType'] : '',
        'payment_method' => isset($request['paymentMethod']) ? $request['paymentMethod'] : '',
        'opportunity_code' => isset($request['opportunityCode']) ? $request['opportunityCode'] : '',
        'opportunity' => isset($request['sfRecords']['opportunity']) ? $request['sfRecords']['opportunity'] : [],
        'sf_records' => isset($request['sfRecords']) ? json_encode($request['sfRecords']) : [],

      ];

    }
  
    private function getAdminRecord($request) {
        return [
          'contact_num' => isset($request['contactNum']) ? $request['contactNum'] : '',
          'email' => isset($request['email']) ? $request['email'] : '',
          'full_name' => isset($request['fullName']) ? $request['fullName'] : '',
          'first_name' => isset($request['firstName']) ? $request['firstName'] : '',
          'last_name' => isset($request['lastName']) ? $request['lastName'] : '',
          'username' => isset($request['username']) ? $request['username'] : '',
          'user_type_id' => isset($request['userTypeId']) ? $request['userTypeId'] : '',
          'user_status_id' => isset($request['userStatusId']) ? $request['userStatusId'] : '',
        ];
    }

    private function getSfId($request) {
        return [
          'account_id' => isset($request['id']) ? $request['id'] : '',
          'contact_id' => isset($request['contact']['id']) ? $request['contact']['id'] : '',
          'opportunity_id' => isset($request['opportunity']['id']) ? $request['opportunity']['id'] : '',
        ];
    }

}
