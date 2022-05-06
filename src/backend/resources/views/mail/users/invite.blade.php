@component('mail::message')
平素よりお世話になっております。​<br/>
KING OF TIMEサポートセンターです。<br/>

サブスクリプションマネージメントプラットフォームへの招待が御座いました。<br/><br/>

この招待を有効化するために、下記ボタンをクリックし、ユーザー名と仮パスワードを入力してください。<br/><br/>

ユーザー名: {{ $username }}<br/>
パスワード: {{ $pw }}<br/><br/>

@component('mail::button', ['url' => $url])
SMPの利用を開始する​

@endcomponent
※本メールは自動配信されております。<br/>
&nbsp;&nbsp;お心当たりがない場合は、ご容赦ください。
@endcomponent