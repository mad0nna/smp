@component('mail::message')
平素よりお世話になっております。<br/>
KING OF TIMEサポートセンターです。<br/><br/>
{{ $first_name . ' ' . $last_name}} 様にSMPへの招待が御座いました。<br/><br/>
この招待を有効化するために、下記ボタンをクリックし、ユーザー名とパスワードを入力して下さい<br/>
ユーザー名: {{ $username }}<br/>
パスワード: {{ $pw }}<br/><br/>

@component('mail::button', ['url' => $url])
SMPの利用を開始する

@endcomponent
※本メールは自動配信されております。​<br/>
お心当たりがない場合は、ご容赦ください。​
@endcomponent