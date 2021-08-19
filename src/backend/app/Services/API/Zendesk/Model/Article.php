<?php

namespace App\Services\API\Zendesk\Model;

use App\Services\API\Zendesk\Zendesk;

class Article extends Zendesk
{
    public function all($date = '') {
        $articles = [];
        for ($x = 0; $x < count($this->hosts); $x++) {
            $articleData = $this->get($this->hosts[$x] . "/api/v2/help_center/articles/search.json?query=&created_after={$date}-01-01&updated_after={$date}-01-01&sort_by=created_at,updated_at&section=360002490514, 360008939594, 900000896806, 360006253414, 360006270613, 360011812753");
            $articles = array_merge($articles, $articleData['results']);
        }
        return $articles;
    }
}