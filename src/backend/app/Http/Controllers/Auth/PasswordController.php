<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Illuminate\Http\Request;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Services\PasswordService;
use App\Http\Controllers\Controller;

class PasswordController extends Controller
{
    /** @var App\Services\PasswordService */
    private $passwordService;

    /**
     * PasswordController constructor.
     *
     * @param App\Services\PasswordService $passwordService
     */
    public function __construct(PasswordService $passwordService)
    {
        parent::__construct();
        $this->passwordService = $passwordService;
    }

    /**
     * Handles the forgot password request
     *
     * @param Request $request
     * @return Response
     */
    public function forgot(ForgotPasswordRequest $request)
    {
        $request->validated();

        try {
            $result = $this->passwordService->forgot($request->getEmail());
            $this->response['token'] = $result->token;
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }

    /**
     * Handles the reset password request
     *
     * @param Request $request
     * @return Response
     */
    public function reset(ResetPasswordRequest $request)
    {
        $request->validated();

        try {
            $formData = [
                'token' => $request->getToken(),
                'password' => $request->getPassword(),
            ];

            // perform password reset
            $this->passwordService->reset($formData);
            $this->response['reset'] = true;
        } catch (Exception $e) {
            $this->response = [
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);
    }
}
