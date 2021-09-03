<?php

namespace App\Services;

use DB;
use Carbon\Carbon;
use App\Models\File;
use RuntimeException;
use App\Models\Company;
use Illuminate\Support\Facades\Storage;

class FileService
{
    /**
     * @var App\Models\File
     */
    protected $file;

    /**
     * FileService constructor.
     */
    public function __construct(File $file, Company $company)
    {
        $this->file = $file;
        $this->company = $company;
    }

    /**
     * Retrieves the file given a file id
     *
     * @param int $id File ID
     * @return App\Models\File $file
     */
    public function show(int $id)
    {
        $showConditions = [
            'id' => $id,
        ];

        $file = $this->file->where($showConditions)->first();

        if (!($file instanceof File)) {
            throw new RuntimeException('File record does not exist.');
        }

        return $file;
    }

    /**
     * Retrieves the file from its file path
     *
     * @param int $id File ID
     * @return App\Models\File $file
     */
    public function getFile(int $id)
    {
        $file = $this->show($id);

        try {
            $file_exists = Storage::disk(config('app.storage_disk'))->exists($file->file_path);

            if ($file_exists === false) {
                throw new RuntimeException('File does not exist.');
            }

            return $file;
        } catch (\Exception $e) {
            throw $e;
        }
    }

    /**
     * Uploads the file to s3 and saving the path to DB
     *
     * @param array $data
     * @return App\Models\File $file
     */
    public function uploadToS3(array $data)
    {
        DB::beginTransaction();

        try {
            // Company Machida default id
            $companyId = 3;
            $company = $this->company->find($companyId);

            if (!$company instanceof Company) {
                throw new RuntimeException('Company not found.');
            }

            // File naming convention with s3
            $fileUrl = 'BillingCSVs/';
            $fileName = $data['month_of_billing'] . '_company_'. $company->id . '.csv';
            $filePath = $fileUrl . $fileName ;

            // Form data for DB record
            $monthOfBilling = Carbon::createFromFormat('Y-m', $data['month_of_billing'])->lastOfMonth()->toDateString();
            $formData['file_path'] = $filePath;
            $formData['name'] = $fileName;
            $formData['file_type'] = 'csv';
            $formData['company_id'] = $companyId;
            $formData['month_of_billing'] = $monthOfBilling;

            // Saves file to selected local or s3 disk
            Storage::disk(config('app.storage_disk'))->putFileAs(
                $fileUrl,
                $data['file'],
                $fileName,
            );

            // Creates or updates a new record in DB
            $where = [
                'company_id' => $companyId,
                'month_of_billing' => $monthOfBilling
            ];

            $file = $company->files()->updateOrCreate($where, $formData);

            DB::commit();

            return $file;
        } catch (\Exception $e) {
            DB::rollback();

            throw $e;
        }
    }
}
