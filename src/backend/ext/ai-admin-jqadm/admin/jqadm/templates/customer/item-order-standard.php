<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2017-2021
 */

$price = function( array $orders, \Aimeos\MShop\Order\Item\Iface $item, $priceFormat )
{
	if( isset( $orders[$item->getBaseId()] ) )
	{
		$price = $orders[$item->getBaseId()]->getPrice();
		return sprintf( $priceFormat, $price->getValue(), $price->getCurrencyId() );
	}
};


$name = function( array $orders, \Aimeos\MShop\Order\Item\Iface $item )
{
	if( isset( $orders[$item->getBaseId()] ) )
	{
		$addresses = $orders[$item->getBaseId()]->getAddresses();

		if( !isset( $addresses[\Aimeos\MShop\Order\Item\Base\Address\Base::TYPE_PAYMENT] ) ) {
			return;
		}

		$address = $addresses[\Aimeos\MShop\Order\Item\Base\Address\Base::TYPE_PAYMENT];

		if( $address->getSalutation() !== \Aimeos\MShop\Common\Item\Address\Base::SALUTATION_COMPANY ) {
			return $address->getFirstName() . ' ' . $address->getLastName();
		} else {
			return $address->getCompany();
		}
	}
};


$payment = function( array $orders, \Aimeos\MShop\Order\Item\Iface $item )
{
	if( isset( $orders[$item->getBaseId()] ) )
	{
		$services = $orders[$item->getBaseId()]->getServices();

		if( isset( $services[\Aimeos\MShop\Order\Item\Base\Service\Base::TYPE_PAYMENT] ) ) {
			return $services[\Aimeos\MShop\Order\Item\Base\Service\Base::TYPE_PAYMENT]->getCode();
		}
	}
};


$status = function( $list, $key )
{
	return ( isset( $list[$key] ) ? $list[$key] : '' );
};


$enc = $this->encoder();
$params = $this->get( 'pageParams', [] );
$baseItems = $this->get( 'orderBaseItems', [] );

/// price format with value (%1$s) and currency (%2$s)
$priceFormat = $this->translate( 'admin', '%1$s %2$s' );


$getTarget = $this->config( 'admin/jqadm/url/get/target' );
$getCntl = $this->config( 'admin/jqadm/url/get/controller', 'Jqadm' );
$getAction = $this->config( 'admin/jqadm/url/get/action', 'get' );
$getConfig = $this->config( 'admin/jqadm/url/get/config', [] );

$newTarget = $this->config( 'admin/jqadm/url/create/target' );
$newCntl = $this->config( 'admin/jqadm/url/create/controller', 'Jqadm' );
$newAction = $this->config( 'admin/jqadm/url/create/action', 'create' );
$newConfig = $this->config( 'admin/jqadm/url/create/config', [] );

$copyTarget = $this->config( 'admin/jqadm/url/copy/target' );
$copyCntl = $this->config( 'admin/jqadm/url/copy/controller', 'Jqadm' );
$copyAction = $this->config( 'admin/jqadm/url/copy/action', 'copy' );
$copyConfig = $this->config( 'admin/jqadm/url/copy/config', [] );


/** admin/jqadm/customer/order/fields
 * List of order columns that should be displayed in the customer order view
 *
 * Changes the list of order columns shown by default in the customer order view.
 * The columns can be changed by the editor as required within the administraiton
 * interface.
 *
 * The names of the colums are in fact the search keys defined by the managers,
 * e.g. "order.id" for the ID value.
 *
 * @param array List of field names, i.e. search keys
 * @since 2017.10
 * @category Developer
 */
$default = ['order.id', 'order.baseid', 'order.ctime', 'order.statuspayment', 'order.statusdelivery'];
$default = $this->config( 'admin/jqadm/customer/order/fields', $default );
$fields = $this->session( 'aimeos/admin/jqadm/customerorder/fields', $default );

$columns = [
	'order.id' => $this->translate( 'admin', '請求書番号' ),
	'order.baseid' => $this->translate( 'admin', '合計⾦額' ),
	'order.ctime' => $this->translate( 'admin', '購⼊⽇' ),
	'order.statuspayment' => $this->translate( 'admin', '注⽂状況' ),
	'order.statusdelivery' => $this->translate( 'admin', '配送状況' )
];

$paymentStatusList = [
	'-1' => $this->translate( 'mshop/code', 'pay:-1' ),
	'0' => $this->translate( 'mshop/code', 'pay:0' ),
	'1' => $this->translate( 'mshop/code', 'pay:1' ),
	'2' => $this->translate( 'mshop/code', 'pay:2' ),
	'3' => $this->translate( 'mshop/code', 'pay:3' ),
	'4' => $this->translate( 'mshop/code', 'pay:4' ),
	'5' => $this->translate( 'mshop/code', 'pay:5' ),
	'6' => $this->translate( 'mshop/code', 'pay:6' ),
];

$paymentStatusList1 = [
	'' => "",
	'4' => "未払い",
	'5' => "⽀払い済み",
	'6' => "⽀払い済み",
];

