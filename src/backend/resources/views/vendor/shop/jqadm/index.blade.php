<!DOCTYPE html>
<html lang="{{ $locale }}" dir="{{ $localeDir }}">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'unsafe-inline' 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; script-src 'unsafe-eval' 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://*.tile.openstreetmap.org https://aimeos.org; frame-src https://www.youtube.com">

		<title>{{ config('app.name', 'Idaten') }}</title>
		<link rel="shortcut icon" href="{{ asset('images/kotFabIcon.png') }}">
		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4/css/font-awesome.min.css" />
@if( $localeDir == 'rtl' )
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/css/bootstrap.rtl.min.css,npm/flatpickr@4/dist/flatpickr.min.css,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.css,npm/vue-select@3/dist/vue-select.min.css,npm/leaflet@1/dist/leaflet.min.css">
@else
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/css/bootstrap.min.css,npm/flatpickr@4/dist/flatpickr.min.css,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.css,npm/vue-select@3/dist/vue-select.min.css,npm/leaflet@1/dist/leaflet.min.css">
@endif
		<link rel="stylesheet" href="<?= route( 'aimeos_shop_jqadm_file', ['site' => $site, 'locale' => 'en', 'type' => 'css'] ); ?>" />
		
		<style>
			body.dark .btn-theme.dark-mode {display:none}
			body.light .btn-theme.light-mode {display:none}
			.app-menu .icon {vertical-align: middle; padding: 0.5rem 1rem; font-size: 125%; background-color: transparent; border: none; color: inherit}
			#logout-form {display: inline}
		</style>
	</head>
	<body class="light">
		<div class="app-menu shadow-lg navbar navbar-expand-lg bg-white mb-8" style="height:6rem; z-index:1200">
			<div class="container-fluid">
				<a class="navbar-brand" href="#"><img class="align-content-center h-auto" style="width: 12rem;" src="/images/KOT-menu-logo.png?3c627f756b89930856698fce8f8ea54d"></a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample07" style="overflow:hidden">
					<ul class="navbar-nav" style="margin-left: -75px;">
						<li class="nav-item" style="width:130px; height:103px">
							<a href="/admin/dashboard" class="nav-link">
								<div class="mt-4"><div class="bg-dashboard-icon mx-5" style="height:27px; width:29px;"></div></div>
								<div ><p class="font-sans mt-1 text-center text-muted">ダッシュボード</p></div>
							</a>
						</li>
						<li class="nav-item" style="width:130px; height:103px">
							<a href="/admin/accounts" class="nav-link">
								<div class="mt-3"><div class="bg-account-list-icon mx-5" style="height:33px; width:38px;"></div></div>
								<div><p class="font-sans mt-1 text-center text-muted">アカウント</p></div>
							</a>
						</li>
						<li class="nav-item" style="width:130px; height:103px">
							<a href="#" class="nav-link cursor-default">
								<div class="mt-3"><div class="bg-document-icon mx-5" style="height:34px; width:34px;"></div></div>
								<div><p class="font-sans mt-1 text-center text-muted">ドキュメント</p></div>
							</a>
						</li>
						<li class="nav-item bg-green-500" style="width:130px; height:99px">
							<a href="/admin/shop/jqadm/search/product?locale=ja" class="nav-link active" style="padding-left: 23px;">
								<div class="mt-3" style="padding-left:1.1rem"> 
								<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="35px" viewBox="0 0 20 25" width="35px" fill="#FFFFFF"><g><rect fill="none" height="24" width="24"></rect></g><g><g></g><g><path d="M21.9,8.89l-1.05-4.37c-0.22-0.9-1-1.52-1.91-1.52H5.05C4.15,3,3.36,3.63,3.15,4.52L2.1,8.89 c-0.24,1.02-0.02,2.06,0.62,2.88C2.8,11.88,2.91,11.96,3,12.06V19c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-6.94 c0.09-0.09,0.2-0.18,0.28-0.28C21.92,10.96,22.15,9.91,21.9,8.89z M18.91,4.99l1.05,4.37c0.1,0.42,0.01,0.84-0.25,1.17 C19.57,10.71,19.27,11,18.77,11c-0.61,0-1.14-0.49-1.21-1.14L16.98,5L18.91,4.99z M13,5h1.96l0.54,4.52 c0.05,0.39-0.07,0.78-0.33,1.07C14.95,10.85,14.63,11,14.22,11C13.55,11,13,10.41,13,9.69V5z M8.49,9.52L9.04,5H11v4.69 C11,10.41,10.45,11,9.71,11c-0.34,0-0.65-0.15-0.89-0.41C8.57,10.3,8.45,9.91,8.49,9.52z M4.04,9.36L5.05,5h1.97L6.44,9.86 C6.36,10.51,5.84,11,5.23,11c-0.49,0-0.8-0.29-0.93-0.47C4.03,10.21,3.94,9.78,4.04,9.36z M5,19v-6.03C5.08,12.98,5.15,13,5.23,13 c0.87,0,1.66-0.36,2.24-0.95c0.6,0.6,1.4,0.95,2.31,0.95c0.87,0,1.65-0.36,2.23-0.93c0.59,0.57,1.39,0.93,2.29,0.93 c0.84,0,1.64-0.35,2.24-0.95c0.58,0.59,1.37,0.95,2.24,0.95c0.08,0,0.15-0.02,0.23-0.03V19H5z"></path></g></g></svg>
								</div>
								<div><p class="font-sans mt-1 text-center text-white">ショップ&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
							</a>
						</li>				
					</ul>
				</div>
				<div class="justify-content-center" style="width:170px">
					<div id="nav-dropdown" name="nav-dropdown" class="relative d-flex  pe-auto" >
						<div class="">
							<img alt="setting icon" src="/images/admin-icon.png" >							
						</div>
							@php
								$user = \App\Models\User::find(Auth::user()->id);
							@endphp
							<p class="text-base h6 fs-6 fw-bold text-primary-200 px-2 pt-1" id="companyDropwdownTitle" style="letter-spacing: 1px; text-shadow: 1px 1px 2px #e8e8e8;">@php echo $user['company_name'] @endphp</p>
							<div class="" style="position:relative">
							<a class="" href="#" id="dropdown05" data-bs-toggle="dropdown" aria-expanded="false">
									<img alt="setting icon" src="/images/arrowdown.png">
								</a>
							<ul class="dropdown-menu dd-nav" aria-labelledby="dropdown05" data-bs-popper="none"  >
								<li>
									<label class="bg-profile-icon-white" style=""></label>
									<a class="dropdown-item" href="#">アカウント プロファイル</a>
								</li>
								<li>
									<label class="bg-call-icon-white" style=""></label>
									<a class="dropdown-item" href="#">お問合せ</a>
								</li>
								<li>
									<label class="bg-signout-icon" style=""></label>
									<a class="dropdown-item" href="/logout">ログアウト</a>
								</li>
							</ul>	
							</div>
						</div>
						<div class="nav-user-name">
							@php
								echo "" . $user['last_name'] . " ";
								echo "" . $user['first_name']  . " ";
							@endphp
							様
						</div>
					</div>
					
				</div>
			</div>
		</div>

<?= $content ?>

		<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<script src="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js,npm/vue@2/dist/vue.min.js,npm/vue-select@3/dist/vue-select.min.js,npm/flatpickr@4,npm/flatpickr@4/dist/l10n/index.min.js,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.js,npm/vue-flatpickr-component@8,npm/sortablejs@1,npm/vuedraggable@2,npm/leaflet@1/dist/leaflet-src.min.js,npm/vue2-leaflet@2/dist/vue2-leaflet.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/ckeditor@4/ckeditor.js"></script>
		<script src="<?= route( 'aimeos_shop_jqadm_file', array( 'site' => $site, 'locale' => 'en', 'type' => 'js' ) ); ?>"></script>
	</body>
</html>
