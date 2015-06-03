var gulp 			= require('gulp');
var gulpif 			= require('gulp-if');
var plumber 		= require('gulp-plumber');
var notify 			= require('gulp-notify');
var order 			= require('gulp-order');
var concat 			= require('gulp-concat');
var uglify 			= require('gulp-uglify');
var rename 			= require('gulp-rename');

var configLoader 	= require('../helpers/gulp/configLoader');

var taskName = 'javascript';

configLoader(taskName, function(projectName, conf) {

	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName: taskName + '-' + projectName, options: conf.watch});

	var task = function () {
		var tasks = [];
		tasks.push(gulp.src(conf.vendor.sources)
			.pipe(plumber({
				errorHandler: function (err) {
					global.x4e.tasks.error[taskName + '-' + projectName + '-vendor'] = true;
					notify.onError({
						title: "Gulp: " + taskName + '-vendor',
						//icon: notifyInfo.icon,
						message: "<%= error.message %>"
					})(err);

					this.emit('end');
				}
			}))
			.pipe(order(conf.vendor.order))
			.pipe(concat(conf.vendor.filename))
			.pipe(gulp.dest(conf.custom.dest))
			.pipe(gulpif(conf.vendor.minify, uglify(conf.uglify)))
			.pipe(gulpif(conf.vendor.minify, rename(function(path){
				path.basename += ".min";
			})))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.vendor.dest))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName + '-vendor']){
					delete global.x4e.tasks.error[taskName + '-' + projectName + '-vendor'];
					return 'Javascript build back to normal';
				}
				return false;
			}))
		);
		tasks.push(gulp.src(conf.custom.sources)
			.pipe(plumber({
				errorHandler: function (err) {
					global.x4e.tasks.error[taskName + '-' + projectName + '-custom'] = true;
					notify.onError({
						title: "Gulp: " + taskName + '-custom',
						//icon: notifyInfo.icon,
						message: "<%= error.message %>"
					})(err);

					this.emit('end');
				}
			}))
			.pipe(order(conf.custom.order))
			.pipe(concat(conf.custom.filename))
			.pipe(gulp.dest(conf.custom.dest))
			.pipe(gulpif(conf.custom.minify, uglify(conf.uglify)))
			.pipe(gulpif(conf.custom.minify, rename(function(path){
				path.basename += ".min";
			})))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.custom.dest))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName + '-custom']){
					delete global.x4e.tasks.error[taskName + '-' + projectName + '-custom'];
					return 'Javascript build back to normal';
				}
				return false;
			}))
		);

		tasks.push(gulp.src(conf.handlebars.sources)
			.pipe(plumber({
				errorHandler: function (err) {
					global.x4e.tasks.error[taskName + '-' + projectName + '-handlebars'] = true;
					notify.onError({
						title: "Gulp: " + taskName + '-handlebars',
						//icon: notifyInfo.icon,
						message: "<%= error.message %>"
					})(err);

					this.emit('end');
				}
			}))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.handlebars.dest))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName + '-handlebars']){
					delete global.x4e.tasks.error[taskName + '-' + projectName + '-handlebars'];
					return 'Javascript build back to normal';
				}
				return false;
			}))
		);

		return tasks;
	}

	gulp.task(taskName + '-' + projectName, task);
});