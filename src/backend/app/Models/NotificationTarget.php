<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NotificationTarget extends Model
{
    protected $table = 'notification_target';

    public $timestamps = false;

    protected $fillable = ['user_id', 'notification_type', 'notification_id', 'notification_seen_timestamp', 'article_id', 'article_seen_timestamp'];

    public function users()
    {
        return $this->belongsTo('users', 'user_id', 'id');
    }
}
