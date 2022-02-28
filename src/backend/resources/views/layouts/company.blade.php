<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="notranslate" translate="no">
<head>
    <meta charset="utf-8">
    <meta name="google" content="notranslate" >
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->

    <!-- Styles --> 
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-mainbg">
    <nav id="navigation"></nav>

    <main>
        @yield('content')
    </main>
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
    <script id="userData" type="application/json">{!! json_encode($userData ?? '', JSON_HEX_TAG) !!}</script>
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
</body>
</html>
