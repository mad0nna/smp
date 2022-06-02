<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2015-2021
 */

$enc = $this->encoder();


$target = $this->config( 'admin/jqadm/url/search/target' );
$controller = $this->config( 'admin/jqadm/url/search/controller', 'Jqadm' );
$action = $this->config( 'admin/jqadm/url/search/action', 'search' );
$config = $this->config( 'admin/jqadm/url/search/config', [] );

$newTarget = $this->config( 'admin/jqadm/url/create/target' );
$newCntl = $this->config( 'admin/jqadm/url/create/controller', 'Jqadm' );
$newAction = $this->config( 'admin/jqadm/url/create/action', 'create' );
$newConfig = $this->config( 'admin/jqadm/url/create/config', [] );

$getTarget = $this->config( 'admin/jqadm/url/get/target' );
$getCntl = $this->config( 'admin/jqadm/url/get/controller', 'Jqadm' );
$getAction = $this->config( 'admin/jqadm/url/get/action', 'get' );
$getConfig = $this->config( 'admin/jqadm/url/get/config', [] );

$copyTarget = $this->config( 'admin/jqadm/url/copy/target' );
$copyCntl = $this->config( 'admin/jqadm/url/copy/controller', 'Jqadm' );
$copyAction = $this->config( 'admin/jqadm/url/copy/action', 'copy' );
$copyConfig = $this->config( 'admin/jqadm/url/copy/config', [] );

$delTarget = $this->config( 'admin/jqadm/url/delete/target' );
$delCntl = $this->config( 'admin/jqadm/url/delete/controller', 'Jqadm' );
$delAction = $this->config( 'admin/jqadm/url/delete/action', 'delete' );
$delConfig = $this->config( 'admin/jqadm/url/delete/config', [] );


/** admin/jqadm/customer/fields
 * List of customer columns that should be displayed in the list view
 *
 * Changes the list of customer columns shown by default in the customer list view.
 * The columns can be changed by the editor as required within the administraiton
 * interface.
 *
 * The names of the colums are in fact the search keys defined by the managers,
 * e.g. "customer.id" for the customer ID.
 *
 * @param array List of field names, i.e. search keys
 * @since 2017.07
 * @category Developer
 */
$default = ['customer.label', 'customer.company_name', 'customer.ctime', 'customer.email'];
$default = $this->config( 'admin/jqadm/customer/fields', $default );
$fields = $this->session( 'aimeos/admin/jqadm/customer/fields', $default );

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

$langList = $this->get( 'pageLanguages', map() )->map( function( $v, $langId ) {
	return $this->translate( 'language', $langId );
} )->all();

$columnList = [
	'customer.id' => $this->translate( 'admin', 'ID' ),
	'customer.status' => $this->translate( 'admin', 'Status' ),
	'customer.code' => $this->translate( 'admin', 'Code' ),
	'customer.salutation' => $this->translate( 'admin', 'Salutation' ),
	'customer.company_name' => $this->translate( 'admin', '顧客企業名' ),
	'customer.vatid' => $this->translate( 'admin', 'VAT ID' ),
	'customer.title' => $this->translate( 'admin', 'Title' ),
	'customer.label' => $this->translate( 'admin', '顧客名' ),
	'customer.firstname' => $this->translate( 'admin', 'First name' ),
	'customer.lastname' => $this->translate( 'admin', 'Last name' ),
	'customer.address1' => $this->translate( 'admin', 'Address 1' ),
	'customer.address2' => $this->translate( 'admin', 'Address 2' ),
	'customer.address3' => $this->translate( 'admin', 'Address 3' ),
	'customer.postal' => $this->translate( 'admin', 'Postal' ),
	'customer.city' => $this->translate( 'admin', 'City' ),
	'customer.state' => $this->translate( 'admin', 'State' ),
	'customer.languageid' => $this->translate( 'admin', 'Language ID' ),
	'customer.countryid' => $this->translate( 'admin', 'Country ID' ),
	'customer.telephone' => $this->translate( 'admin', 'State' ),
	'customer.telefax' => $this->translate( 'admin', 'Facsimile' ),
	'customer.email' => $this->translate( 'admin', 'メールアドレス' ),
	'customer.website' => $this->translate( 'admin', 'Web site' ),
	'customer.birthday' => $this->translate( 'admin', 'Birthday' ),
	'customer.ctime' => $this->translate( 'admin', '購⼊⽇' ),
	'customer.mtime' => $this->translate( 'admin', 'Modified' ),
	'customer.editor' => $this->translate( 'admin', '合計⾦額' ),
];


?>
<?php $this->block()->start( 'jqadm_content' ) ?>

<?= $this->partial( $this->config( 'admin/jqadm/partial/navsearch', 'common/partials/navsearch-standard' ) ) ?>
<?= $this->partial( $this->config( 'admin/jqadm/partial/columns', 'common/partials/columns-standard' ) ) ?>


