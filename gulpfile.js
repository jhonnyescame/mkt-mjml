var gulp = require("gulp"),
    mjml = require('gulp-mjml'), //GULP MJML
    mjmlEngine = require('mjml'),
    browserSync = require("browser-sync").create();


var paths = {
    styles: {
        // CAMINHO DEV
        pastaDev: "news-dev/**/*.mjml",
        // DESTINO
        pastaProd: "news-prod/**/*.html",
    }
};
function reload() {
    browserSync.reload();
}

function news(){
  return gulp
  .src(paths.styles.pastaDev)
  // .pipe(mjml()) 
  .pipe(mjml(mjmlEngine, {minify: true})) // MIMIFICAR
  .pipe(gulp.dest('./news-prod'));
}


function watch() {
    browserSync.init({
        server: {
            baseDir: "news-prod"
        }
    });
    gulp.watch(paths.styles.pastaDev, news);
    gulp.watch("news-dev/*.mjml", news).on('change', browserSync.reload);
    gulp.watch("news-dev/*.html", news).on('change', browserSync.reload);
}

exports.news = news;
exports.watch = watch;

var build = gulp.parallel(news, watch);

gulp.task('default', build);