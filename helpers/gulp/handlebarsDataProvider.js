var fs = require('fs');
var extend = require('extend');

var handlebarsDataProvider = function (projectName, conf) {
    var DefaultTemplateData = {
        init: function (conf) {
            var templateData = conf.templateData;
            for (var property in this.Data) {
                templateData[property] = this.Data[property](conf.handlebarsDataProvider[property], projectName);
            }
            return templateData;
        },
        Data: {
            pages: function (conf) {
                var files = fs.readdirSync(conf.path);
                var out = [];
                for (var i in files) {
                    var isToExclude = false;
                    for (var k in conf.exclude) {
                        if (files[i].match(conf.exclude[k]) !== null) {
                            isToExclude = true;
                        }
                    }
                    if (!isToExclude) {
                        var htmlfile = files[i].replace(/hbs$/g, 'html');
                        out.push({file: htmlfile});
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