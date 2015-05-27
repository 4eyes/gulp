var gulp 			= require('gulp');
var gulpif 			= require('gulp-if');
var plumber 		= require('gulp-plumber');
var notify 			= require('gulp-notify');
var csso 			= require('gulp-csso');
var compass 		= require('gulp-compass');
var rename 			= require('gulp-rename');
var configLoader 	= require('../helpers/gulp/configLoader');

var taskName = 'compass';

configLoader(taskName, function(projectName, conf) {

	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName: taskName + '-' + projectName, options: conf.watch});

	var task = function () {
		// Process and minify all SASS files
		return gulp.src(conf.sources)
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
			.pipe(compass(conf.options))
			.pipe(gulpif(conf.minify, rename(function (path) {
				path.basename += ".min";
			})))
			.pipe(gulpif(conf.minify, csso()))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.options.css + "/"))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Compass build back to normal';
				}
				return false;
			}))
		;
	}

	gulp.task(taskName + '-' + projectName, task);
});
