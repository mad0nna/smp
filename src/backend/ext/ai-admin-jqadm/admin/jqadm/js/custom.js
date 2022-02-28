$(document).ready(function () {
    var uploader = document.getElementById("input_upload_new_product");

    if (uploader !== null) {
        document.getElementById("linkSetProductAllActive").addEventListener('click', setProductAllStatus);
        document.getElementById("linkSetProductActive").addEventListener('click', setProductActive);
        document.getElementById("linkSetProductInActive").addEventListener('click', setProductInActive);
        document.getElementById("linkSetProductArchived").addEventListener('click', setProductArchived);
    }

    const textItems = document.querySelector('#item-text-group');
    const priceItems = document.querySelector('#item-price-group');
    const mediaItems = document.querySelector('#item-media-group');
    var textItemsData = "[]";
    var priceItemsData = "[]";
    var mediaItemsData  = "[]";
    
   
    if ( textItems !== undefined && textItems !== null ) {
        textItemsData = textItems.getAttribute('data-items');
        if (textItemsData === "[]") {
            $('#item-text-group .btn').click();
        }        
    }

    if ( priceItems !== undefined && priceItems !== null ) {
        priceItemsData = priceItems.getAttribute('data-items');
        if (priceItemsData === "[]") {
            $('#item-price-group .btn').click();
        }
    }

    if ( mediaItems !== undefined && mediaItems !== null ) {
        mediaItemsData = mediaItems.getAttribute('data-items');
        if (mediaItemsData !== "[]") {
            $('#item-media-group').find('.card-tools-more').addClass(" d-none");
        }
    }


    $("#cboProdStatus").change(function() {
        if ($( this ).val() == 1 && (mediaItemsData === "[]" || priceItemsData === "[]" || textItemsData === "[]")) {
            alert("商品を販売する前に、画像のアップロード、商品説明の入力、販売価格の設定を行ってください。");
            $( this ).val("0");
        }
    });

    // const txtStocksStockLevel = document.querySelector('#txtStocksStockLevel');
    // if ( txtStocksStockLevel !== undefined ) {
    //     $("#txtStandardStockLevel").val(parseInt($("#lblStocksStockLevel").text()));
    // }

    
    $("#txtProductFilter").on("input", function(){
        $("#txtProductCode").val(this.value);
        $("#txtProductName").val(this.value);
    });

    $("#txtFilterCustomer").on("input", function(){
        $("#txtCustomerName").val(this.value);
        $("#txtCustomerCompanyName").val(this.value);
    });    

    const cboPaymentStatus = document.querySelector('#cboPaymentStatus');
    if ( cboPaymentStatus !== undefined ) {
        var selected_option = $('#cboPaymentStatus option:selected').val();
        if (selected_option == "") {
            $('#cboPaymentStatus').val("5").change();
        }
    }

    const cboDeliveryStatus = document.querySelector('#cboDeliveryStatus');
    if ( cboDeliveryStatus !== undefined ) {
        var selected_option = $('#cboDeliveryStatus option:selected').val();
        if (selected_option == "") {
            $('#cboDeliveryStatus').val("1").change();
        }
    }    

    const txtProductCode = document.querySelector('#txtProductCode');
    if ( txtProductCode !== undefined ) {
        txtProductCode.addEventListener('blur', (event) => {
            if(event.target.value.length > 64) {
            	alert("６４文字以内で入力してください");
                txtProductCode.classList.remove("is-valid");
                txtProductCode.classList.add("is-invalid");
            	return;
            }
            if(event.target.value.trim().length == 0) {
                txtProductCode.classList.remove("is-valid");
                txtProductCode.classList.add("is-invalid");
            	return;
            }
          });
    }

    const txtProductLabel = document.querySelector('txtProductLabel');
    if ( txtProductLabel == null ) {

    } else if ( txtProductLabel !== null  || txtProductLabel !== undefined ) {
        txtProductLabel.addEventListener('blur', (event) => {
            if(event.target.value.trim().length > 64) {
            	alert("６４文字以内で入力してください")
                txtProductLabel.classList.add("is-invalid");
            	return;
            }
            if(event.target.value.trim().length == 0) {
                txtProductLabel.classList.add("is-invalid");
            	return;
            }
          });
    }

});

function setProductAllStatus() {
    document.getElementById("selectProductStatus").value = "";
    document.getElementById("btnSubmitFilterProduct").click();
}

function setProductActive() {
    document.getElementById("selectProductStatus").value = "1";
    document.getElementById("btnSubmitFilterProduct").click();
}
function setProductInActive() {
    document.getElementById("selectProductStatus").value = "0";
    document.getElementById("btnSubmitFilterProduct").click();
}
function setProductArchived() {
    document.getElementById("selectProductStatus").value = "-2";
    document.getElementById("btnSubmitFilterProduct").click();
}

