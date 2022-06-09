<?php

namespace App\Traits;

trait NameFormat
{
    /**
     * Converts two inputs to a full name and orders them accordingly in Japanese format
     *
     * @param string $lastName
     * @param string $firstName
     * @return string $fullName
     */
    public function toJapaneseFormatFullName(string $lastName, string $firstName)
    {
        return $lastName . ' ' . $firstName;
    }

    /**
     * Accepts an input fullname in Japanese format and retrieves the first name
     *
     * @param string $fullName
     * @return string $firstName
     */
    public function getFirstName(string $fullName)
    {
        $firstName = '';

        $names = explode(' ', $fullName);

        // assuming that first name is NOT the first word in "fullname" in japanese
        if (!empty($names[1])) {
            $firstName = $names[1];
        }

        return $firstName;
    }

    /**
     * Accepts an input fullname in Japanese format and retrieves the last name
     *
     * @param string $fullName
     * @return string $lastName
     */
    public function getLastName(string $fullName)
    {
        $lastName = '';

        $names = explode(' ', $fullName);

        // assuming that last name is the first word in "fullname" in japanese
        if (!empty($names[0])) {
            $lastName = $names[0];
        }

        return $lastName;
    }
}
