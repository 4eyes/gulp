let gulp         = require('gulp');
let svgmin       = require('gulp-svgmin');
let svgstore     = require('gulp-svgstore');
let inject       = require('gulp-inject');
let configLoader = require('../helpers/gulp/configLoader');

let taskName = 'icons';

configLoader(taskName, function(projectName, conf) {
    let inlineIconsTask = function () {
        let svgs = gulp
            .src(conf.source)
            .pipe(svgmin(conf.svgmin))
        ;
        let storedSvgs = svgs
            .pipe(svgstore(conf.svgstore))
        ;

        function fileContents (filePath, file) {
            return file.contents.toString();
        }

        return gulp
            .src(conf.htmlSource)
            .pipe(inject(storedSvgs, { transform: fileContents }))
            .pipe(gulp.dest(conf.dest), {base: './'})
            ;
    };
    let svgTask = function () {
        return gulp
            .src(conf.source)
            .pipe(svgstore())
            .pipe(gulp.dest(conf.destSvg + '/'))
    };

    gulp.task(taskName + '-inline-' + projectName, inlineIconsTask);
    gulp.task(taskName + '-svg-' + projectName, svgTask);
});