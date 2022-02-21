<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2017-2021
 */

$selected = function( $key, $code ) {
	return ( $key == $code ? 'selected="selected"' : '' );
};

$enc = $this->encoder();


$target = $this->config( 'admin/jqadm/url/save/target' );
$cntl = $this->config( 'admin/jqadm/url/save/controller', 'Jqadm' );
$action = $this->config( 'admin/jqadm/url/save/action', 'save' );
$config = $this->config( 'admin/jqadm/url/save/config', [] );

$params = $this->get( 'pageParams', [] );


?>
<?php $this->block()->start( 'jqadm_content' ) ?>

<form class="item item-customer form-horizontal container-fluid" method="POST" enctype="multipart/form-data" action="<?= $enc->attr( $this->url( $target, $cntl, $action, $params, [], $config ) ) ?>" autocomplete="off">
	<input id="item-id" type="hidden" name="<?= $enc->attr( $this->formparam( array( 'item', 'customer.id' ) ) ) ?>" value="<?= $enc->attr( $this->get( 'itemData/customer.id' ) ) ?>" />
	<input id="item-next" type="hidden" name="<?= $enc->attr( $this->formparam( array( 'next' ) ) ) ?>" value="get" />
	<?= $this->csrf()->formfield() ?>

	<div class="p2">&nbsp;</div><div class="p2"></div>

	<div class="row item-container box-shadow mt-5 ms-1 bg-white">
		<div class="col-xl-12 item-content tab-content ">
			<?php $readonly = ( $this->access( 'admin' ) === false ? $this->site()->readonly( $this->get( 'itemData/customer.siteid' ) ) : '' ) ?>

			<div id="basic" class="item-basic tab-pane fade show active" role="tabpanel" aria-labelledby="basic">

				<div class="row vue"
					data-data="<?= $enc->attr( $this->get( 'itemData', [] ) ) ?>">
					<div class="col-xl-12">
						<div class="col-xl-6">
							<div class="">
							<div class="form-group row">
									<label class="col-sm-2 form-control-label">顧客企業名 :</label>
									<div class="col-sm-8">
										<?= $enc->html( $this->get( 'itemData/company_name' ) ) ?>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-2 form-control-label">顧客名 :</label>
									<div class="col-sm-8">
										<?= $enc->html( $this->get( 'itemData/customer.label' ) ) ?>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-2 form-control-label">メールアドレス :</label>
									<div class="col-sm-8">
										<?= $enc->html( $this->get( 'itemData/customer.email' ) ) ?>
									</div>
								</div>
							</div>
						</div>
						<div class="col-xl-6  ">
					</div>
				</div>
			</div>

			<?= $this->get( 'itemBody' ) ?>

		</div>

		<div class="item-actions">
			<?= $this->partial( $this->config( 'admin/jqadm/partial/itemactions', 'common/partials/itemactions-standard' ), ['params' => $params] ) ?>
		</div>
	</div>
</form>

<?php $this->block()->stop() ?>


<?= $this->render( $this->config( 'admin/jqadm/template/page', 'common/page-standard' ) ) ?>
