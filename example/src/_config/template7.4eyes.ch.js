var path = require('path');
var extend = require('../../gulp/node_modules/extend');

var projectKey = 'template7.4eyes.ch';

var gulpBackpath = '../';
var buildPath = gulpBackpath + 'site/fileadmin/' + projectKey + '/templates/build';
var sourcePath = gulpBackpath + 'src/' + projectKey;

global.x4e.config[projectKey] = extend(true, global.x4e.config[projectKey], {
	/**
	 * CLEAR
	 */
	clear: {
		//region Clear Options
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
		//endregion
	},

	/**
	 * COMPASS
	 */
	compass: {
		watch: [
			sourcePath + '/sass/**'
		],
		sources: [
			sourcePath + '/sass/**/*.scss'
		],
		minify: true,
		//region Compass Options
		options: {
			sass: path.join(__dirname, '../' + sourcePath + '/sass'),
			css: path.join(__dirname, '../' + buildPath + '/css'),
			sourcemap: true,
			comments: true,
			style: 'expanded',
			require: []
		}
		//endregion
	},
	/**
	 * JAVASCRIPT
	 */
	javascript: {
		watch: [
			sourcePath + '/js/**'
		],
		files: [
			//region head-vendor.js
			{
				filename: 'head-vendor.js',
				sources: [
					sourcePath + '/js/head/vendor/**'
				],
				order: {
					files: [
						'**/*.js'
					],
					options: {
						base: sourcePath + '/js/head/vendor/'
					}
				},
				dest: buildPath + '/js',
				minify: {
					enabled: true,
					options: {
						preserveComments: 'some'
					}
				},
				jshint: {
					enabled: false
				}
			},
			//endregion
			//region footer-vendor.js
			{
				filename: 'footer-vendor.js',
				sources: [
					sourcePath + '/js/footer/vendor/**'
				],
				order: {
					files: [
						'jquery-2.1.3.js'
					],
					options: {
						base: sourcePath + '/js/footer/vendor/'
					}
				},
				dest: buildPath + '/js',
				minify: {
					enabled: true,
					options: {
						preserveComments: 'some'
					}
				},
				jshint: {
					enabled: false
				}
			},
			//endregion
			//region footer-main.js
			{
				filename: 'footer-main.js',
				sources: [
					sourcePath + '/js/footer/main/**'
				],
				order: {
					files: [
						'**/*.js'
					],
					options: {
						base: sourcePath + '/js/footer/main/'
					}
				},
				dest: buildPath + '/js',
				minify: {
					enabled: true,
					options: {
						preserveComments: 'some'
					}
				},
				jshint: {
					enabled: true
				}
			}
			//endregion
		],
		handlebars: {
			sources: [
				sourcePath + '/js/handlebars/**'
			],
			dest: buildPath + '/js/handlebars'
		},
		jshint: {
			//region jshint options
			options: {
				// JSHint Default Configuration File (as on JSHint website)
				// See http://jshint.com/docs/ for more details

				"maxerr"        : 50,       // {int} Maximum error before stopping

				// Enforcing
				"bitwise"       : true,     // true: Prohibit bitwise operators (&, |, ^, etc.)
				"camelcase"     : false,    // true: Identifiers must be in camelCase
				"curly"         : true,     // true: Require {} for every new block or scope
				"eqeqeq"        : true,     // true: Require triple equals (===) for comparison
				"forin"         : true,     // true: Require filtering for..in loops with obj.hasOwnProperty()
				"freeze"        : true,     // true: prohibits overwriting prototypes of native objects such as Array, Date etc.
				"immed"         : false,    // true: Require immediate invocations to be wrapped in parens e.g. `(function () { } ());`
				"latedef"       : true,    // true: Require variables/functions to be defined before being used
				"newcap"        : true,    // true: Require capitalization of all constructor functions e.g. `new F()`
				"noarg"         : true,     // true: Prohibit use of `arguments.caller` and `arguments.callee`
				"noempty"       : true,     // true: Prohibit use of empty blocks
				"nonbsp"        : true,     // true: Prohibit "non-breaking whitespace" characters.
				"nonew"         : false,    // true: Prohibit use of constructors for side-effects (without assignment)
				"plusplus"      : false,    // true: Prohibit use of `++` and `--`
				"quotmark"      : 'single', // Quotation mark consistency:
											//   false    : do nothing (default)
											//   true     : ensure whatever is used is consistent
											//   "single" : require single quotes
											//   "double" : require double quotes
				"undef"         : true,     // true: Require all non-global variables to be declared (prevents global leaks)
				"unused"        : true,     // Unused variables:
											//   true     : all variables, last function parameter
											//   "vars"   : all variables only
											//   "strict" : all variables, all function parameters
				"strict"        : true,     // true: Requires all functions run in ES5 Strict Mode
				"maxparams"     : false,    // {int} Max number of formal params allowed per function
				"maxdepth"      : false,    // {int} Max depth of nested blocks (within functions)
				"maxstatements" : false,    // {int} Max number statements per function
				"maxcomplexity" : false,    // {int} Max cyclomatic complexity per function
				"maxlen"        : false,    // {int} Max number of characters per line
				"varstmt"       : false,    // true: Disallow any var statements. Only `let` and `const` are allowed.

				// Relaxing
				"asi"           : false,     // true: Tolerate Automatic Semicolon Insertion (no semicolons)
				"boss"          : false,     // true: Tolerate assignments where comparisons would be expected
				"debug"         : false,     // true: Allow debugger statements e.g. browser breakpoints.
				"eqnull"        : false,     // true: Tolerate use of `== null`
				"esversion"     : 5,         // {int} Specify the ECMAScript version to which the code must adhere.
				"moz"           : false,     // true: Allow Mozilla specific syntax (extends and overrides esnext features)
											 // (ex: `for each`, multiple try/catch, function expression…)
				"evil"          : false,     // true: Tolerate use of `eval` and `new Function()`
				"expr"          : false,     // true: Tolerate `ExpressionStatement` as Programs
				"funcscope"     : false,     // true: Tolerate defining variables inside control statements
				"globalstrict"  : false,     // true: Allow global "use strict" (also enables 'strict')
				"iterator"      : false,     // true: Tolerate using the `__iterator__` property
				"lastsemic"     : false,     // true: Tolerate omitting a semicolon for the last statement of a 1-line block
				"laxbreak"      : false,     // true: Tolerate possibly unsafe line breakings
				"laxcomma"      : false,     // true: Tolerate comma-first style coding
				"loopfunc"      : false,     // true: Tolerate functions being defined in loops
				"multistr"      : false,     // true: Tolerate multi-line strings
				"noyield"       : false,     // true: Tolerate generator functions with no yield statement in them.
				"notypeof"      : false,     // true: Tolerate invalid typeof operator values
				"proto"         : false,     // true: Tolerate using the `__proto__` property
				"scripturl"     : false,     // true: Tolerate script-targeted URLs
				"shadow"        : false,     // true: Allows re-define variables later in code e.g. `var x=1; x=2;`
				"sub"           : false,     // true: Tolerate using `[]` notation when it can still be expressed in dot notation
				"supernew"      : false,     // true: Tolerate `new function () { ... };` and `new Object;`
				"validthis"     : false,     // true: Tolerate using this in a non-constructor function

				// Environments
				"browser"       : true,     // Web Browser (window, document, etc)
				"browserify"    : false,    // Browserify (node.js code in the browser)
				"couch"         : false,    // CouchDB
				"devel"         : true,     // Development/debugging (alert, confirm, etc)
				"dojo"          : false,    // Dojo Toolkit
				"jasmine"       : false,    // Jasmine
				"jquery"        : true,    // jQuery
				"mocha"         : false,     // Mocha
				"mootools"      : false,    // MooTools
				"node"          : false,    // Node.js
				"nonstandard"   : false,    // Widely adopted globals (escape, unescape, etc)
				"phantom"       : false,    // PhantomJS
				"prototypejs"   : false,    // Prototype and Scriptaculous
				"qunit"         : false,    // QUnit
				"rhino"         : false,    // Rhino
				"shelljs"       : false,    // ShellJS
				"typed"         : false,    // Globals for typed array constructions
				"worker"        : false,    // Web Workers
				"wsh"           : false,    // Windows Scripting Host
				"yui"           : false,    // Yahoo User Interface

				// Custom Globals
				"globals"       : {}        // additional predefined global variables
			}
			//endregion
		}
	},

	/**
	 * IMAGEMIN
	 */
	'imagemin': {
		watch: [
			sourcePath + '/img/**'
		],

		//region Imagemin Options
		options: {
			// See: https://github.com/imagemin/imagemin-gifsicle
			gifsicle: {
				interlaced: true,
				optimizationLevel: 3
			},
			// See https://github.com/imagemin/imagemin-jpegtran
			jpegtran: {
				progressive: true,
				arithmetic: false
			},
			// See: https://github.com/imagemin/imagemin-optipng
			optipng: {
				optimizationLevel: 7,
				bitDepthReduction: true,
				colorTypeReduction: true,
				paletteReduction: true
			},
			// See: https://github.com/imagemin/imagemin-svgo and https://github.com/svg/svgo#what-it-can-do
			svgo: {
				options: [
					{'removeDoctype': true},
					{'removeXMLProcInst': false},
					{'convertStyleToAttrs': false}
					//{'cleanupIDs': false},
					//{'removeUnknownsAndDefaults': false},
					//{'collapseGroups': false}
				]
			}
		},
		//endregion
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

		//region Handlebars Data Provider
		handlebarsDataProvider: {
			//Configuration for the data provider function 'pages'
			pages: {
				path: sourcePath + '/handlebars/pages/',
				//Exclude regex-patterns or filenames
				exclude: [
					'index.hbs'
					//Example for a regex
					/*/^001/g*/
				]
			}
		},
		//endregion

		//region Handlebars Options
		options: {
			ignorePartials: false,
			partials: {},
			batch: [sourcePath + '/handlebars/partials'],
			helpers: sourcePath + '/handlebars/helpers'
		},
		//endregion

		//region Prettify Options
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
				extra_liners: ["head", "body", "/html"]
			}
		},
		//endregion

		//region Htmlvalidator Options
		//https://www.npmjs.com/package/gulp-w3cjs)
		htmlvalidator: {
			enabled: true,
			options: {
				//url: 'http://validator.w3.org/nu/',
				//proxy: '',
			}
		}
		//endregion
	},
	/**
	 * FILECOPY
	 */
	filecopy: {
		watch: [
			sourcePath + '/fonts/**',
			sourcePath + '/flash/**'
		],
		bundles: {
			//region fonts
			fonts: {
				sources: [
					sourcePath + '/fonts/**',
					'!' + sourcePath + '/fonts/**/*.json'
				],
				dest: buildPath + '/css/fonts'
			}
			//endregion
		}
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
	//

	//region CssInliner Options
	//	options: {
	//		applyStyleTags: true,
	//		applyLinkTags: true,
	//		removeStyleTags: true,
	//		removeLinkTags: true
	//	}
	//endregion

	// },
	/**
	 * LITMUS
	 */
	//litmus: {
	//	sources: [
	//		buildPath + '/html/newsletter.inline.html'
	//	],
	//

	//region Litmus Options
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
	//endregion

	//}
});