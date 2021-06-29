<?php
namespace App\Repositories;

use App\Models\Company;
use App\Models\Opportunity;
use App\Models\User;
use App\Models\Widget;
use App\Models\WidgetSettings;
use App\Models\NotificationTarget;
use App\Models\Notification;
use Exception;

class DatabaseRepository {

    public function getCompanyDetailsByID($companyID) {
        return Company::where('account_id', $companyID)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getCompanyAdminDetailsByID($companyID) {
        return User::leftjoin("companies", "companies.id", "=", "company_id")
        ->select("users.*")
        ->where("companies.account_id", $companyID)
        ->where("users.user_type_id", 3)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function updateCompanyDetails($companyID, $companyData) {
        return Company::where("account_id", $companyID)
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
        return Opportunity::rightjoin('companies', "companies.id", "=", "company_id")
        ->select("opportunities.*")
        ->where("companies.account_id", $companyID)
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
        return WidgetSettings::rightjoin('users', 'users.id', '=', 'user_id')
        ->where('users.account_code', $accountID)
        ->update([
            'coordinates' => $newCoordinates
        ]);
    }

    public function resetCompanyCoordinates($accountID) {
        try {
            $widget = new WidgetSettings();
            $defaultCoordinates = $widget->getCompanyDefaultCoordinates();
            return WidgetSettings::rightjoin('users', 'users.id', '=', 'user_id')
            ->where('users.account_code', $accountID)
            ->update(['widget_settings.coordinates' => $defaultCoordinates]);
        } catch (Exception $e) {
            return array("status" => false, "message" => $e->getMessage());
        }
    }

    public function makeUserWidgetSettings($id)
    {
        try {
            $widget = new WidgetSettings();
            $defaultCoordinates = $widget->getCompanyDefaultCoordinates();
            $formData = ['user_id' => $id,'coordinates' =>  $defaultCoordinates];
            $widget->create($formData);
        }catch(Exception $e){
            return array("status" => false, "message" => $e->getMessage());
        }
    }
        
    public function getZendeskSeenNotif($accountID)
    {
        try {
            return NotificationTarget::leftjoin('users', 'users.id', '=', 'user_id')
            ->where('users.account_code', $accountID)
            ->select(['notification_target.article_id', 'notification_target.article_seen_timestamp'])
            ->get()
            ->toArray();
        } catch (Exception $e) {
            return array("status" => false, "message" => $e->getMessage());
        }
    }
}