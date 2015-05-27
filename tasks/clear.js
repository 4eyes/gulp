var gulp 			= require('gulp');
var cleaning 		= require('gulp-initial-cleaning');
var configLoader 	= require('../helpers/gulp/configLoader');

var taskName = 'clear';

configLoader(taskName, function(projectName, conf){
	cleaning(conf.options);
});