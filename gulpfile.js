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
    sass = require('gulp-sass');

//take our JS inside app/public/javascripts, minify them, and place them in app/build
gulp.task('minifyjs', function() {

    return gulp.src('./app/public/javascripts/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./app/build'));
});

//same as minifyjs, except for bower_components
// gulp.task('wiredep', function () {
//     var wiredep = require('wiredep');
//     var options = {
//         ignorePath: '..'
//     }
    
//     var target = gulp.src('./app/index.html');
//     var js = gulp.src(wiredep().js);
//     //var css = gulp.src(wiredep(options).css);

//     return target
//         .pipe(inject(js.pipe(concat('bower.js'))))
//         .pipe(gulp.dest('./app'));
//         //.pipe(inject(css.pipe(concat('bower.css')).pipe(gulp.dest('./styles'))))
// });    

//grab all minified js files from app/ and bower_components/ and combine into one all.js file, put it in ./app
gulp.task('concatjs', function() {

    var source = gulp.src('./app/build/*.min.js', {read: false});

    return source
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('./app'));
});

//Separate task for minifying app.js and placing inside /dist/
gulp.task('minify-appjs', function() {
    var source = './app/app.js';

    return gulp.src(source)
        .pipe(uglify())
        .pipe(gulp.dest('./app'))
});

//take the minified and combined all.min.js file and inject it into index.html, 
//then put index.html into /dist/ 
gulp.task('injectjs', function() {
    var source = gulp.src('./app/build/all.min.js');
    var target = gulp.src('./app/index.html');

    return target
        .pipe(inject(source, {ignorePath: 'app'}))
        .pipe(gulp.dest('./app'));
});

// gulp.task('minifycss', function() {
//     var source = gulp.src('app/public/stylesheets/**/*.css');

//     return source
//         .pipe(rename('styles.min.css'))
//         .pipe(cleanCSS({compatibility: 'ie8'}))
//         .pipe(gulp.dest('./app'));
// });

// //SAME as above JS files, but for css. more files will be aded to this, once we have our own styles
// gulp.task('concatcss', function() {
//     var files = gulp.src('./bower_components/**/*.scss');

//     return files
//         .pipe(sass().on('error', sass.logError))
//         .pipe(concat('styles.css'))
//         .pipe(gulp.dest('./app/public/stylesheets'));
// });

// gulp.task('injectcss', function() {
//     var target = gulp.src('./app/index.html');
//     var source = gulp.src('app/styles.css');

//     return target
//         .pipe(inject(source), {ignorePath: 'app'})
//         .pipe(gulp.dest('./dist'));
// });

//run dev server
gulp.task('dev-server', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
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

    //No SCSS yet, but we might want -- this will automatically recompile and inject changed SCSS files

    // SASS/CSS change + prints log in console
    // On SASS change, call and run task 'sass'
    // gulp.watch('sass/*.scss', ['sass']).on('change', function(file) {
    //     livereload.changed(file.path);
    //     gutil.log(gutil.colors.yellow('CSS changed' + ' (' + file.path + ')'));
    // });
});

//Runs Jasmine unit tests inside of specs/ and determines code coverage.
//Puts code coverage results inside a new reports/ directory.
gulp.task('tests', function() {
    return gulp.src('specs/*.spec.js')
        .pipe(cover.instrument({
            pattern: ['app/**/*.js'],
            debugDirectory: 'debug'
        }))
        .pipe(jasmine())
        .pipe(cover.gather())
        .pipe(cover.format())
        .pipe(gulp.dest('reports'));
});


// Dev task. Ordering of these tasks in this array is CRITICAL.
gulp.task('dev', function() { 
    runSequence(
        'clean', 
        'static', 
        'minify-appjs',
        'minifyjs',
        'concatjs',
        'injectjs',
        //'wiredep',
        // 'minifycss',
        // 'concatcss',
        // 'injectcss',
        'lint',
        'tests'
    );
});


// Deletes the dist folder and the minified and compiled allbower.js file in app/public/javascripts
gulp.task('clean', function() {
    return gulp.src(['./dist/', './app/public/javascripts/allbower.*'], { read: false }) // much faster
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


