<?php
namespace App\Services;

use App\Repositories\DatabaseRepository;
use App\Services\Utilities\MessageResult;
use Illuminate\Support\Facades\Cache;

class WidgetService {
    public function __construct() {
        $this->mysql = new DatabaseRepository();
    }

    public function getCompanyCoordinates($accountID) {
        $companyCoordinates = $this->mysql->getDefaultCompanyCoordinatesByID($accountID);
        if (!empty($companyCoordinates)) {
            $companyCoordinates = reset($companyCoordinates);
            $rawCoordinates = json_decode($companyCoordinates["coordinates"], true);
            $tempCoordinates = array();
            foreach ($rawCoordinates as $key => $value) {
                $tempCoordinates[$key] = $value;
            }
            $companyCoordinates["coordinates"] = $tempCoordinates;
            $companyCoordinates["id"] = $accountID;
        }
        return json_encode($companyCoordinates);
    }

    public function saveCoordinates($newCoordinates, $accountID) {
        if (!$this->mysql->saveCoordinates($newCoordinates, $accountID)) {
            return MessageResult::error("変更点が無いため保存できません。");
        } 
        return MessageResult::success("ウィジェット設定を変更致しました。");
    }

    public function resetCompanyCoordinates($accountID) {
        $result = $this->mysql->resetCompanyCoordinates($accountID);
        if (isset($result["status"]) && $result["status"] === false) {
            return MessageResult::error("変更が無いためウィジェット設定をリセットできません。");
        };
        return MessageResult::success("ウィジェットを初期設定に戻しました。");
    }
}