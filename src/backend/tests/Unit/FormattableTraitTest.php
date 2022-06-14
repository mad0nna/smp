<?php

namespace Tests\Unit;

use Carbon\Carbon;
use Tests\TestCase;
use App\Traits\Formattable;

class FormattableTraitTest extends TestCase
{
    use Formattable;

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

    /**
     * Japanese Format Fullname test
     */
    public function testFormatToJapaneseFullName()
    {
        $fullName = $this->formatToJapaneseFullName('Doe', 'John');
        $this->assertEquals('Doe John', $fullName);
    }
    /**
     * Japanese Format Fullname test with only last name given
     */
    public function testFormatToJapaneseFullNameWithOnlyLastName()
    {
        $fullName = $this->formatToJapaneseFullName('Doe', '');
        $this->assertEquals('Doe', $fullName);
    }
    /**
     * Japanese Format Fullname test with only first name given
     */
    public function testFormatToJapaneseFullNameWithOnlyFirstName()
    {
        $fullName = $this->formatToJapaneseFullName('', 'John');
        $this->assertEquals('John', $fullName);
    }
    /**
     * Japanese Format Fullname test with empty parameter
     */
    public function testFormatToJapaneseFullNameWithEmptyParameter()
    {
        $fullName = $this->formatToJapaneseFullName('', '');
        $this->assertEmpty($fullName);
    }

        /**
     * To JP Date Format test
     */
    public function testFormatDateToJPDatetestFormatDateToJPDate()
    {
        $dateParam = Carbon::createFromDate(2022, 06, 10)->toDateString();
        $this->assertEquals('2022-06-10', $dateParam);

        $date = $this->formatDateToJPDate($dateParam);
        $this->assertEquals('2022年06月10日', $date);
    }

    /**
     * To JP Date Format test with invalid parameter
     */
    public function testFormatDateToJPDateWithInvalidParameter()
    {
        $this->expectExceptionMessage('System error occured, given parameter is not a valid date.');
        $this->formatDateToJPDate('not a date');
    }

    /**
     * To JP Date Format test with different date formats
     */
    public function testFormatDateToJPDateWithDifferentDateFormat()
    {
        $dateFormatOne = Carbon::createFromDate(2022, 06, 10)->format('Y/m/d');
        $dateFormatTwo = Carbon::createFromDate(2022, 06, 10)->format('m/d/Y');

        $this->assertEquals('2022/06/10', $dateFormatOne);
        $this->assertEquals('06/10/2022', $dateFormatTwo);

        $dateOne = $this->formatDateToJPDate($dateFormatOne);
        $this->assertEquals('2022年06月10日', $dateOne);

        $dateTwo = $this->formatDateToJPDate($dateFormatTwo);
        $this->assertEquals('2022年06月10日', $dateTwo);
    }
}
