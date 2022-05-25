<?php

namespace App\Traits;

use Exception;
use InvalidArgumentException;
use Illuminate\Support\Carbon;


trait DateFormat
{
    /**
     * Converts the given date to the format required
     *
     * @param string $date
     * @return string $convertedDate
     */
    public function convertDateFormat(string $date)
    {
        if(!strtotime($date)){
            throw new Exception('Helper function error occured, given parameter is not a date.');
        }

        $convertedDate = Carbon::createFromFormat('Y-m-d', $date)->toDateTimeString();

        return $convertedDate;
    }
}
