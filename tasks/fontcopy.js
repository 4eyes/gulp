var gulp 				= require('gulp');
var plumber 			= require('gulp-plumber');
var notify 				= require('gulp-notify');
var configLoader 		= require('../helpers/gulp/configLoader');

var taskName = 'fontcopy';

configLoader(taskName, function(projectName, conf){
	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName : taskName + '-' + projectName, options: conf.watch});

	var task = function () {
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
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.dest))  // Export
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Fontcopy build back to normal';
				}
				return false;
			}))
		;
	}

	gulp.task(taskName + '-' + projectName, task);
});