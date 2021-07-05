<?php
namespace App\Services;

use App\Repositories\ZendeskRepository;
use App\Services\Utilities\DateManager;
use App\Repositories\DatabaseRepository;
use Illuminate\Support\Carbon;

class NotificationService {
    public function __construct()
    {
        $this->database = new DatabaseRepository();
        $this->zendesk = new ZendeskRepository();
        $this->dateManager = new DateManager();
    }

    public function seenNotification($accountID, $notifDetail) {
        if ($notifDetail["type"] === 'zendesk') {
            return $this->database->seenZendeskNotif($accountID, $notifDetail['id'], $this->dateManager->getDateAndTime());
        }
    }

    // As of now, there is no other type of notification aside from Zendesk
    public function getAllNotification($accountID) {
        $allNotif = [
            'zendesk' => $this->getFromZendesk($accountID)
        ];
        return $allNotif;
    }

    public function getFromZendesk($accountID) {
        $currentYear = $this->dateManager->getCurrentYear();
        $articles = $this->zendesk->getArticles($currentYear);
        
        $seenNotif = $this->database->getZendeskSeenNotif($accountID);
        if (!empty($seenNotif)) {
            $articlesWithSeenKey = $this->markAll($articles["results"], false);
            $articleWithMixStatus = $this->addNotifStatus($articlesWithSeenKey, $seenNotif);
            usort($articleWithMixStatus, function($article1, $article2) {
                if ($article1['seen'] == $article2['seen']) {
                    return 0;
                }
                return ($article1['seen'] < $article2['seen']) ? -1 : 1;
            });
            return $articleWithMixStatus;
        }
        return $this->markAll($articles["results"], false);
    }

    private function markAll($notifs, $status = true) {
        foreach ($notifs as $key => $value) {
            $notifs[$key]["seen"] = $status;
        }
        return $notifs;
    }

    private function reFormatDate($rawDate, $toJP = false) {
        $reformated = str_replace('Z', '', str_replace('T', ' ', $rawDate));
        if ($toJP) {
            $year = str_replace('-', '年', $reformated);
            $month = str_replace('-', '月', $year); 
            $days = str_replace(' ', '日 ', $month);
            return $days;
        }
        return $reformated;
    }

    private function addNotifStatus($notifications, $seenNotif) {
        foreach ($notifications as $notifKey => $notifValue) {
            foreach ($seenNotif as $seenKey => $seenValue) {
                $formattedUpdatedDate = $this->reFormatDate($notifValue['updated_at']);
                if ((int) $seenValue['article_id'] === (int) $notifValue['id']) {
                    if ($this->dateManager->compareDate($seenValue['article_seen_timestamp'], $formattedUpdatedDate) < 0) {
                        $notifications[$notifKey]['seen'] = true;
                    }
                }
                $notifications[$notifKey]['updated_at'] = $this->reFormatDate($formattedUpdatedDate, true);
                $notifications[$notifKey]['created_at'] = $this->reFormatDate($notifValue['created_at'], true);
            }
        }
        return $notifications;
    }
}