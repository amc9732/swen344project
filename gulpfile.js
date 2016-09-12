var gulp = require('gulp');
var inject = require('gulp-inject');
var concatCss = require('gulp-concat-css');//combines all css together into 1 file
var cleanCSS = require('gulp-clean-css');//minifies the file from concatCSS into 1 line for speed
var concatJS = require('gulp-concat-js');
var uglify = require('gulp-uglify');
var pump = require('pump');
var sourcemaps = require('gulp-sourcemaps');
 
gulp.task('minifyjs', function (cb) {
  
	var files = [
		'./src/js/*.js',//path is relative to gulpfile.js (this file)
		'./bower_components/**/*.min.js',
		'./bower_components/bootstrap/dist/js/*.min.js'
	];

	pump([
			gulp.src(files),
			uglify(),
			gulp.dest('tmp')
		],
		cb//callback to signify completion
	);
});

gulp.task('concatjs', function(cb) {

    gulp.src('./tmp/*.js')
    	.pipe(sourcemaps.init())
		.pipe(concatJS('app.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('./src'))

	cb
});
