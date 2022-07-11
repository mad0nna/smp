<!DOCTYPE html>
<html>
<body>
    <title>Zeus</title>
<div style="display:hidden !important;">
              <form
                  method="POST"
                  action="<?=$host?>"
                  target="_top"
                >
                  <input type="hidden" name="clientip" value="<?=$clientIP?>" />
                  <input type="hidden" name="money" value='<?=$amount?>' />
                  <input type="hidden" name="sendid" value="<?=$sendID?>" />
                  <input type="hidden" name="sendpoint" value="<?=$salesforceCompanyID?>" />
                  <input
                    type="hidden"
                    name="email"
                    value="<?=$email?>"
                  />
                  <input
                    type="hidden"
                    name="success_url"
                    value=''
                  />
                  <input
                    type="hidden"
                    name="success_str"
                    value="ページに戻る"
                  />
                  <input
                    type="hidden"
                    name="failure_url"
                    value=''>
                  <input type="hidden" name="failure_str" value="ページに戻る" />
                  <input
                    type="submit"
                    name="To Credit Page"
                    value="Payment Method"
                    style="display:none !important;"
                    className="cursor-pointer font-bold text-center bg-transparent text-tertiary-500 py-2 align-middle 3xl:text-lg 2xl:text-md xl:text-sm lg:text-xs md: text-xxs"
                  />
</form>
</div>
</body>
<script>
window.setTimeout(()=>{
    window.document.forms[0].submit()
}, 100);
</script>
</html>

