var path 		= require('path');
var extend 		= require('../../gulp/node_modules/extend');

var projectKey = 'template7.4eyes.ch';

var gulpBackpath = '../';
var buildPath = gulpBackpath + 'site/fileadmin/' + projectKey + '/templates/build';
var sourcePath = gulpBackpath + 'src/' + projectKey;

global.x4e.config[projectKey] = extend(true, global.x4e.config[projectKey], {
	/**
	 * CLEAR
	 */
	clear: {
		options: {
			//The clean process is done before running these tasks
			tasks: [
				'default'
			],
			//folders to clear
			folders: [
				buildPath
			]
		}
	},

	/**
	 * COMPASS
	 */
	compass: {
		watch : [
			sourcePath + '/sass/**'
		],
		sources : [
			sourcePath + '/sass/**/*.scss'
		],
		minify: true,
		options: {
			sass: path.join(__dirname, '../' + sourcePath + '/sass'),
			css:  path.join(__dirname, '../' + buildPath + '/css'),
			sourcemap: true,
			comments: true,
			style: 'expanded',
			require: [

			]
		}
	},

	/**
	 * JAVASCRIPT
	 */
	/**
	 * JAVASCRIPT
	 */
	javascript: {
		watch: [
			sourcePath + '/js/**'
		],
		files: [
			{
				filename: 'vendor.js',
				sources: [
					sourcePath + '/js/vendor/**'
				],
				order: [
					sourcePath + '/js/vendor/jquery-2.1.3.js',
					sourcePath + '/js/vendor/handlebars-3.0.3.js',
					sourcePath + '/js/vendor/**'
				],
				dest: buildPath + '/js',
				minify: {
					enabled: true,
					options: {
						preserveComments: 'some'
					}
				}
			},
			{
				filename: 'main.js',
				sources: [
					sourcePath + '/js/custom/**'
				],
				order: [
					sourcePath + '/js/custom/**'
				],
				dest: buildPath +'/js',
				minify: {
					enabled: true,
					options: {
						preserveComments: 'some'
					}
				}
			},
			{
				filename: 'lteie9.js',
				sources: [
					sourcePath + '/js/lteie9/**'
				],
				order: [
					sourcePath + '/js/lteie9/**'
				],
				dest: buildPath +'/js',
				minify: {
					enabled: true,
					options: {
						preserveComments: 'some'
					}
				}
			}
		],
		handlebars: {
			sources: [
				sourcePath + '/js/handlebars/**'
			],
			dest: buildPath + '/js/handlebars'
		}
	},

	/**
	 * IMAGEMIN
	 */
	'imagemin': {
		watch: [
			sourcePath + '/img/**'
		],
		// See: https://www.npmjs.com/package/gulp-imagemin#imagemin-options
		options: {
			//png
			optimizationLevel: 6,
			//jpg
			progressive: false,
			//gif
			interlaced: false,
			//svg
			multipass: false,
			svgoPlugins: [
				{'removeDoctype': true},
				{'removeXMLProcInst': false}
			]
		},
		source: sourcePath + '/img/**',
		dest: buildPath + '/img'
	},

	/**
	 * HANDLEBARS
	 */
	handlebars: {
		watch: [
			sourcePath + '/handlebars/pages/*.hbs',
			sourcePath + '/handlebars/partials/*.hbs',
			sourcePath + '/handlebars/partials/**/*.hbs'
		],
		source: sourcePath + '/handlebars/pages/*.hbs',
		dest: buildPath + '/html',
		templateData: {},
		options: {
			ignorePartials: false,
			partials: {},
			batch: [sourcePath + '/handlebars/partials'],
			helpers: sourcePath + '/handlebars/helpers'
		},
		prettify: {
			source: buildPath + '/html',
			dest: buildPath + '/html',
			options: {
				indent_inner_html: true,
				indent_size: 4,
				indent_char: " ",
				brace_style: "collapse",
				indent_scripts: "normal",
				wrap_line_length: 0,
				wrap_attributes: "auto",
				wrap_attributes_indent_size: 4,
				preserve_newlines: true,
				max_preserve_newlines: 10,
				unformatted: ["a", "sub", "sup", "b", "i", "u"],
				end_with_newline: true,
				extra_liners: ["head","body","/html"]
			}
		}
	},
	/**
	 * FONTCOPY
	 */
	fontcopy: {
		watch: [
			sourcePath + '/fonts/**',
		],
		sources: [
			sourcePath + '/fonts/**',
			'!' + sourcePath + '/fonts/**/*.json'
		],
		dest: buildPath + '/css/fonts'
	}

	/**
	 * CSSINLINER
	 */

	//inlinecss: {
	//	watch: [
	//		sourcePath + '/sass/**',
	//		sourcePath + '/handlebars/pages/*.hbs',
	//		sourcePath + '/handlebars/partials/*.hbs',
	//		sourcePath + '/handlebars/partials/**/*.hbs'
	//	],
	//	sources : [
	//		buildPath + '/html/newsletter.html'
	//	],
	//	dest: buildPath + '/html',
	//	options: {
	//		applyStyleTags: true,
	//		applyLinkTags: true,
	//		removeStyleTags: true,
	//		removeLinkTags: true
	//	}
	// },
	/**
	 * LITMUS
	 */
	//litmus: {
	//	sources: [
	//		buildPath + '/html/newsletter.inline.html'
	//	],
	//	options: {
	//		username: 'tech@4eyes.ch',
	//		password: 'E7Dm4tFtRXRWqN3v',
	//		url: 'https://4eyes1.litmus.com',
	//		applications: [
	//			'android22',
	//			'android4',
	//			'aolonline',
	//			'androidgmailapp',
	//			'ffaolonline',
	//			'appmail7',
	//			'appmail8',
	//			'blackberry8900',
	//			'colorblind',
	//			'ipadmini',
	//			'ipad',
	//			'barracuda',
	//			'spamassassin3',
	//			'gmailnewspam',
	//			'gmailnew',
	//			'ffgmailnew',
	//			'chromegmailnew',
	//			'iphone5s',
	//			'iphone5sios8',
	//			'iphone6',
	//			'iphone6plus',
	//			'notes6',
	//			'notes7',
	//			'notes8',
	//			'notes85',
	//			'ol2000',
	//			'ol2002',
	//			'ol2003',
	//			'ol2007',
	//			'ol2010',
	//			'ol2011',
	//			'ol2013',
	//			'ol2015',
	//			'outlookcom',
	//			'ffoutlookcom',
	//			'chromeoutlookcom',
	//			'plaintext',
	//			'thunderbirdlatest',
	//			'yahoo',
	//			'ffyahoo',
	//			'chromeyahoo',
	//			'windowsphone8'
	//		]
	//	}
	//}
});