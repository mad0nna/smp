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
 * - priceFormat : Format of the shown prices
 */


$enc = $this->encoder();


?>
<?php $this->block()->start( 'email/payment/html' ) ?>
<!doctype html><html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"><head><title> <?= $enc->html( sprintf( $this->translate( 'client', 'Your order %1$s' ), $this->extOrderItem->getOrderNumber() ), $enc::TRUST ) ?> </title><!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]--><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style type="text/css">#outlook a { padding:0; }
          .ReadMsgBody { width:100%; }
          .ExternalClass { width:100%; }
          .ExternalClass * { line-height:100%; }
          body { margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%; }
          table, td { border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt; }
          img { border:0;height:auto;line-height:100%; outline:none;text-decoration:none;-ms-interpolation-mode:bicubic; }
          p { display:block;margin:13px 0; }</style><!--[if !mso]><!--><style type="text/css">@media only screen and (max-width:480px) {
            @-ms-viewport { width:320px; }
            @viewport { width:320px; }
          }</style><!--<![endif]--><!--[if mso]>
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
        <![endif]--><!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700" rel="stylesheet" type="text/css"><style type="text/css">@import url(https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700);</style><!--<![endif]--><style type="text/css">@media only screen and (min-width:480px) {
        .mj-column-per-100 { width:100% !important; max-width: 100%; }
