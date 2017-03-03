(function (window, $, undefined) {
	'use strict';

	if ($ === undefined) {
		alert('Error: jQuery not loaded!');
		return;
	}

	var X4e = window.X4e || {},
		FooHandler = X4e.FooHandler || (X4e.FooHandler = {})
		;

	var Foo = function ($container) {
		this.$container = $container;
		this.init();
	};

	$.extend(true, FooHandler, {
		Selectors: {
			container: '[data-foo="init"]'
		},
		instances: [],
		init: function () {
			var self = this;
			$(this.Selectors.container).each(function (i) {
				var $instance = $(this),
					id = i + 1
					;
				$instance.attr('data-foo-id', id);
				self.instances[id] = new Foo($instance);
			});
		},
		getInstanceById: function (id) {
			if (this.instances[id]) {
				return this.instances[id];
			} else {
				return false;
			}
		}
	});

	$.extend(true, Foo.prototype, {
        Options: {
        },
        Selectors: {
        },
		Classes: {
		},
		init: function () {
		}
	});

	window.X4e = X4e;

})(window, jQuery);