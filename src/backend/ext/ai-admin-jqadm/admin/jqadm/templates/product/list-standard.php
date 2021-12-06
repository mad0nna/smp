<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2015-2021
 */

$enc = $this->encoder();


/** admin/jqadm/url/search/target
 * Destination of the URL where the controller specified in the URL is known
 *
 * The destination can be a page ID like in a content management system or the
 * module of a software development framework. This "target" must contain or know
 * the controller that should be called by the generated URL.
 *
 * @param string Destination of the URL
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/search/controller
 * @see admin/jqadm/url/search/action
 * @see admin/jqadm/url/search/config
 */
$target = $this->config( 'admin/jqadm/url/search/target' );

/** admin/jqadm/url/search/controller
 * Name of the controller whose action should be called
 *
 * In Model-View-Controller (MVC) applications, the controller contains the methods
 * that create parts of the output displayed in the generated HTML page. Controller
 * names are usually alpha-numeric.
 *
 * @param string Name of the controller
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/search/target
 * @see admin/jqadm/url/search/action
 * @see admin/jqadm/url/search/config
 */
$controller = $this->config( 'admin/jqadm/url/search/controller', 'Jqadm' );

/** admin/jqadm/url/search/action
 * Name of the action that should create the output
 *
 * In Model-View-Controller (MVC) applications, actions are the methods of a
 * controller that create parts of the output displayed in the generated HTML page.
 * Action names are usually alpha-numeric.
 *
 * @param string Name of the action
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/search/target
 * @see admin/jqadm/url/search/controller
 * @see admin/jqadm/url/search/config
 */
$action = $this->config( 'admin/jqadm/url/search/action', 'search' );

/** admin/jqadm/url/search/config
 * Associative list of configuration options used for generating the URL
 *
 * You can specify additional options as key/value pairs used when generating
 * the URLs, like
 *
 *  admin/jqadm/url/search/config = ['absoluteUri' => true )
 *
 * The available key/value pairs depend on the application that embeds the e-commerce
 * framework. This is because the infrastructure of the application is used for
 * generating the URLs. The full list of available config options is referenced
 * in the "see also" section of this page.
 *
 * @param string Associative list of configuration options
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/search/target
 * @see admin/jqadm/url/search/controller
 * @see admin/jqadm/url/search/action
 */
$config = $this->config( 'admin/jqadm/url/search/config', [] );


/** admin/jqadm/url/create/target
 * Destination of the URL where the controller specified in the URL is known
 *
 * The destination can be a page ID like in a content management system or the
 * module of a software development framework. This "target" must contain or know
 * the controller that should be called by the generated URL.
 *
 * @param string Destination of the URL
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/create/controller
 * @see admin/jqadm/url/create/action
 * @see admin/jqadm/url/create/config
 */
$newTarget = $this->config( 'admin/jqadm/url/create/target' );

/** admin/jqadm/url/create/controller
 * Name of the controller whose action should be called
 *
 * In Model-View-Controller (MVC) applications, the controller contains the methods
 * that create parts of the output displayed in the generated HTML page. Controller
 * names are usually alpha-numeric.
 *
 * @param string Name of the controller
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/create/target
 * @see admin/jqadm/url/create/action
 * @see admin/jqadm/url/create/config
 */
$newCntl = $this->config( 'admin/jqadm/url/create/controller', 'Jqadm' );

/** admin/jqadm/url/create/action
 * Name of the action that should create the output
 *
 * In Model-View-Controller (MVC) applications, actions are the methods of a
 * controller that create parts of the output displayed in the generated HTML page.
 * Action names are usually alpha-numeric.
 *
 * @param string Name of the action
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/create/target
 * @see admin/jqadm/url/create/controller
 * @see admin/jqadm/url/create/config
 */
$newAction = $this->config( 'admin/jqadm/url/create/action', 'create' );

