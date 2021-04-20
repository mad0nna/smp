<?php

namespace App\Http\Controllers\Auth;

use Exception;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TokenController extends Controller
{
    /**
     * TokenController constructor
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Delete access token logged in user
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function delete(Request $request)
    {
        try {
            $request->user()->token()->revoke();
            $this->response['authenticated'] = false;
        } catch (Exception $e) { // @codeCoverageIgnoreStart
            $this->response = [
                'code' => 500,
                'error' => $e->getMessage(),
            ];
        } // @codeCoverageIgnoreEnd

        return response()->json($this->response, $this->response['code']);
    }
}
