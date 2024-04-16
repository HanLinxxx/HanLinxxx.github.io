function get_source_label() {
  registerWay = "官網會員";
  switch (jQuery("#provider").val()) {
    case "facebook.com":
      registerWay = "FACEBOOK";
      break;
    case "google.com":
      registerWay = "GOOGLE";
      break;
    case "line":
      registerWay = "LINE";
      break;
  }
  return registerWay;
}
jQuery(document).ready(function ($) {
  /**
   * 載入畫面延遲
   */
  $(".loader").fadeOut(1500, function () {
    $(this).addClass("loaded");
  });
  
});

