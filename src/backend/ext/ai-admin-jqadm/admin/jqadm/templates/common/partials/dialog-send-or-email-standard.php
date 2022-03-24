<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2017-2021
 */


/**
 * Renders the navbar search fields in the list views
 */

$enc = $this->encoder();
$statusPaymentCode = $this->get( 'statusPaymentCode', [] );

?>
<div id="dialog-send-or-email">
	<div class="modal fade" v-bind:class="{show: show}">
		<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
			<div class="modal-content form-inline"> 
				<div class="modal-header">
					<h4 class="modal-title"> </h4>
					<button type="button" class="btn-close" v-on:click="$emit('close')"
						aria-label="<?= $enc->attr( $this->translate( 'admin', 'Close' ) ) ?>">
					</button>
				</div>

				<div class="modal-body">
					<p for="emailORCheck" class="form-label text-center">ご注文明細がお客様に送付されます <br/>
						本当に送付してもよろしいですか？</p>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" v-on:click="$emit('close')">
						キャンセル
					</button>		
					<button type="submit" class="btn btn-primary" v-on:click="$emit('confirm')">
						オーケー
					</button>
				</div> 
			</div>
		</div>
	</div>
</div>
