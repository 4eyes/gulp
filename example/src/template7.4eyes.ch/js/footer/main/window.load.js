(function (window, $, undefined) {
	'use strict';

	if($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {};

	$(function(){
		X4e.SvgInject.init();
	});

	$(document).ready(function(){

	});

}) (window, jQuery);