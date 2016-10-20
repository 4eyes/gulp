var gulp 			= require('gulp');
var changed 		= require('gulp-changed');
var imagemin 		= require('gulp-imagemin');
var plumber 		= require('gulp-plumber');
var notify 			= require('gulp-notify');
var configLoader 	= require('../helpers/gulp/configLoader');

var taskName = 'imagemin';

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
			.pipe(changed(conf.dest))     // Ignore unchanged files
			.pipe(gulp.dest(conf.dest))   // Export original file
			.pipe(imagemin(
				[
					imagemin.gifsicle(conf.options.gifsicle),
					imagemin.jpegtran(conf.options.jpegtran),
					imagemin.optipng(conf.options.optipng),
					imagemin.svgo(conf.options.svgo)
				]
			)) // Optimize
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.dest))   // Override original file with optimized
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Imagemin build back to normal';
				}
				return false;
			}))
		;
	}

	gulp.task(taskName + '-' + projectName, task);
});
