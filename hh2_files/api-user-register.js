/**
 * 使用者註冊事件
 */
jQuery(document).ready(function ($) {
  $(document).on("click", "#forward_register", function () {
    $(".gc_message.gc_error").remove();
    var registerWay = get_source_label();
    var regValid = true;
    var pwd1 = $("#reg_password1").val();
    var pwd2 = $("#reg_password2").val();

    if (!$("#check_privacy").prop("checked")) {
      regValid = false;
      gcDisplayMessage(
        ".privacy_description",
        "請先閱讀並勾選同意",
        "error"
      );
    }

    if ($("#last_name").val() == "" || $("#verified").val() != 1) {
      regValid = false;
      gcDisplayMessage("#last_name", "請填寫姓氏", "error");
    }

    if ($("#first_name").val() == "" || $("#verified").val() != 1) {
      regValid = false;
      gcDisplayMessage("#first_name", "請填寫名字", "error");
    }

    /**
    * GC_Chandler 2024-02-19 性別
    */
    if ($("#gender").val() == "" || $("#verified").val() != 1) {
      regValid = false;
      gcDisplayMessage("#gender", "請選擇性別", "error");
    }

    if ($("#reg_phone_number").val() == "" || $("#verified").val() != 1) {
      regValid = false;
      gcDisplayMessage("#reg_phone_number", "請輸入您的手機號碼", "error");
    }

    if ($("#verificationCode").val() == "" || $("#verified").val() != 1) {
      regValid = false;
      gcDisplayMessage("#verificationCode", "請輸入驗證碼", "error");
    }

    if (pwd1 == "") {
      regValid = false;
      gcDisplayMessage("#reg_password1", "請填寫設定密碼", "error");
    }

    if (pwd1.length <= 5) {
      regValid = false;
      gcDisplayMessage(
        "#reg_password1",
        "設定密碼至少需含英文或數字六位數",
        "error"
      );
    }

    if (pwd2 == "") {
      regValid = false;
      gcDisplayMessage("#reg_password2", "請填寫設定密碼", "error");
    }

    if (pwd1 != pwd2) {
      regValid = false;
      gcDisplayMessage("#reg_password1", "密碼不一致", "error");
    }

    if (!regValid) {
      return;
    }

    $(".gc_message").remove();
    /**
     * @author GC_Chandler
     * @copyright 2024-02-21 
     * 抄襲登入寫法，loaded 新增等待描述[等待註冊中!]，gcBlockUI
     */
    gcBlockUI('<span class="loader2 fadeOut"></span><span class="load-text">等待註冊中!<span>',true);
    $.ajax(flatsomeVars.ajaxurl, {
      data: {
        action: "gc_forward_register",
        country_code: reg_country_code,
        phone: phone,
        last_name: $("#last_name").val(),
        first_name: $("#first_name").val(),
        reg_email: $("#reg_email").val(),
        provider: $("#provider").val(),
        providerid: $("#providerid").val(),
        gender: $("#gender option:selected").val(),
        user_pass: pwd1,
        guid_code: $("#guid_code").val(),
      },
      dataType: "json",
      type: "POST",
      success: function (resp) {
        if (resp.final_status == true) {
          /**
           * @author GC_Chandler
           * @copyright 2024-02-21 
           * 抄襲登入寫法，loaded 註冊成功描述[註冊成功，即將前往會員中心!]，gcBlockUI
           */
          gcBlockUI('<span class="loader2 fadeOut"></span><span class="load-text">註冊成功，即將前往會員中心!<span>',false);
          gcDisplayMessage(
            "#forward_register",
            "註冊成功，即將前往會員中心",
            "success"
          );
          dataLayer.push({
            eventCategory: "account",
            phone: phone,
            event: "login",
          });
          dataLayer.push({
            eventCategory: "account",
            eventAction: "sign_up",
            eventLabel: registerWay,
            event: "ga-event",
          });
          window.location.href = resp.url;
        } else if( resp.url ){
          gcBlockUI('<span class="load-text">驗證已逾時五分鐘，請重新申請成為遠房好友<span>');
          setTimeout(function(){
            window.location.href = resp.url;
          },2000);
        }else {
          gcDisplayMessage("#forward_register", resp.message, "error");
        }
      },
    });
  });

  /**
   * GC_Chandler 2023-11-28 臨陣磨槍系列
   * 1.姓氏 名字 不得輸入數字
   * 2.阻擋其他方式輸入數字
   */
  $('#last_name, #first_name').on('keydown ', function(e) {
    var key = e.keyCode || e.which;
    // 如果按下的是數字鍵 (48-57 鍵盤上方 96-105 右側)
    if ((key >= 48 && key <= 57) || (key >= 96 && key <= 105)) {
      e.preventDefault(); 
    }
  });

  // $('#last_name, #first_name').on('keydown paste input', function(e) {
    // setTimeout(() => {
      // var inputText = $(this).val();
      // if (/\d/.test(inputText)) {
        // $(this).val(inputText.replace(/\d/g, ''));
        // alert('只允許輸入非數字的字元！');
      // }
    // }, 0);
  // });
});
