/* --------------------------------------------------------------------------
 * File        : config.js
 * Version     : 1.0
 * Author      : Indonez Team
 * Author URI  : http://indonez.com
 *
 * Indonez Copyright 2016 All Rights Reserved.
 * -------------------------------------------------------------------------- */

/* --------------------------------------------------------------------------
 * javascript handle initialization
      1. To top Jquery
 *
 * -------------------------------------------------------------------------- */

(function($){

	"use strict";
	
	var themeApp = {
		
	  //----------- 1. To top Jquery ----------- 
	   theme_scrollUP:function() {
		   
		$(document).scroll(function () {
		var toTop = $('.to-top');
		if ($(this).scrollTop() > 400) {
		
		toTop.fadeIn();
		} else {
		toTop.fadeOut();
		}
		});

	   },
		
	  // theme init
      theme_init:function(){
		 themeApp.theme_scrollUP();
      }
		
	}//end themeApp
	
	
	jQuery(document).ready(function($){
	   	   
		themeApp.theme_init();

    });
	
})(jQuery);