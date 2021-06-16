<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\CompanyService;
use App\Services\ContactService;
use App\Services\DataSynchronizer;
use App\Services\OpportunityService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

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
}
