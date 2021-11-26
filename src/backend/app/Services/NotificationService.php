<?php
namespace App\Services;

use App\Services\Utilities\DateManager;
use App\Repositories\DatabaseRepository;
use Illuminate\Support\Facades\Cache;
use App\Services\API\Zendesk\Model\Article;

class NotificationService
{
    public function __construct()
    {
        $this->database = new DatabaseRepository();
        $this->dateManager = new DateManager();
    }

    public function seenNotification($accountID, $notifDetail)
    {
        return $this->database->seenNotif($accountID, $notifDetail['id'], $notifDetail['type'],  $this->dateManager->getDateAndTime());
    }


    public function getAllNotification($contactID)
    {
        $currentYear = $this->dateManager->getCurrentYear();
        $articles = Cache::remember("{$contactID}:notifications", now()->addHours(3), function () use ($currentYear) {
            return (new Article)->all($currentYear);
        });

        $articles = $this->addArticleCategoryName($articles);
        $articles = $this->updateArticleDates($articles);
        $notifications = $this->database->getNotificationsByContactID($contactID);
        $notifications = array_merge($articles, $notifications);
        $notifWithSeenKey = $this->markAll($notifications, false);
        $notifWithMixStatus = $this->updateNotificationStatus($notifWithSeenKey);
        usort($notifWithMixStatus, function ($notif1, $notif2) {
            if ($notif1['seen'] === true && $notif2['seen'] === false) {
                return 1;
            }
        });
        return $notifWithMixStatus;
    }

    private function updateArticleDates($articles) {
        foreach($articles as $key => $value) {
            $articles[$key]['updated_at'] = $this->reFormatDate($value['updated_at'], true);
            $articles[$key]['created_at'] = $this->reFormatDate($value['created_at'], true);
        }
        return $articles;
    }

    private function addArticleCategoryName($articles)
    {
        $categories = config('zendesk.categories');
        foreach ($articles as $key => $value) {
            foreach ($categories as $catKey => $catValues) {
                if ($catValues['section'] === $value['section_id']) {
                    $articles[$key]['category_name'] = $catValues['name'];
                    $articles[$key]["notification_type"] = 'article';
                }
            }
        }

        return $articles;
    }

    private function markAll($notifs, $status = true)
    {
        foreach ($notifs as $key => $value) {
            $notifs[$key]['seen'] = $status;
        }

        return $notifs;
    }

    private function reFormatDate($rawDate, $toJP = false)
    {
        $reformated = str_replace('Z', '', str_replace('T', ' ', $rawDate));
        if ($toJP) {
            $year = str_replace('-', '年', $reformated);
            $month = str_replace('-', '月', $year);
            $days = str_replace(' ', '日 ', $month);

            return $days;
        }

        return $reformated;
    }

    private function updateNotificationStatus($notifications)
    {
        foreach ($notifications as $notifKey => $notifValue) {
            // 

            if ($notifValue['notification_type'] === 'article') {
                foreach($notifications as $index => $item) {
                    if ($index === $notifKey) {
                        continue;
                    }
                    if (isset($item['result_type']) && isset($notifications[$notifKey]['article_id'])) {

                        if ($item['id'] == $notifications[$notifKey]['article_id']) {
                            $notifications[$index]['seen'] = true;
                            unset($notifications[$notifKey]);
                        }
                        // break;
                    }
                }
            }
            if ($notifValue['notification_type'] === 'payment') {
                $notifications[$notifKey]['seen'] = !empty($notifValue['notification_seen_timestamp']) ? true : false;
            }
        }

        return $notifications;
    }
}
