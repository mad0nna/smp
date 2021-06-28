<?php
namespace App\Services;

use App\Repositories\ZendeskRepository;
use App\Services\Utilities\DateManager;
use Illuminate\Support\Carbon;
use App\Repositories\DatabaseRepository;

class NotificationService {
    public function __construct()
    {
        $this->database = new DatabaseRepository();
        $this->zendesk = new ZendeskRepository();
        $this->dateManager = new DateManager(Carbon::now());
    }

    // As of now, there is no other type of notification aside from Zendesk
    public function getAllNotification($accountID) {
        return [
            'zendesk' => $this->getFromZendesk($accountID)
        ];
    }

    public function getFromZendesk($accountID) {
        $currentYear = $this->dateManager->getCurrentYear();
        $articles = $this->zendesk->getArticles($currentYear);
        return $this->zendeskNotification($articles["results"], $accountID);
    }

    public function zendeskNotification($notifications, $accountID) {
        $seenNotif = $this->database->getZendeskSeenNotif($accountID);
        if (empty($seenNotif)) {
            return $this->markAll($notifications, false);
        }
        return $this->addNotifStatus($notifications, $seenNotif);
    }

    private function markAll($notifs, $status = true) {
        foreach ($notifs as $key => $value) {
            $notifs[$key]["seen"] = $status;
        }
        return $notifs;
    }

    private function addNotifStatus($notifications, $seenNotif) {
        foreach ($notifications as $notifKey => $notifValue) {
            foreach ($seenNotif as $seenKey => $seenValue) {
                if ($seenValue['article_id'] == $notifValue['id']) {
                    $notifications[$notifKey]['seen'] = true;
                } else {
                    $notifications[$notifKey]['seen'] = false;
                }
            }
        }
        return $notifications;
    }
}