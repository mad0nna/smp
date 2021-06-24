<?php
namespace App\Repositories;

use App\Models\Company;
use App\Models\Opportunity;
use App\Models\User;
use App\Models\Widget;
use App\Services\Utilities\MessageResult;
use App\Models\WidgetSettings;
use Exception;

class DatabaseRepository {

    public function getCompanyDetailsByID($companyID) {
        return Company::where('company_code', $companyID)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getCompanyAdminDetailsByID($companyID) {
        return User::leftjoin("companies", "companies.id", "=", "company_id")
        ->select("users.*")
        ->where("companies.company_code", $companyID)
        ->where("users.user_type_id", 3)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function updateCompanyDetails($companyID, $companyData) {
        return Company::where("company_code", $companyID)
        ->update([
            "name" => $companyData["companyName"],
            "contact_num" => $companyData["contactNumber"],
            "website" => $companyData["website"],
            "industry" => $companyData["industry"],
            "billing_postal_code" => $companyData["postalCode"],
            "billing_street" => $companyData["street"],
            "billing_city" => $companyData["city"],
            "billing_state" => $companyData["state"],
            "billing_country" => $companyData["country"],
        ]);
    }

    public function updateAdminDetails($accountID, $userData) {
        return User::where("account_code", $accountID)
        ->update([
            "first_name" => $userData["FirstName"],
            "last_name"  => $userData["LastName"],
            "email"      => $userData["Email"],
            "contact_num"=> $userData["MobilePhone"]
        ]);
    }

    public function getLatestKOTOpportunityDetails($companyID) {
        return Opportunity::leftjoin('companies', "companies.id", "=", "company_id")
        ->select("opportunities.*")
        ->where("companies.company_code", $companyID)
        ->orderBy("sf_created_date", "ASC")
        ->take(1)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getDefaultCompanyCoordinatesByID($accountID) {
        return WidgetSettings::leftjoin('users', 'users.id', '=', 'user_id')
        ->where('users.account_code', $accountID)
        ->select('widget_settings.coordinates')
        ->get()
        ->take(1)
        ->toArray();
    }

    public function saveCoordinates($newCoordinates, $accountID) {
        return WidgetSettings::rightjoin('users', 'user_id', '=', 'user_id')
        ->where('users.account_code', $accountID)
        ->update([
            'coordinates' => $newCoordinates
        ]);
    }

    public function resetCompanyCoordinates($accountID) {
        try {
            $widget = new WidgetSettings();
            $defaultCoordinates = $widget->getCompanyDefaultCoordinates();
            return WidgetSettings::rightjoin('users', 'user_id', '=', 'user_id')
            ->where('users.account_code', $accountID)
            ->update(['widget_settings.coordinates' => $defaultCoordinates]);
        } catch (Exception $e) {
            return array("status" => false, "message" => $e->getMessage());
        }
    }
}