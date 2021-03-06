<?php

namespace App\Mail;

use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InviteUser extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * @var App\Models\User
     */
    protected $user;

    /**
     * @var string
     */
    protected $url;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(User $user, $pw, $token)
    {
        $this->username = $user['email'];
        $this->full_name = $user['FullName'];
        $this->first_name = $user['first_name'];
        $this->last_name = $user['last_name'];
        $this->company_name = $user['company_name'];
        $this->pw = $pw;
        $this->url = env('APP_URL') . "/?invite_token={$token}";
        $this->view = 'mail.users.invite';
        $this->subject = 'SMPにアカウントが追加されました​';
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
                        'first_name' => $this->first_name,
                        'last_name' => $this->last_name,
                        'username' => $this->username,
                        'company' => $this->company_name,
                        'pw' => $this->pw,
                        'url' => $this->url,
                    ]);
    }
}
