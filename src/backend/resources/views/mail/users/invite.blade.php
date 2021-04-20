@component('mail::message')
Hi {{ $user->first_name }},<br/>
<br/>
Your account has been created in {{ config('app.name') }}. Complete the registration by clicking the link below.

@component('mail::button', ['url' => $url])
Activate Account
@endcomponent

<br/>
Best Regards,<br/>
{{ config('app.name') }}<br/>
@endcomponent
