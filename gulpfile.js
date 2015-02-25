var  gulp           = require('gulp'),
     less           = require('gulp-less'),
     cssmin         = require('gulp-minify-css'),
     notify         = require('gulp-notify'),
     path           = require('path'),
     uglify         = require('gulp-uglify'),
     concat         = require('gulp-concat'),
     rename         = require('gulp-rename'),
     plumber        = require('gulp-plumber'),
     webserver      = require('gulp-webserver');


/*
|--------------------------------------------------------------------------
| Error Catching
|--------------------------------------------------------------------------
*/

var onError = function (err) {  
     console.log(err);
     this.emit('end');
};



/*
|--------------------------------------------------------------------------
| Compile Less
|--------------------------------------------------------------------------
*/

gulp.task('less', function() {
     return gulp.src('less/example.less')
          .pipe(plumber({
               errorHandler: onError
          }))
          .pipe(less())
          .pipe(cssmin())
          .pipe(gulp.dest('css'))
          .pipe(notify({ message: 'Less - Done!'}));
});



/*
|--------------------------------------------------------------------------
| Compile Javascript - Production
|--------------------------------------------------------------------------
*/

gulp.task('build', function() {
     return gulp.src('src/sly.js')
          .pipe(plumber({
               errorHandler: onError
          }))
          .pipe(rename('sly.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist'))
          .pipe(notify({ message: 'Build - Done!' }))
});


/*
|--------------------------------------------------------------------------
| Compile Javascript - Production
|--------------------------------------------------------------------------
*/

gulp.task('build:polyfill', function() {
     return gulp.src(['src/polyfills.js','src/sly.js'])
          .pipe(plumber({
               errorHandler: onError
          }))
          .pipe(concat('sly.polyfilled.js'))
          .pipe(rename('sly.polyfilled.min.js'))
          .pipe(uglify())
          .pipe(gulp.dest('dist'))
          .pipe(notify({ message: 'Build - Done!' }))
});



/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/

gulp.task('watch', function() {
     gulp.watch('less/*.less', ['less']);
     gulp.watch('src/*.js', ['build', 'build:polyfill']);
});



/*
|--------------------------------------------------------------------------
| Server
|--------------------------------------------------------------------------
*/

gulp.task('webserver', function() {
     return gulp.src('.')
          .pipe(webserver({
               livereload: true,
               directoryListing: false,
               open: true
          }));
});



/*
|--------------------------------------------------------------------------
| Register Tasks
|--------------------------------------------------------------------------
*/

gulp.task('run', ['webserver','watch']);


