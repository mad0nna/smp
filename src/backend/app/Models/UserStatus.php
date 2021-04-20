<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserStatus extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name'];

    /**
     * Retrieve all Users under this status
     *
     * @return App\Models\User[]
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }
}
