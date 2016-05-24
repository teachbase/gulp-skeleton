var gulp = require('gulp');
var browserSync = require("browser-sync");
var reload = browserSync.reload;

function config(dir){
  return {
    server: {
      baseDir: ['./', dir]
    },
    host: 'localhost',
    port: 4242
  };
};

gulp.task('html', function() {
  var jade = require('gulp-jade');
  var useref = require('gulp-useref');

  return gulp.src('src/**/*.jade')
    .pipe(jade({pretty: true}))
    .pipe(useref({searchPath: './'}))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('styles', function () {
  var postcss    = require('gulp-postcss');
  var sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/styles/main.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('autoprefixer'),
      require('cssnext'),
      require('precss')
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build'))
    .pipe(reload({stream: true}));
});

gulp.task('serve', ['build'], function() {
   browserSync(config('./build'));
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.jade', ['html']);
  gulp.watch('src/**/*.css', ['styles']);
});

gulp.task('clean', function(){
  var del = require('del');
  return del([
    './build/**/*',
    './production/**/*'
  ]);
});

gulp.task('build', ['clean', 'styles', 'html']);
gulp.task('default', ['build', 'serve', 'watch']);