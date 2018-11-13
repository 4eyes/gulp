let gulp = require('gulp');
let configLoader = require('../helpers/gulp/configLoader');

let taskName = 'filecopy';

configLoader(taskName, function (projectName, conf) {
    global.x4e.tasks.initial.push(taskName + '-' + projectName);
    global.x4e.tasks.watch.push({taskName: taskName + '-' + projectName, options: conf.watch});

    let task = function (done) {
        let tasks = [];
        for (let bundle in conf.bundles) {
            if (conf.bundles.hasOwnProperty(bundle)) {
                let bundleConf = conf.bundles[bundle];
                tasks.push(gulp.src(bundleConf.sources)
                    .pipe(gulp.dest(bundleConf.dest))  // Export
                );
            }
        }

        done();

        return tasks;
    };

    gulp.task(taskName + '-' + projectName, task);
});