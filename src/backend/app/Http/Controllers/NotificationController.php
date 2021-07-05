<?php

namespace App\Http\Controllers;

use App\Services\NotificationService;
use Illuminate\Support\Facades\Session;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    public function getAllNotification(NotificationService $notification) {
        return $notification->getAllNotification(Session::get("salesforceContactID"));
    }

    public function seenNotification(Request $request, NotificationService $notification) {
        return $notification->seenNotification(Session::get("salesforceContactID"), $request->all());
    }
}
