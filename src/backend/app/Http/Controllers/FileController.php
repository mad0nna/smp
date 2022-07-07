<?php

namespace App\Http\Controllers;


use App\Services\FileService;
use App\Http\Resources\FilesResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\UploadFilesRequest;
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
     * Upload CSV files to a specific disk from Zuora request
     *
     * @param App\Http\Requests\UploadFilesRequest $request
     * @return Response
     */
    public function upload(UploadFilesRequest $request)
    {
        $request->validated();

        try {
            $data = [
                'files' => $request->getFiles(),
                'salesforce_id' => $request->getSalesForceId(),
                'invoice_number' => $request->getInvoiceNumber(),
            ];

            // dd('stop', $request->all());

            $fileRow = $this->fileService->uploadToDisk($data);
            $this->response['data'] = new FilesResource($fileRow); // must be updated
            $this->response['message'] = 'Successfully uploaded file/s.';
        } catch (\Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }
}
