'use strict';

var _ = require(modulesPath + 'lodash'),
	requireNew = require(modulesPath + 'import-fresh')
	;

var data = {
    form: {
        headline: _.merge(requireNew('../../content/headline/headline.data.js'), {
            header: 'Formular',
            headline: ''
        }),
        form: {
            action: '#',
            rows: [
                {
                    columns: [
                        {
                            partial: 'generic/form/input/input',
                            element: _.merge(requireNew('../../generic/form/input/input.data.js'), {
                                id: 'email',
                                type: 'text',
                                name: 'email',
                                label: 'E-Mail'
                            })
                        },
                        {
                            partial: 'generic/form/input/input',
                            element: _.merge(requireNew('../../generic/form/input/input.data.js'), {
                                id: 'password',
                                type: 'text',
                                name: 'email',
                                label: 'Passwort*'
                            })
                        }
                    ]
                },
                {
                    columns: [
                        {
                            partial: 'generic/form/input/input',
                            element: _.merge(requireNew('../../generic/form/input/input.data.js'), {
                                type: 'submit',
                                name: 'submit',
                                label: '',
                                value: 'Login',
                                class: 'mod_button'
                            })
                        }
                    ]
                }
            ]
        }
    }
};

module.exports = data;