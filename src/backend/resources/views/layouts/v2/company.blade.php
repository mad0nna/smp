@extends('layouts.v2.app')

@section('navigation')
    <div id="navigation-logistics">
    </div>
@endsection


@section('script')
    <script id="userData" type="application/json">{!! json_encode($userData, JSON_HEX_TAG) !!}</script>
    <script src="{{ asset('js/app.js') }}" type="text/javascript"></script>
@endsection
