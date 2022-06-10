<?php

namespace Tests\Unit;

use Carbon\Carbon;
use Tests\TestCase;
use App\Traits\DateFormat;

class DateFormatTraitTest extends TestCase
{
    use DateFormat;

    public function __constructor()
    {
        //
    }

    /**
     * To JP Date Format test
     */
    public function testToJPDateFormat()
    {
        $dateParam = Carbon::createFromDate(2022, 06, 10)->toDateString();
        $this->assertEquals('2022-06-10', $dateParam);

        $date = $this->toJPDateFormat($dateParam);
        $this->assertEquals('2022年06月10日', $date);
    }

    /**
     * To JP Date Format test with invalid parameter
     */
    public function testToJPDateFormatWithInvalidParameter()
    {
        $this->expectExceptionMessage('System error occured, given parameter is not a valid date.');
        $this->toJPDateFormat('not a date');
    }

    /**
     * To JP Date Format test with different date formats
     */
    public function testToJPDateFormatWithDifferentDateFormat()
    {
        $dateFormatOne = Carbon::createFromDate(2022, 06, 10)->format('Y/m/d');
        $dateFormatTwo = Carbon::createFromDate(2022, 06, 10)->format('m/d/Y');

        $this->assertEquals('2022/06/10', $dateFormatOne);
        $this->assertEquals('06/10/2022', $dateFormatTwo);

        $dateOne = $this->toJPDateFormat($dateFormatOne);
        $this->assertEquals('2022年06月10日', $dateOne);

        $dateTwo = $this->toJPDateFormat($dateFormatTwo);
        $this->assertEquals('2022年06月10日', $dateTwo);
    }
}
