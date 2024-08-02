$(document).ready(function() {

	"use strict";

	$('.counter').counterUp();

	$("#contactForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			// handle the invalid form...
			formError();
			submitMSG(false, "Please Follow Error Messages and Complete as Required");
		} else {
			// everything looks good!
			event.preventDefault();
			submitForm();
		}
	});


	function submitForm(){
		// Initiate Variables With Form Content
		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();

		$.ajax({
			type: "POST",
			url: "php/form-process.php",
			data: "name=" + name + "&email=" + email + "&phone=" + phone,
			success : function(text){
				if (text == "success"){
					formSuccess();
				} else {
					formError();
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$("#contactForm")[0].reset();
		submitMSG(true, "Thank you for your submission :)")
	}

	function formError(){
		$("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "success form-message";
		} else {
			var msgClasses = "error form-message";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

	initbackTop();
	function initbackTop() {
		var jQuerybackToTop = jQuery("#back-top");
		jQuery(window).on('scroll', function() {
			if (jQuery(this).scrollTop() > 100) {
				jQuerybackToTop.addClass('show');
			} else {
				jQuerybackToTop.removeClass('show');
			}
		});
		jQuerybackToTop.on('click', function(e) {
			jQuery("html, body").stop().animate({scrollTop: 0}, 1500, 'easeInOutExpo');
		});
	}

	initStickyHeader();
	function initStickyHeader() {
		var win = jQuery(window),
			stickyClass = 'sticky';

		jQuery('#header').each(function() {
			var header = jQuery(this);
			var headerOffset = header.offset().top || 152;
			var flag = true;

			function scrollHandler() {
				if (win.scrollTop() > headerOffset) {
					if (flag){
						flag = false;
						header.addClass(stickyClass);
					}
				} else {
					if (!flag) {
						flag = true;
						header.removeClass(stickyClass);
					}
				}
			}

			scrollHandler();
			win.on('scroll resize orientationchange', scrollHandler);
		});
	}
	initAddClass();
	function initAddClass() {
		jQuery('.nav-opener').on( "click", function(e){
			e.preventDefault();
			jQuery("body").toggleClass("nav-active");
		});
		jQuery('#nav .smooth').on( "click", function(){
			if (jQuery("body").hasClass("nav-active")) {
				setTimeout(function() { 
				jQuery("body").removeClass("nav-active");}, 800);
			}
		});
	}
	
	$.scrollIt({
		topOffset: -75,
		scrollTime: 1500,
		easing: 'easeInOutExpo'
	});

	initLightbox();
	// modal popup init
	function initLightbox() {
		jQuery('a.lightbox, a[rel*="lightbox"]').fancybox({
			helpers: {
				media : {},
				overlay: {
					css: {
						background: 'rgba(0, 0, 0, 0.65)'
					}
				}
			},
			afterLoad: function(current, previous) {
				// handle custom close button in inline modal
				if(current.href.indexOf('#') === 0) {
					jQuery(current.href).find('a.close').off('click.fb').on('click.fb', function(e){
						e.preventDefault();
						jQuery.fancybox.close();
					});
				}
			},
			padding: 0
		});
	}
}); 
$( window ).on( "load" , function() {

	"use strict";

	$( "#loader" ).delay( 600 ).fadeOut( 300 );
}); 