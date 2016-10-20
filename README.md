![Current Version](https://img.shields.io/badge/version-1.9.8-green.svg)
# Gulp - Frontend build process

This is the frontend build process stack by 4eyes GmbH based on [Gulp](https://github.com/gulpjs/gulp)
This project features several configurable tasks which are based on NodeJS

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites
#### NodeJS
To use gulp you need a current version of NodeJS available from https://nodejs.org/
#### Gulp
After installing NodeJS use following command to install gulp on your system
```bash
npm install -g gulp
```
### Installing

#### Install 4eyes gulp project
clone the project or better add the project as submodule to your current git project: 
```bash
git submodule add https://github.com/4eyes/gulp.git
```
change to the gulp directory
```bash
cd gulp
```
execute following command to resolve further dependencies
```bash
npm install
```

## Features
- compass build
- handlebars build with integrated w3c validator check
- image minify
- javascript concatenation and minify
- javascript code quality check via jshint
- supports multiple gulp processes in one project
- css inliner for newsletter
- newsletter testing via litmus api
- desktop notifications on build error (gulp-notify)
- all features are full customizable in configuration file

## Contributing

Feel free to provide pull request which implement a new feature or fixes a bug.


## Authors

* **Alessandro Bellafronte** - [alebell](https://github.com/alebell)

See also the list of [contributors](https://github.com/4eyes/x4ebase/contributors) who participated in this project.


## License

This project is licensed under the GNU General Public License
The GNU General Public License can be found at
http://www.gnu.org/copyleft/gpl.html