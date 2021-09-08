<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadFileRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'file' => ['required', 'file', 'mimes:csv,txt'],
            'month_of_billing' => ['required', 'date_format:Y-m'],
            'salesforce_id' => ['required', 'exists:companies,account_id'],
        ];
    }

    public function getFile()
    {
        return $this->file('file', null);
    }

    public function getMonthOfBilling()
    {
        return $this->input('month_of_billing', null);
    }

    public function getSalesForceId()
    {
        return $this->input('salesforce_id', null);
    }
}
