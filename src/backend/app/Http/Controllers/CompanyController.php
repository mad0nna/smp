<?php

namespace App\Http\Controllers;

use App\Services\CompanyService;
use App\Services\ContactService;
use App\Services\DataSynchronizer;
use App\Services\OpportunityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Http\Resources\CompanyResource;
use App\Http\Requests\SearchCompanyRequest;
use Exception;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CompanyController extends Controller
{
    public function getServiceUsage(CompanyService $companyService)
    {
        return $companyService->getUsageData(Session::get('salesforceCompanyID'), Session::get('kotToken'), Session::get('kotStartDate'));
    }

    public function getServiceUsageDate()
    {
        return Session::get('kotStartDate');
    }

    public function getLoggedinUser($field)
    {
        if ($field === 'lastname') {
            return Session::get('CompanyContactLastname');
        }
        if ($field === 'companyname') {
            return Session::get('companyName');
        }
    }

    public function getCompanyDetails(CompanyService $companyService)
    {
        return $companyService->getDetailsByID(Session::get('salesforceCompanyID'));
    }

    public function updateCompanyDetails(Request $request, DataSynchronizer $synchronizer)
    {
        return $synchronizer->updateCompanyAndAdminDetails($request->all(), Session::get('salesforceCompanyID'), Session::get('salesforceContactID'));
    }

    public function getCompanyAdminDetails(ContactService $contactService)
    {
        return $contactService->getCompanyAdminDetails(Session::get('salesforceCompanyID'), Session::get('salesforceContactID'));
    }

    public function getOpportunityDetails(OpportunityService $opportunityService)
    {
        return $opportunityService->getLatestKOTOpportunityDetails(Session::get('salesforceCompanyID'));
    }

    public function getUpdatedDataForEditCompanyDetails(DataSynchronizer $synchronizer)
    {
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
                'data' => CompanyResource::collection($company),
                'pageCount' => $company->total(),
                'lastPage' => $company->lastPage(),
                'message' => 'Company with admin retrieved successfully.',
                'code' => 200,
            ];

            return response()->json($this->response, $this->response['code']);
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    public function searchCompanyCode(Request $request, CompanyService $companyService)
    {
        try {
            $isExistinIdaten = $companyService->getCompanyByCode($request->code)->toArray();
            if (!empty($isExistinIdaten)) {
                return response()->json([
                    'success' => true,
                    'exists' => true,
                    'data' => 'ご入力された顧客企業コードは既に登録されています。',
                  ]);
            }
            $result = $companyService->getAllDetailsInSFByID($request->code);
            if (!$result) {
                throw new Exception('コードが見つかりません');
            }
            return response()->json([
                'success' => true,
                'exists' => false,
                'data' => CompanyResource::filterFromSFToFront($result, $request->code),
              ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'exists' => false,
                'data' => $e->getMessage(),
              ]);
        }
    }

    //should accept company id and company code
    public function searchCompanyId(Request $request, CompanyService $companyService)
    {
        $code = 200;
        try {
            $company = $companyService->getCompanyById($request->company_id);
            $result = $companyService->getAllDetailsInSFByID($company['company_code']);

            if ($result) {
                $data = $this->parseSfToDbColumn($result);
                $companyService->updateTableFromSf($request->company_id, $data); 
                $company = $companyService->getCompanyById($request->company_id); 
                $result = (new CompanyResource([]))->filterFromDbToFront($company);
            }

            $this->response = [
                'success' => true,
                'data' => $result,
            ];
        } catch (\Exception $e) {
            $code = ($e instanceof NotFoundHttpException) ? 404 : 500;
        }

        return response()->json($this->response, $code);
    }

    public function saveAddedCompany(Request $request, CompanyService $companyService)
    {
        $formData = $request->validate([
          'companyCode' => ['required', 'unique:companies,company_code']
        ]);
        $formData = $this->getRecord($request);
        $result = $companyService->addCompanyToDB($formData);

        $response = [
        'success' => $result,
      ];

        return response()->json($response, 200);
    }

    public function updateSaveAccount(Request $request, CompanyService $companyService)
    {
        $id = $request['id'];
        $formData = $this->getRecord($request);
        $admin = $this->getAdminRecord(isset($request['admin'][0]) ? array_values($request['admin'])[0] : []);        
        $result = $companyService->updateSaveAccount($id,$formData['accountId'], $formData);

        $response = [
        'success' => $result,
      ];

        return response()->json($response, $result ? 200 : 400);
    }


    public function resendEmailInvite(Request $request, CompanyService $companyService)
    {
        $result = $companyService->resendEmailInvite($request->user_id);

        $response = [
        'success' => $result,
      ];

        return response()->json($response, $result ? 200 : 400);
    }

    private function parseSfToDbColumn($data)
    {
        return [
        'company_code' => $data['KotCompanyCode__c'],
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
        'kot_billing_start_date' => $data['Field41__c'],
      ];
    }

    private function convertToLowerCase($data)
    {
        $items = [];
        foreach ($data as $col => $val) {
            if ($col == 'opportunity' && is_array($val)) { //to case items in opportunity
                foreach ($val as $c => $v) {
                    $items['opportunity'][strtolower($c)] = $v;
                }
            } elseif ($col == 'contact' && is_array($val)) {  //to case items in contact
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

    private function getRecord($request)
    {
        return [
        'accountId' => $request['id'] ?? '',
        'company_code' => $request['companyCode'] ?? '',
        'companyID' => $request['companyID'] ?? '',
        'kot_billing_start_date' => $request['kot_billing_start_date'] ?? '',
        'account_code' => $request['contactID'] ?? '',
        'name' => $request['name'] ?? '',
        'contact_num' => $request['contactNum'] ?? '',
        'website' => $request['website'] ?? '',
        'industry' => $request['industry'] ?? '',
        'industry_sub' => $request['industrySub'] ?? '',
        'industry_sub2' => $request['industrySub2'] ?? '',
        'zen_org_name' => $request['zenOrgName'] ?? '',
        'billing_street' => $request['billingStreet'] ?? '',
        'billing_city' => $request['billingCity'] ?? '',
        'billing_state' => $request['billingState'] ?? '',
        'billing_postal_code' => $request['billingPostalCode'] ?? '',
        'billing_country' => $request['billingCountry'] ?? '',
        'license_version' => $request['licenseVersion'] ?? '',
        'billing_address' => $request['billingAddress'] ?? '',
        'token' => $request['token'] ?? '',
        'contact_first_name' => $request['admin'][0]['firstName'] ?? '',
        'contact_last_name' => $request['admin'][0]['lastName'] ?? '',
        'contact_email' => $request['admin'][0]['email'] ?? '',
        'contact_contact_num' => $request['admin'][0]['contactNum'] ?? '',
        'negotiate_code' => $request['negotiateCode'] ?? '',
        'company_code' => $request['companyCode'] ?? '',
        'record_type_code' => $request['recordTypeCode'] ?? '',
        'type' => $request['type'] ?? '',
        'kot_trans_type' => $request['kotTransType'] ?? '',
        'payment_method' => $request['paymentMethod'] ?? '',
        'opportunity_code' => $request['opportunityCode'] ?? '',
        'opportunity' => $request['sfRecords']['opportunity'] ?? [],
        'token' => $request['token'] ?? '',
        'kot_billing_start_date' => $request['kotBillingStartDate'] ?? '',
      ];
    }

    private function getAdminRecord($request)
    {
        return [
          'contact_num' => $request['contactNum'] ?? '',
          'email' => $request['email'] ?? '',
          'full_name' => $request['fullName'] ?? '',
          'first_name' => $request['firstName'] ?? '',
          'last_name' => $request['lastName'] ?? '',
          'username' => $request['username'] ?? '',
          'user_type_id' => $request['userTypeId'] ?? '',
          'user_status_id' => $request['userStatusId'] ?? '',
        ];
    }

    private function getSfId($request)
    {
        return [
          'account_id' => $request['id'] ?? '',
          'contact_id' => $request['contact']['id'] ?? '',
          'opportunity_id' => $request['opportunity']['id'] ?? '',
        ];
    }
}
