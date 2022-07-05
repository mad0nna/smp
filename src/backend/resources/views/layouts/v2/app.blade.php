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
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-primaryBg font-sans font-light">
    @yield('navigation')
    <main class="grid grid-cols-12">
        @if(isset($withSidebar) && $withSidebar)
            <div class="col-span-2">
                @yield('sidebar')
            </div>
            <div class="col-span-10">
                <div className="grid md:grid-cols-4">
                  <div className="col-span-4">
                    <div className="mt-50px mb-5 mx-11 border rounded-xl bg-white shadow-5x h-fit">
                        @yield('content')
                    </div>
                  </div>
                </div>
            </div>
        @else
            <div class="col-span-full">
                <div className="grid md:grid-cols-4">
                  <div className="col-span-4">
                    <div className="mt-50px mb-5 mx-11 border rounded-xl bg-white shadow-5x h-fit">
                        @yield('content')
                    </div>
                  </div>
                </div>
            </div>
        @endif
    </main>
    @yield('script')
</body>
</html>
