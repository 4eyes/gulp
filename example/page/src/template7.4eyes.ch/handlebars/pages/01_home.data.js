'use strict';

var _ = require(modulesPath + 'lodash'),
    requireNew = require(modulesPath + 'import-fresh')
;

var data = {
    meta: {
        pagetitle: 'Startseite - template.7.4eyes.ch'
    },

    modules: {
        'header': _.merge(requireNew('../partials/header.data.js'), {})
    }
};


module.exports = data;