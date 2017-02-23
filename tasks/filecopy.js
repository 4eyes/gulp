/*global global*/
var gulp 				= require('gulp');
var configLoader 		= require('../helpers/gulp/configLoader');

var taskName = 'filecopy';

configLoader(taskName, function(projectName, conf){
	global.x4e.tasks.initial.push(taskName + '-' + projectName);
	global.x4e.tasks.watch.push({taskName : taskName + '-' + projectName, options: conf.watch});

	var task = function () {
        var tasks = [];
        for (var bundle in conf.bundles) {
            if (conf.bundles.hasOwnProperty(bundle)) {
                var bundleConf = conf.bundles[bundle];
                tasks.push(gulp.src(bundleConf.sources)
                    .pipe(gulp.dest(bundleConf.dest))  // Export
                );
            }
        }
        return tasks;
	};

	gulp.task(taskName + '-' + projectName, task);
});