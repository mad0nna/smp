<?php
namespace App\Services;

use App\Repositories\SalesforceRepository;
use App\Repositories\DatabaseRepository;
use App\Services\Utilities\MessageResult;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class DataSynchronizer
{
    public function __construct()
    {
        $this->salesForce = new SalesforceRepository();
        $this->mysql = new DatabaseRepository();
    }

    public function updateCompanyAndAdminDetails($request, $companyID, $accountID)
    {
        if (empty($companyID) || empty($accountID)) {
            return $request;
        }

        $sfResponse = $this->salesForce->updateAdminDetails($request['adminDetails'], $accountID);
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            $this->salesForce->updateCompanyDetails($request['companyDetails'], $companyID);

            return $sfResponse;
        }

        $sfResponse = $this->salesForce->updateCompanyDetails($request['companyDetails'], $companyID, true);
        if (isset($companyInformation['status']) && !$companyInformation['status']) {
            return $sfResponse;
        }

        $dbResponse = $this->mysql->updateAdminDetails($accountID, $request['adminDetails'], true);
        if (!$dbResponse) {
            return MessageResult::error('Error on updating admin details');
        }

        $dbResponse = $this->mysql->updateCompanyDetails($companyID, $request['companyDetails'], true);
        if (!$dbResponse) {
            return MessageResult::error('Error on updating company details');
        }
        Session::forget("companyName");
        Session::put('companyName', $request['companyDetails']['companyName']);
        Session::forget("CompanyContactLastname");
        Session::put('CompanyContactLastname', $request['adminDetails']['LastName']);
        Cache::forget("{$companyID}:company:details");
        Cache::forget("{$companyID}:admin:details");

        return MessageResult::success('Data synchronization success!');
    }

    public function getUpdatedDataForEditCompanyDetails($companyID)
    {
        $companyInformation = $this->salesForce->getCompanyDetailsByCompanyID($companyID);
        $adminInformation = $this->salesForce->getCompanyAdminDetails($companyID);

        return [
            'company' => $companyInformation,
            'admin' => $adminInformation,
        ];
    }
}
