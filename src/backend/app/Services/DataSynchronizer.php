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
        unset($formattedData['Name']);
        unset($formattedData['Email']);
        if ($request['currentAdminInSF']) {
            $sfResponse = (new Contact)->update($formattedData, $contactID);
            if (isset($sfResponse['status']) && !$sfResponse['status']) {
                return MessageResult::error('Error on updating admin details');
            }
        }

        $dbResponse = $this->mysql->updateAdminDetails($contactID, $formattedData, true);
        if (!$dbResponse) {
            return MessageResult::error('Error on updating admin details');
        }

        $formattedData = [
            'Name' => $request['companyDetails']['Name'],
            'Phone' => $request['companyDetails']['Phone'],
            'Website' => $request['companyDetails']['Website'],
            'Industry' => $request['companyDetails']['Industry'],
            'BillingPostalCode' => $request['companyDetails']['BillingPostalCode'],
            'BillingStreet' => $request['companyDetails']['BillingStreet'],
            'BillingCity' => $request['companyDetails']['BillingCity'],
            'BillingState' => $request['companyDetails']['BillingState'],
            'BillingCountry' => $request['companyDetails']['BillingCountry'],
        ];
        $sfResponse = (new Account)->update($formattedData, $companyID);
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            return $sfResponse;
        }
        $dbFormattedData = [
            'name' => $request['companyDetails']['Name'],
            'contact_num' => $request['companyDetails']['Phone'],
            'website' => $request['companyDetails']['Website'],
            'industry' => $request['companyDetails']['Industry'],
            'billing_street' => $request['companyDetails']['BillingStreet'],
            'billing_city' => $request['companyDetails']['BillingCity'],
            'billing_state' => $request['companyDetails']['BillingState'],
            'billing_postal_code' => $request['companyDetails']['BillingPostalCode'],
            'billing_country' => $request['companyDetails']['BillingCountry'],
        ];

        $dbResponse = $this->mysql->updateCompanyDetails($companyID, $dbFormattedData, true);
        if (!$dbResponse) {
            return MessageResult::error('Error on updating company details');
        }
        Session::forget("companyName");
        Session::put('companyName', $request['companyDetails']['Name']);
        Session::forget("CompanyContactLastname");
        Session::put('CompanyContactLastname', $request['adminDetails']['LastName']);
        Session::forget("CompanyContactFirstname");
        Session::put('CompanyContactFirstname', $request['adminDetails']['FirstName']);
        Cache::forget("{$companyID}:company:details");
        Cache::forget("{$companyID}:admin:details");

        return MessageResult::success('Data synchronization success!');
    }

    public function getUpdatedDataForEditCompanyDetails($companyID, $contactID)
    {
        $companyInformation = (new Account)->findByID($companyID);
        $adminInformation =(new Contact)->getAdminByContactId($contactID);
        return [
            'company' => $companyInformation,
            'admin' => $adminInformation,
        ];
    }
}
