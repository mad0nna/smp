<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    //
    protected $table = 'user_types';
    public $timestamps = false;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'type_alias'];

    /**
     * Check if type is admin
     *
     * @return bool
     */
    public function IsAdmin()
    {
        return $this->id == 1 ? true : false;
    }

    /**
     * Check if type is customer
     *
     * @return bool
     */
    public function IsCompany()
    {
        return $this->id == 2 ? true : false;
    }

    /**
     * Check if type is representative
     *
     * @return bool
     */
    public function IsSales()
    {
        return $this->id == 3 ? true : false;
    }

    /**
     * Check if type is representative
     *
     * @return bool
     */
    public function IsEmployee()
    {
        return $this->id == 4 ? true : false;
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
