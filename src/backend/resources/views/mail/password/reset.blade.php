@component('mail::message')
{{$user->last_name . ' ' . $user->first_name }}様<br/>
<br/>
平素よりお世話になっております。<br/>
KING OF TIMEサポートセンターです。<br/><br/>

パスワードの変更が完了致しました。<br/><br/>

下記ログインボタンよりログインを行ってください。<br/><br/>

@component('mail::button', ['url' => $url])
ログイン
@endcomponent

※本メールは自動配信されております。<br/>
&nbsp;&nbsp;お心当たりがない場合は、ご容赦ください。
@endcomponent
