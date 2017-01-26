var gulp 			= require('gulp');
var gulpif 			= require('gulp-if');
var plumber 		= require('gulp-plumber');
var notify 			= require('gulp-notify');
var sourcemaps 		= require('gulp-sourcemaps');
var clone			= require('gulp-clone');
var sass 			= require('gulp-sass');
var postcss			= require('gulp-postcss');
var rename 			= require('gulp-rename');
var csso 			= require('gulp-csso');
var configLoader 	= require('../helpers/gulp/configLoader');
var cssnano			= require('cssnano');

var taskName = 'css';

configLoader(taskName, function(projectName, conf) {

	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName: taskName + '-' + projectName, options: conf.watch});

	conf.plugins.postcss.processedPlugins = (function (plugins) {
		var out = [];

		for (var i in plugins) {
			if (plugins.hasOwnProperty(i)) {
				out.push(plugins[i]);
			}
		}
		return out;
	})(conf.plugins.postcss.plugins);

	var task = function () {
		// Process and minify all SASS files
		var baseProcess =  gulp.src(conf.sources)
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
			.pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.init()))
			.pipe(sass(conf.plugins.sass.options))
			.pipe(postcss(conf.plugins.postcss.processedPlugins, conf.plugins.postcss.options))
		;

		var processUniminified = baseProcess
			.pipe(clone())
			.pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.write('.')))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.dest + '/'))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Compass build back to normal';
				}
				return false;
			}))
		;

		var processMinified = baseProcess
			.pipe(clone())
			.pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.init()))
			.pipe(postcss([cssnano({safe: true})]))
			.pipe(rename(function (path) {
				path.basename += ".min";
			}))
			.pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.write('.')))
			.pipe(plumber.stop())
			.pipe(gulp.dest(conf.dest + '/'))
			.pipe(notify(function (files) {
				if(global.x4e.tasks.error[taskName + '-' + projectName]){
					delete global.x4e.tasks.error[taskName + '-' + projectName];
					return 'Compass build back to normal';
				}
				return false;
			}))
		;

		return [processUniminified, processMinified];
	};

	gulp.task(taskName + '-' + projectName, task);
});
