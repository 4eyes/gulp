var gulp                = require('gulp');
var gulpif              = require('gulp-if');
var util	        	= require('gulp-util');
var tap		        	= require('gulp-tap');
var handlebars          = require('gulp-hb');
var plumber 			= require('gulp-plumber');
var notify 				= require('gulp-notify');
var rename              = require('gulp-rename');
var prettify            = require('gulp-prettify');
var w3cjs            	= require('gulp-w3cjs');
var through2            = require('through2');
var extend 				= require('extend');
var path	 			= require('path');
var _	 				= require('lodash');
var fs	 				= require('fs');
var requireNew 			= require('require-new');
var configLoader 		= require('../helpers/gulp/configLoader');

var taskName = 'handlebars';

configLoader(taskName, function(projectName, conf){
	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName : taskName + '-' + projectName, options: conf.watch});

	var task = function () {
		return gulp.src(conf.source)
			.pipe(plumber({
				errorHandler: function (err) {
					global.x4e.tasks.error[taskName + '-' + projectName] = true;
					notify.onError({
						title: "Gulp: " + taskName,
						//icon: notifyInfo.icon,
						message: "<%= error.message %>"
					})(err);

					this.emit('end');
				}
			}))
			.pipe(tap(function(file) {
				var dataFile = util.replaceExtension(file.path, '.data.js'),
					data = _.cloneDeep(conf.data.default)
				;

				try {
					fs.accessSync(dataFile, fs.constants.R_OK);
					data =  _.merge(data, requireNew(dataFile));
				} catch (e) {}

				// Save data by file name
				file.data = data;
			}))
			.pipe(handlebars(_.merge({
				partials: conf.partials,
				helpers: conf.helpers
			}, conf.options)))
			.pipe(rename(function (path) {
				path.extname = '.html';
			}))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.dest))
			.pipe(plumber())
			.pipe(gulpif(conf.htmlvalidator.enabled, w3cjs(conf.htmlvalidator.options)))
			.pipe(gulpif(conf.htmlvalidator.enabled, through2.obj(function (file, enc, cb){
				cb(null, file);
				if (!file.w3cjs.success){
					file.pipe(notify('HTML validation error(s) found'));
				}
			})))
			.pipe(plumber.stop())
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Handlebars build back to normal';
				}
				return false;
			}))
		;
	};

	gulp.task(taskName +'-' + projectName, task);
});