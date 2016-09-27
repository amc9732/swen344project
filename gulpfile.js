'use strict';

//Gulp and its plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    autoprefixer = require('gulp-autoprefixer'),
    jasmine = require('gulp-jasmine'),
    cover = require('gulp-coverage'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    mainBowerFiles = require('gulp-main-bower-files')

//take our JS inside app/public/javascripts, minify them, and place them in dist
gulp.task('minifyjs', function() {

    return gulp.src('./app/public/javascripts/**/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('dist'))
});

//take the minified and combined all.min.js file and inject it into index.html, 
//then put index.html into /dist/ 
gulp.task('injectjs', function() {
    var source = gulp.src('./dist/bundle.min.js');
    var target = gulp.src('./app/index.html');

    return target
        .pipe(inject(source, {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('app'));//put it both places so we can see it in app/index.html too
});

gulp.task('buildroutes', function() {
    return gulp.src('app/routes/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/routes'))
});

gulp.task('buildappjs', function() {
    return gulp.src('app/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('buildbower', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('dist/bower_components'))
});

//same as minifyjs, except for bower_components
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;    
    gulp.src('app/index.html')
        .pipe(wiredep({ignorePath: '..'}))
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('dist'));
});

gulp.task('minifycss', function() {
    var source = gulp.src('app/public/stylesheets/**/*.css');

    return source
        .pipe(rename('styles.min.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('dist'));
});

gulp.task('injectcss', function() {
    var target = gulp.src('dist/index.html');

    return target
        .pipe(inject(gulp.src('app/styles.min.css', {read: false}), {ignorePath: 'app'}))
        .pipe(gulp.dest('app'))
        .pipe(gulp.dest('dist'));
});

//run dev server
gulp.task('dev-server', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('rebuild', function() {
    runSequence(
        'minifyjs',
        'injectjs',
        'wiredep',
        'buildappjs',
        'buildbower',
        'buildroutes',
        'minifycss',
        'injectcss',
        'dev-server'
    );
});

// Watch task, which listens for changes to anything files/folders you give it (currently only JS), and then outputs
// to console any changes that occur
gulp.task('watch', function () {
    
    livereload.listen();

    // Javascript change + prints log in console
    gulp.watch('./app/public/javascripts/**/*.js').on('change', function(file) {
        livereload.changed(file.path);
        gutil.log(gutil.colors.yellow('JS changed' + ' (' + file.path + ')'));
    });
});

//Runs Jasmine unit tests inside of app/specs/ and determines code coverage.
//Puts code coverage results inside a new reports/ directory.
gulp.task('tests', function() {
    return gulp.src('app/specs/*.spec.js')
        .pipe(cover.instrument({
            pattern: ['app/**/*.js'],
            debugDirectory: 'debug'
        }))
        .pipe(jasmine())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});


// Dev task. The order these tasks is CRITICAL, please don't change without a group discussion.
gulp.task('dev', function() { 
    runSequence(
        'clean', 
        'static', 
        'minifyjs',
        'injectjs',
        'wiredep',
        'buildappjs',
        'buildbower',
        'buildroutes',
        'minifycss',
        'injectcss',
        'lint',
        'tests',
        'dev-server'
    );
});


// Deletes the dist folder and the minified and compiled allbower.js file in app/public/javascripts
gulp.task('clean', function() {
    return gulp.src(['./dist/', 'app/styles.min.css'], { read: false }) // much faster
        .pipe(rimraf({force: true}));
});

// linter task
gulp.task('lint', function() {
    return gulp.src(['app/javascripts/*.js', 'app/javascripts/**/*.js', 'spec/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Minifies any images if possible, and puts it inside /dist/ folder
gulp.task('static', function() {
    return gulp.src('app/public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/public/images/'));
});

//'default' is the task that is run if one just runs "gulp" without specifying a task.
gulp.task('default', ['dev']);


