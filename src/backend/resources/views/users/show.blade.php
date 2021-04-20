@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-4">
            @if (session('users_nofication'))
                <div class="alert alert-success" role="alert">
                    {{ __(session('users_nofication')) }}
                </div>
            @endif

            <h3 class="text-center py-4">User Details</h3>

            <div class="card border-0 shadow-sm">
                <div class="card-body">
                    <div class="d-flex justify-content-center py-4">
                    @if ($user->avatar)
                        <img src="{{ $user->avatar }}" class="circle mx-auto d-block" alt="{{ $user->full_name}}" >
                    @else
                        <div class="circle">
                            <span class="initials">{{ get_initials($user->full_name) }}</span>
                        </div>
                    @endif
                    </div>

                    <h3 class="text-center">{{ $user->full_name }}</h3>
                    <span class="text-center d-block">{{ $user->email }}</span>

                    <div class="d-flex justify-content-center mt-4">
                        <a href="{{ url('/users/'. $user->id .'/edit') }}" class="btn btn-outline-secondary mr-4">Edit</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
