<?php

namespace App\Services\Utilities;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;

class DateManager {
    public function __construct()
    {
        $this->currentDateTime = Carbon::now();
    }

    public function getCurrentYear() {
        return Str::before($this->currentDateTime, '-');
    }

    public function getDateAndTime() {
        return str_replace('Z', ' ', str_replace('T', ' ', $this->currentDateTime));
    }

    public function compareDate($date1, $date2) {
        return Carbon::parse($date1)->floatDiffInSeconds($date2, false); 
    }

    public function compareCurrentDate($dateToCompare) {
    }
}