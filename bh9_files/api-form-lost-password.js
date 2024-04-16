var gcFormLostPasswordInterval;
jQuery(document).ready(function ($) {
  $("#lp_input_code").inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
  var lp_country_code = lp_phone_number;
  $(document).on("blur", "#lp_phone_number", function () {
    input_number = $(this).val();
  });
  
  // 發送驗證碼
  $(document).on("click", "#lp_send_code", function () {
    $(".gc_message.gc_error").remove();
    $("#lp_send_code").prop("disabled", true); // 倒數開始時候要先不給重複發送 GC_Chandler 2024-02-19

    lp_country_code = $("#lp_country_code option:selected").val();
    lp_phone_number = $("#lp_phone_number").val();
    if (lp_phone_number == "") {
      gcDisplayMessage("#lp_phone_number", "請輸入您的手機號碼", "error");
      $("#lp_send_code").prop("disabled", false); // 修正，如果為空值，必須將按鈕返回可控 GC_Chandler 2024-03-18
      return;
    }else{
      if (checkMobileFormat(lp_phone_number) == false ) {
        gcDisplayMessage("#lp_phone_number", "手機格式錯誤!請重新確認", "error");
        $("#lp_send_code").prop("disabled", false); // 修正，如果為空值，必須將按鈕返回可控 GC_Chandler 2024-03-18
        return;
      }
    }
    
    $.ajax(flatsomeVars.ajaxurl, {
      data: {
        action: "gc_gan_auth_code_login",
        method: "lost_password",
        auth_source: "forgetpwd", // 驗證碼登入取代忘記密碼
        type: "phone",
        phone: lp_phone_number,
        country_code: lp_country_code,
        nonce: $("#lost-password-nonce").val(),
      },
      dataType: "json",
      type: "POST",
      success: function (resp) {
        $(".gc_error").remove();
        if (resp.final_status == true) {
          $(this).prop("disabled", true);
          $("#lp_send_code").prop("disabled", true);
          $("#lp_country_code").prop("disabled", true);
          $("#lp_phone_number").prop("readonly", true);
          $("#lp_input_code").prop("disabled", false);
          $("#lp_codeverify").prop("disabled", false);
          gcDisplayMessage(
            "#lp_phone_number",
            '驗證碼已寄送，有效時間：<span class="countdown">' +
              verifyExpirationTime +
              "</span>秒",
            "success"
          );
          gcFormLostPasswordInterval = setInterval(function () {
            if ($(".lost_reset_password .gc_success .countdown").length > 0) {
              currentCount = $(
                ".lost_reset_password .gc_success .countdown"
              ).text();
              if (currentCount >= 1) {
                currentCount--;
                $(".lost_reset_password .gc_success .countdown").text(
                  currentCount
                );
              } else if (currentCount <= 0) {
                window.clearInterval(gcFormLostPasswordInterval);
                $(".lost_reset_password .gc_success")
                  .removeClass("gc_success")
                  .addClass("gc_error")
                  .html("驗證碼已失效，請重新取得驗證碼");
                $("#lp_send_code").prop("disabled", false);
                $("#lp_country_code").prop("disabled", false);
                $("#lp_phone_number").prop("readonly", false);
                $("#lp_codeverify").prop("disabled", true); // 倒數結束驗證按鈕失效 GC_Chandler 2024-02-19
                // $(".gc_message.gc_success").remove(); // 錯誤計時器可消失 GC_Chandler 2024-02-19
              }
            }
          }, 1000);
        } else {
          gcDisplayMessage("#lp_phone_number", resp.message, "error");
          $("#lp_send_code").prop("disabled", false); // GC_Chandler 2024-03-20 如果號碼失敗按鈕也要彈出來
        }
      },
    });
    setTimeout(function () {
      $(".gc_error").fadeOut({
        complete: function () {
          $(this).remove();
        },
      });
    }, 3000);
  });

  // 驗證碼登入
  $(document).on("click", "#lp_codeverify", function () {
    $(".gc_message.gc_error").remove();
    var auth_code = $("#lp_input_code").val();
    if (auth_code.length < 6) {
      gcDisplayMessage("#lp_input_code", "驗證碼不得小於六位數", "error");
    } else {
      $.ajax(flatsomeVars.ajaxurl, {
        data: {
          action: "gc_forward_login_for_code",
          method: "lost_password",
          phone: lp_phone_number,
          country_code: lp_country_code,
          auth_code: auth_code,
          nonce: $("#lost-password-nonce").val(),
        },
        dataType: "json",
        type: "POST",
        success: function (resp) {
          if (resp.final_status == true) {
            gcDisplayMessage(
              "#lp_input_code",
              "驗證成功，請於登入後前往修改密碼",
              "success"
            );
            setTimeout(function () {
              window.location.href = resp.url;
            }, 1000);
          } else if (resp.final_status == false) {
            //失效，重新開放寄出驗證碼
            gcDisplayMessage("#lp_input_code", resp.message, "error");
            // $(".gc_message.gc_success").remove(); // 錯誤計時器不可消失 GC_Chandler 2024-02-19
            $("#lp_send_code").prop("disabled", true); // 不影響倒數的情況下也不能解除除重複發送 GC_Chandler 2024-02-19
            $("#lp_country_code").prop("disabled", false);
            $("#lp_phone_number").prop("readonly", false);
            
            $("#lp_codeverify").prop("disabled", false);
            $("#lp_input_code").prop("disabled", false);
          } else {
            gcDisplayMessage("#lp_input_code", resp.message, "error");
          }
        },
      });
    }
  });
});
