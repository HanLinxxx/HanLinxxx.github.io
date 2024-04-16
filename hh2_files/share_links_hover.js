jQuery(document).ready(function($){
    var fb_icon_url = $('.a2a_button_facebook img').attr('src');
    var line_icon_url = $('.a2a_button_line img').attr('src');
    var copy_link_icon_url = $('.a2a_button_copy_link img').attr('src');
    $('.a2a_button_facebook').mouseenter(function() {
        $('.a2a_button_facebook img').attr('src', home_url + '/wp-content/plugins/gc-farglory-realty/assets/icon/icon_fb_hover.svg');
        $('.a2a_button_facebook img').css('width', '36px');
    })
    $('.a2a_button_facebook').mouseleave(function() {
        $('.a2a_button_facebook img').attr('src', fb_icon_url)
    })
    $('.a2a_button_line').mouseenter(function() {
        $('.a2a_button_line img').attr('src', home_url + '/wp-content/plugins/gc-farglory-realty/assets/icon/icon_line_hover.svg');
    })
    $('.a2a_button_line').mouseleave(function() {
        $('.a2a_button_line img').attr('src', line_icon_url)
    })
    $('.a2a_button_copy_link').mouseenter(function() {
        $('.a2a_button_copy_link img').attr('src', home_url + '/wp-content/plugins/gc-farglory-realty/assets/icon/icon_copy_link_hover.svg');
    })
    $('.a2a_button_copy_link').mouseleave(function() {
        $('.a2a_button_copy_link img').attr('src', copy_link_icon_url)
    })
})