/** admin/jqadm/url/create/config
 * Associative list of configuration options used for generating the URL
 *
 * You can specify additional options as key/value pairs used when generating
 * the URLs, like
 *
 *  admin/jqadm/url/create/config = ['absoluteUri' => true]
 *
 * The available key/value pairs depend on the application that embeds the e-commerce
 * framework. This is because the infrastructure of the application is used for
 * generating the URLs. The full list of available config options is referenced
 * in the "see also" section of this page.
 *
 * @param string Associative list of configuration options
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/create/target
 * @see admin/jqadm/url/create/controller
 * @see admin/jqadm/url/create/action
 */
$newConfig = $this->config( 'admin/jqadm/url/create/config', [] );


/** admin/jqadm/url/get/target
 * Destination of the URL where the controller specified in the URL is known
 *
 * The destination can be a page ID like in a content management system or the
 * module of a software development framework. This "target" must contain or know
 * the controller that should be called by the generated URL.
 *
 * @param string Destination of the URL
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/get/controller
 * @see admin/jqadm/url/get/action
 * @see admin/jqadm/url/get/config
 */
$getTarget = $this->config( 'admin/jqadm/url/get/target' );

/** admin/jqadm/url/get/controller
 * Name of the controller whose action should be called
 *
 * In Model-View-Controller (MVC) applications, the controller contains the methods
 * that create parts of the output displayed in the generated HTML page. Controller
 * names are usually alpha-numeric.
 *
 * @param string Name of the controller
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/get/target
 * @see admin/jqadm/url/get/action
 * @see admin/jqadm/url/get/config
 */
$getCntl = $this->config( 'admin/jqadm/url/get/controller', 'Jqadm' );

/** admin/jqadm/url/get/action
 * Name of the action that should create the output
 *
 * In Model-View-Controller (MVC) applications, actions are the methods of a
 * controller that create parts of the output displayed in the generated HTML page.
 * Action names are usually alpha-numeric.
 *
 * @param string Name of the action
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/get/target
 * @see admin/jqadm/url/get/controller
 * @see admin/jqadm/url/get/config
 */
$getAction = $this->config( 'admin/jqadm/url/get/action', 'get' );

/** admin/jqadm/url/get/config
 * Associative list of configuration options used for generating the URL
 *
 * You can specify additional options as key/value pairs used when generating
 * the URLs, like
 *
 *  admin/jqadm/url/get/config = ['absoluteUri' => true]
 *
 * The available key/value pairs depend on the application that embeds the e-commerce
 * framework. This is because the infrastructure of the application is used for
 * generating the URLs. The full list of available config options is referenced
 * in the "see also" section of this page.
 *
 * @param string Associative list of configuration options
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/get/target
 * @see admin/jqadm/url/get/controller
 * @see admin/jqadm/url/get/action
 */
$getConfig = $this->config( 'admin/jqadm/url/get/config', [] );


/** admin/jqadm/url/copy/target
 * Destination of the URL where the controller specified in the URL is known
 *
 * The destination can be a page ID like in a content management system or the
 * module of a software development framework. This "target" must contain or know
 * the controller that should be called by the generated URL.
 *
 * @param string Destination of the URL
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/copy/controller
 * @see admin/jqadm/url/copy/action
 * @see admin/jqadm/url/copy/config
 */
$copyTarget = $this->config( 'admin/jqadm/url/copy/target' );

/** admin/jqadm/url/copy/controller
 * Name of the controller whose action should be called
 *
 * In Model-View-Controller (MVC) applications, the controller contains the methods
 * that create parts of the output displayed in the generated HTML page. Controller
 * names are usually alpha-numeric.
 *
 * @param string Name of the controller
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/copy/target
 * @see admin/jqadm/url/copy/action
 * @see admin/jqadm/url/copy/config
 */
$copyCntl = $this->config( 'admin/jqadm/url/copy/controller', 'Jqadm' );

/** admin/jqadm/url/copy/action
 * Name of the action that should create the output
 *
 * In Model-View-Controller (MVC) applications, actions are the methods of a
 * controller that create parts of the output displayed in the generated HTML page.
 * Action names are usually alpha-numeric.
 *
 * @param string Name of the action
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/copy/target
 * @see admin/jqadm/url/copy/controller
 * @see admin/jqadm/url/copy/config
 */
