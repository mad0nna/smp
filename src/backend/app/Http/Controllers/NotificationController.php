<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Support\Facades\Session;

class NotificationController extends Controller
{
    public function getAllNotification(NotificationService $notification) {
        return $notification->getAllNotification(Session::get("salesforceContactID"));
    }
}
