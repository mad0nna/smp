$(document).ready(function () {
    var uploader = document.getElementById("input_upload_new_product");

    if (uploader !== null) {
        document.getElementById("input_upload_new_product").onchange = function () {
            document.getElementById("btn_upload_new_product").click();
        }

        document.getElementById("input_upload_update_stock").onchange = function () {
            document.getElementById("btn_upload_update_stock").click();
        }

        document.getElementById("linkSetProductAllActive").addEventListener('click', setProductAllStatus);
        document.getElementById("linkSetProductActive").addEventListener('click', setProductActive);
        document.getElementById("linkSetProductInActive").addEventListener('click', setProductInActive);
        document.getElementById("linkSetProductArchived").addEventListener('click', setProductArchived);
    }

    const textItems = document.querySelector('#item-text-group');
    const priceItems = document.querySelector('#item-price-group');
    const mediaItems = document.querySelector('#item-media-group');
    
   
    if ( textItems !== undefined && textItems !== null ) {
        var textItemsData = textItems.getAttribute('data-items');
        if (textItemsData === "[]") {
            $('#item-text-group .btn').click();
        }        
    }

    if ( priceItems !== undefined && priceItems !== null ) {
        var priceItemsData = priceItems.getAttribute('data-items');
        if (priceItemsData === "[]") {
            $('#item-price-group .btn').click();
        }
    }

    if ( mediaItems !== undefined && mediaItems !== null ) {
        var mediaItemsData = mediaItems.getAttribute('data-items');
        if (mediaItemsData !== "[]") {
            $('#item-media-group').find('.card-tools-more').addClass(" d-none");
        }
    }

});

function setProductAllStatus() {
    document.getElementById("selectProductStatus").value = "";
    document.getElementById("btnSubmitFilter").click();
}

function setProductActive() {
    document.getElementById("selectProductStatus").value = "1";
    document.getElementById("btnSubmitFilter").click();
}
function setProductInActive() {
    document.getElementById("selectProductStatus").value = "0";
    document.getElementById("btnSubmitFilter").click();
}
function setProductArchived() {
    document.getElementById("selectProductStatus").value = "-2";
    document.getElementById("btnSubmitFilter").click();
}