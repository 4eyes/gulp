var configLoader = function (taskName, callback){
	if (global.x4e) {
		var config = global.x4e.config;
		for (var project in config) {
			if (config.hasOwnProperty(project) && config[project].hasOwnProperty(taskName)) {
				callback && callback(project, config[project][taskName]);

			}
		}

	}
};

module.exports = configLoader;