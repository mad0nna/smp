<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
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
    <script id="userData" type="application/json">{!! json_encode($user_data ?? '', JSON_HEX_TAG) !!}</script>
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
</body>
</html>
