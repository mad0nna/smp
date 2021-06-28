<?php

namespace App\Mail;

use App\Models\PasswordReset;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotifyAddedCompanySuperAdminUser extends Mailable
{
    use Queueable, SerializesModels;

    /** @var App\Models\PasswordReset */
    protected $passwordReset;

    /** @var string*/
    public $view;

    /** @var string */
    protected $url;

    /** @var App\Models\User */
    protected $user;

    /** @var string */
    public $subject;
    protected $first_name;
    protected $company_name;
    protected $username;
    protected $pw;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($data, $pw, $token)
    {
        $this->view = 'mail.company.notifyAddedSuperAdminUser';
        $this->subject = 'サブスク韋駄天にアカウントが追加されました';
        $this->first_name = $data['first_name'];
        $this->company_name = $data['company_name'];
        $this->username = $data['email'];
        $this->pw = $pw;
        $this->url = env('APP_URL').'/?invite_token='.$token;
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
                        'company_name' => $this->company_name,
                        'username' => $this->username,
                        'pw' => $this->pw,
                        'url' => $this->url,
                    ]);
    }
}
