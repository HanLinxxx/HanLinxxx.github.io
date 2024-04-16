jQuery(document).ready(function($){
    var window_height = $(window).height();
    var body_height = $('body').height();
    var body_width = $('body').width();
    var mobile_height=$('#gc_mobile_footer').height();
    if(body_height<window_height){
        $('.elementor-type-footer').css({'padding-top':window_height-body_height+'px'});
    }
    if($(window).width()<=768){
        $('.elementor-type-footer').css({'margin-bottom':mobile_height+'px'});
    }
    if($('#wpseo_meta').length>0){
        $('#wpseo_meta span').each(function(i,e){
            if($(this).text()=='Yoast SEO Premium'){
                $(this).text('SEO Settings');
            }
        });
    }
    if($('#eg-wrap').length>0){
        $('#eg-global-settings-wrap').remove();
        $('#eg-newsletter-wrapper').remove();
        $('.title_line.nobgnopd').next('div').remove();
        $('.title_line.nobgnopd').remove();
        $('#tp-before-validation').remove();
        $('#tp-validation-box').remove();
    }
    if($('#argmc-skip-login').length>0){
        $(document).on('click','#argmc-skip-login',function(){
            $('.gc-argmc-nav').hide();
        });
    }

    if( $('.canswitch').length > 0 ){
        $('.canswitch').hover(function(){
            gc_switch_menu_txt($(this));
        },function(){
            gc_switch_menu_txt($(this));
        });
    }

    function gc_switch_menu_txt( obj ){
        var showTxt = obj.find('.nav-top-link').text();
        var hideTxt = obj.find('a.nav-top-link').attr('title');
        var original_width = obj.width();
        obj.css('width',original_width+'px');
        obj.find('.nav-top-link').text(hideTxt.toLowerCase());
        obj.find('a.nav-top-link').attr('title',showTxt);
    }
	
	$( document ).on(
        'change input',
        '.woocommerce-cart-form .cart_item :input',
        function(){
            if(! $( '.checkout-button.wc-forward' ).hasClass('prepare') ) {
                $('.checkout-button.wc-forward').text('重新計算購物車').attr('style', 'background-color:#f00!important').addClass('prepare');
            }
        });

    $(document).on('click','a.checkout-button',function(e){
        e.preventDefault();
        classString = $(this).attr('class');
        if( classString.indexOf('prepare') >= 0 ) {
            if (jQuery('button[name=\'update_cart\']').length) {
                var updateCartButton = jQuery('button[name=\'update_cart\']')
                updateCartButton.trigger('click')
            }
        }else{
            //$.blockUI({message:'這裡可以放廣告哦，雖然有時候只有一秒'});
            window.location.href=$(this).attr('href');
        }
    });
	
	if( typeof woocommerce_params != 'undefined' && ! $('body').is('.woocommerce-checkout') ){
		$(window).on('load',function(){
			//偵測當下購物車與定價與規則
			$.ajax(woocommerce_params.ajax_url,{
				data:{
					'action':'gc_match_cart_and_rules',
				},
				dataType:'json',
				type:'POST',
				success:function(resp){
					if(resp != null ){
						var hints = '';
						$.each(resp,function(i,e){
							hints = '<li>' + e + '</li>';
						});
						$('body').append( '<div class="gc_discount_hints"><ul>'+hints+'</ul></div>' );
					}
				}
			});
		});
	}
	
	if($('#gc_init_add_to_cart').length>0){
		var hiddenTop = $('#gc_init_add_to_cart').height() + 50;
		$(document).on('click','#gc_init_add_to_cart',function(){
			event.preventDefault();
			$('form.cart').before('<div class="gc_overcover"></div>');
			$(this).animate({
				bottom:'-'+$(this).height()+'px',
			},500);
			$('form.cart').animate({
				bottom:'0px',
			},500);
		});
		$(document).on('click','.gc_overcover',function(e){			
			$('form.cart').animate({
				bottom:'-'+$('form.cart').height()+'px'
			},500);
			$('#gc_init_add_to_cart').animate({
				bottom:'0px'
			},500);
			$('div.gc_overcover').animate({
				opacity:0
			},500,function(){
				$(this).remove();
			});
		});
		$( 'form.variations_form' ).on( 'show_variation', function ( ev, variation, purchasable ) {
			if( purchasable ) {
				$(this).find( 'button.one_click_checkout' ).removeClass( 'disabled' );
			} else {
				$(this).find( 'button.one_click_checkout' ).addClass( 'disabled' );
			}
		});
		$( 'form.variations_form' ).on( 'hide_variation', function ( ev, variation, purchasable ) {
			$(this).find( 'button.one_click_checkout' ).addClass( 'disabled' );
		});
		$( document ).on( 'click', '.one_click_checkout', function(){
			if ( $( this ).is( '.disabled' ) ) {
				event.preventDefault();
			}else{
				$(document).find( '#one_click_checkout' ).val('is_one_click');
			}
		});
	}
});

