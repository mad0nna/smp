<?php

namespace App\Http\Requests;

use App\Rules\Password;
use App\Rules\EmailAddress;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', new EmailAddress, 'unique:users,email'],
            'password' => ['required', new Password],
        ];
    }

    public function getFirstName()
    {
        return $this->input('first_name', null);
    }

    public function getLastName()
    {
        return $this->input('last_name', null);
    }

    public function getEmail()
    {
        return $this->input('email', null);
    }

    public function getPassword()
    {
        return $this->input('password', null);
    }
}
