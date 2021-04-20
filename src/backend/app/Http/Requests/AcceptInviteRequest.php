<?php

namespace App\Http\Requests;

use App\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class AcceptInviteRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'token' => ['required', 'exists:activation_tokens,token'],
            'password' => ['required', 'confirmed', new Password],
        ];
    }

    public function getPassword()
    {
        return $this->input('password', null);
    }

    public function getToken()
    {
        return $this->input('token', null);
    }
}
