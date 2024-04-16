/**
 * 檢核驗證碼
 */
jQuery(document).ready(function ($) {
  $(document).on("click", "#codeverify", function () {
    $(".gc_message.gc_error").remove();
    var auth_code = $("#verificationCode").val();
    if (auth_code.length < 6) {
      gcDisplayMessage("#verificationCode", "驗證碼不得小於六位數", "error");
    }else if( ! $('#check_privacy').prop('checked')){
      gcDisplayMessage(".privacy_description", "請先閱讀並勾選同意", "error");
    } else {
      phone = $("#reg_phone_number").val();
      reg_country_code = $("#reg_country_code").val();
      $.ajax(flatsomeVars.ajaxurl, {
        data: {
          action: "gc_check_auth_code_register",
          auth_source: "register",
          auth_code: auth_code,
          phone: phone,
          country_code: reg_country_code,
          nonce: $("#register-nonce").val(),
          provider: $("#provider").val(),
          providerid: $("#providerid").val(),
        },
        dataType: "json",
        async: false,
        type: "POST",
        success: function (resp) {
          if (resp.final_status == true ) {
            $("#verified").val(1);
            $(".gc_message").remove();
            $(".register_code").slideUp();
            $("#verificationCode").parent().parent().slideUp();
            $(".hide_input").slideDown();
            $("#reg_country_code").prop("disabled", true);
            $("#reg_phone_number").prop("readonly", true);
            $("#phoneAuth").prop("disabled", true);
            $("#verificationCode").prop("readonly", true);
            $("#codeverify").prop("disabled", true);
            $("#guid_code").val(resp.guid_code);
          } else {
            gcDisplayMessage("#verificationCode", resp.message, "error");
          }
        },
      });
    }
  });
});
