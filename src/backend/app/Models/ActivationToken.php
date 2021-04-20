<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ActivationToken extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'token'];

    /**
     * Retrieves the User of the Activation token
     *
     * @return App\Models\User
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
