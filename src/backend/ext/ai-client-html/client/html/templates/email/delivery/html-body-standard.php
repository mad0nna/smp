<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2019-2021
 */

/** Available data
 * - summaryBasket : Order base item (basket) with addresses, services, products, etc.
 * - summaryTaxRates : List of tax values grouped by tax rates
 * - summaryNamedTaxes : Calculated taxes grouped by the tax names
 * - summaryShowDownloadAttributes : True if product download links should be shown, false if not
 * - summaryCostsDelivery : Sum of all shipping costs
 * - summaryCostsPayment : Sum of all payment costs
 */


$enc = $this->encoder();


?>
<?php $this->block()->start( 'email/delivery/html' ) ?>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
	<head>
		<title><h3><?= $enc->html( sprintf( $this->translate( 'client', 'Your order %1$s' ), $this->extOrderItem->getOrderNumber() ), $enc::TRUST ) ?> </h3></title><!--[if !mso]><!-->
		<meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<meta name="viewport" content="width=device-width,initial-scale=1">
		<style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }
		</style>
		<!--<![endif]--><!--[if mso]>
        <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]--><!--[if lte mso 11]>
        <style type="text/css">
          .outlook-group-fix { width:100% !important; }
        </style>
        <![endif]--><!--[if !mso]><!-->
		<link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css">
		<style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style>
		<!--<![endif]-->
		<style type="text/css">
			@media only screen and (min-width:480px) {
        	.mj-column-per-100 { width:100% !important; max-width: 100%; }
			.mj-column-per-50 { width:50% !important; max-width: 50%; }
			.mj-column-per-33 { width:33.333333333333336% !important; max-width: 33.333333333333336%; }
      		}
		</style>
	  	<style type="text/css">@media only screen and (max-width:480px) {
			table.full-width-mobile { width: 100% !important; }
			td.full-width-mobile { width: auto !important; }
			}
		</style>
		<style type="text/css"><?= $this->get( 'htmlCss' ) ?></style>
	</head>
	<body>
		<div class="aimeos"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
			<div style="Margin:0px auto;max-width:750px;">
				<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
					<tbody>
						<tr>
							<td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
								<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
									<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
										<tr>
											<td align="center" class="logo" style="font-size:0px;padding:10px 25px;word-break:break-word;">
												<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;border-spacing:0px;">
													<tbody>
														<tr>
															<td style="width:550px;"><img height="auto" src="<?= $this->get( 'htmlLogo' ) ?>" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;" width="550"></td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</table>
								</div>
					<!--[if mso | IE]></td></tr></table><![endif]-->
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
			<?php 
				foreach( $this->summaryBasket->getAddress( 'payment' ) as $addr ) {
					$lastName = $addr->getLastName();
				}
			?>
			<div style="Margin:0px auto;max-width:750px;">
				<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
					<tbody>
						<tr>
							<td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;vertical-align:top;"><!--[if mso | IE]><table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="" style="vertical-align:top;width:600px;" ><![endif]-->
								<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
									<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
										<tr>
											<td align="left" class="email-common-salutation" style="font-size:0px;padding:10px 25px;word-break:break-word;">
												<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:left;color:#000000;">
													Dear <?= $lastName . '-様' ?> 
												</div>
											</td>
										</tr>
										<tr>
											<td align="left" class="email-common-intro" style="font-size:0px;padding:10px 25px;word-break:break-word;">
												<div style="font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:1;text-align:center;color:#000000;">
													<h1>ご注文は途中です</h1>
												</div>
											</td>
										</tr>
									</table>
								</div><!--[if mso | IE]></td></tr></table><![endif]-->
							</td>
						</tr>
					</tbody>
				</table>
			</div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="common-summary-outlook common-summary-address-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
			
			<!--[if mso | IE]></td><td class="item-outlook delivery-outlook" style="vertical-align:top;width:300px;" ><![endif]-->
			<div class="mj-column-per-50 outlook-group-fix item delivery" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
			</div>
	 
		</div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="common-summary-outlook common-summary-service-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
		<div class="common-summary common-summary-detail" style="Margin:0px auto;max-width:750px;   width:100%;  ">
			<div class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
				<table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top; border: #e0e0e0 1px solid; background-color:#f5f5f5;"  >
					<tr>
						<td align="left" class="basket" style="font-size:0px;padding:10px 25px;word-break:break-word; vertical-align:top;   width: 300px; padding: 10px 20px !important; border-right: #e0e0e0 1px solid;">
							<table cellpadding="0" cellspacing="0" width="100%" border="0" style="cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;">
								<tr class="" style="text-align:left;" >
									<th class="">概要</th>								 
								</tr> 
								<tr>
									<td>注文 ＃:</td>
									<td> </td>
									<td style="text-align:right;"><?= $this->extOrderItem->getOrderNumber() ?></td>
								</tr>
								<tr>
									<td style="width:100px">注文日:</td>
									<td style="text-align:right;" colspan="2"><?= $enc->html( date_create( $this->extOrderItem->getTimeCreated() )->format( 'Y年m⽉d⽇' ) ) ?></td>
								</tr>
								<?php
									$detailTarget = $this->config( 'client/html/catalog/detail/url/target' );
									$detailController = $this->config( 'client/html/catalog/detail/url/controller', 'catalog' );
									$detailAction = $this->config( 'client/html/catalog/detail/url/action', 'detail' );
									$detailConfig = $this->config( 'client/html/catalog/detail/url/config', ['absoluteUri' => 1] );
									$totalQty = 0;
								?>
								<?php foreach( $this->summaryBasket->getProducts() as $product ) : $totalQty += $product->getQuantity() ?> 
									<tr class=" ">
										<td class="label"> <?php $params = array_merge( $this->param(), ['d_name' => $product->getName( 'url' ), 'd_prodid' => $product->getProductId(), 'd_pos' => ''] ) ?>
											<?= $enc->html( $product->getName(), $enc::TRUST ) ?> 
											<?php if( ( $desc = $product->getDescription() ) !== '' ) : ?>
												<p class="product-description"><?= $enc->html( $desc ) ?></p> 
											<?php endif ?>
											<?php foreach( $this->config( 'client/html/common/summary/detail/product/attribute/types', ['variant', 'config', 'custom'] ) as $attrType ) : ?>
												<?php if( !( $attributes = $product->getAttributeItems( $attrType ) )->isEmpty() ) : ?> 
												<ul class="attr-list attr-type-<?= $enc->attr( $attrType ) ?>"> 
													<?php foreach( $attributes as $attribute ) : ?> 
														<li class="attr-item attr-code-<?= $enc->attr( $attribute->getCode() ) ?>">
															<span class="name"><?= $enc->html( $this->translate( 'client/code', $attribute->getCode() ) ) ?>:</span>
															<span class="value"> <?php if( $attribute->getQuantity() > 1 ) : ?> <?= $enc->html( $attribute->getQuantity() ) ?>× <?php endif ?> <?= $enc->html( $attrType !== 'custom' && $attribute->getName() ? $attribute->getName() : $attribute->getValue() ) ?> </span>
														</li>
													<?php endforeach ?>
												</ul>
												<?php endif ?>
											<?php endforeach ?> 
											<?php if( $this->extOrderItem->getStatusPayment() >= $this->config( 'client/html/common/summary/detail/download/payment-status', \Aimeos\MShop\Order\Item\Base::PAY_RECEIVED )
											&& ( $attribute = $product->getAttributeItem( 'download', 'hidden' ) ) !== null ) : ?> 
											<ul class="attr-list attr-list-hidden">
												<li class="attr-item attr-code-<?= $enc->attr( $attribute->getCode() ) ?>">
													<span class="name"><?= $enc->html( $this->translate( 'client/code', $attribute->getCode() ) ) ?></span><span class="value"> <?php
															$dlTarget = $this->config( 'client/html/account/download/url/target' );
															$dlController = $this->config( 'client/html/account/download/url/controller', 'account' );
															$dlAction = $this->config( 'client/html/account/download/url/action', 'download' );
															$dlConfig = $this->config( 'client/html/account/download/url/config', ['absoluteUri' => 1] );
														?> <a href="<?= $enc->attr( $this->url( $dlTarget, $dlController, $dlAction, ['dl_id' => $attribute->getId()], [], $dlConfig ) ) ?>"> <?= $enc->html( $attribute->getName() ) ?> </a>
													</span>
												</li>
											</ul> 
											<?php endif ?> 
											<?php if( ( $timeframe = $product->getTimeframe() ) !== '' ) : ?> 
												<p class="timeframe"><span class="name"><?= $enc->html( $this->translate( 'client', 'Delivery within' ) ) ?>: </span>
													<span class="value"><?= $enc->html( $timeframe ) ?></span>
												</p> 
											<?php endif ?> 
										</td>
										<td class="quantity" style="text-align:right;"> 
											<?= $enc->html( $product->getQuantity() ) ?> 
										</td>
										<td class="price" style="text-align:right;"> ¥<?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $product->getPrice()->getValue() * $product->getQuantity(), 0 ),'' ) ) ?>
										</td>
									</tr> 
									<?php endforeach ?> 
									<?php foreach( $this->summaryBasket->getService( 'delivery' ) as $service ) : ?> 
										<?php if( $service->getPrice()->getValue() > 0 ) : $priceItem = $service->getPrice() ?> 
										<tr class="body delivery">
											<td class="label"><?= $enc->html( $service->getName() ) ?></td>
											<td class="quantity">1</td>
											<td class="price"><?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $priceItem->getValue(), $priceItem->getPrecision() ), $this->translate( 'currency', $priceItem->getCurrencyId() ) ) ) ?></td>
										</tr> 
										<?php endif ?> 
									<?php endforeach ?> 
									<?php foreach( $this->summaryBasket->getService( 'payment' ) as $service ) : ?> 
										<?php if( $service->getPrice()->getValue() > 0 ) : $priceItem = $service->getPrice() ?> 
										<tr class="body payment">
											<td class="label"><?= $enc->html( $service->getName() ) ?></td>
											<td class="quantity">1</td>
											<td class="price" style="text-align:right;"><?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $priceItem->getValue(), $priceItem->getPrecision() ), $this->translate( 'currency', $priceItem->getCurrencyId() ) ) ) ?></td>
										</tr>
										<?php endif ?> 
									<?php endforeach ?> 
									<?php if( $this->summaryBasket->getPrice()->getCosts() > 0 ) : ?> 
										<tr class="footer subtotal">
											<td class="label"><?= $enc->html( $this->translate( 'client', 'Sub-total' ) ) ?></td>
											<td class="quantity"></td>
											<td class="price"><?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $this->summaryBasket->getPrice()->getValue(), $this->summaryBasket->getPrice()->getPrecision() ), $this->translate( 'currency', $this->summaryBasket->getPrice()->getCurrencyId() ) ) ) ?></td>
										</tr> 
										<?php endif ?> 
									<?php if( ( $costs = $this->get( 'summaryCostsDelivery', 0 ) ) > 0 ) : ?>
									<tr class="footer delivery">
										<td class="label"><?= $enc->html( $this->translate( 'client', '+ Shipping' ) ) ?></td>
										<td class="quantity"></td>
										<td class="price"><?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $costs, $this->summaryBasket->getPrice()->getPrecision() ), $this->translate( 'currency', $this->summaryBasket->getPrice()->getCurrencyId() ) ) ) ?></td>
									</tr> 
									<?php endif ?> 
									<?php if( ( $costs = $this->get( 'summaryCostsPayment', 0 ) ) > 0 ) : ?> 
										<tr class="footer payment">
											<td class="label"><?= $enc->html( $this->translate( 'client', '+ Payment costs' ) ) ?></td>
											<td class="quantity"></td>
											<td class="price">¥<?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $costs )  ) ) ?></td>
										</tr> 
										<?php endif ?> 
									<?php if( $this->summaryBasket->getPrice()->getTaxFlag() === true ) : ?> 
									<tr class="footer total">
										<td class="label"><?= $enc->html( $this->translate( 'client', '合計' ) ) ?></td>
										<td class="quantity"><?= $enc->html( $totalQty ) ?></td>
										<td class="price" style="text-align:right;"><?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $this->summaryBasket->getPrice()->getValue() + $this->summaryBasket->getPrice()->getCosts(), $this->summaryBasket->getPrice()->getPrecision() ), $this->translate( 'currency', $this->summaryBasket->getPrice()->getCurrencyId() ) ) ) ?></td>
									</tr> 
									<?php endif ?> 
									<?php foreach( $this->get( 'summaryNamedTaxes', [] ) as $taxName => $map ) : ?> 
										<?php foreach( $map as $taxRate => $priceItem ) : ?> 
											<?php if( ( $taxValue = $priceItem->getTaxValue() ) > 0 ) : ?>
												<tr class="footer tax">
													<td class="label"> 10% 税</td>
													<td class="quantity"></td>
													<td class="price">¥<?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $taxValue, 0 ), '') ) ?></td>
												</tr> 
											<?php endif ?> 
										<?php endforeach ?> 
									<?php endforeach ?> 
									<?php if( $this->summaryBasket->getPrice()->getTaxFlag() === false ) : ?> 
										<tr class="footer" style="font-weight:bold;">
											<td class="label"><?= $enc->html( $this->translate( 'client', 'Total' ) ) ?></td>
											<td class="quantity"> </td>
											<td class="price" style="text-align:right;">¥<?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $this->summaryBasket->getPrice()->getValue() + $this->summaryBasket->getPrice()->getCosts() + $this->summaryBasket->getPrice()->getTaxValue(), 0 ), '')) ?></td>
										</tr> <?php endif ?> 
										<?php if( $this->summaryBasket->getPrice()->getRebate() > 0 ) : ?> 
										<tr class="footer rebate">
											<td class="label"><?= $enc->html( $this->translate( 'client', 'Included rebates' ) ) ?></td>
											<td class="quantity"></td>
											<td class="price"><?= $enc->html( sprintf( $this->get( 'priceFormat' ), $this->number( $this->summaryBasket->getPrice()->getRebate(), $this->summaryBasket->getPrice()->getPrecision() ), $this->translate( 'currency', $this->summaryBasket->getPrice()->getCurrencyId() ) ) ) ?></td>
										</tr> 
									<?php endif ?> 
							</table>
						</td>
						<td align="left" class="basket" style="font-size:0px;padding:inherit;word-break:break-word; vertical-align:top;  padding: 10px 20px !important; width: 300px;">
							<table cellpadding="0" cellspacing="0" width="100%" border="0" style=" cellspacing:0;color:#000000;font-family:Ubuntu, Helvetica, Arial, sans-serif;font-size:13px;line-height:22px;table-layout:auto;width:100%;   ">
								<tr class="" style="text-align:left;" >
									<th class=""><?= $enc->html( '配送先住所', $enc::TRUST ) ?></th>								 
								</tr>
								<?php foreach( $this->summaryBasket->getAddress( 'payment' ) as $addr ) : ?> 
									<tr class="" style="text-align:left;" ><td>〒<?= $addr->getPostal()  ?></td></tr>
									<tr class="" style="text-align:left;" ><td><?= $addr->getState() . ' ' . $addr->getCity() . ' ' . $addr->getAddress1() . ' ' . $addr->getAddress2() . ' ' . $addr->getAddress3() ?></td></tr>
									<tr class="" style="text-align:left;" ><td><?= $addr->getLastName() . ' '. $addr->getFirstName() ?></td></tr>
									<tr class="" style="text-align:left;" ><td><?= $this->translate( 'country', $addr->getCountryId() )  ?></td></tr>
								<?php endforeach ?>
							</table>
						</td>
					</tr>
				</table>
				
			</div><!--[if mso | IE]></td></tr></table><table align="center" border="0" cellpadding="0" cellspacing="0" class="email-common-outro-outlook" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->
		</div>
	</body>
</html>
<?php $this->block()->stop() ?>
<?= $this->block()->get( 'email/delivery/html' ) ?>
