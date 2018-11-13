let gulp = require('gulp');
let cleaning = require('gulp-initial-cleaning');
let configLoader = require('../helpers/gulp/configLoader');

let taskName = 'clear';

configLoader(taskName, function (projectName, conf) {
    global.x4e.tasks.preInitial.push(taskName + '-' + projectName);

    let task = function (done) {
        cleaning(conf.options);
        done();
    };
    gulp.task(taskName + '-' + projectName, task);
});