<div class="list-view"
	data-domain="customer"
	data-siteid="<?= $enc->attr( $this->site()->siteid() ) ?>"
	data-filter="<?= $enc->attr( $this->session( 'aimeos/admin/jqadm/customer/filter', new \stdClass ) ) ?>"
	data-items="<?= $enc->attr( $this->get( 'customer') ) ?>">


	<div class="d-flex row justify-content-end" style="margin-top:1.4em">
		<div class="p2" id="upload_csv_content" >
			<form ref="form" method="POST" action="<?= $enc->attr( $this->url( $target, $controller, $action, $searchParams, [], $config ) ) ?>">
				<?= $this->csrf()->formfield() ?>
				<button id="btnSubmitFilter" type="submit" tabindex="2" title="Search" aria-label="Search" class="btn act-search fa file btn btn-lg btn-theme text-white upload-csv float-end mx-2" style="  ">
					&nbsp; 探す &nbsp; 
				</button>
				<input type="text" id="txtFilterCustomer" tabindex="1" value="<?= $this->session( 'aimeos/admin/jqadm/customer/filter', [] ) ? $this->session( 'aimeos/admin/jqadm/customer/filter', [] )['val']['6'] : ''; ?>" class="form-control float-end" style="width:15%; background:transparent;"  >

				<input type="hidden" value="customer.label" name="filter[key][4]"> 
				<input type="hidden" value="=~" name="filter[op][4]"> 
				<input type="text" id="txtCustomerName" name="filter[val][4]" class="d-none"  value="<?= $this->session( 'aimeos/admin/jqadm/customer/filter', [] ) ? $this->session( 'aimeos/admin/jqadm/customer/filter', [] )['val']['4'] : ''; ?>">
				
				<input type="hidden" value="customer.company_name" name="filter[key][6]"> 
				<input type="hidden" value="=~" name="filter[op][6]"> 
				<input type="text" id="txtCustomerCompanyName" name="filter[val][6]" class="d-none"  value="<?= $this->session( 'aimeos/admin/jqadm/customer/filter', [] ) ? $this->session( 'aimeos/admin/jqadm/customer/filter', [] )['val']['6'] : ''; ?>"   >
			</form>
		</div>
	</div>

	<?= $this->partial(
			$this->config( 'admin/jqadm/partial/pagination', 'common/partials/pagination-standard' ),
			['pageParams' => $params, 'pos' => 'top', 'total' => $this->get( 'total' ),
			'page' => $this->session( 'aimeos/admin/jqadm/customer/page', [] )]
		);
	?>

	<form ref="form" class="list list-customer" method="POST"
		action="<?= $enc->attr( $this->url( $target, $controller, $action, $searchParams, [], $config ) ) ?>"
		data-deleteurl="<?= $enc->attr( $this->url( $delTarget, $delCntl, $delAction, $params, [], $delConfig ) ) ?>">

		<?= $this->csrf()->formfield() ?>

		<column-select tabindex="<?= $this->get( 'tabindex', 1 ) ?>"
			name="<?= $enc->attr( $this->formparam( ['fields', ''] ) ) ?>"
			v-bind:titles="<?= $enc->attr( $columnList ) ?>"
			v-bind:fields="<?= $enc->attr( $fields ) ?>"
			v-bind:show="columns"
			v-on:close="columns = false">
		</column-select>

		<div class="table-responsive">
			<table class="list-items table table-hover table-striped list-orders customer-list">
				<thead class="list-header">
					<tr>
						<th class="customer-table-column customer-label">顧客企業名</th>
						<th class="customer-table-column customer-company">顧客名</th>
						<th class="customer-table-column customer-ctime">購⼊⽇</th>
						<th class="customer-table-column customer-email">メールアドレス</th>
						<th class="customer-table-column action">操作</th>
					</tr>
				</thead>
				<tbody>

					<?php foreach( $this->get( 'customers', [] ) as $id => $item ) : ?>
						<?php $address = $item->getPaymentAddress() ?>
						<?php $url = $enc->attr( $this->url( $getTarget, $getCntl, $getAction, ['id' => $id] + $params, [], $getConfig ) ) ?>
						<tr class="list-item  " data-label="<?= $enc->attr( $item->getLabel() ?: $item->getCode() ) ?>">
							<td class="select d-none">
								<input class="form-check-input" type="checkbox" tabindex="1"
									name="<?= $enc->attr( $this->formparam( ['id', ''] ) ) ?>"
									value="<?= $enc->attr( $item->getId() ) ?>"
									v-on:click="toggle(`<?= $enc->js( $id ) ?>`)"
									v-bind:checked="checked(`<?= $enc->js( $id ) ?>`)"
									v-bind:disabled="readonly(`<?= $enc->js( $id ) ?>`)" />
							</td>
							<?php if( in_array( 'customer.id', $fields ) ) : ?>
								<td class="customer-id"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getId() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.status', $fields ) ) : ?>
								<td class="customer-status"><a class="items-field" href="<?= $url ?>"><div class="fa status-<?= $enc->attr( $item->getStatus() ) ?>"></div></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.code', $fields ) ) : ?>
								<td class="customer-code"><a class="items-field" href="<?= $url ?>" tabindex="1"><?= $enc->html( $item->getCode() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.label', $fields ) ) : ?>
								<td class="customer-label"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getLabel() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.salutation', $fields ) ) : ?>
								<td class="customer-salutation"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getSalutation() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.vatid', $fields ) ) : ?>
								<td class="customer-vatid"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getVatID() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.title', $fields ) ) : ?>
								<td class="customer-title"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getTitle() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.firstname', $fields ) ) : ?>
								<td class="customer-firstname"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getFirstname() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.lastname', $fields ) ) : ?>
								<td class="customer-lastname"> <?= $enc->html( $address->getLastname() ) . ' ' .  $enc->html( $address->getFirstname() ) ?> </td>
							<?php endif ?>
							<?php if( in_array( 'customer.company_name', $fields ) ) : ?>
								<td class="customer-company"><?= $enc->html( $item->get('company_name') ) ?> </td>
							<?php endif ?>
							<?php if( in_array( 'customer.address1', $fields ) ) : ?>
								<td class="customer-address1"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getAddress1() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.address2', $fields ) ) : ?>
								<td class="customer-address2"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getAddress2() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.address3', $fields ) ) : ?>
								<td class="customer-address3"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getAddress3() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.postal', $fields ) ) : ?>
								<td class="customer-postal"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getPostal() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.city', $fields ) ) : ?>
								<td class="customer-city"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getCity() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.state', $fields ) ) : ?>
								<td class="customer-state"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getState() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.languageid', $fields ) ) : ?>
								<td class="customer-languageid"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getLanguageId() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.countryid', $fields ) ) : ?>
								<td class="customer-countryid"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getCountryId() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.telephone', $fields ) ) : ?>
								<td class="customer-telephone"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getTelephone() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.telefax', $fields ) ) : ?>
								<td class="customer-telefax"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getTelefax() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.ctime', $fields ) ) : ?>
								<td class="customer-ctime"><?=  date("Y年m⽉d⽇",strtotime($item->getTimeCreated())) ?> </td>
							<?php endif ?>
							<?php if( in_array( 'customer.email', $fields ) ) : ?>
								<td class="customer-email"> <?= $enc->html( $address->getEmail() ) ?> </td>
							<?php endif ?>
							<?php if( in_array( 'customer.website', $fields ) ) : ?>
								<td class="customer-website"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getWebsite() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.birthday', $fields ) ) : ?>
								<td class="customer-birthday"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $address->getBirthday() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.mtime', $fields ) ) : ?>
								<td class="customer-mtime"><a class="items-field" href="<?= $url ?>"><?= $enc->html( $item->getTimeModified() ) ?></a></td>
							<?php endif ?>
							<?php if( in_array( 'customer.editor', $fields ) ) : ?>
								<td class="customer-editor"> <?= 1000 ?> </td>
							<?php endif ?>
						 
							<td class="customer-editor"><a class="items-field" href="<?= $url ?>"> 詳細 </a></td>
						 

							<td class="actions d-none">
								<a class="btn act-copy fa" tabindex="1"
									href="<?= $enc->attr( $this->url( $copyTarget, $copyCntl, $copyAction, ['id' => $id] + $params, [], $copyConfig ) ) ?>"
									title="<?= $enc->attr( $this->translate( 'admin', 'Copy this entry' ) ) ?>"
									aria-label="<?= $enc->attr( $this->translate( 'admin', 'Copy' ) ) ?>">
								</a>
								<?php if( $this->access( ['super', 'admin'] ) && !$this->site()->readonly( $item->getSiteId() ) ) : ?>
									<a class="btn act-delete fa" tabindex="1" href="#"
										v-on:click.prevent.stop="askDelete(`<?= $enc->js( $id ) ?>`)"
										title="<?= $enc->attr( $this->translate( 'admin', 'Delete this entry' ) ) ?>"
										aria-label="<?= $enc->attr( $this->translate( 'admin', 'Delete' ) ) ?>">
									</a>
								<?php endif ?>
							</td>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>
		</div>

		<?php if(count( $this->get( 'customers' ) ) == 0) { ?>
			<div class="noitems"><?= $enc->html( sprintf( $this->translate( 'admin', 'No items found' ) ) ) ?></div>
		<?php } ?>
	</form>

	<?= $this->partial(
			$this->config( 'admin/jqadm/partial/pagination', 'common/partials/pagination-standard' ),
			['pageParams' => $params, 'pos' => 'bottom', 'total' => $this->get( 'total' ),
			'page' => $this->session( 'aimeos/admin/jqadm/customer/page', [] )]
		);
	?>

	<confirm-delete v-bind:items="unconfirmed" v-bind:show="dialog"
		v-on:close="confirmDelete(false)" v-on:confirm="confirmDelete(true)">
	</confirm-delete>

</div>
<?php $this->block()->stop() ?>

<?= $this->render( $this->config( 'admin/jqadm/template/page', 'common/page-standard' ) ) ?>
