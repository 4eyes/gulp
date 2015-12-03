var gulp 				= require('gulp');
var plumber 			= require('gulp-plumber');
var notify 				= require('gulp-notify');
var configLoader 		= require('../helpers/gulp/configLoader');

var taskName = 'filecopy';

configLoader(taskName, function(projectName, conf){
	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName : taskName + '-' + projectName, options: conf.watch});

	var task = function () {
        var tasks = [];
        for (var name in conf.bundles) {
            var bundleConf = conf.bundles[name];
            tasks.push(gulp.src(bundleConf.sources)
                    .pipe(plumber({
                        errorHandler: function (err) {
                            global.x4e.tasks.error[taskName + '-' + name + '-' + projectName] = true;
                            notify.onError({
                                title: "Gulp: " + taskName + '-' + name,
                                //icon: notifyInfo.icon,
                                message: "<%= error.message %>"
                            })(err);

                            this.emit('end');
                        }
                    }))
                    .pipe(plumber.stop())
                    .pipe(gulp.dest(bundleConf.dest))  // Export
                    .pipe(notify(function (files) {
                        if(global.x4e.tasks.error[taskName + '-' + name + '-' + projectName]){
                            delete global.x4e.tasks.error[taskName + '-' + name + '-' + projectName];
                            return 'Filecopy build back to normal';
                        }
                        return false;
                    }))
            );
        }
        return tasks;
	}

	gulp.task(taskName + '-' + projectName, task);
});