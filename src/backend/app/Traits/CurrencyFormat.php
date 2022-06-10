<?php

namespace App\Traits;

use Exception;

trait CurrencyFormat
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
}
