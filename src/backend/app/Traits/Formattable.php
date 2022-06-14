<?php

namespace App\Traits;

use Exception;
use Carbon\Carbon;

trait Formattable
{
    /**
     * Formats the amount returns it without decimals
     *
     * @param mixed $amount
     * @return string $amount
     */
    public function formatAmountWithoutDecimals($amount)
    {
        if (!is_numeric($amount)) {
            throw new Exception('System error occured, given parameter is not a valid amount.');
        }

        return $amount = number_format(floor($amount));
    }

    /**
     * Converts two inputs to a full name and orders them accordingly in Japanese format
     *
     * @param string $lastName
     * @param string $firstName
     * @return string $fullName
     */
    public function formatToJapaneseFullname(string $lastName, string $firstName)
    {
        return trim($lastName . ' ' . $firstName);
    }

    /**
     * Converts the given date to the Japanese date format required
     *
     * @param string $date
     * @return string $date
     */
    public function formatDateToJPDate(string $date)
    {
        if(!strtotime($date)){
            throw new Exception('System error occured, given parameter is not a valid date.');
        }

        return Carbon::parse($date)->format('Y年m月d日');
    }
}
