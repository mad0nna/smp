$(document).ready(function(){
        var uploader = document.getElementById("upload_csv_content");

        if (uploader) {
                document.getElementById("input_upload_new_product").onchange = function() {
                        document.getElementById("btn_upload_new_product").click();
                }

                document.getElementById("input_upload_update_stock").onchange = function() {
                        document.getElementById("btn_upload_update_stock").click();
                }
        }    
});
