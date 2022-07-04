<!DOCTYPE html>
<html lang="{{ $locale }}" dir="{{ $localeDir }}">
	<head>
    <meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: blob: https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://dxpf-invoice.s3.ap-northeast-1.amazonaws.com; style-src 'unsafe-inline' 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; script-src 'unsafe-eval' 'self' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; img-src * 'self' data: blob: https://smp-staging.s3.ap-northeast-1.amazonaws.com https://cdnjs.cloudflare.com https://cdn.jsdelivr.net https://*.tile.openstreetmap.org https://aimeos.org;"> -->

		<title>{{ config('app.name', 'Idaten') }}</title>
		<link rel="shortcut icon" href="{{ asset('images/kotFabIcon.png') }}">
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4/css/font-awesome.min.css" />
@if( $localeDir == 'rtl')
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/css/bootstrap.rtl.min.css,npm/flatpickr@4/dist/flatpickr.min.css,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.css,npm/vue-select@3/dist/vue-select.min.css,npm/leaflet@1/dist/leaflet.min.css">
@else
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/css/bootstrap.min.css,npm/flatpickr@4/dist/flatpickr.min.css,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.css,npm/vue-select@3/dist/vue-select.min.css,npm/leaflet@1/dist/leaflet.min.css">
@endif
		<link rel="stylesheet" href="<?= route( 'aimeos_shop_jqadm_file', ['site' => $site, 'locale' => 'en', 'type' => 'css'] ); ?>" />

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
	</head>
	<body class="light font-sans">
        @include('admin.aimeos-nav')
        <?= $content ?>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/jquery@3/dist/jquery.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
		<script src="https://cdn.jsdelivr.net/combine/npm/bootstrap@5/dist/js/bootstrap.bundle.min.js,npm/vue@2/dist/vue.min.js,npm/vue-select@3/dist/vue-select.min.js,npm/flatpickr@4,npm/flatpickr@4/dist/l10n/index.min.js,npm/flatpickr@4/dist/plugins/confirmDate/confirmDate.min.js,npm/vue-flatpickr-component@8,npm/sortablejs@1,npm/vuedraggable@2,npm/leaflet@1/dist/leaflet-src.min.js,npm/vue2-leaflet@2/dist/vue2-leaflet.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/ckeditor@4/ckeditor.js"></script>
		<script src="<?= route( 'aimeos_shop_jqadm_file', array( 'site' => $site, 'locale' => 'en', 'type' => 'js' ) ); ?>"></script>
	</body>
</html>