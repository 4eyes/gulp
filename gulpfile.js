/* Defining global path variables */
gulpPath = __dirname + '/';
modulesPath = __dirname + '/node_modules/';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

global.x4e = {
	config: {
	},
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
requireDir('./helpers', { recurse: true });

//Load all project configurations
requireDir('./../src/_config', { recurse: false });

//Load all tasks configurations
requireDir('./tasks', { recurse: false });


// Rerun the task when a file changes
gulp.task("watch", function() {
	var tasks = global.x4e.tasks.watch;

	tasks.forEach(function(task) {
		gulp.watch(task.options, [task.taskName]);
	});
});

gulp.task('default', function(cb) {
	global.x4e.tasks.postInitial.push('watch');

	var sequences = ['preInitial', 'initial', 'postInitial'],
		args = []
		;
	//Push registered tasks to args array, if they are not empty
	for (var i = 0; i < sequences.length; i++) {
		if (global.x4e.tasks.hasOwnProperty(sequences[i]) && global.x4e.tasks[sequences[i]].length) {
			args.push(global.x4e.tasks[sequences[i]]);
		}
	}
	//Add multiple tasks at the end of args array
	Array.prototype.push.apply(args, ['watch', cb]);
	//Call runSequence with args as argument array
	runSequence.apply(this, args);
});