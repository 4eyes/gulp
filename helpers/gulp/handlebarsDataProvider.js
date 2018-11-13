let fs = require('fs');
let handlebarsDataProvider = function (projectName, conf) {
    let DefaultTemplateData = {
        init: function (conf) {
            let templateData = {};
            for (let property in this.Data) {
                if (this.Data.hasOwnProperty(property)) {
                    if (templateData.hasOwnProperty(property)) {
                        templateData[property] = this.Data[property](conf[property], projectName);
                    }
                }
            }
            return templateData;
        },
        Data: {
            pages: function (conf) {
                let files = fs.readdirSync(conf.path);
                let out = [];
                for (let i in files) {
                    if (files.hasOwnProperty(i)) {
                        let isToExclude = false;
                        for (let k in conf.exclude) {
                            if (conf.exclude.hasOwnProperty(k)) {
                                if (files[i].match(conf.exclude[k]) !== null) {
                                    isToExclude = true;
                                }
                            }
                        }
                        if (!isToExclude) {
                            let htmlfile = files[i].replace(/hbs$/g, 'html');
                            out.push({file: htmlfile});
                        }
                    }
                }

                return out;
            },
            projectName: function (conf, projectName) {
                return projectName;
            }
        }
    };

    return DefaultTemplateData.init(conf);
};

module.exports = handlebarsDataProvider;