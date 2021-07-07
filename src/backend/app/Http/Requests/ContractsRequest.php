<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ContractsRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'page' => ['nullable', 'numeric'],
            'limit' => ['nullable', 'numeric'],
        ];
    }

    public function getPage()
    {
        return (int) $this->input('page', 1); // page default to 1.
    }

    public function getLimit()
    {
        return (int) $this->input('limit', config('search.results_per_page')); // set via config
    }
}
