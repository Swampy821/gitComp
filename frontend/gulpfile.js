var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
gulp.task('default',['js','css', 'copy']);


gulp.task('js', function() {
  gulp.src(
  	['./dev/js/app.js', 
  	 './dev/js/Controllers/home.js', 
     './dev/js/Controllers/nav.js',
     './dev/js/Controllers/mainApp.js',
     './dev/js/Controllers/windowShows.js',
  	 './dev/material/js/material.min.js', 
  	 './dev/material/js/ripples.min.js'])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./build/'))
});


gulp.task('css', function() {
  gulp.src('./dev/css/style.less')
    .pipe(less())
    .pipe(gulp.dest('./dev/css'));

  gulp.src(
  	['./dev/material/css/material-wfont.min.css', 
  	 './dev/material/css/material.min.css', 
  	 './dev/material/css/ripples.min.css',
     './dev/css/style.css'])
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('copy', function() {
  gulp.src('dev/index.html')
    .pipe(gulp.dest('build'));
});