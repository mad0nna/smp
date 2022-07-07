<?php

namespace App\Http\View\Composers;

use Auth;
use App\Models\Company;
use Illuminate\View\View;

class UserDataComposer
{
    public function compose(View $view)
    {
        // set initial data
        $userData = null;

        if (Auth::check()) {
            $user = Auth::user();

            $userData = [
                'userId' => $user->id,
                'username' => $user->username,
                'firstName' => $user->first_name,
                'lastName' => $user->last_name,
                'email' => $user->email,
                'accountCode' => $user->account_code,
                'userTypeId' => $user->user_type_id,
                'title' => $user->title,
                'companyId' => $user->user_company instanceof Company ?  $user->user_company->id : '',
                'companyName' => $user->user_company instanceof Company ?  $user->user_company->name : '',
                'companyCode' => $user->user_company instanceof Company ?  $user->user_company->company_code : '',
                'companyAccountId' => $user->user_company instanceof Company ?  $user->user_company->account_id : '',
                'address1' => $user->address1,
                'address2' => $user->address2,
                'postal' => $user->postal,
                'city' => $user->city,
                'state' => $user->state,
                'number' => $user->contact_num,
                'img_domain' => env('AIMEOS_BASE_URL'),
            ];
        }

        $view->with('userData', $userData);
    }
}
