<?php

namespace App\Http\Controllers\Auth;

use Hash;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\ForgotPasswordRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Controllers\Controller;
use App\Services\API\Salesforce\Model\Contact;
use App\Models\User;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\Auth;
use App\Services\UserService;

class EmailController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        parent::__construct();
        $this->userService = $userService;
        // enable api middleware
        $this->middleware(['auth', 'verified']);
    }

    public function inviteNewEmail(Request $request) {
        $data = $request->all();
        $id = Auth::user()->id;
        $hasEmpty = false;
        $response = [
            'errors' => [],
            'status' => false,
            'message' => ''
        ];
        foreach ($data as $key => $value) {
            if (empty($value)) {
                $hasEmpty = true;
                $response['errors'][$key] = '必須フィールド';
            }
        }
        
        if ( $data['enteredCurrentEmail'] !== Auth::user()->email) {
            $hasEmpty = true;
            $response['errors']['enteredCurrentEmail'] = '入力した現在のメールアドレスが正しくありません';
        }
        if ($data['newEmail'] !== $data['newEmail2']) {
            $hasEmpty = true;
            $response['errors']['newEmail'] = 'メールアドレスが一致しません';
            $response['errors']['newEmail2'] = 'メールアドレスが一致しません';
        }
        
        if ($hasEmpty) {
            return $response;
        }

        try {
            $invite_token = Hash::make(time() . uniqid());
            $result = User::where('id' , $id)->update(
                [
                    'invite_token' => $invite_token,
                ]
            );

            if ($result) {
                $this->userService->sendTempEmailInvite($data['newEmail'], $invite_token);

                $response['message'] = '成功者';
                $response['status'] = true;
                $response['invite_token'] = $invite_token;
                
                return $response;
            }
            
        } catch (QueryException $e) {
            $response['message'] = 'パスワードの変更に失敗しました';
            return $response;
            $e->getMessage();
        }
    }

    public function updateSubAdminByEmail(Request $request)
    {
        try {
            $data = $request->all();
            $user = User::where('id', Auth::user()->id)->where('invite_token', $data['inviteToken'])->first();

            if ($user) {
                // Update Data in Salesforce
                $salesforceData = [
                    'Email' => $data['newEmail']
                ];

                $response = (new Contact)->update($salesforceData, $user->account_code);

                if (!$response['status']) {
                    return $response;
                }

                // Update Data in Database
                $formData = [
                    'email' => $data['newEmail'] ?? '',
                    'username' => $data['newEmail'] ?? '',
                ];

                if ($user->update($formData)) {
                    // Update Session data
                    if (Session::get('salesforceContactID') == $user->account_code) {
                        Session::put('email', $data['newEmail']);
                    }
                    return ['status' => true, 'message' => '成功者'];
                }

                return ['status' => false];
            } else {
                $this->response = [
                    'status' => false,
                    'error' => 'メールアドレスを変更するためのリクエストトークンが見つかりません',
                    'code' => 500,
                ];
            }

        } catch (Exception $e) {
            $this->response = [
                'status' => false,
                'error' => $e->getMessage(),
                'code' => 500,
            ];
        }

        return response()->json($this->response, $this->response['code']);

    }


}
