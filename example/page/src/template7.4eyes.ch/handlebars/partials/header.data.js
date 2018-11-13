'use strict';

var _ = require(modulesPath + 'lodash'),
    requireNew = require(modulesPath + 'import-fresh')
    ;

var data = {
    modules: {
        'navigation' : _.merge(requireNew('../partials/navigation.data.js'), {})
    }
};

module.exports = data;