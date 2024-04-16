jQuery(document).ready(function($) {

    var post_type_object = {
        wom_recommendation : '口碑推薦',
        activity_report : '活動報報',
        life_proposal : '生活提案',
    };

    function event_click_data_function() {
        obj = {
            eventCategory : '',
            eventAction : '',
            eventLabel : '',
            event : 'ga-event',
            user_id : fg_user_id,
            user_name : fg_user_name,
            lid:lid
        }
        return obj;
    }
    event_click_data = event_click_data_function();

    pageViewLayer = event_click_data;
    titleString = $(document).attr('title');
    titles = titleString.split(' -');
    pageViewLayer.pageView =titles[0];
    //dataLayer.push(pageViewLayer);
    // Header主選單
    // 熱銷建案
    $('#building_recommendations .elementor-post__title a').click(function(e) {
        var building_url = ($(this).attr('href')).split('/');
        var building_no = building_url[building_url.length - 2];
        // var building_name = ($(this).parent()).children();
        var building_name = ($(this).text());
        building_name_decode = encodeURI(building_name);
        var building_name_array = building_name_decode.split('%09%09%09');
        var building_name_with_space = building_name_array[1]
        var building_name = building_name_with_space.replace('%09', '');
        building_name = decodeURI(building_name);
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '建案推薦';
        event_click_data.eventLabel = building_no + '_' + building_name;
        dataLayer.push(event_click_data);
    });
    $('#building_recommendations .elementor-post__thumbnail img').click(function(e) {
        var building_no = $(this).attr('data-building-number');
        var building_name = $(this).attr('data-building-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '建案推薦';
        event_click_data.eventLabel = building_no + '_' + building_name;
        dataLayer.push(event_click_data);
    });
    // 活動報報
    $('#activity_recommendations .elementor-post__title a').click(function(e) {
        var activity_name = ($(this).text());
        activity_name_decode = encodeURI(activity_name);
        var activity_name_array = activity_name_decode.split('%09%09%09');
        var activity_name_with_space = activity_name_array[1]
        var activity_name = activity_name_with_space.replace('%09', '');
        activity_name = decodeURI(activity_name);
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '活動推薦';
        event_click_data.eventLabel = activity_name;
        dataLayer.push(event_click_data);
    });
    $('#activity_recommendations .elementor-post__thumbnail img').click(function(e) {
        var activity_name = $(this).attr('data-activity-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '活動推薦';
        event_click_data.eventLabel = activity_name;
        dataLayer.push(event_click_data);
    });
    // 生活提案
    $('#life_proposal_recommendations .elementor-post__title a').click(function(e) {
        var life_proposal_name = ($(this).text());
        life_proposal_name_decode = encodeURI(life_proposal_name);
        var life_proposal_name_array = life_proposal_name_decode.split('%09%09%09');
        var life_proposal_name_with_space = life_proposal_name_array[1]
        var life_proposal_name = life_proposal_name_with_space.replace('%09', '');
        life_proposal_name = decodeURI(life_proposal_name);
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '最新生活提案';
        event_click_data.eventLabel = life_proposal_name;
        dataLayer.push(event_click_data);
    });
    $('#life_proposal_recommendations .elementor-post__thumbnail img').click(function(e) {
        var life_proposal_name = $(this).attr('data-life-proposal-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '最新生活提案';
        event_click_data.eventLabel = life_proposal_name;
        dataLayer.push(event_click_data);
    });
    $('#img_u-city_page').click(function(e) {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '遠雄社區雲';
        dataLayer.push(event_click_data);
    });
    // 主標
    $('#logo').click(function(e) {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '遠雄房地產';
        dataLayer.push(event_click_data);
    });
    $('.sell_well_buildings_overview .jet-menu-item-wrapper').click(function(e) {
        if (typeof(building_name) == 'undefined' || typeof(building_no) == 'undefined') {
            var event_click_data = event_click_data_function();
            event_click_data.eventCategory = '主選單';
            event_click_data.eventAction = '熱銷建案';
            dataLayer.push(event_click_data);
        }
    });
    $('.activity_report_overview .jet-menu-item-wrapper').click(function(e) {
        if (typeof(activity_name) == 'undefined') {
            var event_click_data = event_click_data_function();
            event_click_data.eventCategory = '主選單';
            event_click_data.eventAction = '活動報報';
            dataLayer.push(event_click_data);
        }
    });
    $('.life_proposal_overview .jet-menu-item-wrapper').click(function(e) {
        if (typeof(life_proposal_name) == 'undefined') {
            var event_click_data = event_click_data_function();
            event_click_data.eventCategory = '主選單';
            event_click_data.eventAction = '生活提案';
            dataLayer.push(event_click_data);
        }
    });
    $('.about_overview .jet-menu-item-wrapper').click(function(e) {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '關於我們';
        dataLayer.push(event_click_data);
    });
    $('.contact_service .jet-menu-item-wrapper').click(function(e) {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '聯絡與服務';
        dataLayer.push(event_click_data);
    });
    $('#nav_u-city').click(function(e) {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = '遠雄社區雲';
        dataLayer.push(event_click_data);
    });

    // Footer
    $('#follow_social_media .fa-facebook').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾';
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = 'facebook';
        dataLayer.push(event_click_data);
    });
    $('#follow_social_media .fa-youtube').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾';
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = 'youtube';
        dataLayer.push(event_click_data);
    })
    $('#contact_details .fa-phone-alt').parent().parent().click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾';
        event_click_data.eventAction = '0800009168';
        dataLayer.push(event_click_data);
    });
    $('.reservation').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾';
        event_click_data.eventAction = '預約賞屋';
        dataLayer.push(event_click_data);
    });
    $('#easychat-floating-button').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾';
        event_click_data.eventAction = '線上客服';
        dataLayer.push(event_click_data);
    });
    // 手機板footer
    $('#fixed_mobile_bottom_menu .tel a').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾CTA';
        event_click_data.eventAction = '立即來電';
        dataLayer.push(event_click_data);
    });
    $('#fixed_mobile_bottom_menu .line a').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾CTA';
        event_click_data.eventAction = 'LINE詢問';
        dataLayer.push(event_click_data);
    });
    $(document).on('click','.elementor-inline-item a[href="http://line.me/ti/p/~@fbn0601g"]',function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾';
        event_click_data.eventAction = 'LINE詢問';
        dataLayer.push(event_click_data);
    });
    $('#fixed_mobile_bottom_menu .reserv a').click(function() {
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '主頁尾CTA';
        event_click_data.eventAction = '預約賞屋';
        dataLayer.push(event_click_data);
    });

    // 熱銷建案一覽
    // 建案頁分享連結
    $('.share_links .fb_share').click(function() {
        event_click_data = event_click_data_function();
        event_click_data.eventCategory = $(this).parent().data('event-category');
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = 'facebook';
        dataLayer.push(event_click_data);
    });
    $('.share_links .line_share').click(function() {
        event_click_data = event_click_data_function();
        event_click_data.eventCategory = $(this).parent().data('event-category');
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = 'line';
        dataLayer.push(event_click_data);
    });
    $('.share_links .copy_link').click(function() {
        event_click_data = event_click_data_function();
        event_click_data.eventCategory = $(this).parent().data('event-category');
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = '複製連結';
        dataLayer.push(event_click_data);
    });
    // 建案導覽
    $(document).on('click', '.nav_menu a', function() {
        var menu_item_name = $(this).children().text();
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '熱銷建案';
        event_click_data.eventAction = '建案導覽';
        event_click_data.eventLabel = menu_item_name;
        
        var viewing_area_event_data = {
            event : '觀看範圍(點擊)',
            content : menu_item_name,
            user_id : fg_user_id,
            user_name : fg_user_name,
        };

        dataLayer.push(event_click_data);
        dataLayer.push(viewing_area_event_data);
    });
    // 地理位置
    $('.geographical_navigation a').click(function() {
        var geographical_navigation_text = $(this).children().children().text();
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '熱銷建案';
        event_click_data.eventAction = '地理位置';
        event_click_data.eventLabel = geographical_navigation_text;
        dataLayer.push(event_click_data);
    })
    // 相關推薦
    if (current_page_post_type == 'buildings') {
        // 熱銷建案
        $('.sell_well_building a').click(function() {
            var building_id = $(this).parent().attr('data-building-id');
            var building_name = $(this).parent().attr('data-building-name');
            if (building_id != undefined && building_name != undefined) {
                var event_click_data = event_click_data_function();
                event_click_data.eventCategory = '熱銷建案';
                event_click_data.eventAction = '相關推薦';
                event_click_data.eventLabel = building_id + '_' + building_name;
                event_click_data.test = 123;
                dataLayer.push(event_click_data);
            }
        });
        // 生活提案
        $('.life_proposal a').click(function() {
            var life_proposal_category = $(this).parent().attr('data-life-proposal-category');
            var life_proposal_name = $(this).parent().attr('data-life-proposal-name');
            if (life_proposal_category != undefined && life_proposal_name != undefined) {
                var event_click_data = event_click_data_function();
                event_click_data.eventCategory = '熱銷建案';
                event_click_data.eventAction = '相關推薦';
                event_click_data.eventLabel = life_proposal_category + '_' + life_proposal_name;
                dataLayer.push(event_click_data);
            }
        });
        // 活動報報
        $('.activity_report a').click(function() {
            var activity_report_category = $(this).parent().attr('data-activity-report-category');
            var activity_report_name = $(this).parent().attr('data-activity-report-name');
            if (activity_report_category != undefined && activity_report_name != undefined) {
                var event_click_data = event_click_data_function();
                event_click_data.eventCategory = '熱銷建案';
                event_click_data.eventAction = '相關推薦';
                event_click_data.eventLabel = activity_report_category + '_' + activity_report_name;
                dataLayer.push(event_click_data);
            }
        });
        // 口碑推薦
        $('.wom_recommendation a').click(function() {
            var wom_recommendation_name = $(this).parent().attr('data-wom-recommendation-name');
            var event_click_data = event_click_data_function();
            event_click_data.eventCategory = '熱銷建案';
            event_click_data.eventAction = '相關推薦';
            event_click_data.eventLabel = wom_recommendation_name;
            dataLayer.push(event_click_data);
        });
    }
    
    // 口碑推薦、活動報報、生活提案內頁分享連結
    $('.a2a_button_facebook').click(function() {
        var event_click_data = event_click_data_function();
        if (current_page_post_type == 'activity_report') {
            event_click_data.eventCategory = current_page_post_category;
        } else {
            event_click_data.eventCategory = post_type_object[current_page_post_type];
        }
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = 'facebook';
        dataLayer.push(event_click_data);
    });
    $('.a2a_button_line').click(function() {
        var event_click_data = event_click_data_function();
        if (current_page_post_type == 'activity_report') {
            event_click_data.eventCategory = current_page_post_category;
        } else {
            event_click_data.eventCategory = post_type_object[current_page_post_type];
        }
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = 'line';
        dataLayer.push(event_click_data);
    });
    $('.a2a_button_copy_link').click(function() {
        var event_click_data = event_click_data_function();
        if (current_page_post_type == 'activity_report') {
            event_click_data.eventCategory = current_page_post_category;
        } else {
            event_click_data.eventCategory = post_type_object[current_page_post_type];
        }
        event_click_data.eventAction = 'social';
        event_click_data.eventLabel = '複製連結';
        dataLayer.push(event_click_data);
    });
    // 生活提案內頁最新文章
    $('.new_life_proposals .elementor-post__thumbnail').click(function() {
        //var post_category = $(this).children().attr('data-post-category');
        var post_name = $(this).children().attr('data-life-proposal-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '生活提案';
        event_click_data.eventAction = '最新文章';
        event_click_data.eventLabel = post_name;
        dataLayer.push(event_click_data);
    });
    $('.new_life_proposals .elementor-post__title').click(function() {
        var post_parent = $(this).parent().parent();
        var post_img = post_parent.find('.elementor-post__thumbnail__link .elementor-post__thumbnail img');
        //var post_category = $(post_img).attr('data-post-category');
        var post_name = $(post_img).attr('data-life-proposal-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = '生活提案';
        event_click_data.eventAction = '最新文章';
        event_click_data.eventLabel = post_name;
        dataLayer.push(event_click_data);
    });
    // 活動報報內頁最新文章
    $('.new_activity_reports .elementor-post__thumbnail').click(function() {
        //var post_category = $(this).children().attr('data-post-category');
        var post_name = $(this).children().attr('data-activity-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = current_page_post_category;
        event_click_data.eventAction = '最新文章';
        event_click_data.eventLabel = post_name;
        dataLayer.push(event_click_data);
    });
    $('.new_activity_reports .elementor-post__title').click(function() {
        var post_parent = $(this).parent().parent();
        var post_img = post_parent.find('.elementor-post__thumbnail__link .elementor-post__thumbnail img');
        //var post_category = $(post_img).attr('data-post-category');
        var post_name = $(post_img).attr('data-activity-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = current_page_post_category;
        event_click_data.eventAction = '最新文章';
        event_click_data.eventLabel = post_name;
        dataLayer.push(event_click_data);
    });
    // 口碑推薦內頁最新文章
    $('.new_wom_recommendation .elementor-post__thumbnail').click(function() {
        //var post_category = $(this).children().attr('data-post-category');
        var post_name = $(this).children().attr('data-activity-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = current_page_post_category;
        event_click_data.eventAction = '最新文章';
        event_click_data.eventLabel = post_name;
        dataLayer.push(event_click_data);
    });
    $('.new_wom_recommendation .elementor-post__title').click(function() {
        var post_parent = $(this).parent().parent();
        var post_img = post_parent.find('.elementor-post__thumbnail__link .elementor-post__thumbnail img');
        //var post_category = $(post_img).attr('data-post-category');
        var post_name = $(post_img).attr('data-wom-recommendation-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = current_page_post_category;
        event_click_data.eventAction = '最新文章';
        event_click_data.eventLabel = post_name;
        dataLayer.push(event_click_data);
    });
    // 猜你喜歡
    $('.related_building a').click(function() {
        var building_id = $(this).attr('data-building-id');
        var building_name = $(this).attr('data-building-name');
        var event_click_data = event_click_data_function();
        event_click_data.eventCategory = $('.share_links').data('event-category');
        event_click_data.eventAction = '猜你喜歡';
        event_click_data.eventLabel = building_id + '_' + building_name;
        dataLayer.push(event_click_data);
    });
    //Since from GC_minos:
    //登出
    $(document).on('click','a.logout',function(){
        event_click_data = event_click_data_function();
        event_click_data.eventCategory = 'account';
        event_click_data.eventAction = 'logout';
        dataLayer.push(event_click_data);
    });

    $(document).on('click','.jet-sub-mega-menu a.elementor-button-link',function(){
        event_click_data.eventCategory = '主選單';
        event_click_data.eventAction = $(this).find('.elementor-button-text').text();
        dataLayer.push(event_click_data);
    });
})
