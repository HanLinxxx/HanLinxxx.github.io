/**
 * 發送驗證碼
 */
var gcAuthCodeInterval
jQuery(document).ready(function ($) {
  $(document).on("click", "#phoneAuth", function () {
    $(".gc_message").remove();
    phone = $("#reg_phone_number").val();
    reg_country_code = $("#reg_country_code").val();
    $("#phoneAuth").prop("disabled", true);
    $.ajax(flatsomeVars.ajaxurl, {
      data: {
        action: "gc_gan_auth_code_register",
        auth_source: "register",
        type: "phone",
        phone: phone,
        country_code: reg_country_code,
        nonce: $("#register-nonce").val(),
        provider: $("#provider").val(),
      },
      dataType: "json",
      type: "POST",
      success: function (resp) {
        if (resp.final_status == false) {
          gcDisplayMessage("#reg_phone_number", resp.message, "error");
          $("#phoneAuth").prop("disabled", false);
        } else {
          gcDisplayMessage(
            "#reg_phone_number",
            '驗證碼已寄送，有效時間：<span class="countdown">' +
              verifyExpirationTime +
              "</span>秒",
            "success"
          );
          $("#verificationCode").prop("disabled", false);
          $("#codeverify").prop("disabled", false);
        }
      },
    });
    gcAuthCodeInterval = setInterval(function () {
      if ($(".woocommerce-form-register .gc_success .countdown").length > 0) {
        currentCount = $(
          ".woocommerce-form-register .gc_success .countdown"
        ).text();
        if (currentCount >= 1) {
          currentCount--;
          $(".woocommerce-form-register .gc_success .countdown").text(
            currentCount
          );
        } else if (currentCount <= 0) {
          window.clearInterval(gcAuthCodeInterval);
          $(".woocommerce-form-register .gc_success")
            .removeClass("gc_success")
            .addClass("gc_error")
            .html("驗證碼失效，請重新取得驗證碼");
          $("#lp_send_code").prop("disabled", false);
          $("#lp_country_code").prop("disabled", false);
          $("#lp_phone_number").prop("readonly", false);
          $("#phoneAuth").prop("disabled", false);
          $("#codeverify").prop("disabled", true);
        }
      }
    }, 1000);
  });
});
