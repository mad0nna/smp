<?php

namespace App\Http\Controllers;


use App\Services\FileService;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\UploadFileRequest;
use App\Http\Requests\DownloadFileRequest;

class FileController extends Controller
{
    /**
     * FileController constructor.
     */
    public function __construct(FileService $fileService)
    {
        parent::__construct();
        $this->fileService = $fileService;
    }

    /**
     * Retrieves file and returns download stream.
     *
     * @param App\Http\Requests\DownloadFileRequest $request
     * @return mixed
     */
    public function downloadBillingHistoryCSV(DownloadFileRequest $request)
    {
        $request->validated();

        try {
            $file = $this->fileService->getFile($request->getId(), Session::get('salesforceCompanyID'));
            $fileLocation = Storage::disk(config('app.storage_disk_csv'))->get($file->file_path);

            $headers = [
                'Content-Type' => Storage::disk(config('app.storage_disk_csv'))->getDriver()->getMimetype($file->file_path),
                'Content-Description' => 'File Transfer',
                'Content-Disposition' => "attachment; filename={$file->name}",
                'filename' => $file->name,
            ];

            return response($fileLocation, 200, $headers);
        } catch (\Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']); // @codeCoverageIgnoreEnd
    }

    /**
     * Uploads the file a specific disk from Zuora request
     *
     * @param App\Http\Requests\UploadFileRequest $request
     * @return Response
     */
    public function upload(UploadFileRequest $request)
    {
        $request->validated();

        try {
            $data = [
                'file' => $request->getFile(),
                'month_of_billing' => $request->getMonthOfBilling(),
                'salesforce_id' => $request->getSalesForceId(),
            ];

            $file = $this->fileService->uploadToDisk($data);
            $this->response['data'] = new FileResource($file);
            $this->response['message'] = 'Successfully uploaded file.';
        } catch (\Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }
}
