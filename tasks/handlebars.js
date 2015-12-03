var gulp                = require('gulp');
var handlebars          = require('gulp-compile-handlebars');
var plumber 			= require('gulp-plumber');
var notify 				= require('gulp-notify');
var rename              = require('gulp-rename');
var prettify            = require('gulp-prettify');
var requireDir 			= require('require-dir');
var configLoader 		= require('../helpers/gulp/configLoader');
var handlebarsDataProvider 		= require('../helpers/gulp/handlebarsDataProvider');

var taskName = 'handlebars';
var relBackPath = '../';

configLoader(taskName, function(projectName, conf){
	requireDir(relBackPath + conf.options.helpers, { recurse: true });
	conf.options.helpers = global.x4e.handlebars.helpers;
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
			.pipe(handlebars(handlebarsDataProvider(projectName, conf), conf.options))
			.pipe(rename(function (path) {
				path.extname = '.html';
			}))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.dest))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Handlebars build back to normal';
				}
				return false;
			}))
		;
	}

	gulp.task(taskName +'-' + projectName, task);
});