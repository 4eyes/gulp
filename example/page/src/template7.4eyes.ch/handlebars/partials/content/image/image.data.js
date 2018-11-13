'use strict';

var _ = require(modulesPath + 'lodash'),
	requireNew = require(modulesPath + 'import-fresh')
	;

var data = {
	href: '#',
	image: _.merge(requireNew('../../generic/image/image.data.js'), {
		src: '../../img/_temp_/foo.jpg',
		height: '287',
		width: '383',
		alt: 'Lorem Ipsum Dolor'
	})
};

module.exports = data;