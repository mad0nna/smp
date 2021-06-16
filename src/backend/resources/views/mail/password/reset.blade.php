@component('mail::message')
{{ $user->first_name }}様<br/>
<br/>
平素よりお世話になっております。サブスク韋駄天管理事務局です。<br/>
パスワードの変更が完了致しました。下記ログインボタンよりログインしてください。<br/>

@component('mail::button', ['url' => $url])
ログイン
@endcomponent

何かご不明な点等ございましたら、お気軽にお問い合わせくださいませ。<br/><br/>

サブスク韋駄天管理事務局
@endcomponent
