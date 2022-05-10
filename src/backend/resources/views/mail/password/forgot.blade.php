@component('mail::message')
{{ $user->last_name . ' ' . $user->first_name}}様<br/>
<br/>
平素よりお世話になっております。​<br/>
KING OF TIMEサポートセンターです。​<br/>​<br/>

パスワード再設定のご要望を承りました。​<br/><br/>

下記ボタンをクリックして、パスワードの再設定を行ってください。​<br/><br/><br/>

@component('mail::button', ['url' => $url])
パスワード再設定​
@endcomponent
<br/><br/>
※本メールは自動配信されております。<br/>
&nbsp;&nbsp;&nbsp;&nbsp;お心当たりがない場合は、ご容赦ください。
@endcomponent
