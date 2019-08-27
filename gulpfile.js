
var gulp = require('gulp'); //GULP
var mjml = require('gulp-mjml'); //GULP MJML

var mjmlEngine = require('mjml');

var browserSync =require('browser-sync'); // BROWSER SYNC
var reload 		= browserSync.reload;


// Caminho Dev
var pastaDev = ['news-dev/**/*.mjml'];

// Caminho Prod
var pastaProd = ['news-prod/**/*.html'];

gulp.task('news', function () {
  return gulp.src(pastaDev)
    // .pipe(mjml()) 
    .pipe(mjml(mjmlEngine, {minify: true})) // MIMIFICAR
    .pipe(gulp.dest('./news-prod'))
});


gulp.task('serve', function() {
  browserSync.init( pastaProd , {
    server: {
      baseDir :'news-prod'
    }
  })
});


gulp.task('watch', function(){
   gulp.watch(pastaDev, ['news']);
});


gulp.task('default', ['news', 'watch', 'serve']);