$copyAction = $this->config( 'admin/jqadm/url/copy/action', 'copy' );

/** admin/jqadm/url/copy/config
 * Associative list of configuration options used for generating the URL
 *
 * You can specify additional options as key/value pairs used when generating
 * the URLs, like
 *
 *  admin/jqadm/url/copy/config = ['absoluteUri' => true]
 *
 * The available key/value pairs depend on the application that embeds the e-commerce
 * framework. This is because the infrastructure of the application is used for
 * generating the URLs. The full list of available config options is referenced
 * in the "see also" section of this page.
 *
 * @param string Associative list of configuration options
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/copy/target
 * @see admin/jqadm/url/copy/controller
 * @see admin/jqadm/url/copy/action
 */
$copyConfig = $this->config( 'admin/jqadm/url/copy/config', [] );


/** admin/jqadm/url/delete/target
 * Destination of the URL where the controller specified in the URL is known
 *
 * The destination can be a page ID like in a content management system or the
 * module of a software development framework. This "target" must contain or know
 * the controller that should be called by the generated URL.
 *
 * @param string Destination of the URL
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/delete/controller
 * @see admin/jqadm/url/delete/action
 * @see admin/jqadm/url/delete/config
 */
$delTarget = $this->config( 'admin/jqadm/url/delete/target' );

/** admin/jqadm/url/delete/controller
 * Name of the controller whose action should be called
 *
 * In Model-View-Controller (MVC) applications, the controller contains the methods
 * that create parts of the output displayed in the generated HTML page. Controller
 * names are usually alpha-numeric.
 *
 * @param string Name of the controller
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/delete/target
 * @see admin/jqadm/url/delete/action
 * @see admin/jqadm/url/delete/config
 */
$delCntl = $this->config( 'admin/jqadm/url/delete/controller', 'Jqadm' );

/** admin/jqadm/url/delete/action
 * Name of the action that should create the output
 *
 * In Model-View-Controller (MVC) applications, actions are the methods of a
 * controller that create parts of the output displayed in the generated HTML page.
 * Action names are usually alpha-numeric.
 *
 * @param string Name of the action
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/delete/target
 * @see admin/jqadm/url/delete/controller
 * @see admin/jqadm/url/delete/config
 */
$delAction = $this->config( 'admin/jqadm/url/delete/action', 'delete' );

/** admin/jqadm/url/delete/config
 * Associative list of configuration options used for generating the URL
 *
 * You can specify additional options as key/value pairs used when generating
 * the URLs, like
 *
 *  admin/jqadm/url/delete/config = ['absoluteUri' => true]
 *
 * The available key/value pairs depend on the application that embeds the e-commerce
 * framework. This is because the infrastructure of the application is used for
 * generating the URLs. The full list of available config options is referenced
 * in the "see also" section of this page.
 *
 * @param string Associative list of configuration options
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/url/delete/target
 * @see admin/jqadm/url/delete/controller
 * @see admin/jqadm/url/delete/action
 */
$delConfig = $this->config( 'admin/jqadm/url/delete/config', [] );


/** admin/jqadm/partial/columns
 * Relative path to the partial template for displaying the column selector in the list views
 *
 * The template file contains the HTML code and processing instructions
 * to generate the result shown in the administration interface. The
 * configuration string is the path to the template file relative
 * to the templates directory (usually in admin/jqadm/templates).
 *
 * You can overwrite the template file configuration in extensions and
 * provide alternative templates. These alternative templates should be
 * named like the default one but with the string "default" replaced by
 * an unique name. You may use the name of your project for this. If
 * you've implemented an alternative client class as well, "default"
 * should be replaced by the name of the new class.
 *
 * @param string Relative path to the partial creating the HTML code
 * @since 2017.07
 * @category Developer
 * @see admin/jqadm/partial/confirm
 * @see admin/jqadm/partial/error
 */

