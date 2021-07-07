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
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

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
      $code = 200;

      try {
        $result = $companyService->getAllDetailsInSFByID($request->code); 
    
        if (!$result) {
          throw new NotFoundHttpException('No records found.');
        }

        // $data = (new CompanyResource([]))->filterFromSFToFront($result, $request->code);      
      
        $this->response = [
          'success' => true,
          'data'    => (new CompanyResource([]))->filterFromSFToFront($result, $request->code)
        ];
      } catch(\Exception $e) {
        $code = ($e instanceof NotFoundHttpException) ? 404 : 500;
      }

      return response()->json($this->response, $code);
    }

    //should accept company id and company code
    public function searchCompanyId(Request $request, CompanyService $companyService)
    {
      $code = 200;

      try {
        $result = $companyService->getAllDetailsInSFByID($request->code);
    
        if ($result) {
          // throw new NotFoundHttpException('No records found.');
          $data = $this->parseSfToDbColumn($result);
          $companyService->updateTableFromSf($request->company_id, $data);
          $data['id'] = $request->company_id;
          $data['company_code'] = $request->code;

          $result = (new CompanyResource([]))->filterFromDbToFront($data);
        } else {
          
          $company = $companyService->getCompanyById($request->company_id);
          $result = CompanyResource::collection($company)[0];
        }

        $this->response = [
          'success' => true,
          'data'    =>  $result
        ];
      } catch(\Exception $e) {
        $code = ($e instanceof NotFoundHttpException) ? 404 : 500;
      }

      return response()->json($this->response, $code);
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

      $formData['number_of_employees'] = $request['sfRecords']['numberofemployees'];

      $result = $companyService->updateSaveAccount($id, $sf_id, $formData, $sf_record);

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

    private  function parseSfToDbColumn($data) 
    {
      return [
        'account_id' => $data['Id'],
        'name' => $data['Name'],
        'contact_num' => $data['Phone'],
        'website' => $data['Website'],
        'industry' => $data['Industry'],
        'industry_sub' => $data['Field19__c'],
        'industry_sub2' => $data['Field20__c'],
        'zen_org_name' => $data['Zendeskaccount__c'],
        'billing_street' => $data['BillingStreet'],
        'billing_city' => $data['BillingCity'],
        'billing_state' => $data['BillingState'],
        'billing_postal_code' => $data['BillingPostalCode'],
        'billing_country' => $data['BillingCountry'],
        'payment_method' => $data['PaymentMethod__c'],
        'kot_trans_type' => $data['KOT_shubetsu__c'],
        'industry_sub' => $data['Field19__c'],
        'industry_sub2' => $data['Field20__c'],
        'record_type_code' => $data['Field35__c'],        
        'sf_records' => $this->convertToLowerCase($data),
      ];
    }

    private function convertToLowerCase($data) {
      $items = [];
      foreach ($data as $col => $val) {
          
          if ($col == 'opportunity' && is_array($val)) { //to case items in opportunity   
              foreach ($val as $c => $v) {                    
                  $items['opportunity'][strtolower($c)] = $v;
              }
          } else if ($col == 'contact' && is_array($val)) {  //to case items in contact
              foreach ($val as $c => $v) {                
                  $items['contact'][strtolower($c)] = $v;
              }
          } else {
              $items[strtolower($col)] = $val;
          }
      }

      if (isset($items['opportunity']['attributes'])) {
          unset($items['opportunity']['attributes']);
      }
      if (isset($items['contact']['attributes'])) {
          unset($items['contact']['attributes']);
      }

      return $items;
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
