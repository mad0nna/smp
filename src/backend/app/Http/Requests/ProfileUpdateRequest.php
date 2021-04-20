<?php

namespace App\Http\Requests;

use App\Rules\EmailAddress;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ProfileUpdateRequest extends FormRequest
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
            'email' => [
                'required',
                new EmailAddress,
                Rule::unique('users')->ignore($this->user()->id),
            ],
            'avatar' => 'image',
        ];
    }

    public function getUserId()
    {
        return (int) $this->user()->id;
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

    public function getAvatar()
    {
        return ($this->hasFile('avatar')) ? $this->file('avatar') : null;
    }
}