/** admin/jqadm/partial/listhead
 * Relative path to the partial template for displaying the table header in the list views
 *
 * The template file contains the HTML code and processing instructions
 * to generate the result shown in the administration interface. The
 * configuration string is the path to the template file relative
 * to the templates directory (usually in admin/jqadm/templates).
 *
 * You can overwrite the template file configuration in extensions and
 * provide alternative templates. These alternative templates should be
 * named like the default one but with the string "default" replaced by
 * an unique name. You may use the name of your project for this. If
 * you've implemented an alternative client class as well, "default"
 * should be replaced by the name of the new class.
 *
 * @param string Relative path to the partial creating the HTML code
 * @since 2017.07
 * @category Developer
 * @see admin/jqadm/partial/confirm
 * @see admin/jqadm/partial/error
 */

/** admin/jqadm/partial/listsearch
 * Relative path to the partial template for displaying the table search row in the list views
 *
 * The template file contains the HTML code and processing instructions
 * to generate the result shown in the administration interface. The
 * configuration string is the path to the template file relative
 * to the templates directory (usually in admin/jqadm/templates).
 *
 * You can overwrite the template file configuration in extensions and
 * provide alternative templates. These alternative templates should be
 * named like the default one but with the string "default" replaced by
 * an unique name. You may use the name of your project for this. If
 * you've implemented an alternative client class as well, "default"
 * should be replaced by the name of the new class.
 *
 * @param string Relative path to the partial creating the HTML code
 * @since 2017.07
 * @category Developer
 * @see admin/jqadm/partial/confirm
 * @see admin/jqadm/partial/error
 */

/** admin/jqadm/partial/navsearch
 * Relative path to the partial template for displaying the search filter in the navigation bar
 *
 * The template file contains the HTML code and processing instructions
 * to generate the result shown in the administration interface. The
 * configuration string is the path to the template file relative
 * to the templates directory (usually in admin/jqadm/templates).
 *
 * You can overwrite the template file configuration in extensions and
 * provide alternative templates. These alternative templates should be
 * named like the default one but with the string "default" replaced by
 * an unique name. You may use the name of your project for this. If
 * you've implemented an alternative client class as well, "default"
 * should be replaced by the name of the new class.
 *
 * @param string Relative path to the partial creating the HTML code
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/partial/confirm
 * @see admin/jqadm/partial/error
 */

/** admin/jqadm/partial/pagination
 * Relative path to the partial template for displaying the pagination
 *
 * The template file contains the HTML code and processing instructions
 * to generate the result shown in the administration interface. The
 * configuration string is the path to the template file relative
 * to the templates directory (usually in admin/jqadm/templates).
 *
 * You can overwrite the template file configuration in extensions and
 * provide alternative templates. These alternative templates should be
 * named like the default one but with the string "default" replaced by
 * an unique name. You may use the name of your project for this. If
 * you've implemented an alternative client class as well, "default"
 * should be replaced by the name of the new class.
 *
 * @param string Relative path to the partial creating the HTML code
 * @since 2016.04
 * @category Developer
 * @see admin/jqadm/partial/navsearch
 * @see admin/jqadm/partial/confirm
 * @see admin/jqadm/partial/error
 */

/** admin/jqadm/template/page
 * Relative path to the template for the base page template
 *
 * The template file contains the HTML code and processing instructions
 * to generate the result shown in the administration interface. The
 * configuration string is the path to the template file relative
 * to the templates directory (usually in admin/jqadm/templates).
 *
 * You can overwrite the template file configuration in extensions and
 * provide alternative templates. These alternative templates should be
 * named like the default one but with the string "default" replaced by
 * an unique name. You may use the name of your project for this. If
 * you've implemented an alternative client class as well, "default"
 * should be replaced by the name of the new class.
 *
 * @param string Relative path to the partial creating the HTML code
 * @since 2016.04
 * @category Developer
 */


