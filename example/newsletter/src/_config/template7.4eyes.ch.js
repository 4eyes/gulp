/*global modulesPath*/

var gulpPathRelative = '../';
var path = require(modulesPath + 'path');
var extend = require(modulesPath + 'extend');

var projectKey = 'template7.4eyes.ch';
var buildPath = gulpPathRelative + 'site/fileadmin/' + projectKey + '/templates/build';
var sourcePath = gulpPathRelative + 'src/' + projectKey;

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
     * CSS
     */
    css: {
        watch: [
            sourcePath + '/sass/**'
        ],
        sources: [
            sourcePath + '/sass/**/*.scss'
        ],
        dest: buildPath + '/css',
        plugins: {
            //region sourcemaps
            sourcemaps: true,
            //endregion
            //region sass
            sass: {
                //https://github.com/sass/node-sass#options
                options: {
                    //Default: nested; Values: nested, expanded, compact, compressed
                    outputStyle: 'expanded',
                    //Default: 5; Used to determine how many digits after the decimal will be allowed.
                    precision: '5',
                    //Default false; Enables the line number and file where a selector is defined to be emitted into the compiled CSS as a comment. Useful for debugging, especially when using imports and mixins.
                    sourceComments: true
                }
            },
            //endregion
            //region postcss
            postcss: {
                plugins: {
                    //https://www.npmjs.com/package/autoprefixer
                    autoprefixer: require(modulesPath + 'autoprefixer')({
                        browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3']
                    })
                },
                options: {}
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
                    {'removeDimensions': true},
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
            enabled: false,
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
            sourcePath + '/foo/**'
        ],
        bundles: {
            //region foo
            foo: {
                sources: [
                    sourcePath + '/foo/**'
                ],
                dest: buildPath + '/foo'
            }
            //endregion
        }
    },

    /**
     * CSSINLINER
     */
    inlinecss: {
    	watch: [
    		sourcePath + '/sass/**',
    		sourcePath + '/handlebars/pages/*.hbs',
    		sourcePath + '/handlebars/partials/*.hbs',
    		sourcePath + '/handlebars/partials/**/*.hbs'
    	],
    	sources : [
    		buildPath + '/html/newsletter.html'
    	],
    	dest: buildPath + '/html',


        //region CssInliner Options
    	options: {
    		applyStyleTags: true,
    		applyLinkTags: true,
    		removeStyleTags: true,
    		removeLinkTags: true
    	}
        //endregion
    },

    /**
     * LITMUS
     */
    litmus: {
    	sources: [
    		buildPath + '/html/newsletter.inline.html'
    	],
        //region Litmus Options
    	options: {
    		username: 'tech@4eyes.ch',
    		password: 'E7Dm4tFtRXRWqN3v',
    		url: 'https://4eyes1.litmus.com',
    		applications: [
    			'android22',
    			'android4',
    			'aolonline',
    			'androidgmailapp',
    			'ffaolonline',
    			'appmail7',
    			'appmail8',
    			'blackberry8900',
    			'colorblind',
    			'ipadmini',
    			'ipad',
    			'barracuda',
    			'spamassassin3',
    			'gmailnewspam',
    			'gmailnew',
    			'ffgmailnew',
    			'chromegmailnew',
    			'iphone5s',
    			'iphone5sios8',
    			'iphone6',
    			'iphone6plus',
    			'notes6',
    			'notes7',
    			'notes8',
    			'notes85',
    			'ol2000',
    			'ol2002',
    			'ol2003',
    			'ol2007',
    			'ol2010',
    			'ol2011',
    			'ol2013',
    			'ol2015',
    			'outlookcom',
    			'ffoutlookcom',
    			'chromeoutlookcom',
    			'plaintext',
    			'thunderbirdlatest',
    			'yahoo',
    			'ffyahoo',
    			'chromeyahoo',
    			'windowsphone8'
    		]
    	}
        //endregion
    }
});