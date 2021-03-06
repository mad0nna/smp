<?php
namespace App\Repositories;

use App\Models\Company;
use App\Models\Opportunity;
use App\Models\User;
use App\Models\WidgetSettings;
use App\Models\NotificationTarget;
use App\Models\Notification;
use Exception;

class DatabaseRepository
{
    public function getCompanyDetailsByID($companyID)
    {
        return Company::where('account_id', $companyID)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getCompanyAdminDetailsByID($companyID)
    {
        return User::leftjoin('companies', 'companies.id', '=', 'company_id')
        ->select('users.*')
        ->where('companies.account_id', $companyID)
        ->where('users.user_type_id', 3)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getCompanyAdminDetailsByContactID($contactID)
    {
        return User::leftjoin('companies', 'companies.id', '=', 'company_id')
        ->select('users.*')
        ->where('users.account_code', $contactID)
        ->where('users.user_type_id', 3)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getPaymentMethod($sfCompanyID) {
        return Opportunity::leftjoin('companies', 'companies.id', '=', 'company_id')
        ->select('opportunities.*')
        ->where('companies.account_id', $sfCompanyID)
        ->get()
        ->toArray()[0];
    }

    public function updateCompanyDetails($companyID, $companyData)
    {
        return Company::where('account_id', $companyID)
        ->update([
            'name' => $companyData['companyName'],
            'contact_num' => $companyData['contactNumber'],
            'website' => $companyData['website'],
            'industry' => $companyData['industry'],
            'billing_postal_code' => $companyData['postalCode'],
            'billing_street' => $companyData['street'],
            'billing_city' => $companyData['city'],
            'billing_state' => $companyData['state'],
            'billing_country' => $companyData['country'],
        ]);
    }

    public function updateAdminDetails($accountID, $userData)
    {
        return User::where('account_code', $accountID)
        ->update([
            'first_name' => $userData['FirstName'],
            'last_name' => $userData['LastName'],
            'email' => $userData['Email'],
            'contact_num' => $userData['MobilePhone'],
        ]);
    }

    public function getLatestKOTOpportunityDetails($companyID)
    {
        return Opportunity::rightjoin('companies', 'companies.id', '=', 'company_id')
        ->select('opportunities.*')
        ->where('companies.account_id', $companyID)
        ->orderBy('sf_created_date', 'ASC')
        ->take(1)
        ->get()
        ->map->salesforceFormat()
        ->toArray();
    }

    public function getDefaultCompanyCoordinatesByID($accountID)
    {
        return WidgetSettings::leftjoin('users', 'users.id', '=', 'user_id')
        ->where('users.account_code', $accountID)
        ->select('widget_settings.coordinates')
        ->get()
        ->take(1)
        ->toArray();
    }

    public function saveCoordinates($newCoordinates, $accountID)
    {
        return WidgetSettings::rightjoin('users', 'users.id', '=', 'user_id')
        ->where('users.account_code', $accountID)
        ->update([
            'coordinates' => $newCoordinates,
        ]);
    }

    public function resetCompanyCoordinates($accountID)
    {
        try {
            $widget = new WidgetSettings();
            $defaultCoordinates = $widget->getCompanyDefaultCoordinates();

            return WidgetSettings::rightjoin('users', 'users.id', '=', 'user_id')
            ->where('users.account_code', $accountID)
            ->update(['widget_settings.coordinates' => $defaultCoordinates]);
        } catch (Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }

    public function makeUserWidgetSettings($id)
    {
        try {
            $widget = new WidgetSettings();
            $defaultCoordinates = $widget->getCompanyDefaultCoordinates();
            $formData = ['user_id' => $id,'coordinates' => $defaultCoordinates];
            $widget->create($formData);
        } catch (Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }

    public function getNotificationsByContactID($contactID) {
        try {
            return  Notification::rightjoin('notification_target', 'notification_target.notification_id', '=', 'notifications.id')
            ->leftJoin('users', 'users.id', '=', 'notification_target.user_id')
            ->where('account_code', $contactID)
            ->select('notification_target.id as notif_id', 'notifications.message', 'notifications.level', 'notification_target.notification_type', 'notification_target.notification_seen_timestamp', 'notification_target.article_id', 'notification_target.article_seen_timestamp')
            ->get()->toArray();
        } catch (Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }

    public function seenNotif($contactID, $notifID, $notifType, $currentDateTime)
    {
        try {
            $userId = User::where('account_code', $contactID)->select('id')->get()->toArray();
            if (!empty($userId)) {
                $userId = reset($userId)['id'];
                if ($notifType === 'article') {
                    return NotificationTarget::create([
                        'user_id' => $userId,
                        'notification_type' => 'article',
                        'article_id' => $notifID,
                        'article_seen_timestamp' => $currentDateTime,
                    ]);
                }
                if ($notifType === 'payment') {
                    return NotificationTarget::where('id', $notifID)
                        ->update([
                        'notification_seen_timestamp' => $currentDateTime,
                    ]);
                }
            }
        } catch (Exception $e) {
            return ['status' => false, 'message' => $e->getMessage()];
        }
    }
}
