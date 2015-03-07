var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var rename        = require('gulp-rename');
var uncss         = require('gulp-uncss');
var concat        = require('gulp-concat');

gulp.task('browser-sync', function() {
    browserSync({ server: { baseDir: "./_site" } });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('styles', function() {
  return gulp.src('css/*.css')
  .pipe(concat('s.css'))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  // .pipe(uncss({ html: ['_site/index.html'] }))
  .pipe(gulp.dest('css/prod'));
});

gulp.task('default', ['browser-sync'], function() {
  gulp.watch("css/*.css", ['styles']);
  gulp.watch("./_site/*.html", ['bs-reload']);
  // gulp.watch("./_site/css#<{(|.css", ['bs-reload']);
});
