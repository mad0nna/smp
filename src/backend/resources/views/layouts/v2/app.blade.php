<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="shortcut icon" href="{{ asset('images/kotFabIcon.png') }}">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;700&family=Roboto:ital,wght@0,400;0,700;1,300&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-primaryBg font-sans font-light">
    @yield('navigation')
    <main class="grid grid-cols-12">
        @if(isset($withSidebar) && $withSidebar)
            @if(isset($sidebarColSpan))
            <div class="col-span-12 md:col-span-{{$sidebarColSpan}}">
            @else
                <div class="col-span-2">
            @endif
                @yield('sidebar')
            </div>
            @if(isset($contentColSpan))
                <div class="col-span-12 md:col-span-{{$contentColSpan}}">
            @else
                <div class="col-span-10">
            @endif
                <div class="mt-5 mb-5 mx-4 border rounded-xl bg-white border border-whiteTint-500 h-fit lg:mt-50px lg:mx-11">
                    @yield('content')
                </div>
            </div>
        @else
            @if(isset($useCustomContainer) && $useCustomContainer)
                @yield('content')
            @else
            <div class="col-span-full bg-hex-F7F8F9">
                <div class="mt-50px mb-5 mx-11 rounded-xl bg-hex-F7F8F9 h-fit">
                    @yield('content')
                </div>
            </div>
            @endif
        @endif
    </main>
    @yield('script')
</body>
</html>
