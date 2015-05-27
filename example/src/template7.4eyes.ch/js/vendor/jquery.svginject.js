;(function($, window, document, undefined) {

	var pluginName = 'svgInject';

	// The actual plugin constructor

	function Plugin(element, options) {
		this.element = element;
		this._name = pluginName;
		
		if (options.wrap) {
			this.wrap = options.wrap;
		}
		if (options.paddingHack) {
			this.paddingHack = !!options.paddingHack;
		}
		
		this.init();
	}

	Plugin.prototype = {
		wrap: false,
		
		paddingHack: false,
		
		init: function() {
			$(this.element).css('visibility', 'hidden');
			this.swapSVG(this.element);
		},
		
		swapSVG: function(el) {
			var self = this;
			var $el = $(el);
			// This technique is based in part on:
			// http://www.snippetlib.com/jquery/replace_all_svg_images_with_inline_svg
			var imgURL = $el.attr('src');
			var imgID = $el.attr('id');
			var imgClass = $el.attr('class');
			var imgData = $el.clone(true).data();

			var dimensions = {
				w: $el.attr('width'),
				h: $el.attr('height')
			};

			$.get(imgURL, function (data) {

				var svg = $(data).find('svg');
				if (typeof imgID !== undefined) {
					svg = svg.attr('id', imgID);
				}

				if (typeof imgClass !== undefined) {
					var cls = (svg.attr('class') !== undefined) ? svg.attr('class') : '';
					svg = svg.attr('class', imgClass + ' ' + cls + ' replaced-svg');
				}

				// copy all the data elements from the img to the svg
				$.each(imgData, function (name, value) {
					//svg.data(name, value);
					//jQuery.data(svg, name, value);
					//svg[0].dataset[name] = value;
					svg[0].setAttribute('data-' + name, value);
				});

				svg = svg.removeAttr('xmlns:a');

				// Get original dimensions of SVG file to use as foundation for scaling based on img tag dimensions
				var ow = parseFloat(svg.attr('width'));
				var oh = parseFloat(svg.attr('height'));
				
				// Set new dimensions of SVG file
				var nw = ow;
				var nh = oh;

				// Scale absolutely if both width and height attributes exist
				if (dimensions.w && dimensions.h) {
					nw = dimensions.w;
					nh = dimensions.h;
					$(svg).attr('width', nw);
					$(svg).attr('height', nh);
				}
				// Scale proportionally based on width
				else if (dimensions.w) {
					nw = dimensions.w;
					nh = (oh / ow) * dimensions.w;
					$(svg).attr('width', nw);
					$(svg).attr('height', nh);
				}
				// Scale proportionally based on height
				else if (dimensions.h) {
					nw = (ow / oh) * dimensions.h;
					nh = dimensions.h;
					$(svg).attr('width', nw);
					$(svg).attr('height', nh);
				}
				
				if (self.wrap) {
					var wrapClass = ( typeof self.wrap === 'string' ? self.wrap : 'svg-wrap' );
					var $wrapper = $('<div/>', { 'class': wrapClass }).append(svg);
					
					if (self.paddingHack) {
						var paddingTop = (nh / nw) * 100;
						$wrapper.css({ 'padding-top': paddingTop + '%' });
					}
					
					$el.replaceWith($wrapper);
					
				} else {
					$el.replaceWith(svg);
				}

				// Wrap all SVG-associated JS within a function and run it - this will need some more work
				var js = new Function(svg.find('script').text());
				js();

			});
		}
	};

	$.fn[pluginName] = function(options) {
		return this.each(function () {
			if (!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});
	};

})(jQuery, window, document);
