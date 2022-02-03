<?php

/**
 * @license LGPLv3, http://opensource.org/licenses/LGPL-3.0
 * @copyright Aimeos (aimeos.org), 2017-2021
 */


/**
 * Renders the navbar search fields in the list views
 */

$enc = $this->encoder();


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
					<p for="emailORCheck" class="form-label text-center">これにより、ORメールがお客様に送信されます</p>
					<div class="row d-flex justify-content-center">
						<div class="col-lg-4 ">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" value="" id="emailORCheck"  checked>
								<label class="form-check-label" for="emailORCheck">
									メールを送る
								</label>
							</div>
						</div>
					</div>
				</div>

				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" v-on:click="$emit('close')">
						<?= $enc->html( $this->translate( 'admin', 'Close' ) ) ?>
					</button>
					<button type="submit" class="btn btn-primary">
						オーケー
					</button>
				</div> 
			</div>
		</div>
	</div>
</div>
