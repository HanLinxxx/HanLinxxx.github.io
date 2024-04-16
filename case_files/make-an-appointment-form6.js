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

  var dt = new Date();

  var d1 = $("#form6_date_first_selector").val();
  $("input[name=input_7]").val(d1);
  var d2 = $("#form6_date_second_selector").val();
  $("input[name=input_9]").val(d2);

  $(document).on("change", "#form6_date_first_selector", function () {
    var d1 = $(this).val();
    $("input[name=input_7]").val(d1);
  });

  $(document).on("change", "#form6_date_second_selector", function () {
    var d2 = $(this).val();
    $("input[name=input_9]").val(d2);
  });
  var time_for_first = document.querySelector('input[name="time_for_first"]');
  var time_for_second = document.querySelector('input[name="time_for_second"]');

  var getMinutes = "";
  var getHours = "";

  if (dt.getMinutes() < 10) {
    getMinutes = "0" + dt.getMinutes();
  } else {
    getMinutes = dt.getMinutes();
  }
  if (dt.getHours() < 10) {
    getHours = "0" + dt.getHours();
  } else {
    getHours = dt.getHours();
  }
  var time = getHours + ":" + getMinutes;

  // default time seletor
  if (time_for_first) {
    time_for_first.value = time;
  }
  if (time_for_second) {
    time_for_second.value = time;
  }
  var final_type = "";
  var guid_code = "";
  var user_pass = "";
  /**
   * 發送驗證碼
   */
  $(document).on("click", "#gc_custom_button_form6", function (e) {
  
    e.preventDefault();
    //GC_minos:2022-01-09認證手機後，欄位的位置都改變了，若此時再去修改選擇預約建案將導致位置絮亂，因此在認證手機後鎖死預約建案選擇
    $("select[name=input_63] option:not(:selected)").prop("disabled", true);
    building_type = $("#input_6_98").val();
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
          $("#field_6_43, #field_6_47").removeClass("gfield_visibility_hidden");
          // grid 位移
          $("#field_6_43").show();
          $("#field_6_47").show();
          $("#field_6_43").addClass("field_6_43_class");
          $("#field_6_47").addClass("field_6_47_class");
          // 姓 與 名 位移 form1 / form2
          $("#field_6_11").addClass("form6_grid_row_start_4");
          $("#field_6_100").addClass("form6_grid_row_start_4");
          $("#field_6_4").addClass("form6_grid_row_start_4");
          $("#field_6_21").addClass("form6_grid_row_start_5");
          if (building_type == "office") {
            //GC_minos:點擊認證手機後將欄位往下移
            $("#field_6_93, #field_6_94")
              .removeClass("gfield_visibility_hidden")
              .addClass("gfield_visibility_visible form6_grid_row_start_5");
            $("#field_6_6").addClass("form6_grid_row_start_6");
            $("#field_6_95, #field_6_96").addClass("form6_grid_row_start_7");
            $("#field_6_97").addClass("form6_grid_row_start_8");
            /**GC_Chandler 2022-01-14 */
            $("#field_6_99").addClass("form6_grid_row_start_8");
            $("#gform_fields_6_2").addClass("expand");
          } else {
            // $("#field_6_69").addClass("form6_grid_row_start_5");
            // $("#field_6_70").addClass("form6_grid_row_start_5");
            $("#field_6_6").addClass("form6_grid_row_start_5");
          }
          $("#field_6_102").addClass("form6_grid_row_start_6");
          $("#gc_custom_button_form6").prop("disabled", true);
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
          gcInterval = setInterval(function () {
            if ($(".gc_success .countdown").length > 0) {
              currentCount = $(".gc_success .countdown").text();
              if (currentCount >= 1) {
                currentCount--;
                $(".gc_success .countdown").text(currentCount);
              } else if (currentCount <= 0) {
                window.clearInterval(gcInterval);
                $(".gc_success")
                  .removeClass("gc_success")
                  .addClass("gc_error")
                  .html("驗證碼失效，請重新取得驗證碼");
                $("#gc_custom_button_form6").prop("disabled", false);
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
  $(document).on("click", "#gc_custom_approve_button_form6", function (e) {
    $(".gc_error").remove();
    var auth_code = $("input[name=input_43]").val();
    if (auth_code.length < 6) {
      gcDisplayMessage("input[name=input_43]", "驗證碼不得小於六位數", "error");
    } else {
      $("#gform_6").block({
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
                $("select[name=input_69]").val(resp.apiUserInfo.data.user_area);
                $("select[name=input_69]").trigger(
                  "change",
                  resp.apiUserInfo.data.user_city
                );
                $("select[name=input_4]").val(resp.apiUserInfo.data.gender);
                $("input[name=input_11]").val(resp.apiUserInfo.data.last_name);
                $("input[name=input_100]").val(
                  resp.apiUserInfo.data.first_name
                );
                $("input[name=input_6]").val(resp.apiUserInfo.data.user_email);
                $("#reservation_form_popup").unblock();
                $(".nav-top-not-logged-in").removeAttr("data-open");
                $(
                  "input[name=input_11],input[name=input_100],select[name=input_4]"
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
            $(
              "#gc_custom_approve_button, #gc_custom_approve_button_form6"
            ).prop("disabled", true);
            $("input[name=input_43],input[name=input_38]").prop(
              "readonly",
              true
            );
            $("#gc_custom_button, #gc_custom_button_form6").prop(
              "disabled",
              true
            );
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
      $("form#gform_6").unblock();
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
  /**
   * 預約賞屋 form6 完成表格註冊
   */
  $(document).on("click", "#gform_submit_button_6", function (e) {
    e.preventDefault();
    if (!$("#choice_6_56_1").prop("checked")) {
      $("li.gchoice_6_56_1").append(
        '<p class="gc_error">請先閱讀並同意服務條款與隱私權聲明</p>'
      );
    } else {
      if (final_type == "2") {
        //註冊
        $.ajax(flatsomeVars.ajaxurl, {
          data: {
            action: "gc_forward_register_appointment",
            phone: bk_phone_number,
            country_code: bk_country_code,
            guid_code: guid_code,
            last_name: $("input[name=input_11]").val(),
            first_name: $("input[name=input_100]").val(),
            gender: $("select[name=input_4]").val(),
            user_email: $("input[name=input_6]").val(),
            final_type: final_type,
            user_pass: user_pass,
          },
          type: "POST",
          dataType: "JSON",
          success: function (resp) {
            if (resp.final_status == true) {
              $("form#gform_6").submit();
            } else {
              gcBlockUI(resp.message);
            }
          },
          fail: function (data) {
            console.log(resp);
          },
        });
      } else {
        //修改基本資料
        $.ajax(flatsomeVars.ajaxurl, {
          data: {
            action: "gc_update_user_by_appointment",
            phone: bk_phone_number,
            country_code: bk_country_code,
            guid_code: guid_code,
            last_name: $("input[name=input_11]").val(),
            first_name: $("input[name=input_100]").val(),
            gender: $("select[name=input_4]").val(),
            user_email: $("input[name=input_6]").val(),
            final_type: final_type,
          },
          type: "POST",
          dataType: "JSON",
          success: function (resp) {
            if (resp.final_status == true) {
              $("form#gform_6").submit();
            } else {
              gcBlockUI(resp.message);
              window.location.href = resp.redirect_url;
            }
          },
          fail: function (data) {
            console.log(resp);
          },
        });
      }
    }
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
});

// 將星號（*）替換為指定的<span>元素
jQuery(document).ready(function ($) {
  $(document).on('change', '#input_6_63',function(){
    console.log('ya');
    building_code = $(this).val();
    if( undefined !== building_code && '' !== building_code ){
      $('#input_6_98').val( building_type );
      if( 'office' == building_type ){
        $('#field_6_6').addClass('form6_grid_row_start_11');
      }else{

      }
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