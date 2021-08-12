<?php

namespace App\Services;

class StringFormatter
{
    public static function fixSalesforceTimeStamp($str)
    {
        return str_replace('.000+0000', '', str_replace('T', ' ', $str));
    }
}
