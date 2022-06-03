<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="shortcut icon" href="{{ asset('images/kotFabIcon.png') }}">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Idaten') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body class="bg-primaryBg antialiased text-base font-sans">

    <main>

<div class="container mx-auto" style="width:728px">
    <div class="h-82 bg-white p-6 shadow-sm mt-32">
        <div class="col-md-4">
            <div class="card border-0">
                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <div class="flex flex-wrap justify-around gap-4">
                            <img
                            class="p-0 rounded-xl mt-5"
                            src="images/kot-admin-panel.png"
                            style="height:42px"
                            />
                        </div>
                        <div
                            class="flex flex-wrap justify-around text-lg text-2xl font-bold mt-5 mb-3"
                            style="color:#5B5B5B"
                        ></div>
                        <div class="flex flex-wrap gap-0 w-full justify-center">
                            <div class="form-group flex flex-wrap gap-0 w-1/2">
                                <div class="pb-2 w-full">
                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="メールアドレス"
                                        value="{{old('username')}}"
                                        class="
                                        w-full px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none"
                                    />
                                    @error('username')
                                        <span class="text-blueGray-400 text-xs text-red-600" role="alert">
                                            <strong> @if ($message==='The username field is required.') メールアドレス/ IDを入力してください。 @else {{$message}} @endif </strong>
                                        </span>
                                    @enderror
                                </div>


                                <div class="w-full mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        value="{{old('password')}}"
                                        placeholder="パスワード"
                                        class=
                                        "w-full px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm border border-gray-300 outline-none "
                                    />
                                    @error('password')
                                        <span class="text-blueGray-400 text-xs text-red-600" role="alert">
                                            <strong>@if ($message==='パスワードフィールドは必須です。.') 'パスワードを入力してください。' @else {{$message}} @endif</strong>
                                        </span>
                                    @enderror
                                </div>

                                @if (session('status'))
                                <div class="alert alert-success text-xs text-center text-blueGray-300 mb-2 block text-red-600" role="alert">
                                <strong>{{ session('status') }}</strong>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-0 w-full justify-center mt-2 mb-6">
                        <button
                        class="bg-tertiary-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
                        >
                        サインイン
                        </button>
                        </div>
                        <div class="text-xs text-center static bottom-10 mt-6 mb-1 text-gray-600">
                            <a href="password/forgot" class="cursor-pointer hover:text-green-700 underline">パスワード変更はこちらから</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

</main>
</body>
</html>