/** admin/jqadm/product/fields
 * List of product columns that should be displayed in the list view
 *
 * Changes the list of product columns shown by default in the product list view.
 * The columns can be changed by the editor as required within the administraiton
 * interface.
 *
 * The names of the colums are in fact the search keys defined by the managers,
 * e.g. "product.id" for the product ID.
 *
 * @param array List of field names, i.e. search keys
 * @since 2016.04
 * @category Developer
 */
$default = $this->config( 'admin/jqadm/product/fields', ['image', 'product.id', 'product.status', 'product.type', 'product.code', 'product.label'] );

// Change order of columns to match current design
$customForDx = $this->config( 'admin/jqadm/product/fields', ['image', 'product.code', 'product.label', 'product.instock', 'product.price', 'product.status', 'product.action'] );
// Changed to $customForDx instead of $default
$fields = $this->session( 'aimeos/admin/jqadm/product/fields', $customForDx );

$searchParams = $params = $this->get( 'pageParams', [] );
$searchParams['page']['start'] = 0;

$searchAttributes = map( $this->get( 'filterAttributes', [] ) )->filter( function( $item ) {
	return $item->isPublic();
} )->call( 'toArray' )->each( function( &$val ) {
	$val = $this->translate( 'admin/ext', $val['label'] ?? ' ' );
} )->all();

$operators = map( $this->get( 'filterOperators/compare', [] ) )->flip()->map( function( $val, $key ) {
	return $this->translate( 'admin/ext', $key );
} )->all();

$typeList = $this->get( 'itemTypes', map() )->col( 'product.type.code', 'product.type.code' )->all();

$columnList = [
	'image' => null, // no label and no sorting
	'product.id' => $this->translate( 'admin', 'ID' ),
	'product.status' => $this->translate( 'admin', 'Status' ),
	'product.type' => $this->translate( 'admin', 'Type' ),
	'product.code' => $this->translate( 'admin', 'Code' ),
	'product.label' => $this->translate( 'admin', 'Label' ),
	'product.datestart' => $this->translate( 'admin', 'Start date' ),
	'product.dateend' => $this->translate( 'admin', 'End date' ),
	'product.dataset' => $this->translate( 'admin', 'Dataset' ),
	'product.url' => $this->translate( 'admin', 'URL segment' ),
	'product.scale' => $this->translate( 'admin', 'Quantity scale' ),
	'product.target' => $this->translate( 'admin', 'URL target' ),
	'product.ctime' => $this->translate( 'admin', 'Created' ),
	'product.mtime' => $this->translate( 'admin', 'Modified' ),
	'product.editor' => $this->translate( 'admin', 'Editor' ),
	'product.rating' => $this->translate( 'admin', 'Rating' ),
	'product.ratings' => $this->translate( 'admin', 'Total ratings' ),
	// Custom added for DX
	'product.instock' => "Stock",
	'product.price' =>  "Price",
	'product.action' => "Action",
	// End
];


?>
<?php $this->block()->start( 'jqadm_content' ) ?>

<?= $this->partial( $this->config( 'admin/jqadm/partial/navsearch', 'common/partials/navsearch-standard' ) ) ?>
<?= $this->partial( $this->config( 'admin/jqadm/partial/columns', 'common/partials/columns-standard' ) ) ?>


