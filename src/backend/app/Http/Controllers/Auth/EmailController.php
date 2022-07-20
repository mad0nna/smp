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
        $this->response = [
            'errors' => [],
            'status' => false,
            'message' => '',
            'code' => 200,
        ];
        foreach ($data as $key => $value) {
            if (empty($value)) {
                $hasEmpty = true;
                $this->response['errors'][$key] = '必須フィールド';
            }
        }

        if ( $data['enteredCurrentEmail'] !== Auth::user()->email) {
            $hasEmpty = true;
            $this->response['errors']['enteredCurrentEmail'] = '入力した現在のメールアドレスが正しくありません';
        }
        if ($data['newEmail'] !== $data['newEmail2']) {
            $hasEmpty = true;
            $this->response['errors']['newEmail'] = 'メールアドレスが一致しません';
            $this->response['errors']['newEmail2'] = 'メールアドレスが一致しません';
        }
        
        if ($hasEmpty) {
            return response()->json($this->response, $this->response['code']);
        }

        try {
            $isExists = $this->userService->findByEmail($data['newEmail']);
            if(!empty($isExists)) {
                $this->response['message'] = 'SMPにすでに存在する電子メール';
                return response()->json($this->response, $this->response['code']);                
            }

            $user = (new Contact)->findByEmailAndAccountId($data['newEmail'], Session::get('salesforceCompanyID'));
            
            if ($user) {
                $this->response['message'] = '電子メールはすでにSalesforceに存在します。別のメールアドレスをご利用ください';
                return response()->json($this->response, $this->response['code']);
            } 

            $invite_token = Hash::make(time() . uniqid());
            $result = User::where('id' , $id)->update(
                [
                    'invite_token' => $invite_token,
                ]
            );

            if ($result) {
                $this->userService->sendTempEmailInvite($data['newEmail'], $invite_token);

                $this->response['message'] = '成功者';
                $this->response['status'] = true;
                $this->response['invite_token'] = $invite_token;
                
                return $this->response;
            }
            
        } catch (QueryException $e) {
            $this->response['message'] = 'パスワードの変更に失敗しました';
            $this->response['code'] = 500;
        }

        return response()->json($response, $response['code']);
    }

    public function updateSubAdminByEmail(Request $request)
    {
        try {
            $data = $request->all();
            $user = User::where('id', Auth::user()->id)->where('user_type_id', 4)->where('invite_token', $data['inviteToken'])->first();

            if ($user) {
                // Update Data in Salesforce
                $salesforceData = [
                    'Email' => $data['newEmail']
                ];
               
                $result = (new Contact)->update($salesforceData, $user->account_code);
                
                if (!$result['status']) {
                    return response()->json($result, 200);
                }

                // Update Data in Database
                $formData = [
                    'email' => $data['newEmail'] ?? '',
                    'username' => $data['newEmail'] ?? '',
                    'invite_token' => '',
                ];

                if ($user->update($formData)) {
                    // Update Session data
                    if (Session::get('salesforceContactID') == $user->account_code) {
                        Session::put('email', $data['newEmail']);
                    } 

                    $this->response['message'] = '成功者';
                    $this->response['status'] = true;
                    $this->response['code'] = 200;

                } else {
                    $this->response['message'] = 'データの更新中にエラーが発生しました';
                    $this->response['status'] = false;
                    $this->response['code'] = 200;
                }

            } else {
                $this->response = [
                    'status' => false,
                    'message' => 'メールアドレスを変更するリクエストトークン
                    が見つかりません',
                    'code' => 200,
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
