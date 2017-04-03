(function (window, $, undefined) {
	'use strict';

	if($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {};

	$(function(){
        $(document).foundation();
        X4e.AnimatedAnchorsCustom.init();
        X4e.NotificationHandler.init();
        X4e.NavigationHandler.init();
	});

    $(document).ready(function(){
        X4e.NotificationHandler.onDocumentReadyTests();
    });

}) (window, jQuery);