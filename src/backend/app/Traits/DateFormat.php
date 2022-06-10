<?php

namespace App\Traits;

use Exception;
use Carbon\Carbon;

trait DateFormat
{
    /**
     * Converts the given date to the Japanese date format required
     *
     * @param string $date
     * @return string $date
     */
    public function toJPDateFormat(string $date)
    {
        if(!strtotime($date)){
            throw new Exception('System error occured, given parameter is not a valid date.');
        }

        return Carbon::parse($date)->format('Y年m月d日');
    }
}
