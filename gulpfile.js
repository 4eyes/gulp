var gulp = require('gulp');
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
	var tasks = ([])
		.concat(global.x4e.tasks.preWatch)
		.concat(global.x4e.tasks.watch)
		.concat(global.x4e.tasks.postWatch);
	tasks.forEach(function(task) {
		gulp.watch(task.options, [task.taskName]);
	});
});

gulp.task('default', (global.x4e.tasks.preInitial)
		.concat(global.x4e.tasks.initial)
		.concat(global.x4e.tasks.postInitial)
		.concat(["watch"])
);

//gulp.task('initial', ['compass', 'handlebars', 'img-min']);