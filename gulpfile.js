/* Defining global path variables */
gulpPath = __dirname;
modulesPath = __dirname + '/node_modules/';

let gulp = require('gulp');
let requireDir = require('require-dir');

global.x4e = {
    config: {},
    handlebars: {
        helpers: {}
    },
    tasks: {
        preInitial: [],
        initial: [],
        postInitial: [],
        watch: [],
        error: []
    }
};

//Load all helpers
requireDir('./helpers', {recurse: true});

//Load all project configurations
requireDir('./../src/_config', {recurse: false});

//Load all tasks configurations
requireDir('./tasks', {recurse: false});


// Rerun the task when a file changes
gulp.task('==== watch ====', function () {
    let tasks = global.x4e.tasks.watch;

    tasks.forEach(function (task) {
        gulp.watch(task.options, gulp.series(task.taskName));
    });
});

gulp.task('==== preInitial ====', function (done) {
    let args = [];
    if (global.x4e.tasks.preInitial.length > 0) {
        args = global.x4e.tasks.preInitial;
        return gulp.parallel(args)(done);
    } else {
        done();
    }
});

gulp.task('==== initial ====', function (done) {
    let args = [];
    if (global.x4e.tasks.initial.length > 0) {
        args = global.x4e.tasks.initial;
        gulp.parallel(args)(done);
    } else {
        done();
    }
});

gulp.task('==== postInitial ====', function (done) {
    let args = [];
    if (global.x4e.tasks.postInitial.length > 0) {
        args = global.x4e.tasks.postInitial;
        gulp.parallel(args)(done);
    } else {
        done();
    }
});

gulp.task('default', gulp.series('==== preInitial ====', '==== initial ====', '==== postInitial ====', '==== watch ===='));