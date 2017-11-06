import gulp from"gulp";
import eslint from "gulp-eslint";
import sass from "gulp-sass";
import browserSync from "browser-sync";
import browserify from "browserify";
import babelify from "babelify";
import buffer from "vinyl-buffer";
import source from "vinyl-source-stream";
import config from "./config.js";
const browserSyncServer = browserSync.create();


// bundle together js files into a single main.js file
gulp.task("bundle-js", ["eslint"], ()=>{
  const bundler = browserify(config.js.fullAppPath);

  bundler.transform("babelify");
  bundler.bundle()
    .on("error", (err)=>{
      console.log(err);
    })
    .pipe(source(config.js.appName))
    .pipe(buffer())
    .pipe(gulp.dest(config.publicPath + "js/"))
    .pipe(browserSyncServer.stream());
});

gulp.task("copy", ()=>{
  gulp.src(config.src + "/index.html")
    .pipe(gulp.dest(config.publicPath));
});


// run jshint on all javascript files
gulp.task("eslint", ()=>{
  return gulp.src(config.js.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// compile sass assets into vanilla css
gulp.task("build-css", ()=>{
  return gulp.src(config.scss.src)
    .pipe(sass({
      includePaths: [config.nodeModules]
    })
    .on("error", sass.logError))
    .pipe(gulp.dest(config.publicPath + "css/"))
    .pipe(browserSyncServer.stream());
});

gulp.task("serve", ()=>{
  browserSyncServer.init({
    server: {
      baseDir: config.publicPath
    }
  });
});

gulp.task("build", ["build-css", "bundle-js"]);


// run jshint whenever a js file is updated
// compile sass assets when any scss files are updated
// refresh the browswer whenever a relevant file changes
gulp.task("watch", ["serve"], ()=>{
  gulp.watch(config.js.src, ["bundle-js"]);
  gulp.watch(config.scss.src, ["build-css"]);
  gulp.watch(config.src + "/*.html", ["copy"]);
  gulp.watch(config.publicPath + "*").on("change", browserSyncServer.reload);
});

gulp.task("default", ["build-css", "bundle-js", "copy", "watch"]);
