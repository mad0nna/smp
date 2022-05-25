<?php

namespace App\Traits;

use Exception;
use InvalidArgumentException;

trait NameFormat
{
    /**
     * Converts two inputs to a full name and orders them accordingly
     *
     * @param string $firstName
     * @param string $lastName
     * @return string $fullName
     */
    public function convertToFullNameWithLastNameAsFirst(string $firstName, string $lastName)
    {
        $fullName = null;

        $fullName = $lastName + ' ' + $firstName;

        return $fullName;
    }

    /**
     * Accepts an input fullname and retrieves the first name
     *
     * @param string $fullName
     * @param string $firstName
     */
    public function getFirstName(string $fullName)
    {
        $firstName = null;

        $names = explode(' ', $fullName);

        // assuming that last name is first in fullname
        $firstName = $names[1];

        return $firstName;
    }

    /**
     * Accepts an input fullname and retrieves the last name
     *
     * @param string $fullName
     * @param string $lastName
     */
    public function getLastName(string $fullName)
    {
        $lastName = null;

        $names = explode(' ', $fullName);

        // assuming that last name is first in fullname
        $lastName = $names[0];

        return $lastName;
    }
}
