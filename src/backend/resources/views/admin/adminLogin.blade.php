<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{config('app.name')}}</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
</head>
<body class="bg-lime-primary overflow-hidden">
<div id="adminLogin" class="w-full h-full relative group flex justify-center" style="min-height: 976px">
</div>
</body>
<script src="{{asset('js/app.js')}}"></script>
</html>
