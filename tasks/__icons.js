let gulp         = require('gulp');
let plumber 	 = require('gulp-plumber');
let notify 		 = require('gulp-notify');
let svgmin       = require('gulp-svgmin');
let svgstore     = require('gulp-svgstore');
let inject       = require('gulp-inject');
let configLoader = require('../helpers/gulp/configLoader');

let taskName = 'icons';

configLoader(taskName, function(projectName, conf) {

    let task = function () {
        let svgs = gulp
            .src(conf.source)
            .pipe(svgmin(conf.svgmin))
            .pipe(svgstore(conf.svgstore))
        ;

        function fileContents (filePath, file) {
            return file.contents.toString();
        }

        return gulp
            .src(conf.htmlSource)
            .pipe(inject(svgs, { transform: fileContents }))
            .pipe(gulp.dest(conf.dest), {base: './'})
        ;
    };

    gulp.task(taskName + '-' + projectName, task);
});