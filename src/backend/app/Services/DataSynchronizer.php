<?php
namespace App\Services;

use App\Repositories\DatabaseRepository;
use App\Services\API\Salesforce\Model\Account;
use App\Services\API\Salesforce\Model\Contact;
use App\Services\Utilities\MessageResult;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class DataSynchronizer
{
    public function __construct()
    {
        $this->mysql = new DatabaseRepository();
    }

    public function updateCompanyAndAdminDetails($request, $companyID, $contactID)
    {
        if (empty($companyID) || empty($contactID)) {
            return $request;
        }
        $formattedData = $request['adminDetails'];
        unset($formattedData['Id']);
        unset($formattedData['CreatedDate']);
        unset($formattedData['Name']);
        $sfResponse = (new Contact)->update($formattedData, $contactID);
        if (isset($sfResponse['status']) && !$sfResponse['status']) {
            return MessageResult::error('Error on updating admin details');
        }

        $dbResponse = $this->mysql->updateAdminDetails($contactID, $request['adminDetails'], true);
        if (!$dbResponse) {
            return MessageResult::error('Error on updating admin details');
        }

        $formattedData = [
            'Name' => $request['companyDetails']['companyName'],
            'Phone' => $request['companyDetails']['contactNumber'],
            'Website' => $request['companyDetails']['website'],
            'Industry' => $request['companyDetails']['industry'],
            'BillingPostalCode' => $request['companyDetails']['postalCode'],
            'BillingStreet' => $request['companyDetails']['street'],
            'BillingCity' => $request['companyDetails']['city'],
            'BillingState' => $request['companyDetails']['state'],
            'BillingCountry' => $request['companyDetails']['country'],
        ];
        $sfResponse = (new Account)->update($formattedData, $companyID);
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            return $sfResponse;
        }

        $dbResponse = $this->mysql->updateCompanyDetails($companyID, $request['companyDetails'], true);
        if (!$dbResponse) {
            return MessageResult::error('Error on updating company details');
        }
        Session::forget("companyName");
        Session::put('companyName', $request['companyDetails']['companyName']);
        Session::forget("CompanyContactLastname");
        Session::put('CompanyContactLastname', $request['adminDetails']['LastName']);
        Session::forget("CompanyContactFirstname");
        Session::put('CompanyContactFirstname', $request['adminDetails']['FirstName']);
        Cache::forget("{$companyID}:company:details");
        Cache::forget("{$companyID}:admin:details");

        return MessageResult::success('Data synchronization success!');
    }

    public function getUpdatedDataForEditCompanyDetails($companyID)
    {
        $companyInformation = (new Account)->findByID($companyID);
        $adminInformation =(new Contact)->getAdminByAccountId($companyID);
        return [
            'company' => $companyInformation,
            'admin' => $adminInformation,
        ];
    }
}
