'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    browserify = require('gulp-browserify'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    jasmine = require('gulp-jasmine'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css');

// Modules for webserver and livereload
var express = require('express'),
    refresh = require('gulp-livereload'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 3000,
    runSequence = require('run-sequence');

// Set up an express server (not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./'));
//this redirects everything back to our index.html
server.all('/*', function(req, res) {
    //Use the unbuilt version, so all you need to do is refresh the page to see changes
    res.sendfile('index.html', { root: './views' });
});

gulp.task('inject', function() {
    var target = gulp.src('./views/index.html');//where to put the necessary assets
    var sources = gulp.src([
        './public/javascripts/*.js', './public/javascripts/**/*.js',//all js in public folder
        './public/stylesheets/*.css', './public/stylesheets/**/*.css'//all css in public folder
    ]);

    return target.pipe(inject(sources))
        .pipe(gulp.dest('./views'));//where to put the index.html after its done
});

//Minify all html for our build (only run this after everything is minified and injected into index.html)
//Then place in dist folder
gulp.task('html', ['clean'], function () {
    gulp.src('views/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./dist'));

});

gulp.task('css', ['clean'], function () {
    return gulp.src('public/stylesheets/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./dist'));
});

//Minify JS files and put them in dist folder
gulp.task('js', ['clean'], function () {
   gulp.src('public/javascripts/*.js')//minify all of the js in public folder
      .pipe(concat('all.js'))
      .pipe(uglify())
      .pipe(gulp.dest('./dist'))//put the new js in the dist folder
});

gulp.task('tests', ['clean'], function() {
    gulp.src('./spec/*.spec.js')
    // gulp-jasmine works on filepaths so you can't use any plugins before it 
    .pipe(jasmine());
});



// Dev task
gulp.task('dev', ['clean', 'static', 'inject', 'js', 'css', 'html'], function() { 
    runSequence('lint', 'tests', function(){});
    
    console.log('Done.');
});



// Clean task
gulp.task('clean', function() {
    gulp.src('./dist/', { read: false }) // much faster
        .pipe(rimraf({force: true}));
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('app/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

//Static content
gulp.task('static', function() {
    gulp.src('public/images/*')
        .pipe(gulp.dest('dist/'));
})

// Browserify task
gulp.task('browserify', function() {
    // Single point of entry (make sure not to src ALL your files, browserify will figure it out)
    gulp.src(['app/scripts/main.js'])
        .pipe(browserify({
        insertGlobals: true,
        debug: false
    }))
    // Bundle to a single file
    .pipe(concat('bundle.js'))
    // Output it to our dist folder
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', ['lint'], function() {
    // Start webserver
    server.listen(serverport);
    // Start live reload
    refresh.listen(livereloadport);

    // Watch our scripts, and when they change run lint and browserify
    gulp.watch(['public/javascripts/*.js', 'public/javascripts/**/*.js'],[
        'lint',
        'browserify'
]);

gulp.watch(['app/**/*.html'], [
    'views'
]);

gulp.watch('./dist/**').on('change', refresh.changed);

});

gulp.task('default', ['dev', 'watch']);