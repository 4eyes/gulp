var extend = require('extend');

global.x4e.handlebars.helpers = extend(true, global.x4e.handlebars.helpers, {
	compare: function (a, operator, b, opts) {
		var comparison = false;
		switch (operator) {
			case '==':
				comparison = (a == b);
				break;
			case '===':
				comparison = (a === b);
				break;
			case '!=':
				comparison = (a != b);
				break;
			case '!==':
				comparison = (a !== b);
				break;
			case '>':
				comparison = (a > b);
				break;
			case '>=':
				comparison = (a >= b);
				break;
			case '<':
				comparison = (a < b);
				break;
			case '<=':
				comparison = (a <= b);
				break;
		}
		if (comparison) {
			return opts.fn(this);
		} else {
			return opts.inverse(this);
		}
	}
});