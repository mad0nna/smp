<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PasswordChange extends Mailable
{
    use Queueable, SerializesModels;

    /** @var string*/
    public $view;

    /** @var App\Models\User */
    protected $user;

    /** @var string */
    public $subject;

    /** @var string */
    protected $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->view = 'mail.password.reset';
        $this->subject = 'パスワードの変更が完了致しました';
        $this->user = $user;
        $this->url = env('APP_URL');
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject($this->subject)
                    ->markdown($this->view)
                    ->with([
                        'user' => $this->user,
                        'url' => $this->url,
                    ]);
    }
}
