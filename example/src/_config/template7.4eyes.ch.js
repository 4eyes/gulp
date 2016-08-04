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
		watch : [
			sourcePath + '/sass/**'
		],
		sources : [
			sourcePath + '/sass/**/*.scss'
		],
		minify: true,
		//region Compass Options
		options: {
			sass: path.join(__dirname, '../' + sourcePath + '/sass'),
			css:  path.join(__dirname, '../' + buildPath + '/css'),
			sourcemap: true,
			comments: true,
			style: 'expanded',
			require: [

			]
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
			//region vendor.js
			{
				filename: 'vendor.js',
				sources: [
					sourcePath + '/js/vendor/**'
				],
                order: {
                    files: [
                        'jquery-2.1.3.js',
                        '**/*.js'
                    ],
                    options: {
                        base: sourcePath + '/js/vendor/'
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
			//region main.js
			{
				filename: 'main.js',
				sources: [
					sourcePath + '/js/custom/**'
				],
                order: {
                    files: [
                        '**/*.js'
                    ],
                    options: {
                        base: sourcePath + '/js/custom/'
                    }
                },
				dest: buildPath +'/js',
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

				/**
				 * This option prohibits the use of bitwise operators such as `^` (XOR),
				 * `|` (OR) and others. Bitwise operators are very rare in JavaScript
				 * programs and quite often `&` is simply a mistyped `&&`.
				 */
				bitwise     : true,

				/**
				 *
				 * This options prohibits overwriting prototypes of native objects such as
				 * `Array`, `Date` and so on.
				 *
				 *     // jshint freeze:true
				 *     Array.prototype.count = function (value) { return 4; };
				 *     // -> Warning: Extending prototype of native object: 'Array'.
				 */
				freeze      : true,

				/**
				 * This option allows you to force all variable names to use either
				 * camelCase style or UPPER_CASE with underscores.
				 *
				 * @deprecated JSHint is limiting its scope to issues of code correctness.
				 *             If you would like to enforce rules relating to code style,
				 *             check out [the JSCS
				 *             project](https://github.com/jscs-dev/node-jscs).
				 */
				camelcase   : true,

				/**
				 * This option requires you to always put curly braces around blocks in
				 * loops and conditionals. JavaScript allows you to omit curly braces when
				 * the block consists of only one statement, for example:
				 *
				 *     while (day)
				 *       shuffle();
				 *
				 * However, in some circumstances, it can lead to bugs (you'd think that
				 * `sleep()` is a part of the loop while in reality it is not):
				 *
				 *     while (day)
				 *       shuffle();
				 *       sleep();
				 */
				curly       : true,

				/**
				 * This options prohibits the use of `==` and `!=` in favor of `===` and
				 * `!==`. The former try to coerce values before comparing them which can
				 * lead to some unexpected results. The latter don't do any coercion so
				 * they are generally safer. If you would like to learn more about type
				 * coercion in JavaScript, we recommend [Truth, Equality and
				 * JavaScript](http://javascriptweblog.wordpress.com/2011/02/07/truth-equality-and-javascript/)
				 * by Angus Croll.
				 */
				eqeqeq      : true,

				/**
				 * This option enables warnings about the use of identifiers which are
				 * defined in future versions of JavaScript. Although overwriting them has
				 * no effect in contexts where they are not implemented, this practice can
				 * cause issues when migrating codebases to newer versions of the language.
				 */
				futurehostile: true,

				/**
				 * This option suppresses warnings about invalid `typeof` operator values.
				 * This operator has only [a limited set of possible return
				 * values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof).
				 * By default, JSHint warns when you compare its result with an invalid
				 * value which often can be a typo.
				 *
				 *     // 'fuction' instead of 'function'
				 *     if (typeof a == "fuction") { // Invalid typeof value 'fuction'
				 *       // ...
				 *     }
				 *
				 * Do not use this option unless you're absolutely sure you don't want
				 * these checks.
				 */
				notypeof    : true,

				/**
				 * This option tells JSHint that your code needs to adhere to ECMAScript 3
				 * specification. Use this option if you need your program to be executable
				 * in older browsers—such as Internet Explorer 6/7/8/9—and other legacy
				 * JavaScript environments.
				 *
				 * @deprecated Use `esversion: 3` instead.
				 */
				es3         : true,

				/**
				 * This option enables syntax first defined in [the ECMAScript 5.1
				 * specification](http://es5.github.io/). This includes allowing reserved
				 * keywords as object properties.
				 *
				 * @deprecated Use `esversion: 5` instead.
				 */
				es5         : true,

				/**
				 * This option requires all `for in` loops to filter object's items. The
				 * for in statement allows for looping through the names of all of the
				 * properties of an object including those inherited through the prototype
				 * chain. This behavior can lead to unexpected items in your object so it
				 * is generally safer to always filter inherited properties out as shown in
				 * the example:
				 *
				 *     for (key in obj) {
				 *       if (obj.hasOwnProperty(key)) {
				 *         // We are sure that obj[key] belongs to the object and was not inherited.
				 *       }
				 *     }
				 *
				 * For more in-depth understanding of `for in` loops in JavaScript, read
				 * [Exploring JavaScript for-in
				 * loops](http://javascriptweblog.wordpress.com/2011/01/04/exploring-javascript-for-in-loops/)
				 * by Angus Croll.
				 */
				forin       : true,

				/**
				 * This option suppresses warnings about declaring variables inside of
				 * control
				 * structures while accessing them later from the outside. Even though
				 * JavaScript has only two real scopes—global and function—such practice
				 * leads to confusion among people new to the language and hard-to-debug
				 * bugs. This is why, by default, JSHint warns about variables that are
				 * used outside of their intended scope.
				 *
				 *     function test() {
				 *       if (true) {
				 *         var x = 0;
				 *       }
				 *
				 *       x += 1; // Default: 'x' used out of scope.
				 *                 // No warning when funcscope:true
				 *     }
				 */
				funcscope   : true,

				/**
				 * This option prohibits the use of immediate function invocations without
				 * wrapping them in parentheses. Wrapping parentheses assists readers of
				 * your code in understanding that the expression is the result of a
				 * function, and not the function itself.
				 *
				 * @deprecated JSHint is limiting its scope to issues of code correctness.
				 *             If you would like to enforce rules relating to code style,
				 *             check out [the JSCS
				 *             project](https://github.com/jscs-dev/node-jscs).
				 */
				immed       : true,

				/**
				 * This option suppresses warnings about the `__iterator__` property. This
				 * property is not supported by all browsers so use it carefully.
				 */
				iterator    : true,

				/**
				 * This option requires you to capitalize names of constructor functions.
				 * Capitalizing functions that are intended to be used with `new` operator
				 * is just a convention that helps programmers to visually distinguish
				 * constructor functions from other types of functions to help spot
				 * mistakes when using `this`.
				 *
				 * Not doing so won't break your code in any browsers or environments but
				 * it will be a bit harder to figure out—by reading the code—if the
				 * function was supposed to be used with or without new. And this is
				 * important because when the function that was intended to be used with
				 * `new` is used without it, `this` will point to the global object instead
				 * of a new object.
				 *
				 * @deprecated JSHint is limiting its scope to issues of code correctness.
				 *             If you would like to enforce rules relating to code style,
				 *             check out [the JSCS
				 *             project](https://github.com/jscs-dev/node-jscs).
				 */
				newcap      : true,

				/**
				 * This option prohibits the use of `arguments.caller` and
				 * `arguments.callee`.  Both `.caller` and `.callee` make quite a few
				 * optimizations impossible so they were deprecated in future versions of
				 * JavaScript. In fact, ECMAScript 5 forbids the use of `arguments.callee`
				 * in strict mode.
				 */
				noarg       : true,

				/**
				 * This option prohibits the use of the comma operator. When misused, the
				 * comma operator can obscure the value of a statement and promote
				 * incorrect code.
				 */
				nocomma     : true,

				/**
				 * This option warns when you have an empty block in your code. JSLint was
				 * originally warning for all empty blocks and we simply made it optional.
				 * There were no studies reporting that empty blocks in JavaScript break
				 * your code in any way.
				 *
				 * @deprecated JSHint is limiting its scope to issues of code correctness.
				 *             If you would like to enforce rules relating to code style,
				 *             check out [the JSCS
				 *             project](https://github.com/jscs-dev/node-jscs).
				 */
				noempty     : true,

				/**
				 * This option warns about "non-breaking whitespace" characters. These
				 * characters can be entered with option-space on Mac computers and have a
				 * potential of breaking non-UTF8 web pages.
				 */
				nonbsp      : true,

				/**
				 * This option prohibits the use of constructor functions for side-effects.
				 * Some people like to call constructor functions without assigning its
				 * result to any variable:
				 *
				 *     new MyConstructor();
				 *
				 * There is no advantage in this approach over simply calling
				 * `MyConstructor` since the object that the operator `new` creates isn't
				 * used anywhere so you should generally avoid constructors like this one.
				 */
				nonew       : true,

				/**
				 * This option prohibits the use of explicitly undeclared variables. This
				 * option is very useful for spotting leaking and mistyped variables.
				 *
				 *     // jshint undef:true
				 *
				 *     function test() {
				 *       var myVar = 'Hello, World';
				 *       console.log(myvar); // Oops, typoed here. JSHint with undef will complain
				 *     }
				 *
				 * If your variable is defined in another file, you can use the `global`
				 * directive to tell JSHint about it.
				 */
				undef       : true,

				/**
				 * This option prohibits the use of the grouping operator when it is not
				 * strictly required. Such usage commonly reflects a misunderstanding of
				 * unary operators, for example:
				 *
				 *     // jshint singleGroups: true
				 *
				 *     delete(obj.attr); // Warning: Unnecessary grouping operator.
				 */
				singleGroups: false,

				/**
				 * When set to true, the use of VariableStatements are forbidden.
				 * For example:
				 *
				 *     // jshint varstmt: true
				 *
				 *     var a; // Warning: `var` declarations are forbidden. Use `let` or `const` instead.
				 */
				varstmt: false,

				/**
				 * This option is a short hand for the most strict JSHint configuration as
				 * available in JSHint version 2.6.3. It enables all enforcing options and
				 * disables all relaxing options that were defined in that release.
				 *
				 * @deprecated The option cannot be maintained without automatically opting
				 *             users in to new features. This can lead to unexpected
				 *             warnings/errors in when upgrading between minor versions of
				 *             JSHint.
				 */
				enforceall : false
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
                //{'cleanupIDs': false},
                //{'removeUnknownsAndDefaults': false},
                //{'collapseGroups': false}
			]
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
				extra_liners: ["head","body","/html"]
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