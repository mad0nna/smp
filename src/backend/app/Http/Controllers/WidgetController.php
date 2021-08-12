<?php

namespace App\Http\Controllers;

use App\Services\WidgetService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class WidgetController extends Controller
{
    public function getCompanyCoordinates(WidgetService $widget)
    {
        return $widget->getCompanyCoordinates(Session::get('salesforceContactID'));
    }

    public function saveCoordinates(WidgetService $widget, Request $req)
    {
        return $widget->saveCoordinates($req->all(), Session::get('salesforceContactID'));
    }

    public function resetCoordinates(WidgetService $widget)
    {
        return $widget->resetCompanyCoordinates(Session::get('salesforceContactID'));
    }
}
