/*global modulesPath*/
var extend = require(modulesPath + 'extend');

global.x4e.handlebars.helpers = extend(true, global.x4e.handlebars.helpers, {
    dummy: function (foo, bar) {
        return foo;
    }
});