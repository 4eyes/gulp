var gulp 			= require('gulp');
var gulpif 			= require('gulp-if');
var plumber 		= require('gulp-plumber');
var jshint	 		= require('gulp-jshint');
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
		for (var i = 0; i < conf.files.length; i++ ) {
			var fileConf = conf.files[i];
			tasks.push(gulp.src(fileConf.sources)
					.pipe(plumber({
						errorHandler: function (err) {
							global.x4e.tasks.error[taskName + '-' + projectName + '-' + fileConf.filename] = true;
							notify.onError({
								title: "Gulp: " + taskName + '-' + fileConf.filename,
								//icon: notifyInfo.icon,
								message: "<%= error.message %>"
							})(err);

							this.emit('end');
						}
					}))
					.pipe(gulpif(fileConf.jshint.enabled, jshint(conf.jshint.options)))
					.pipe(gulpif(fileConf.jshint.enabled, notify(function (file) {
						if (file && (!file.jshint || file.jshint.success)) {
							// Don't show something if success
							return false;
						}

						var errors = file.jshint.results.map(function (data) {
							if (data.error) {
								return "(" + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
							}
						}).join("\n");

						return file.relative + " (" + file.jshint.results.length + " errors)\n" + errors;
					})))
					.pipe(order(fileConf.order.files, fileConf.order.options))
					.pipe(concat(fileConf.filename))
					.pipe(gulp.dest(fileConf.dest))
					.pipe(gulpif(fileConf.minify.enabled, uglify(fileConf.minify.options)))
					.pipe(gulpif(fileConf.minify.enabled, rename(function(path){
						path.basename += ".min";
					})))
					.pipe(plumber.stop())
					.pipe(gulp.dest(fileConf.dest))
					.pipe(notify(function (files) {
						if(global.x4e.tasks.error[taskName + '-' + projectName + '-' + fileConf.filename]){
							delete global.x4e.tasks.error[taskName + '-' + projectName + '-' + fileConf.filename];
							return 'Javascript build back to normal';
						}
						return false;
					}))
			);
		}

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