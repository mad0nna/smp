<?php

namespace App\Exceptions;

use Exception;

class ContractsNotFoundException extends Exception
{
    /** @var string */
    public $errorType = 'contracts_not_found';

    /**
     * UserNotFoundException constructor.
     * @param string $message
     */
    public function __construct($message = 'Unable to retrieve contracts.')
    {
        parent::__construct($message);
    }
}
