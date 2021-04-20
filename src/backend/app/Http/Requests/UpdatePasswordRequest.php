<?php

namespace App\Http\Requests;

use App\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'password' => ['required', 'confirmed', new Password],
        ];
    }

    public function getUserId()
    {
        return (int) $this->user()->id;
    }

    public function getPassword()
    {
        return $this->input('password', null);
    }
}
