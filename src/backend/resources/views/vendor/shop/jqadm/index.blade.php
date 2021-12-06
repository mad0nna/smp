<!DOCTYPE html>
<html lang="{{ $locale }}" dir="{{ $localeDir }}">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="Content-Security-Policy" content="default-src 'self' data: blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'unsafe-inline' 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; script-src 'unsafe-eval' 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src 'self' data: blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://*.tile.openstreetmap.org https://aimeos.org; frame-src https://www.youtube.com">

		<title>iDaten Shopping Admin</title>

		<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" />
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4/css/font-awesome.min.css" />
@if( $localeDir == 'rtl' )
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/css/bootstrap.rtl.min.css,npm/flatpickr@4/dist/flatpickr.min.css,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.css,npm/vue-select@3/dist/vue-select.min.css,npm/leaflet@1/dist/leaflet.min.css">
@else
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/css/bootstrap.min.css,npm/flatpickr@4/dist/flatpickr.min.css,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.css,npm/vue-select@3/dist/vue-select.min.css,npm/leaflet@1/dist/leaflet.min.css">
@endif
		<link rel="stylesheet" href="<?= route( 'aimeos_shop_jqadm_file', ['site' => $site, 'locale' => 'en', 'type' => 'css'] ); ?>" />
<<<<<<< HEAD

=======
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
>>>>>>> gitlab/development
		<style>
			body.dark .btn-theme.dark-mode {display:none}
			body.light .btn-theme.light-mode {display:none}
			.app-menu .icon {vertical-align: middle; padding: 0.5rem 1rem; font-size: 125%; background-color: transparent; border: none; color: inherit}
			#logout-form {display: inline}
		</style>
	</head>
	<body class="{{ $theme }}">
		<div class="app-menu shadow-lg navbar navbar-expand-lg bg-white mb-8" style="height:6rem; z-index:1200">
			<div class="container-fluid">
				<a class="navbar-brand" href="#"><img class="align-content-center h-auto" src="/images/KOT-menu-logo.png?3c627f756b89930856698fce8f8ea54d"></a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse justify-content-md-center" id="navbarsExample07">
					<ul class="navbar-nav">
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
						<li class="nav-item bg-success" style="width:130px; height:99px">
							<a href="/shop-admin/jqadm/search/product" class="nav-link active" style="padding-left: 23px;">
								<div class="mt-4"><div class="bg-billing-icon-hover mx-4" style="height:37px; width:35px;"></div></div>
								<div><p class="font-sans mt-1 text-center text-white">お店&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p></div>
							</a>
						</li>				
					</ul>
				</div>
				<div class="" style="width:250px">
					<div id="nav-dropdown" name="nav-dropdown" class="relative d-flex  pe-auto">
						<div class=""><img alt="setting icon" src="/images/admin-icon.png?da531b3ff0ecbcc369be6265fc8a1b04"></div>
							<p class="text-base h6 fs-6 fw-bold text-success px-2 py-1" id="companyDropwdownTitle">管理者</p>
							<div class=""><img alt="setting icon" src="/images/arrowdown.png?286d79e9128ef8a5093b0d6fc8284840"></div>
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
