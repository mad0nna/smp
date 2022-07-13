<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;

    protected $url;

    public function __construct($temp_email, $token)
    {
        $this->url = env('APP_URL') . "company/setting/email?temp_email={$temp_email}&token={$token}";
        $this->view = 'mail.users.verifyEmail';
        $this->subject = 'メールによる確認';
    }

    public function build()
    {
        return $this->subject($this->subject)
                    ->markdown($this->view)
                    ->with([
                        'url' => $this->url,
                    ]);
    }
}
