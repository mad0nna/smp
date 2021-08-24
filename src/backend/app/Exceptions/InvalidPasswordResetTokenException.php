<?php

namespace App\Exceptions;

use Exception;

class InvalidPasswordResetTokenException extends Exception
{
    /**
     * InvalidPasswordResetTokenException constructor.
     * @param string $message
     */
    public function __construct($message = ' 無効/期限切れのパスワードリセットトークン。')
    {
        parent::__construct($message);
    }
}
