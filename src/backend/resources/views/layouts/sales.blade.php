<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="{{ asset('images/kotFabIcon.png') }}">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-primaryBg">
  <nav id="navigation-sales"></nav>

  <main>
      @yield('content')
  </main>

  <script id="userData" type="application/json">{!! json_encode($userData, JSON_HEX_TAG) !!}</script>
  <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
</body>
</html>
