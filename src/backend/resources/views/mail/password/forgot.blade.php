@component('mail::message')
平素よりお世話になっております。​<br/>
KING OF TIMEサポートセンターです。<br/>
<br/>

パスワード再設定のご要望を承りました。<br/>

下記ボタンをクリックして、パスワードの再設定を行ってください。​<br/>

@component('mail::button', ['url' => $url])
パスワード再設定​
@endcomponent

※本メールは自動配信されております。<br/>
お心当たりがない場合は、ご容赦ください。
@endcomponent
