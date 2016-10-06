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
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    notify = require('gulp-notify'),
    htmlmin = require('gulp-htmlmin');

//Inject everything inside app/js into index.html
gulp.task('injectjs', function() {
    var source = gulp.src('./app/js/**/*.js');
    var target = gulp.src('./app/index.html');

    return target
        .pipe(inject(source, {ignorePath: 'app'}))
        .pipe(gulp.dest('app'));
});
//Inject everything inside app/css into index.html
gulp.task('injectcss', function() {
    var source = gulp.src('app/css/**/*.css')
    var target = gulp.src('app/index.html');

    return target
        .pipe(inject(source, {ignorePath: 'app'}))
        .pipe(gulp.dest('app'));
});
//Inject all bower_components into index.html
gulp.task('wiredep', function () {
    var wiredep = require('wiredep').stream;    
    gulp.src('app/index.html')
        .pipe(wiredep({ignorePath: '..'}))
        .pipe(gulp.dest('app'))
});

//Build the project completely into a dist/ folder for deployment
//Same as the tasks above
gulp.task('minifyjs', function() {
    return gulp.src('./app/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest('dist'));
});
gulp.task('buildjs', function() {
    var source = gulp.src('dist/bundle.min.js');
    var target = gulp.src('app/index.html');
    return target
        .pipe(inject(source, {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('minifycss', function() {
    return gulp.src('./app/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest('dist'));
});
gulp.task('buildcss', function() {
    var source = gulp.src('dist/styles.min.css');
    var target = gulp.src('dist/index.html');
    return target
        .pipe(inject(source, {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('minifyroutes', function() {
    return gulp.src('./app/routes/**/*.js')
        .pipe(uglify())
        .pipe(concat('routes.min.js'))
        .pipe(gulp.dest('dist/routes'));
});
gulp.task('buildroutes', function() {
    var source = gulp.src('dist/routes/routes.min.js');
    var target = gulp.src('dist/index.html');
    return target
        .pipe(inject(source, {ignorePath: 'dist'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('buildappjs', function() {
    return gulp.src('app/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('buildconfigjs', function() {
    return gulp.src('app/config.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});
gulp.task('addbowerdist', function() {
    return gulp.src('./bower.json')
        .pipe(mainBowerFiles())
        .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('wiredepprod', function() {
    var wiredep = require('wiredep').stream;    
    gulp.src('dist/index.html')
        .pipe(wiredep({ignorePath: '..'}))
        .pipe(gulp.dest('dist'));
});
gulp.task('minifyhtml', function() {
    return gulp.src('app/templates/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/templates'));
});
gulp.task('server', function() {
    //runSequence('set-prod-node-env');
    livereload.listen();
    nodemon({
        script: 'app/app.js',
        ext: 'js html css'
    }).on('restart', function(){
        // when the app has restarted, run livereload.
        gulp.src('app/app.js')
        .pipe(livereload())
    });
});
//Running `gulp` will initially start the server, run the necessary tasks in sequence,
//and continue to "listen" for changes, so once you save changes it'll restart the server automatically.
//NOTE: This runs development build by default, for testing changes locally.
//To run the prod version locally, you need to go to package.json and inside "scripts", change
//"NODE_ENV=production node app.js" to "NODE_ENV=production node dist/app.js"
gulp.task('default', function() {
    runSequence(
        'set-dev-node-env',
        'lint',
        'injectjs',
        'injectcss',
        'wiredep',
        'server'
    );
});
//This task deletes the dist folder, runs linter and unit tests.
//It then minifies everything, injects the minified files, and puts it in a new dist/ folder.
gulp.task('buildapp', function() {
    runSequence(
        'clean',
        'lint',
        'tests',
        'minifyjs',
        'buildjs',
        'minifycss',
        'buildcss',
        'minifyroutes',
        'buildroutes',
        'buildappjs',
        'buildconfigjs',
        'addbowerdist',
        'wiredepprod',
        'minifyhtml'
    );
});
//Set Node environment to development
gulp.task('set-dev-node-env', function() {
    return process.env.NODE_ENV = 'development';
});

//Just threw this in here in case we want to test on production.
gulp.task('set-prod-node-env', function() {
    return process.env.NODE_ENV = 'production';
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

gulp.task('clean', function() {
    return gulp.src(['./dist/'], { read: false }) // much faster
        .pipe(rimraf({force: true}));
});

// linter task
gulp.task('lint', function() {
    return gulp.src(['app/js/*.js', 'app/js/**/*.js', 'spec/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

// Minifies any images if possible, and puts it inside /dist/ folder
gulp.task('static', function() {
    return gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images/'));
});