.mj-column-per-50 { width:50% !important; max-width: 50%; }
.mj-column-per-33 { width:33.333333333333336% !important; max-width: 33.333333333333336%; }
      }</style><style type="text/css">@media only screen and (max-width:480px) {
      table.full-width-mobile { width: 100% !important; }
      td.full-width-mobile { width: auto !important; }
    }</style><style type="text/css"><?= $this->get( 'htmlCss' ) ?></style></head><body><div class="aimeos"><!--[if mso | IE]><table align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600" ><tr><td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;"><![endif]-->  <div style="  width: 700px;
  height: auto;
  margin: 40px auto;
  background: #fff;
  padding: 30px;"> 
  <table style="
  width: 100%;
  height: 100%;
  border-bottom: 10px solid #7f7f7f;
  border-collapse: collapse;">
    <tbody>
      <tr>
        <td style="text-align:left; font-size: 25px; font-weight: bold">請求書​</td>
        <td style="text-align:right;font-weight: bold">発行日​ </br> 請求書 No.​</td>
        <td style="text-align:right;font-weight: bold">2021/11/30 </br> INV011</td>
      </tr>
    </tbody>
  </table>
  <div>
    <p style="font-size: 18px; padding: 10px 0 0 0"> Dear Soft Bank Company <p>
    <p style="font-size: 18px; padding: 0 0 5px 0"> 下記の通りご請求申し上げます​ <p>
  </div>
  <div  style="display: flex; align-items: flex-start;">
    <div style="flex: .8; padding-right: 50px;">
    <table style="width: 100%;height: 100%;border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="text-align:left; padding: 10px 5px 10px 5px; border: solid 1px #ddd; background: #d9d9d9;">ご請求金額(税込)​</td>
          <td style="text-align:right; padding: 5px 10px 5px 20px; border: solid 1px #ddd; font-weight: bold">¥2,000,000</td>
        </tr>
      </tbody>
    </table>
    </div>
    <div style="flex: .9; flex-direction: column; display: flex;">
      <div style="font-size: 13px">株式会社ヒューマンテクノロジーズ </div>
      <div style="font-size: 13px">〒107-0051</div>
      <div style="font-size: 13px">東京都港区赤坂 1-6-6</div>
      <div style="font-size: 13px">請求に関するお問い合わせ: shopping@h-t.co.jp</div>
    </div>
    </div>
    <div style="height: 50px"></div>
     <table style="width: 100%;height: 100%;border-collapse: collapse;">
       <thdead>
         <th style="border: solid 1px #000000;  width: 40px;">No</th>
         <th style="border: solid 1px #000000;">品名​</th>
         <th style="border: solid 1px #000000;">単価​</th>
         <th style="border: solid 1px #000000;">金額(税抜)​</th>
       </thead>
      <tbody>
        <tr>
          <td style="border: solid 1px #000000; text-align:right; padding: 10px">1</td>
          <td style="border: solid 1px #000000; padding: 10px">King of Time </br> 2021/02/02</td>
          <td style="border: solid 1px #000000; text-align:right; padding: 10px">160</td>
          <td style="border: solid 1px #000000; text-align:right; padding: 10px">518</td>
        </tr>
        <tr>
          <td style="border: solid 1px #000000; text-align:right; padding: 10px">2</td>
          <td style="border: solid 1px #000000; padding: 10px">King of Time </br> 2021/02/02</td>
          <td style="border: solid 1px #000000; text-align:right; padding: 10px">160</td>
          <td style="border: solid 1px #000000; text-align:right; padding: 10px">518</td>
        </tr>
      </tbody>
    </table>
    <div style="height: 50px"></div>
      <div  style="display: flex; align-items: flex-start;">
    <div style="flex: 1; padding-right: 50px;">
      <div style="font-size: 13px">備考：​</div>
      <div style="font-size: 13px">お振込の際は、必ず ご契約者様名義 でお願いいたします。 </div>
      <div style="font-size: 13px">振込名義とご契約名が異なる場合、入金確認ができません。</div>
      <div style="font-size: 13px">※振込手数料は貴社にてご負担ください。​</div>
	  <table style="width: 100%;height: 100%;border-collapse: collapse;background: #d9d9d9;">
      <tbody>
        <tr>
          <td style="text-align:left; padding: 10px 5px 10px 5px; font-size: 13px ">みずほ銀行</td>
          <td style="text-align:left; padding: 5px 10px 5px 20px;font-size: 13px ">銀座中央支店</td>
          <td style="text-align:left; padding: 5px 10px 5px 20px; font-size: 13px"><span style="font-weight:bold">当座預金</span> 0100686</td>
        </tr>
        <tr>
          <td style="text-align:left; padding: 10px 5px 10px 5px; font-size: 13px ">三井住友銀行</td>
          <td style="text-align:left; padding: 5px 10px 5px 20px;font-size: 13px ">日比谷支店​</td>
          <td style="text-align:left; padding: 5px 10px 5px 20px; font-size: 13px"><span style="font-weight:bold">普通預金</span> 8875263​</td>
        </tr>
        <tr>
          <td style="text-align:left; padding: 10px 5px 10px 5px; font-size: 13px ">三菱UFJ銀行</td>
          <td style="text-align:left; padding: 5px 10px 5px 20px;font-size: 13px ">虎ノ門支店</td>
          <td style="text-align:left; padding: 5px 10px 5px 20px; font-size: 13px"><span style="font-weight:bold">普通預金</span> 0787967​</td>
        </tr>
      </tbody>
    </table>
      <div style="font-size: 13px">口座名義： カ) ヒューマンテクノロジーズ​</div>
    </div>
  <div style="flex: .7; flex-direction: column; display: flex;">
    <table style="width: 100%;height: 100%;border-collapse: collapse;">
      <tbody>
        <tr>
          <td style="text-align:right; padding: 10px 5px 10px 5px;">小計​</td>
          <td style="text-align:right; padding: 5px 10px 5px 20px;">¥2,000,000</td>
        </tr>
         <tr>
          <td style="text-align:right; padding: 10px 5px 10px 5px;">消費税​</td>
          <td style="text-align:right; padding: 5px 10px 5px 20px;">¥2,000</td>
        </tr>
        <tr>
          <td style="text-align:right; padding: 10px 5px 10px 5px; border: solid 1px #ddd; background: #d9d9d9;">合計​</td>
          <td style="text-align:right; padding: 5px 10px 5px 20px; border: solid 1px #ddd; font-weight: bold">¥2,002,000</td>
        </tr>
      </tbody>
     </table>
      </div>
    </div>
  </div>
</div>
</div></body></html>
<?php $this->block()->stop() ?>
<?= $this->block()->get( 'email/payment/html' ) ?>
