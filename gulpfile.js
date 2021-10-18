
var gulp = require('gulp'), //GULP
    mjml = require('gulp-mjml'), //GULP MJML
    mjmlEngine = require('mjml'),
    browserSync = require("browser-sync").create();

var pastaDev = ['news-dev/**/*.mjml']; // Caminho Dev
var pastaProd = ['news-prod/**/*.html']; // Caminho Prod

function reload() {
  browserSync.reload();
}

function news(){
  return gulp
  .src(pastaDev)
  .pipe(mjml()) 
  // .pipe(mjml(mjmlEngine, {minify: true})) // MIMIFICAR
  .pipe(gulp.dest('./news-prod'))
}

function serve(){
  browserSync.init( pastaProd , {
    server: {
      baseDir :'news-prod'
    }
  })
}

function watch(){
  return gulp
  .watch(pastaDev, news);
}

var build = gulp.parallel(news, watch, serve);

gulp.task('default', build);
