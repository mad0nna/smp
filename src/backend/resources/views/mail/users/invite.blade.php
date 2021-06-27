@component('mail::message')
平素よりお世話になっております。<br/>
サブスク韋駄天管理事務局です。

{{$company}} {{ $first_name }}様よりサブスク韋駄天への招待が御座いました。<br/>
<br/>
<br/>
この招待を有効化するために、下記ボタンをクリックし、ユーザー名と仮パスワードを入力してください。 <br/><br/>

ユーザー名: {{ $username }}<br/>
パスワード: {{ $pw }}<br/><br/>

@component('mail::button', ['url' => $url])
サブスク韋駄天の利用を開始する
@endcomponent

※本メールは自動配信されております。万が一お心あたりが無い場合は、サブスク韋駄天管理事務局までお問い合わせください。

@endcomponent
