<?php

namespace App\Traits;

use Exception;
use InvalidArgumentException;


trait CurrentFormat
{
    /**
     * Formats the amount with currency and returns it
     *
     * @param string $amount
     * @return string $amount
     */
    public function formatAmountWithCurrency(mixed $amount)
    {
        (string) $amount += ' 円(税込)';

        return $amount;
    }
}
