@extends('layouts.header')

@section('content')
<div class="container mx-auto my-auto w-4/6">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <div class="card border-0 shadow-sm">
                <div class="card-body bg-white rounded-lg border-2 border-gray-200 mt-40 w-2/5 mx-auto my-auto shadow-sm p-10 flex flex-wrap flex-col gap-0 justify-center relative">
                    <div class="absolute w-16 h-16 top-3 -left-16 border-2 border-gray-200 rounded-l-2xl mt-4">  
                    <a href="/">
                            <img link="/" src="../images/home-gray.png" class="mt-1 ml-1 h-14 w-34"/>
                    </a>
                    </div>
                    <form method="POST" action="{{ route('password.update') }}" class="py-4 w-full flex flex-wrap flex-col justify-center mx-auto">
                        @csrf

                        <input type="hidden" name="token" value="{{ $token }}">
                        <div class="flex flex-wrap justify-around gap-4 mb-8">
                            <img
                            class="p-0 rounded-xl mt-3"
                            src="../images/kot-admin-panel.png"
                            style="height:42px"}
                            />
                        </div>

                        <div class="form-group flex flex-wrap flex-col gap-0 w-full justify-center">   
                            <input id="password" placeholder="新しいパスワードを入力してください" type="password" class="form-control @error('password') is-invalid @enderror px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none mx-auto w-7/12" name="password" value="{{old('password')}}" required autocomplete="new-password">
                        </div>

                        <div class="form-group flex flex-wrap flex-col gap-0 w-full justify-center">
                            <input id="password-confirm" type="password" placeholder="新しいパスワードを再入力してください。" class="form-control px-3 py-3 placeholder-blueGray-300 relative bg-white rounded text-sm border border-gray-300 outline-none mx-auto w-7/12 mb-3" name="password_confirmation" value="{{old('password_confirmation')}}" required autocomplete="new-password">
                        </div>
                        @error('password')
                            <div class="grid grid-cols-5 gap-4 mb-5">
                                <div class="col-start-2 col-span-3">
                                    <span class="invalid-feedback text-xs text-center mt-3 text-red-600 mb-5" role="alert">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                </div>
                            </div>
                        @enderror

                        <span class="invalid-feedback text-xs text-center mt-3" role="alert">
                            <strong>
                            1文字以上の大文字、1文字以上の小文字、1文字以上の特殊記号(　! " # $ % & ' ( ) = ~ ^ \　など　）を含む最低8桁以上の英数字のパスワードを入力してください
                            </strong>
                        </span>

                        @if (session('status'))
                            <div class="alert alert-success text-xs text-center text-blueGray-300 mb-2 block" role="alert">
                                <strong>{{ session('status') }}</strong>
                            </div>
                            @endif
                        <div class="form-group w-full py-2">
                            <button type="submit" class="btn btn-primary btn-block ml-28 bg-primary-200 hover:bg-green-700 text-white font-bold py-2 px-3 rounded w-7/12">
                                {{ __('パスワードを再設定する') }}
                            </button>
                        </div>
                       
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
