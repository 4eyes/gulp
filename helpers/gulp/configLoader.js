let configLoader = function (taskName, callback){
	if (global.x4e) {
        let config = global.x4e.config;
		for (let project in config) {
			if (config.hasOwnProperty(project) && config[project].hasOwnProperty(taskName)) {
				callback && callback(project, config[project][taskName]);

			}
		}

	}
};

module.exports = configLoader;