<?php

namespace App\Services\Utilities;
use Illuminate\Support\Str;

class DateManager {
    public function __construct($now)
    {
        $this->currentDateTime = $now;
    }

    public function getCurrentYear() {
        return Str::before($this->currentDateTime, '-');
    }
}