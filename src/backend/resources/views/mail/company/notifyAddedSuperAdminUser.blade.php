@component('mail::message')
{{ $first_name }}様<br/>
<br/>
<br/><br/>
{{ $company_name }} アカウントがiDatenに追加されました <br/>

ユーザー名: {{ $username }}<br/><br/>
パスワード: {{ $pw }}<br/><br/>

@component('mail::button', ['url' => $url])
iDateにログインします
@endcomponent


@endcomponent
