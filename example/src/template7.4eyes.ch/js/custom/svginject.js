(function (window, $, undefined) {
	if($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		SvgInject = X4e.SvgInject || (X4e.SvgInject = {});


	$.extend(SvgInject, {
		Selectors: {
			imgToReplace: '.svginject'
		},
		init: function(){
			var self = this;
			$(self.Selectors.imgToReplace)
				.addClass('is-injecting')
				.svgInject({
					wrap: 'svg-wrap'
					, paddingHack: true
				});
		}
	});

	window.X4e = X4e;

}) (this, jQuery);