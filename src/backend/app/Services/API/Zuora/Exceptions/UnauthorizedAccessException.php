<?php

namespace App\Services\API\Zuora\Exceptions;

use Exception;

class UnauthorizedAccessException extends Exception
{
    /**
     * UnauthorizedAccessException constructor.
     * @param string $message
     */
    public function __construct($message = 'Invalid Credentials Provided.', $code = 401)
    {
        parent::__construct($message, $code);
    }
}