<div class="list-view"
	data-domain="product"
	data-siteid="<?= $enc->attr( $this->site()->siteid() ) ?>"
	data-filter="<?= $enc->attr( $this->session( 'aimeos/admin/jqadm/product/filter', new \stdClass ) ) ?>"
	data-items="<?= $enc->attr( $this->get( 'items', map() )->call( 'toArray', [true] )->all() ) ?>">

	<?  if (session()->has('aimeos/admin/jqadm/product/notification-message')) {?>
		<nav class="main-navbar">
			<span class="navbar-brand">
				<?= session('aimeos/admin/jqadm/product/notification-message') ?>
				<? session()->forget('aimeos/admin/jqadm/product/notification-message');  ?>
			</span>
		</nav>
	<? } ?>

	<nav-search v-bind:show="search" v-on:close="search = false"
		v-bind:url="`<?= $enc->js( $this->link( 'admin/jqadm/url/search', map( $searchParams )->except( 'filter' )->all() ) ) ?>`"
		v-bind:filter="<?= $enc->attr( (object) $this->session( 'aimeos/admin/jqadm/product/filter', new \stdClass ) ) ?>"
		v-bind:operators="<?= $enc->attr( $operators ) ?>"
		v-bind:name="`<?= $enc->js( $this->formparam( ['filter', '_key_', '0'] ) ) ?>`"
		v-bind:attributes="<?= $enc->attr( $searchAttributes ) ?>">
	</nav-search>

	<?= $this->partial(
			$this->config( 'admin/jqadm/partial/pagination', 'common/partials/pagination-standard' ),
			['pageParams' => $params, 'pos' => 'top', 'total' => $this->get( 'total' ),
			'page' =>$this->session( 'aimeos/admin/jqadm/product/page', [] )]
		);
	?>

	<div class="d-flex row justify-content-end">
		<div class="p2" id="upload_csv_content" >
			<form id="form_upload_new_product" method="POST" action="/company/uploadNewProductInventoryCsv" enctype="multipart/form-data">
				<?= $this->csrf()->formfield() ?> 
				<p class="file btn btn-lg btn-theme text-white upload-csv float-end">
					Upload New Products
					<input id="input_upload_new_product" type="file" name="file" accept=".csv"   />
				</p>
				<input id="btn_upload_new_product" type="submit" value="Upload" name="submit" style="display:none" >
			</form>

			<form id="form_upload_update_stock" method="POST" action="/company/uploadUpdateStockInventoryCsv" enctype="multipart/form-data">
				<?= $this->csrf()->formfield() ?>
				<p class="file btn btn-lg btn-theme text-white upload-csv float-end mx-2">
					Upload Update Stock
					<input id="input_upload_update_stock" type="file" name="file" accept=".csv"   />
				</p>
				<input id="btn_upload_update_stock" type="submit" value="Upload" name="submit" style="display:none">
			</form>
		</div>

	</div>

	<form ref="form" class="list list-product" method="POST"
		action="<?= $enc->attr( $this->url( $target, $controller, $action, $searchParams, [], $config ) ) ?>"
		data-deleteurl="<?= $enc->attr( $this->url( $delTarget, $delCntl, $delAction, $params, [], $delConfig ) ) ?>">

		<?= $this->csrf()->formfield() ?>

		<ul class="nav nav-pills nav-justified product">
			<li class="nav-item">
				<a class="nav-link active" aria-current="page" href="#">All</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Active</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Draft</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">Archived</a>
			</li>
		</ul>

		<div class="linebreak"></div>

		<div class="table-responsive">
			<table class="list-items table table-hover">
				<thead class="list-header">
					<tr>
						<th class="product-table-column"></th>
						<th class="product-table-column">Product Number</th>
						<th class="product-table-column">Product Name</th>
						<th class="product-table-column">Stock</th>
						<th class="product-table-column">Selling Price</th>
						<th class="product-table-column">Sales Status</th>
						<th class="product-table-column">Action</th>
					</tr>
				</thead>
				<tbody>
					<?php foreach( $this->get( 'items', [] ) as $id => $item ) : ?>
						<?php $url = $enc->attr( $this->url( $getTarget, $getCntl, $getAction, ['id' => $id] + $params, [], $getConfig ) ) ?>
						<tr class="list-item <?= $this->site()->readonly( $item->getSiteId() ) ?>" data-label="<?= $enc->attr( $item->getLabel() ) ?>">
							<?php if( in_array( 'image', $fields ) ) : $mediaItem = $item->getRefItems( 'media', 'default', 'default' )->first() ?>
								<td class="image"><a class="items-field" href="<?= $url ?>" tabindex="1"><img class="image" src="<?= $mediaItem ? $enc->attr( $this->content( $mediaItem->getPreview() ) ) : '' ?>" /></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.id', $fields ) ) : ?>
								<td class="product-id"><a class="items-field" href="<?= $url ?>" tabindex="1"><?= $enc->html( $item->getId() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.type', $fields ) ) : ?>
								<td class="product-type"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getType() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.code', $fields ) ) : ?>
								<td class="product-code"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getCode() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.label', $fields ) ) : ?>
								<td class="product-label"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getLabel() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.datestart', $fields ) ) : ?>
								<td class="product-datestart"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getDateStart() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.dateend', $fields ) ) : ?>
								<td class="product-dateend"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getDateEnd() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.dataset', $fields ) ) : ?>
								<td class="product-dataset"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getDataset() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.url', $fields ) ) : ?>
								<td class="product-url"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getUrl() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.scale', $fields ) ) : ?>
								<td class="product-scale"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getScale() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.target', $fields ) ) : ?>
								<td class="product-target"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getTarget() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.config', $fields ) ) : ?>
								<td class="product-config config-item">
									<a class="items-field" href="<?= $url ?>">
										<?php foreach( $item->getConfig() as $key => $value ) : ?>
											<span class="config-key"><?= $enc->html( $key ) ?></span>
											<span class="config-value"><?= $enc->html( $value ) ?></span>
											<br/>
										<?php endforeach ?>
									</a>
								</td>
							<?php endif ?>
							<?php if( in_array( 'product.ctime', $fields ) ) : ?>
								<td class="product-ctime"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getTimeCreated() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.mtime', $fields ) ) : ?>
								<td class="product-mtime"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getTimeModified() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.editor', $fields ) ) : ?>
								<td class="product-editor"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getEditor() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.rating', $fields ) ) : ?>
								<td class="product-rating"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getRating() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'product.ratings', $fields ) ) : ?>
								<td class="product-ratings"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getRatings() ) ?></a></td>
							<?php endif ?>

							<!-- Custom added columns for idaten for DX -->
							<?php if( in_array( 'product.instock', $fields ) ) : ?>
								<!-- temporary static data -->
								<td class="product-ratings"><a class="items-field" href="<?= $url ?>"> 100 </a></td>
							<?php endif ?>
							<?php if( in_array( 'product.price', $fields ) ) : ?>
								<!-- temporary static data -->
								<td class="product-ratings"><a class="items-field" href="<?= $url ?>"> 100,000 <i class="fa fa-jpy" aria-hidden="true"></i></a></td>
							<?php endif ?>
							<!-- End -->

							<?php if( in_array( 'product.status', $fields ) ) : ?>
								<td class="product-status"><a class="items-field" href="<?= $url ?>"><div class="fa status-<?= $enc->attr( $item->getStatus() ) ?>"></div></a></td>
							<?php endif ?>

							<td class="actions">
								<?php if( !$this->site()->readonly( $item->getSiteId() ) ) : ?>
									<a tabindex="1" href="#"
										v-on:click.prevent.stop="askDelete(`<?= $enc->js( $id ) ?>`)"
										title="<?= $enc->attr( $this->translate( 'admin', 'Delete this entry' ) ) ?>"
										aria-label="Delete">
										Delete
									</a>
								<?php endif ?>
							</td>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>
		</div>

		<?php if( $this->get( 'items', map() )->isEmpty() ) : ?>
			<div class="noitems"><?= $enc->html( sprintf( $this->translate( 'admin', 'No items found' ) ) ) ?></div>
		<?php endif ?>
	</form>

	<?= $this->partial(
			$this->config( 'admin/jqadm/partial/pagination', 'common/partials/pagination-standard' ),
			['pageParams' => $params, 'pos' => 'bottom', 'total' => $this->get( 'total' ),
			'page' => $this->session( 'aimeos/admin/jqadm/product/page', [] )]
		);
	?>

	<confirm-delete v-bind:items="unconfirmed" v-bind:show="dialog"
		v-on:close="confirmDelete(false)" v-on:confirm="confirmDelete(true)">
	</confirm-delete>

</div>
<?php $this->block()->stop() ?>

<?= $this->render( $this->config( 'admin/jqadm/template/page', 'common/page-standard' ) ) ?>
