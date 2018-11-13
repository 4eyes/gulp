let gulp = require('gulp');
let gulpif = require('gulp-if');
let plumber = require('gulp-plumber');
let notify = require('gulp-notify');
let sourcemaps = require('gulp-sourcemaps');
let clone = require('gulp-clone');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let rename = require('gulp-rename');
let cssnano = require('cssnano');
let configLoader = require('../helpers/gulp/configLoader');

let taskName = 'css';

configLoader(taskName, function (projectName, conf) {

    global.x4e.tasks.initial.push(taskName + '-' + projectName);
    global.x4e.tasks.watch.push({taskName: taskName + '-' + projectName, options: conf.watch});

    conf.plugins.postcss.processedPlugins = (function (plugins) {
        let out = [];

        for (let i in plugins) {
            if (plugins.hasOwnProperty(i)) {
                out.push(plugins[i]);
            }
        }
        return out;
    })(conf.plugins.postcss.plugins);

    let task = function (done) {
        // Process and minify all SASS files
        let baseProcess = gulp.src(conf.sources)
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

        let processUniminified = baseProcess
            .pipe(clone())
            .pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.write('.')))
            .pipe(plumber.stop())
            .pipe(gulp.dest(conf.dest + '/'))
            .pipe(notify(function () {
                if (global.x4e.tasks.error[taskName + '-' + projectName]) {
                    delete global.x4e.tasks.error[taskName + '-' + projectName];
                    return 'Compass build back to normal';
                }
                return false;
            }))
        ;

        let processMinified = baseProcess
            .pipe(clone())
            .pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.init()))
            .pipe(postcss([cssnano({safe: true})]))
            .pipe(rename(function (path) {
                path.basename += ".min";
            }))
            .pipe(gulpif(conf.plugins.sourcemaps, sourcemaps.write('.')))
            .pipe(plumber.stop())
            .pipe(gulp.dest(conf.dest + '/'))
            .pipe(notify(function () {
                if (global.x4e.tasks.error[taskName + '-' + projectName]) {
                    delete global.x4e.tasks.error[taskName + '-' + projectName];
                    return 'Compass build back to normal';
                }
                return false;
            }))
        ;

        done();

        return [processUniminified, processMinified];
    };

    gulp.task(taskName + '-' + projectName, task);
});
