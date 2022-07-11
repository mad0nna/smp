@extends('layouts.header')

@section('content')
<div class="container mx-auto w-4/6" >
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card border-0">

                <div class="card-body bg-white rounded-lg border-2 border-gray-200 mt-40 w-2/5 mx-auto my-auto shadow-sm p-10 relative">

                    <div class="absolute w-16 h-16 top-3 -left-16 border-2 border-gray-200 rounded-l-2xl mt-4">
                    <a href="/">
                            <img link="/" src="../images/home-gray.png" class="mt-1 ml-1 h-14 w-34"/>
                    </a>
                    </div>

                    <form method="POST" action="{{ route('password.email') }}" class="py-4 w-full">

                        @csrf
                        <div class="flex flex-wrap justify-around gap-4 mb-8">
                            <a href="/">
                            <img
                            class="p-0 rounded-xl mt-3"
                            src="../images/kot-admin-panel.png"
                            style="height:42px"}
                            />
                            </a>
                        </div>
                        <div class="form-group flex flex-wrap flex-col gap-0 w-full justify-center">
                            @if (!session('status') || session('error'))
                            <input id="email" type="email"  placeholder="ご登録のメールアドレスを入力してください" class="form-control @error('email') is-invalid @enderror w-7/12 px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none mx-auto mb-5 place-content-center" name="email" value="{{ old('email') }}" required autocomplete="email" autofocus>
                            @endif
                            @error('email')
                                <span class="invalid-feedback text-xs text-center text-blueGray-300 mb-2 block text-red-600" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                            @enderror
                            @if (session('status') && session('error'))
                            <div class="alert alert-success text-xs text-center text-blueGray-300 mb-2 block text-red-600" role="alert">
                                <strong>{{ session('status') }}</strong>
                            </div>
                            @endif
                            @if (session('status') && !session('error'))
                            <div class="alert alert-success text-xs text-center text-blueGray-300 mb-2 block" role="alert">
                                <strong>{{ session('status') }}</strong>
                            </div>
                            @endif
                            @if (!session('status') || session('error'))
                            <div class="form-group flex flex-wrap gap-0 w-full justify-center mt-2 mb-6 ">
                            <button type="submit" class="btn btn-primary btn-block bg-tertiary-500 hover:bg-green-700 text-white font-bold py-2 px-3 rounded w-7/12">
                                {{ __('パスワード再設定用のリンクを送信する') }}
                            </button>
                            </div>
                            @endif
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
