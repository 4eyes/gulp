let gulp = require('gulp');
let gulpif = require('gulp-if');
let replaceExt = require('replace-ext');
let tap = require('gulp-tap');
let handlebars = require('gulp-hb');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify');
let rename = require('gulp-rename');
let w3cjs = require('gulp-w3cjs');
let through2 = require('through2');
let _ = require('lodash');
let fs = require('fs');
let requireNew = require('import-fresh');
let configLoader = require('../helpers/gulp/configLoader');

let taskName = 'handlebars';

configLoader(taskName, function (projectName, conf) {
    global.x4e.tasks.initial.push(taskName + '-' + projectName);
    global.x4e.tasks.watch.push({taskName: taskName + '-' + projectName, options: conf.watch});

    let task = function () {
        return gulp.src(conf.source)
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
            .pipe(tap(function (file) {
                let dataFile = replaceExt(file.path, '.data.js'),
                    data = _.cloneDeep(conf.data.default)
                ;

                try {
                    fs.accessSync(dataFile, fs.constants.R_OK);
                    data = _.merge(data, requireNew(dataFile));
                } catch (e) {
                }

                // Save data by file name
                file.data = data;
            }))
            .pipe(handlebars(_.merge({
                partials: conf.partials,
                helpers: conf.helpers
            }, conf.options)))
            .pipe(rename(function (path) {
                path.extname = '.html';
            }))
            .pipe(plumber.stop())
            .pipe(gulp.dest(conf.dest))
            .pipe(plumber())
            .pipe(gulpif(conf.htmlvalidator.enabled, w3cjs(conf.htmlvalidator.options)))
            .pipe(gulpif(conf.htmlvalidator.enabled, through2.obj(function (file, enc, cb) {
                cb(null, file);
                if (!file.w3cjs.success) {
                    file.pipe(notify('HTML validation error(s) found'));
                }
            })))
            .pipe(plumber.stop())
            .pipe(notify(function () {
                if (global.x4e.tasks.error[taskName + '-' + projectName]) {
                    delete global.x4e.tasks.error[taskName + '-' + projectName];
                    return 'Handlebars build back to normal';
                }
                return false;
            }))
            ;
    };

    gulp.task(taskName + '-' + projectName, task);
});