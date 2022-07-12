<?php

namespace App\Http\Controllers;


use App\Services\FileService;
use App\Http\Resources\FilesResource;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\UploadFilesRequest;
use App\Http\Requests\DownloadFilesRequest;

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
     * Retrieves file/s and returns download stream in a zipped folder.
     *
     * @param App\Http\Requests\DownloadFilesRequest $request
     * @return mixed
     */
    public function downloadBillingHistoryCSV(DownloadFilesRequest $request)
    {
        $request->validated();

        try {
            $zipfile = $this->fileService->getFiles($request->getId(), Session::get('salesforceCompanyID'));

            return response()->download($zipfile)->deleteFileAfterSend(true);
        } catch (\Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']); // @codeCoverageIgnoreEnd
    }

    /**
     * Upload CSV file/s to a specific disk from Zuora request
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

            $fileRow = $this->fileService->uploadToDisk($data);
            $this->response['data'] = new FilesResource($fileRow);
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
