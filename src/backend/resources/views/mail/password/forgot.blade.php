@component('mail::message')
{{ $user->first_name . ' ' . $user->last_name}}様<br/>
<br/>
平素よりお世話になっております。<br/>

サブスクリプションマネージメントプラットフォーム管理事務局です。​<br/>
​
パスワード再設定のご要望を承りました。​<br/>

下記ボタンをクリックして、パスワードの再設定を行ってください。​<br/>

@component('mail::button', ['url' => $url])
パスワード再設定​
@endcomponent

※本メールは自動配信されております。お心当たりがない場合は、サブスク韋駄天お問合せ窓口までご連絡ください。

@endcomponent
