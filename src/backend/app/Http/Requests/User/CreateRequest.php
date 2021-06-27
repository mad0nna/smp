<?php

namespace App\Http\Requests\User;

use App\Rules\EmailAddress;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Foundation\Http\Request;

class CreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules(Request $request)
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'email' => ['required', new EmailAddress, 'unique:users,email'],
        ];
    }

    public function getFirstName()
    {
        return $this->input('first_name', '');
    }
    public function getLastName()
    {
        return $this->input('last_name', '');
    }
    public function getEmail()
    {
        return $this->input('email', '');
    }
}
