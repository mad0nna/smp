<?php

namespace App\Models;

use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Company;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username', 'account_code', 'company_id','first_name','last_name', 'email', 'contact_num', 'password', 'user_status_id', 'title', 'email_verified_at','user_type_id','temp_pw','invite_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function salesforceFormat() {
        return [
            'Id' => $this->account_code,
            'FirstName' => $this->first_name,
            'LastName' => $this->last_name,
            'LastName' => $this->last_name,
            'Email' => $this->email,
            'Title' => $this->title,
            "MobilePhone" => $this->contact_num,
            "admin__c" => $this->user_type_id=== 3 ? true : false,
            "user_status_id" => $this->user_status_id
        ];
    }

    /**
     * Get the user's full name.
     *
     * @return string
     */
    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getAccountCode() {
        if (!isset($this->account_code)) {
            return '';
        }
        return $this->account_code;
    }

    public function widgets() {
        return $this->hasOne(WidgetSettings::class);
    }

    /**
     * Retrieves all activation tokens of the user
     *
     * @return App\Models\ActivationToken[]
     */
    public function activationTokens()
    {
        return $this->hasMany(ActivationToken::class);
    }

    /**
     * Retrieves the Status of the User
     *
     * @return App\Models\UserStatus
     */
    public function status()
    {
        return $this->belongsTo(UserStatus::class, 'user_status_id');
    }

    /**
     * Retrieves the UserType of the User
     *
     * @return App\Models\UserType
     */
    public function type()
    {
        return $this->belongsTo(UserType::class, 'user_type_id');
    }

    public function company() {
        return $this->belongsTo(Company::class, 'company_id');
    }

    public function notification() {
        return $this->hasMany('notification_target', 'user_id', 'id');
    }

    /**
     * Generate personal passport access token
     */
    public function generatePersonalAccessToken(): void
    {
        $this->token = $this->createToken('personal')->accessToken;
    }

    /**
     * Generate personal passport access token
     */
    public function IsAdmin()
    {
        return ($this->user_type_id == 1 || $this->user_type_id == 2) ? true: false;
    }

    /**
     * Generate personal passport access token
     */
    public function IsCompanyAdmin()
    {
        return $this->user_type_id == 3? true: false;
    }

    /**
     * Generate personal passport access token
     */
    public function CompanyAdmins()
    {
        return ($this->user_type_id == 3 || $this->user_type_id == 4) ? true: false;
    }

    /**
     * Generate personal passport access token
     */
    public function IsSubCompanyAdmin()
    {
        return $this->user_type_id == 4? true: false;
    }

    /**
     * Generate personal passport access token
     */
    public function IsSalesAgent()
    {
        return $this->user_type_id == 5? true: false;
    }

    /**
     * Generate personal passport access token
     */
    public function IsEmployee()
    {
        return $this->user_type_id == 6? true: false;
    }
}
