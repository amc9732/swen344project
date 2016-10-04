'use strict';

//Gulp and its plugins
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    jasmine = require('gulp-jasmine'),
    cover = require('gulp-coverage'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload'),
    gutil = require('gulp-util'),
    rename = require('gulp-rename'),
    mainBowerFiles = require('gulp-main-bower-files'),
    nodemon = require('gulp-nodemon');

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
});

gulp.task('buildroutes', function() {
    return gulp.src('app/routes/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/routes'))
});

gulp.task('buildappjs', function() {
    return gulp.src(['app/app.js', 'app/config.js'])
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
        .pipe(gulp.dest('dist'));
});

gulp.task('injectcss', function() {
    var target = gulp.src('dist/index.html');

    return target
        .pipe(inject(gulp.src('dist/styles.min.css', {read: false}), {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'));
});

//run local dev server on dist/ folder
gulp.task('dev-server', function () {
  nodemon({
    script: 'dist/app.js',
    ext: 'js html css',
    env: { 'NODE_ENV': 'development' }
  })
});

//Set Node environment to development
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

//Just threw this in here in case we want to test on production.
gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
});

gulp.task('rebuild', function() {
    runSequence(
        'set-dev-node-env',
        'minifyjs',
        'injectjs',
        'wiredep',
        'buildappjs',
        'buildbower',
        'buildroutes',
        'minifycss',
        'injectcss'
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
             pattern: ['app/**/*.js']
        //     debugDirectory: 'debug'
         }))
        .pipe(jasmine())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});


// Dev task. The order these tasks is CRITICAL, please don't change without a group discussion.
gulp.task('dev', function() { 
    runSequence(
        'set-prod-node-env',
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
    return gulp.src(['./dist/', 'app/styles.min.css', 'app/bundle.min.js'], { read: false }) // much faster
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