$deliveryStatusList = [
	'-1' => $this->translate( 'mshop/code', 'stat:-1' ),
	'0' => $this->translate( 'mshop/code', 'stat:0' ),
	'1' => $this->translate( 'mshop/code', 'stat:1' ),
	'2' => $this->translate( 'mshop/code', 'stat:2' ),
	'3' => $this->translate( 'mshop/code', 'stat:3' ),
	'4' => $this->translate( 'mshop/code', 'stat:4' ),
	'5' => $this->translate( 'mshop/code', 'stat:5' ),
	'6' => $this->translate( 'mshop/code', 'stat:6' ),
	'7' => $this->translate( 'mshop/code', 'stat:7' ),
];

$deliveryStatusList1 = [
	'' => "",
	'1' => "配達キャンセル",
	'4' => "配達中",
	'5' => "配達済み",
	'6' => "配達済み",	 
];


?>
<div id="order" class="item-order" role="tabpanel" aria-labelledby="order">
	<div class="box">
		<?= $this->partial(
				$this->config( 'admin/jqadm/partial/pagination', 'common/partials/pagination-standard' ),
				['pageParams' => $params, 'pos' => 'top', 'total' => $this->get( 'orderTotal' ),
				'group' => 'uo', 'action' => 'get', 'fragment' => 'order',
				'page' =>$this->session( 'aimeos/admin/jqadm/customerorder/page', [] )]
			);
		?>

		<div class="table-responsive">
			<table class="list-items table table-striped list-customer-orders">
				<thead class="list-header">
					<tr>
						<?= $this->partial(
							$this->config( 'admin/jqadm/partial/listhead', 'common/partials/listhead-standard' ), [
								'fields' => $fields, 'params' => $params, 'tabindex' => $this->get( 'tabindex' ),
								'data' => $columns, 'group' => 'uo', 'action' => ( $this->param( 'id' ) ? 'get' : 'search' ),
								'fragment' => 'order', 'sort' => $this->session( 'aimeos/admin/jqadm/customerorder/sort' ),
							] );
						?>
						<th class="order-detail ">
							操作
						</th>
					</tr>
				</thead>
				<tbody>
					<?php foreach( $this->get( 'orderItems', [] ) as $id => $item ) : ?>
						<?php $url = $enc->attr( $this->url( $getTarget, $getCntl, $getAction, ['resource' => 'order', 'id' => $item->getBaseId()] + $params, [], $getConfig ) ) ?>
						<tr class="list-item <?= $this->site()->readonly( $item->getSiteId() ) ?>">
							<?php if( in_array( 'order.id', $fields ) ) : ?>
								<td class="order-id">
									<a class="items-field" href="<?= $url ?>" tabindex="1"><?= $enc->html( $item->getId() ) ?></a>
								</td>
							<?php endif ?>
							<?php $baseItem = ( isset( $baseItems[$item->getBaseId()] ) ? $baseItems[$item->getBaseId()] : null ) ?>
							<?php if( in_array( 'order.baseid', $fields ) ) : ?>
								<td class="order-baseid">
									¥<?= $enc->html( $baseItem->getPrice()->getValue() + $baseItem->getPrice()->getTaxValue() )  ?>
								</td>
							<?php endif ?>
							<?php if( in_array( 'order.ctime', $fields ) ) : ?>
								<td class="order-ctime">
									<?= $enc->html( substr($item->getTimeCreated(), 0, 10) ) ?>
								</td>
							<?php endif ?>
							<?php if( in_array( 'order.statuspayment', $fields ) ) : ?>
								<td class="order-statuspayment">
									<?= $enc->html( $paymentStatusList1[$item->getStatusPayment()] ) ?>
								</td>
							<?php endif ?>
							<?php if( in_array( 'order.statusdelivery', $fields ) ) : ?>
								<td class="order-statusdelivery">
									<?= $enc->html( $deliveryStatusList1[$item->getStatusDelivery()] ) ?>
								</td>
							<?php endif ?>
							<td class="order-detail  ">
								<a class="items-field" href="<?= $url ?>" >詳細</a>
							</td>
						</tr>
					<?php endforeach ?>
				</tbody>
			</table>
		</div>

		<?php if( $this->get( 'orderItems', map() )->isEmpty() ) : ?>
			<div class="noitems"><?= $enc->html( sprintf( $this->translate( 'admin', 'No items found' ) ) ) ?></div>
		<?php endif ?>

		<?= $this->partial(
				$this->config( 'admin/jqadm/partial/pagination', 'common/partials/pagination-standard' ),
				['pageParams' => $params, 'pos' => 'bottom', 'total' => $this->get( 'orderTotal' ),
				'group' => 'uo', 'action' => 'get', 'fragment' => 'order',
				'page' =>$this->session( 'aimeos/admin/jqadm/customerorder/page', [] )]
			);
		?>

	</div>
</div>
<?= $this->get( 'orderBody' ) ?>
