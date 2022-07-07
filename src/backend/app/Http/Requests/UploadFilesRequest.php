<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadFilesRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'files' => ['required', 'array'],
            'files.*' => ['required','mimes:csv,txt'],
            'invoice_number' => ['required', 'string'],
            'salesforce_id' => ['required', 'exists:companies,account_id'],
        ];
    }

    public function getFiles()
    {
        return $this->file('files.*', null);
    }

    public function getSalesForceId()
    {
        return $this->input('salesforce_id', null);
    }

    public function getInvoiceNumber()
    {
        return $this->input('invoice_number', null);
    }
}
