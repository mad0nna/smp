<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WidgetSettings extends Model
{
    //
    protected $fillable = ['user_id', 'coordinates'];
    public $timestamps = false;

    public function getCompanyDefaultCoordinates() {
        return json_encode([
            0 => [
                "label" => '',
                "id" => 0,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => null,
                "maxH" => null,
                "maxW" => null,
                "minH" => 0,
                "minW" => 0,
                "moved" => false,
                "resizeHandles" => null,
                "style" => "staticWidgets",
                "static" => true,
                "state" => true,
                "x" => 0,
                "y" => 0,
                "w" => 10,
                "h" => 0,
                "className" => "relative",
            ],
            1 => [
                "label" => 'ようこそ！',
                "h" => 1,
                "id" => 1,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => false,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 2,
                "moved" => false,
                "resizeHandles" => null,
                "static" => true,
                "w" => 10,
                "x" => 0,
                "y" => 0,
                "state" => true,
                "className" => "relative",
            ],
            2 => [
                "label" => 'サービス利用状況',
                "h" => 15,
                "id" => 2,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 2,
                "minW" => 2,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 2,
                "x" => 0,
                "y" => 1,
                "state" => true,
                "className" => "relative",
            ],
            3 => [
                "label" => 'サービス利用日',
                "h" => 3,
                "id" => 3,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 1,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 3,
                "x" => 2,
                "y" => 1,
                "state" => true,
                "className" => "relative",
            ],
            4 => [
                "label" => '物販',
                "h" => 6,
                "id" => 4,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 1,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 3,
                "x" => 5,
                "y" => 1,
                "state" => true,
                "className" => "relative",
            ],
            5 => [
                "label" => '請求書',
                "h" => 12,
                "id" => 5,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 1,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 3,
                "x" => 2,
                "y" => 4,
                "state" => true,
                "className" => "relative",
            ],
            6 => [
                "label" => 'お知らせ',
                "h" => 12,
                "id" => 6,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 1,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 2,
                "x" => 8,
                "y" => 4,
                "state" => true,
                "className" => "relative",
            ],
            7 => [
                "label" => 'クイックリンク',
                "h" => 3,
                "id" => 7,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 1,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 2,
                "x" => 8,
                "y" => 1,
                "state" => true,
                "className" => "relative",
            ],
            8 => [
                "label" => '購入履歴',
                "h" => 9,
                "id" => 8,
                "isBounded" => null,
                "isDraggable" => null,
                "isResizable" => true,
                "maxH" => null,
                "maxW" => null,
                "minH" => 1,
                "minW" => 1,
                "moved" => false,
                "resizeHandles" => null,
                "static" => false,
                "w" => 3,
                "x" => 5,
                "y" => 7,
                "state" => true,
                "className" => "relative",
            ],
        ], JSON_UNESCAPED_UNICODE);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
