<?php

namespace App\Http\Requests;

use App\Rules\Password;
use App\Rules\EmailAddress;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'email' => ['required', new EmailAddress, 'unique:users,email,' . $this->getId() . ',id'],
            'password' => ['nullable', new Password],
            'avatar' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // limit to 2MB
        ];
    }

    public function getId()
    {
        return (int) $this->route('id');
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

    public function getAvatar()
    {
        return $this->file('avatar', null);
    }
}
