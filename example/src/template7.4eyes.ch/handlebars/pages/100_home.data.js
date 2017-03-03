'use strict';

var _ = require(modulesPath + 'lodash'),
    requireNew = require(modulesPath + 'require-new')
;

var data = {
    'buttons': [
        _.merge(requireNew('../partials/content/button.data.js'), {
            //override button properies here, if needed...
        }),
        _.merge(requireNew('../partials/content/button.data.js'), {
            //override button properies here, if needed...
        })
    ],
    modules: {
        'button': _.merge(requireNew('../partials/content/button.data.js'), {})
    }
};

module.exports = data;