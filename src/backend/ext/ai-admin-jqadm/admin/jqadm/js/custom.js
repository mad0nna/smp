$(document).ready(function () {
    var uploader = document.getElementById("upload_csv_content");

    if (uploader) {
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




    const textItems = $('#item-text-group').attr("data-items");
    const priceItems = $('#item-price-group').attr("data-items");

    if (textItems !== undefined && priceItems !== undefined) {
        if (textItems.length) {
            $('#item-text-group .btn').click();
        }
        if (priceItems.length) {
            $('#item-price-group .btn').click();
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