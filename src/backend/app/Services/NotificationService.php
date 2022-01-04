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

        $status = $this->database->getNotificationsByContactID($contactID);

        $art = $this->addFieldsInArticle($articles);
        $art = $this->updateArticleStatus($status, $art, 'Article');

        $notification = $this->markAll($status, false);
        $notification = $this->updatePaymentNotif($notification);

        $topNotif = [];
        $belowNotif = [];

        foreach($notification as $index => $notif) {
            $notif['seen'] === false ? array_push($topNotif, $notif) : array_push($belowNotif, $notif);
        }

        foreach($art as $index => $article) {
            $article['seen'] === false ? array_push($topNotif, $article) : array_push($belowNotif, $article);
        }
        $arrangedNotif = array_merge($topNotif, $belowNotif);
        return $arrangedNotif;
    }

    private function addFieldsInArticle($articles)
    {
        $categories = config('zendesk.categories');
        foreach ($articles as $key => $value) {
            foreach ($categories as $catKey => $catValues) {
                if ($catValues['section'] === $value['section_id']) {
                    $articles[$key]['category_name'] = $catValues['name'];
                    $articles[$key]["notification_type"] = 'article';
                }
            }
            $articles[$key]['updated_at'] = $this->reFormatDate($value['updated_at'], true);
            $articles[$key]['created_at'] = $this->reFormatDate($value['created_at'], true);
            $articles[$key]['seen'] = false;
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

    private function updateArticleStatus($status, $notifTarget)
    {
        $articles = $notifTarget;
        foreach ($articles as $key => $value) {
            foreach($status as $statusKey => $statusValue) {
                if ($value['id'] == $statusValue['article_id']) {
                    $articles[$key]['seen'] = true;
                }
            }
        }
        return $articles;
    }

    private function updatePaymentNotif($paymentNotifs) {
        foreach($paymentNotifs as $key => $value) {
            if ($value['notification_type'] == 'article') {
                unset($paymentNotifs[$key]);
                continue;
            }
            if ($value['notification_seen_timestamp'] != null) {
                $paymentNotifs[$key]['seen'] = true;
            }
        }
        return $paymentNotifs;
    }
}
