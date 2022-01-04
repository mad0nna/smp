@component('mail::message')
平素よりお世話になっております。​<br/>
サブスクリプションマネージメントプラットフォーム管理事務局です。​ <br/>
{{ $first_name . ' ' . $last_name}} 様にSMPへの招待が御座いました。​<br/>
<br/>
<br/>
この招待を有効化するために、下記ボタンをクリックし、ユーザー名と仮パスワードを入力してください。 <br/><br/>

ユーザー名: {{ $username }}<br/>
パスワード: {{ $pw }}<br/><br/>

@component('mail::button', ['url' => $url])
SMPの利用を開始する​

@endcomponent
※本メールに万が一お心当たりが無い場合は、サブスクリプションマネージメントプラットフォーム管理事務局までお問い合わせください。​
@endcomponent