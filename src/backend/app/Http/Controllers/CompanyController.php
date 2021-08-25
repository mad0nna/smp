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
        $code = 200;

        try {
            $result = $companyService->getAllDetailsInSFByID($request->code);
            if (!$result) {
                throw new NotFoundHttpException('No records found.');
            }

            $this->response = [
          'success' => true,
          'data' => CompanyResource::filterFromSFToFront($result, $request->code),
        ];
        } catch (\Exception $e) {
            $code = ($e instanceof NotFoundHttpException) ? 404 : 500;
        }

        return response()->json($this->response, $code);
    }

    //should accept company id and company code
    public function searchCompanyId(Request $request, CompanyService $companyService)
    {
        $code = 200;
        try {
            if ($request->code) {
                $result = $companyService->getAllDetailsInSFByID($request->code);
            } elseif ($request->company_id) {
                $company = $companyService->getCompanyById($request->company_id);
                $result = $companyService->getAllDetailsInSFByID($company['account_id']);
            } else {
                throw new NotFoundHttpException('Incorrect parameter given.');
            }


            if ($result) {
                $data = $this->parseSfToDbColumn($result);
                $companyService->updateTableFromSf($request->company_id, $data);
                $data['id'] = $request->company_id;
                $data['company_code'] = $request->code;

                $result = (new CompanyResource([]))->filterFromDbToFront($data);
            } else {
                $result = CompanyResource::collection([$company])[0];
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
          'companyCode' => ['required', 'unique:companies,company_code'],
          'name' => ['required'],
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
        $sf_id = $this->getSfId($request['sfRecords']);
        $sf_record = $request['sfRecords'];

        $formData['number_of_employees'] = $request['sfRecords']['numberofemployees'];

        $result = $companyService->updateSaveAccount($id, $sf_id, $formData, $sf_record);

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
        'sf_records' => $this->convertToLowerCase($data),
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
        'company_code' => $request['companyCode'] ?? '',
        'companyID' => $request['companyID'] ??  '',
        'account_id' => $request['companyID'] ?? '',
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
        'contact_first_name' => $request['sfRecords']['contact']['firstname'] ?? '',
        'contact_last_name' => $request['sfRecords']['contact']['lastname'] ?? '',
        'contact_email' => $request['sfRecords']['contact']['email'] ?? '',
        'contact_contact_num' => $request['sfRecords']['contact']['mobilephone'] ?? '',
        'negotiate_code' => $request['negotiateCode'] ?? '',
        'company_code' => $request['companyCode'] ?? '',
        'record_type_code' => $request['recordTypeCode'] ?? '',
        'type' => $request['type'] ?? '',
        'kot_trans_type' => $request['kotTransType'] ?? '',
        'payment_method' => $request['paymentMethod'] ?? '',
        'opportunity_code' => $request['opportunityCode'] ?? '',
        'opportunity' => $request['sfRecords']['opportunity'] ?? [],
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
