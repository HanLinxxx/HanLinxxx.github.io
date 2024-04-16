jQuery(document).ready(function ($) {
  var verified = false;
  var blockCss = {
    "border-radius": "10px",
    padding: "5px 10px",
    border: "3px solid rgb(47 126 150)",
  };

  var bk_country_code = (bk_phone_number = "");
  var defaultCountdownHtml =
    '驗證碼已寄送，有效時間<span class="countdown">' +
    verifyExpirationTime +
    "</span>秒";

  if (!$("body").hasClass("logged-in")) {
  } else {
    $("select[name=input_76] option:not(:selected)").prop("disabled", true);
  }
  /**
  * @author GC_Chandler
  * @copyright 2024-02-21
  * 將手機號碼[input_38]與驗證碼[input_43]拆開，並將手機號碼[input_38]格式化
  */
  $(document).on(
    "keypress",
    "input[name=input_43]",
    function () {
      $(this).inputFilter(function (value) {
        return /^\d*$/.test(value);
      });
    }
  );
  $(document).on("keypress input", "input[name=input_38]", function (evt) {
    restrictToNumbers(evt);
  });
  /**
   * 初始化欄位位置
   */
  $(document).on("change", "#input_1_38", function (e) {
    $("#field_1_43").hide();
    $("#field_1_47").hide();
    $("#field_1_45").hide();
    $("#field_1_46").hide();
    $("#field_1_11").removeClass("grid_row_start_6");
    $("#field_1_88").removeClass("grid_row_start_6");
    $("#field_1_4").removeClass("grid_row_start_6");

    // $("#field_1_69").removeClass("grid_row_start_7");居住地
    // $("#field_1_70").removeClass("grid_row_start_7");區域

    $("#field_1_6").removeClass("grid_row_start_7");
    $("#field_1_15").removeClass("grid_row_start_8");
    $("#field_1_52").removeClass("grid_row_start_8");
    $("#field_1_72").removeClass("grid_row_start_9");
    $("#field_1_77").removeClass("grid_row_start_9");
    $("#field_1_73").removeClass("grid_row_start_10");
    $("#field_1_78").removeClass("grid_row_start_10");
    $("#field_1_56").removeClass("grid_row_start_11");
    $("#gc_custom_button").prop("disabled", false);
  });

  var dt = new Date();
  var d1 = $("#form1_date_first_selector").val();
  $("input[name=input_7]").val(d1);
  var d2 = $("#form1_date_second_selector").val();
  $("input[name=input_9]").val(d2);

  $(document).on("change", "#form1_date_first_selector", function () {
    var d1 = $(this).val();
    $("input[name=input_7]").val(d1);
  });

  $(document).on("change", "#form1_date_second_selector", function () {
    var d2 = $(this).val();
    $("input[name=input_9]").val(d2);
  });

  var building_type = $("#input_1_81").val();
  var final_type = "";
  var guid_code = "";
  var user_pass = "";
  var gcMakeAnAppointmentInterval;
  /**
   * 發送驗證碼
   */
  $(document).on("click", "#gc_custom_button", function (e) {
    e.preventDefault();
    //GC_minos:2022-01-09認證手機後，欄位的位置都改變了，若此時再去修改選擇預約建案將導致位置絮亂，因此在認證手機後鎖死預約建案選擇
    $("select[name=input_63] option:not(:selected)").prop("disabled", true);
    building_type = $("#input_1_81").val();
    $(".gc_message.gc_error").remove();
    $("input[name=input_43]").val("");
    bk_country_code = $("select[name=input_76] option:selected").val();
    bk_phone_number = $("input[name=input_38]").val();
    if (bk_phone_number == "") {
      gcDisplayMessage("input[name=input_38]", "請輸入您的手機號碼", "error");
      return;
    }
    $.ajax(flatsomeVars.ajaxurl, {
      data: {
        action: "gc_gan_auth_code_appointment",
        auth_source: "register",
        type: "phone",
        phone: bk_phone_number,
        country_code: bk_country_code,
      },
      dataType: "json",
      type: "POST",
      success: function (resp) {
        if (resp.final_status == true) {
          final_type = resp.final_type;
          // 非會員驗證手機，移除隱藏 classList
          $("#field_1_43, #field_1_47").removeClass("gfield_visibility_hidden");
          // grid 位移
          $("#field_1_43").show();
          $("#field_1_47").show();
          $("#field_1_43").addClass("field_1_43_class");
          $("#field_1_47").addClass("field_1_47_class");
          // 姓 與 名 位移 form1 / form2
          $("#field_1_11").addClass("grid_row_start_6");
          $("#field_1_88").addClass("grid_row_start_6");
          $("#field_1_4").addClass("grid_row_start_6");
          $("#field_1_21").addClass("grid_row_start_7");
          if (building_type == "office") {
            $("#field_1_6")
              .removeClass("form6_grid_row_start_6")
              .addClass("form6_grid_row_start_7");
            $("#field_1_6")
              .addClass("form6_grid_row_start_8");
            $("#field_1_82, #field_1_83")
              .removeClass("form6_grid_row_start_8")
              .addClass("form6_grid_row_start_9");

            $("#field_1_84").addClass("grid_row_start_10");
            $("#field_1_85").addClass("grid_row_start_10");

            $("#field_1_86").addClass("grid_row_start_11");

            $("#field_1_87").addClass("grid_row_start_12");
            $("#field_1_15").addClass("grid_row_start_14");

            $("#field_1_72").css({
              top: "0",
            });
            $("#field_1_73").css({
              top: "0",
            });
            $("#field_1_77").css({
              top: "0",
            });
            $("#field_1_78").css({
              top: "0",
            });
            $("#field_1_77").css("margin-top", 4);
            $("#field_1_78").css("margin-top", 4);
            // GC_Chandler 2021-12-08:位移
            $("#field_1_56").css({
              top: "-30px",
            });
          } else {
            // $("#field_1_69").addClass("grid_row_start_7"); 居住地
            // $("#field_1_70").addClass("grid_row_start_7"); 區域
            $("#field_1_6").addClass("grid_row_start_7");
            $("#field_1_90").addClass("grid_row_start_8"); // LineID
            $("#field_1_15").addClass("grid_row_start_9");
            $("#field_1_52").addClass("grid_row_start_9");
            $("#field_1_72").addClass("grid_row_start_10");
            $("#field_1_77").addClass("grid_row_start_10");
            $("#field_1_73").addClass("grid_row_start_11");
            $("#field_1_78").addClass("grid_row_start_11");
            $("#field_1_56").addClass("grid_row_start_12");
          }
          $("#gc_custom_button, #gform_submit_button_1").prop("disabled", true);
          $("input[name=input_38]").prop("readonly", true);
          $("select[name=input_76] option:not(:selected)").prop(
            "disabled",
            true
          );
          gcDisplayMessage(
            "input[name=input_38]",
            defaultCountdownHtml,
            "success"
          );
          gcMakeAnAppointmentInterval = setInterval(function () {
            if ($(".gc_success .countdown").length > 0) {
              currentCount = $(".gc_success .countdown").text();
              if (currentCount >= 1) {
                currentCount--;
                $(".gc_success .countdown").text(currentCount);
              } else if (currentCount <= 0) {
                window.clearInterval(gcMakeAnAppointmentInterval);
                $(".gc_success")
                  .removeClass("gc_success")
                  .addClass("gc_error")
                  .html("驗證碼失效，請重新取得驗證碼");
                $("#gc_custom_button, #gform_submit_button_1").prop(
                  "disabled",
                  false
                );
                $("input[name=input_38]").prop("readonly", false);
                $("select[name=input_76] option:not(:selected)").prop(
                  "disabled",
                  false
                );
              }
            }
          }, 1000);
        } else {
          gcDisplayMessage("input[name=input_38]", resp.message, "error");
        }
      },
    });
    return false;
  });
  /**
   * 檢查驗證碼|驗證碼登入
   */
  $(document).on("click", "#gc_custom_approve_button", function (e) {
    $(".gc_error").remove();
    var auth_code = $("input[name=input_43]").val();
    if (auth_code.length < 6) {
      gcDisplayMessage("input[name=input_43]", "驗證碼不得小於六位數", "error");
    } else {
      $("#gform_1").block({
        message: "驗證中，請稍候",
        centerY: true,
        centerX: true,
        css: blockCss,
      });
      $.ajax(flatsomeVars.ajaxurl, {
        data: {
          action: "gc_check_auth_code_appointment",
          phone: bk_phone_number,
          country_code: bk_country_code,
          auth_code: $("input[name=input_43]").val(),
          final_type: final_type,
        },
        dataType: "json",
        type: "POST",
        success: function (resp) {
          if (resp.final_status == true) {
            switch (resp.final_type) {
              case "1":
                $("#reservation_form_popup").block({
                  message: resp.message,
                  centerY: true,
                  centerX: true,
                  css: blockCss,
                });
                if (resp.apiUserInfo.data.user_area != null) {
                  $("select[name=input_69]").val(
                    resp.apiUserInfo.data.user_area
                  );
                  $("select[name=input_69]").trigger(
                    "change",
                    resp.apiUserInfo.data.user_city
                  );
                }
                $("select[name=input_4]").val(resp.apiUserInfo.data.gender);
                $("input[name=input_11]").val(resp.apiUserInfo.data.last_name);
                $("input[name=input_88]").val(resp.apiUserInfo.data.first_name);
                $("input[name=input_6]").val(resp.apiUserInfo.data.user_email);
                $("#reservation_form_popup").unblock();
                $(".nav-top-not-logged-in").removeAttr("data-open");
                $(
                  "input[name=input_11],input[name=input_88],select[name=input_4]"
                ).prop("readonly", true);
                break;
              case "2":
                gcBlockUI(resp.message);
                setTimeout(function () {
                    jQuery.unblockUI();
                }, 3000);
                break;
            }
            guid_code = resp.guid_code;
            user_pass = resp.user_pass;
            verified = true;
            $("input[name=input_45]").val(1);
            $("#gc_custom_approve_button").prop("disabled", true);
            $("input[name=input_43],input[name=input_38]").prop(
              "readonly",
              true
            );
            $("#gc_custom_button").prop("disabled", true);
            $("select[name=input_76] option:not(:selected)").prop(
              "disabled",
              true
            );
            $("#gform_submit_button_1").prop("disabled", false);
            //GC_minos:驗證成功，移除訊息
            $(".gc_message.gc_success").remove();
          } else {
            gcDisplayMessage("input[name=input_43]", resp.message, "error");
          }
        },
      });
      $("#gform_1").unblock();
    }
  });

  /**
   * 選擇縣市 2023-08-31之後用不到
   */
  $(document).on("change", "select[name=input_69]", function (e, city = null) {
    var city_name = $(this).val();
    setCookie("selectedCity", city_name);
    $.ajax(flatsomeVars.ajaxurl, {
      data: {
        action: "change_gc_districts",
        city_name: city_name,
      },
      type: "POST",
      dataType: "JSON",
      success: function (data) {
        var option = data.new_districts_option;
        $("select[name=input_70]").html("").append(option);
        if (city != null) {
          $("select[name=input_70]").val(city);
        }
      },
      fail: function (data) {
        console.log("ERROR" + data);
      },
    });
  });

  // GC_Chandler 2021-12-08:限制數字 mobile 僅數字鍵盤
  $("input[name=input_38]")
    .clone()
    .attr("type", "tel")
    .insertAfter("input[name=input_38]")
    .prev()
    .remove(); // 手機
  $("input[name=input_83]")
    .clone()
    .attr("type", "tel")
    .insertAfter("input[name=input_83]")
    .prev()
    .remove();
  $("input[name=input_38]").inputFilter(function (value) {
    return /^\d*$/.test(value);
  });
  $("input[name=input_83]").inputFilter(function (value) {
    return /^\d*$/.test(value);
  });

  // 送出form1問卷按鈕
  $(document).on("click", "#gform_submit_button_1", function (e) {
    // console.log('gform_submit_button_1 user_pass',user_pass);
    building_type = $("#input_1_81").val();
    $(".gc_message").each(function (i, e) {
      if ($(this).find(".countdown").length == 0) {
        $(this).remove();
      }
    });
    if ($("body").hasClass("logged-in")) {
      verified = true;
    }
    e.preventDefault();
    var country_code = $("select[name=input_76] option:selected").val();
    var phone = $("#input_1_38").val();
    var phone_length = $("#input_1_38").length;
    var auth_code = $("#field_1_43").val();
    var code_length = 1;
    if ($("#field_1_43").hasClass("gfield_visibility_hidden")) {
      var code_length = 0;
    }
    var last_name = $("#input_1_11").val();
    var last_name_length = $("#input_1_11").length;
    var first_name = $("#input_1_88").val();
    var first_name_length = $("#input_1_88").length;

    var approve_radio = $("input[name='input_54']").val();
    var approve_checked = $('input[name="input_56.1"]:checked').length > 0;
    var email = $("#input_1_6").val();
    var selectedBuilding = $("#input_1_63").val();
    var gender = $("select[name=input_4]").val();
    /**GC_Chandler:2021-11-22 */
    var GUInumber = $("input[name=input_82]").val();
    var buildType = $("select[name=input_84]").val();
    var rentOrBuy = $("select[name=input_85]").val();
    var pinRange = $("select[name=input_86]").val();
    /**
     * GC_Chandler:2023-09-18 lineID
     */
    var lineID = $("input[name=input_90]").val();
    /**
     * GC_Chandler:2023-09-20 日期
     */
    var form1_date_first_selector = $("input[name=form1_date_first_selector]").val();
    var selectedDate = new Date(form1_date_first_selector);
    var today = new Date();

    var errorElement = "";
    if (!approve_checked) {
      errorElement = "#label_1_56_1";
      gcDisplayMessage(errorElement, "請同意服務條款與隱私權聲明", "error");
    }
    /**GC_Chandler:2021-11-24 新增
     * 公司行號驗證
     * 類型需求
     * 租買需求
     * 坪數需求
     */
    if (building_type == "office") {
      if (pinRange == "") {
        errorElement = "#input_1_86";
        gcDisplayMessage(errorElement, "請選擇坪數需求", "error");
      }
      if (rentOrBuy == "") {
        errorElement = "#input_1_85";
        gcDisplayMessage(errorElement, "請選擇租買需求", "error");
      }
      if (buildType == "") {
        errorElement = "#input_1_84";
        gcDisplayMessage(errorElement, "請選擇類型需求", "error");
      }
      if (GUInumber == "") {
        errorElement = "#input_1_82";
        gcDisplayMessage(errorElement, "請輸入公司行號", "error");
      }
    }
    if (!is_email(email) && email != "") {
      errorElement = "#input_1_6";
      gcDisplayMessage(errorElement, "請輸入有效的電子信箱", "error");
    }
    if (gender == "") {
      errorElement = "select[name=input_4]";
      gcDisplayMessage(errorElement, "請選擇性別", "error");
    }
    if (last_name_length > 0 && last_name == "") {
      errorElement = "#input_1_11";
      gcDisplayMessage(errorElement, "請填寫姓氏", "error");
    }
    if (first_name_length > 0 && first_name == "") {
      errorElement = "#input_1_88";
      gcDisplayMessage(errorElement, "請填寫名字", "error");
    }
    if (selectedBuilding == "") {
      errorElement = "#input_1_63";
      gcDisplayMessage(errorElement, "請選擇建案", "error");
    }
    /**
     * LineID
     */
    if (lineID == "" && selectedBuilding == "線上賞屋") {
      errorElement = "#input_1_90";
      gcDisplayMessage(errorElement, "請填寫 Line ID", "error");
    }
    /**
     * 日期小於今天
     */
    if (selectedDate < today) {
      errorElement = "#form1_date_first_selector";
      gcDisplayMessage(errorElement, "日期請大於今天", "error");
    }
    if (verified == false) {
      errorElement = "input[name=input_38]";
      gcDisplayMessage(errorElement, "請輸入您的手機號碼", "error");
    }
    if (undefined == $("input[name=input_1]:checked").val()) {
      errorElement = "#field_1_1 .gfield_label";
      gcDisplayMessage(errorElement, "請選擇賞屋方式", "error");
      $("#label_1_1_0").addClass("error");
      $("#label_1_1_0").hover(
        function () {
          $(this).removeClass("error");
        },
        function () {
          $(this).addClass("error");
        }
      );

      $("#label_1_1_1").addClass("error");
      $("#label_1_1_1").hover(
        function () {
          $(this).removeClass("error");
        },
        function () {
          $(this).addClass("error");
        }
      );
    }

    if (!errorElement) {
      $(this).prop("disabled", true);
      gcBlockUI("預約資料傳送中，請稍候", false);
      //$("#gform_1").submit();
      if (final_type == "2") {
        $.ajax(flatsomeVars.ajaxurl, {
          data: {
            action: "gc_forward_register_appointment",
            phone: bk_phone_number,
            country_code: bk_country_code,
            guid_code: guid_code,
            last_name: $("input[name=input_11]").val(),
            first_name: $("input[name=input_88]").val(),
            gender: $("select[name=input_4]").val(),
            user_pass: user_pass,
            user_email: email,
          },
          type: "POST",
          dataType: "JSON",
          success: function (resp) {
            if (resp.final_status == true) {
              $("form#gform_1").submit();
            } else {
              gcBlockUI(resp.message);
              setTimeout(function () {
                  jQuery.unblockUI();
              }, 3000); 
            }
          },
          fail: function (data) {
            console.log(resp);
          },
        });
      } else {
        $.ajax(flatsomeVars.ajaxurl, {
          data: {
            action: "gc_update_user_by_appointment",
            phone: phone,
            country_code: country_code,
            guid_code: guid_code,
            last_name: $("input[name=input_11]").val(),
            first_name: $("input[name=input_88]").val(),
            gender: $("select[name=input_4]").val(),
            user_email: $("input[name=input_6]").val(),
            final_type: final_type,
          },
          type: "POST",
          dataType: "JSON",
          success: function (resp) {
            if (resp.final_status == true) {
              $("form#gform_1").submit();
            } else {
              gcBlockUI(resp.message);
              setTimeout(function () {
                 jQuery.unblockUI();
              }, 3000);
              window.location.href = resp.redirect_url;
            }
          },
          fail: function (data) {
            console.log(resp);
          },
        });
      }
    } else {
      $(window).animate(
        {
          scrollTop: $(errorElement).offset().top - 100,
        },
        1000
      );
    }
    $("#gform_submit_button_1").prop("disabled", false); // GC_Chandler 解除按鈕送出 2024-03-13
  });

  /**GC_Chandler:2021-12-02 若有active之後 將圖片包回一般灰色 */
  $(document).on("click", "#label_1_1_0", function (e) {
    if ($("#input_1_1 li label").hasClass("error")) {
      $("#label_1_1_0").removeClass("error");
      $("#label_1_1_0").hover(
        function () {
          $(this).removeClass("error");
        },
        function () {
          $(this).removeClass("error");
        }
      );

      $("#label_1_1_1").removeClass("error");
      $("#label_1_1_1").hover(
        function () {
          $(this).removeClass("error");
        },
        function () {
          $(this).removeClass("error");
        }
      );
    }
  });

  $(document).on("click", "#label_1_1_1", function (e) {
    if ($("#input_1_1 li label").hasClass("error")) {
      $("#label_1_1_0").removeClass("error");
      $("#label_1_1_0").hover(
        function () {
          $(this).removeClass("error");
        },
        function () {
          $(this).removeClass("error");
        }
      );

      $("#label_1_1_1").removeClass("error");
      $("#label_1_1_1").hover(
        function () {
          $(this).removeClass("error");
        },
        function () {
          $(this).removeClass("error");
        }
      );
    }
  });
});

/**
 * @author GC_Chandler
 * @copyright 2024-02-21
 * 將手機號碼格式化function 
 */
jQuery(document).ready(function ($) {
  function restrictToNumbers(evt) {
      var inputValue = evt.target.value;

      // 移除非数字的字符，保留数字
      var sanitizedValue = inputValue.replace(/[^0-9]/g, '');

      // 限制輸入為10碼
      if (sanitizedValue.length > 10) {
          sanitizedValue = sanitizedValue.slice(0, 10);
      }

      // 第一碼必須為0
      if (sanitizedValue.length > 0 && sanitizedValue[0] !== '0') {
          sanitizedValue = '0' + sanitizedValue.slice(1);
      }

      // 第二碼必須為9
      if (sanitizedValue.length > 1 && sanitizedValue[1] !== '9') {
          sanitizedValue = sanitizedValue[0] + '9' + sanitizedValue.slice(2);
      }

      // 更新输入框的值
      evt.target.value = sanitizedValue;
  }
}); 