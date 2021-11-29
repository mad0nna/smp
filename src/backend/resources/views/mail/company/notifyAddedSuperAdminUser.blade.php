@component('mail::message')
{{ $last_name . ' ' . $first_name }}様<br/>
<br/>
<br/><br/>
平素よりお世話になっております。​<br/>

サブスクリプションマネージメントプラットフォーム管理事務局です。​<br/>
​
{{ $company_name }} 様をSMPに追加いたしました。​
​
下記ボタンをクリックし、​
ユーザー名とパスワードを入力し、ログインを行ってください。<br/>
 SMPにアカウントが追加されました​ 

ユーザー名: {{ $username }}<br/><br/>
パスワード: {{ $pw }}<br/><br/>

@component('mail::button', ['url' => $url])
SMPの利用を開始する​
@endcomponent


@endcomponent
