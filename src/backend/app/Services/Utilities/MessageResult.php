<?php

namespace App\Services\Utilities;

class MessageResult
{
    public static function error($message = 'Something went wrong!')
    {
        return json_encode([
            'status' => false,
            'message' => $message,
        ]);
    }

    public static function success($message = 'Success!')
    {
        return json_encode([
            'status' => true,
            'message' => $message,
        ]);
    }
}
