<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Traits\NameFormat;

class NameFormatTraitTest extends TestCase
{
    use NameFormat;

    public function __constructor()
    {
        //
    }

    /**
     * Japanese Format Fullname test
     */
    public function testToJapaneseFormatFullName()
    {
        $fullName = $this->toJapaneseFormatFullName('Doe', 'John');
        $this->assertEquals('Doe John', $fullName);
    }
    /**
     * Japanese Format Fullname test with only last name given
     */
    public function testToJapaneseFormatFullNameWithOnlyLastName()
    {
        $fullName = $this->toJapaneseFormatFullName('Doe', '');
        $this->assertEquals('Doe', $fullName);
    }
    /**
     * Japanese Format Fullname test with only first name given
     */
    public function testToJapaneseFormatFullNameWithOnlyFirstName()
    {
        $fullName = $this->toJapaneseFormatFullName('', 'John');
        $this->assertEquals('John', $fullName);
    }
    /**
     * Japanese Format Fullname test with empty parameter
     */
    public function testToJapaneseFormatFullNameWithEmptyParameter()
    {
        $fullName = $this->toJapaneseFormatFullName('', '');
        $this->assertEmpty($fullName);
    }

    /**
     * Get Last name test
     */
    public function testGetLastName()
    {
        $lastName = $this->getLastName('Doe John');
        $this->assertEquals('Doe', $lastName);
    }
    /**
     * Get Last name test with only one word parameter
     */
    public function testGetLastNameWithOnlyOneWord()
    {
        $lastName = $this->getLastName('Doe');
        $this->assertEquals('Doe', $lastName);
    }
    /**
     * Get Last name test with empty parameter
     */
    public function testGetLastNameWithEmptyParameter()
    {
        $lastName = $this->getLastName('');
        $this->assertEmpty($lastName);
    }

    /**
     * Get First name test
     */
    public function testGetFirstName()
    {
        $firstName = $this->getFirstName('Doe John');
        $this->assertEquals('John', $firstName);
    }
    /**
     * Get First name test with only one word
     */
    public function testGetFirstNameWithOnlyOneWord()
    {
        $firstName = $this->getFirstName('Doe');
        $this->assertEmpty($firstName);
    }
    /**
     * Get First name test with empty parameter
     */
    public function testGetFirstNameWithEmptyParameter()
    {
        $firstName = $this->getFirstName('');
        $this->assertEmpty($firstName);
    }
}
