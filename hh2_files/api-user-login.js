/**
 * 使用者登入事件
 */
jQuery(document).ready(function ($) {
  $(document.body).on('keyup','#reg_password1, #reg_password2', function () {
      // 取得輸入的密碼
      var password = $(this).val();
      var password_id = $(this).attr('id');

      // 檢查條件
      if (password.length >= 6 && /[a-zA-Z]/.test(password) && /\d/.test(password)) {
          // 符合條件，清空錯誤訊息
          gcRemoveMessage('#'+password_id);
      } else {
          // 不符合條件，顯示錯誤訊息
          gcDisplayMessage('#'+password_id, '密碼需為6個字以上，且需包含英文和數字。','error');
      }
      
      if( $('#reg_password1').val().length > 0 && $('#reg_password2').val().length > 0 && 
          $('#reg_password1').val() != $('#reg_password2').val() ){
            gcDisplayMessage('#reg_password2', '密碼不一致。','error');
      }else if( $('#reg_password1').val().length > 0 && $('#reg_password2').val().length > 0 && 
        $('#reg_password1').val() == $('#reg_password2').val()
      ){
        gcRemoveMessage('#reg_password2');
      }
  });
  $(document).on("click", "#forward_login", function () {
    var click_status = true;
    $(".gc_error").remove();
    phone = $("#login_phone_number").val();
    if (phone == "") {
      gcDisplayMessage("#login_phone_number", "請輸入您的手機號碼", "error");
      click_status = false;
    } else {
      if (checkMobileFormat(phone) == false ) {
        gcDisplayMessage("#login_phone_number", "手機格式錯誤!請重新確認", "error");
        click_status = false;
      }
    }

    if ($("#login_password").val() == "") {
      gcDisplayMessage("#login_password", "請填寫您的登入密碼", "error");
      click_status = false;
    }

    if (click_status == false) {
    } else {
      gcBlockUI('<span class="loader2 fadeOut"></span><span class="load-text">登入中請稍後!<span>',false);
      $.ajax(flatsomeVars.ajaxurl, {
        data: {
          action: "gc_forward_login",
          country_code: $("#login_country_code").val(),
          phone: phone,
          user_login: $("#login_country_code").val() + phone,
          user_pass: $("#login_password").val(),
          nonce: $("#woocommerce-login-nonce").val(),
        },
        dataType: "json",
        type: "POST",
        success: function (resp) {
          if (resp.final_status == 1) {
            dataLayer.push({
              eventCategory: "account",
              eventAction: "login",
              eventLabel: get_source_label(),
              event: "ga-event",
            });
            dataLayer.push({
              eventCategory: "account",
              phone: $("#login_country_code").val() + phone,
              event: "login",
            });
            window.location.href = resp.url;
          } else {
            gcDisplayMessage("#forward_login", resp.message, "error");
            setTimeout(jQuery.unblockUI, 1);
          }
        },
      });
    }
  });
});
