<?php

namespace App\Services;

use DB;
use ZipArchive;
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
     * Retrieves the file path record in database given id
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
     * Retrieves the file path from record in database to return files
     * as download in a zipped folder
     *
     * @param int $id File Path ID in database
     * @param mixed $companyAccountID Company Account ID
     * @return string $zipFile
     */
    public function getFiles(int $id, $companyAccountID)
    {
        $file = $this->show($id);

        $company = $this->company->where('account_id', $companyAccountID)->first();

        if (!($company instanceof Company)) {
            throw new RuntimeException('Company does not exist given account ID.');
        }

        if ($file->company_id !== $company->id) {
            throw new RuntimeException('User does not have the rights to access files.');
        }

        try {
            $files = Storage::disk(config('app.storage_disk_csv'))->files($file->file_path);

            if (empty($files)) {
                throw new RuntimeException('File directory contains no files or has been removed for zipping.');
            }

            // initializes the zip folder with selected name
            $zipFile = $file->invoice_number . '-' .$company->account_id . '.zip';
            $zip = new ZipArchive;
            $zip->open($zipFile, ZipArchive::CREATE | ZipArchive::OVERWRITE);

            // for loops exists each file for folder
            foreach ($files as $file) {
                $fileContent = Storage::disk(config('app.storage_disk_csv'))->get($file);

                // extracts the file name from the file path for zip folder
                $fileArray = explode("/",$file);
                $fileName = end($fileArray);
                //  adds the file to zip
                $zip->addFromString($fileName, $fileContent);
            }

            $zip->close();

            return $zipFile;
        } catch (\Exception $e) { // @codeCoverageIgnoreStart
            throw $e;
        } // @codeCoverageIgnoreEnd
    }

    /**
     * Uploads the file/s to a specific disk and saving the path to DB
     *
     * @param array $data
     * @return App\Models\File $file
     */
    public function uploadToDisk(array $data)
    {
        DB::beginTransaction();

        try {
            $company = $this->company->where('account_id', $data['salesforce_id'])->first();

            if (!($company instanceof Company)) {
                throw new RuntimeException('Company not found given salesforce id.');
            }

            // file Directory path
            $filePath = 'BillingCSVs/' . $company->account_id . '/' . $data['invoice_number'];

            // loop each file to put in disk
            foreach ($data['files'] as $file) {
                $fileName = $file->getClientOriginalName();

                // saves file to selected selected disk from env for CSVs
                Storage::disk(config('app.storage_disk_csv'))->putFileAs(
                    $filePath,
                    $file,
                    $fileName,
                );
            }

            $whereParams = [
                'file_path' => $filePath,
                'company_id' => $company->id,
                'invoice_number' => $data['invoice_number'],
            ];

            // updates the existing logs updated if invoice with that company exists, if not create new row
            $file = $company->files()->updateOrCreate($whereParams, ['updated_at' => Carbon::now()]);

            DB::commit();

            return $file;
        } catch (\Exception $e) { // @codeCoverageIgnoreStart
            DB::rollback();

            throw $e;
        } // @codeCoverageIgnoreEnd
    }
}
