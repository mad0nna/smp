<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Traits\CurrencyFormat;

class CurrencyFormatTraitTest extends TestCase
{
    use CurrencyFormat;

    public function __constructor()
    {
        //
    }

    /**
     * Format Amount test without decimals
     */
    public function testFormatAmountWithoutDecimals()
    {
        $amount = $this->formatAmountWithoutDecimals(12345.123);
        $this->assertEquals('12,345', $amount);
    }

    /**
     * Format Amount test without decimals with number in string
     */
    public function testFormatAmountWithoutDecimalsWithStringParameter()
    {
        $amount = $this->formatAmountWithoutDecimals('12345.123');
        $this->assertEquals('12,345', $amount);
    }

    /**
     * Format Amount test without decimals with invalid parameter
     */
    public function testFormatAmountWithoutDecimalsWithInvalidParameter()
    {
        $this->expectExceptionMessage('System error occured, given parameter is not a valid amount.');
        $this->formatAmountWithoutDecimals('abc');
    }

    /**
     * Format Amount test without decimals with empty parameter
     */
    public function testFormatAmountWithoutDecimalsWithEmptyParameter()
    {
        $this->expectExceptionMessage('System error occured, given parameter is not a valid amount.');
        $this->formatAmountWithoutDecimals(null);
    }

    /**
     * Format Amount test without decimals with a string formatted number
     */
    public function testFormatAmountWithoutDecimalsWithInvalidParameterWithFormattedNumber()
    {
        $this->expectExceptionMessage('System error occured, given parameter is not a valid amount.');
        $this->formatAmountWithoutDecimals('12,345');
    }
}
