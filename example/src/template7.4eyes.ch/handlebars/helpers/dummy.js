var extend = require('extend');

global.x4e.handlebars.helpers = extend(true, global.x4e.handlebars.helpers, {
	dummy: function (a, operator, b, opts) {
		return "Hello World";
	}
});