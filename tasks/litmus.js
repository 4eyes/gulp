var gulp 			= require('gulp');
var litmus			= require('gulp-litmus');
var plumber 		= require('gulp-plumber');
var notify 			= require('gulp-notify');
var configLoader 	= require('../helpers/gulp/configLoader');

var taskName = 'litmus';

configLoader(taskName, function(projectName, conf) {

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
			.pipe(litmus(conf.options))
			.pipe(plumber.stop())
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Litmus build back to normal';
				}
				return false;
			}))
			;
	}

	gulp.task(taskName + '-' + projectName, task);
});