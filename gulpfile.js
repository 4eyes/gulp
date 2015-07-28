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
		preWatch: [],
		watch: [],
		postWatch: [],
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

	//We have to implement this ugly solution because the runSequence method doesn't allow empty parameters at the currently.
	if (global.x4e.tasks.preInitial.length && global.x4e.tasks.initial.length && global.x4e.tasks.postInitial.length) {
		runSequence(global.x4e.tasks.preInitial, global.x4e.tasks.initial, global.x4e.tasks.postInitial, 'watch', cb);
	}
	else if (global.x4e.tasks.initial.length && global.x4e.tasks.postInitial.length) {
		runSequence(global.x4e.tasks.initial, global.x4e.tasks.postInitial, 'watch', cb);
	}
	else if (global.x4e.tasks.preInitial.length && global.x4e.tasks.postInitial.length) {
		runSequence(global.x4e.tasks.preInitial, global.x4e.tasks.postInitial, 'watch', cb);
	}
	else if (global.x4e.tasks.preInitial.length && global.x4e.tasks.initial.length) {
		runSequence(global.x4e.tasks.preInitial, global.x4e.tasks.initial, 'watch', cb);
	}
	else if (global.x4e.tasks.preInitial.length) {
		runSequence(global.x4e.tasks.preInitial, 'watch', cb);
	}
	else if (global.x4e.tasks.initial.length) {
		runSequence(global.x4e.tasks.initial, 'watch', cb);
	}
	else if (global.x4e.tasks.postInitial.length) {
		runSequence(global.x4e.tasks.postInitial, 'watch', cb);
	}
});