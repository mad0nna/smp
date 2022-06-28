@extends('layouts.v2.app')

@section('navigation')
    <div id="navigation-admin">
    </div>
@endsection

@section('script')
    @php
        $user = \App\Models\User::with(['user_company'])->find(Auth::user()->id);
        $userData['userId'] = $user['id'];
        $userData['username'] = $user['username'];
        $userData['firstName'] = $user['first_name'];
        $userData['lastName'] = $user['last_name'];
        $userData['email'] = $user['email'];
        $userData['accountCode'] = $user['account_code'];
        $userData['userTypeId'] = $user['user_type_id'];
        $userData['title'] = $user['title'];
        $userData['companyId'] = $user['company'] ? $user->user_company->id : '';
        $userData['companyName'] = $user['company'] ? $user->user_company->name : '';
        $userData['companyCode'] = $user['company'] ? $user->user_company->company_code : '';
        $userData['companyAccountId'] = $user['company'] ? $user->user_company->account_id : '';
    @endphp
    <script id="userData" type="application/json">{!! json_encode($userData, JSON_HEX_TAG) !!}</script>
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
@endsection
