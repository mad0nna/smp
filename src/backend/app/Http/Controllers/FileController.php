<?php

namespace App\Http\Controllers;


use App\Services\FileService;
use App\Http\Resources\FileResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UploadFileRequest;

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
     * @param int $id Invoice ID
     * @return mixed
     */
    public function downloadBillingHistoryCSV(int $id)
    {
        try {
            $file = $this->fileService->getFile($id);
            $fileLocation = Storage::disk(config('app.storage_disk'))->get($file->file_path);

            $headers = [
                'Content-Type' => Storage::disk(config('app.storage_disk'))->getDriver()->getMimetype($file->file_path),
                'Content-Description' => 'File Transfer',
                'Content-Disposition' => "attachment; filename={$file->name}",
                'filename' => $file->name,
            ];

            return response($fileLocation, 200, $headers);
        } catch (\Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Uploads the file specific to S3 from Zuora request
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
            ];

            $file = $this->fileService->uploadToS3($data);
            $this->response['data'] = new FileResource($file);
            $this->response['message'] = 'Successfully uploaded file.';
        } catch (\Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }
}
