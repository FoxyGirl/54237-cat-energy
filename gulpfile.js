"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var imagemin = require("gulp-imagemin");
var minify = require("gulp-csso");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var posthtml = require("gulp-posthtml");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var webp = require("gulp-webp");
var include = require("posthtml-include");
var rename = require("gulp-rename");
var run =require("run-sequence");
var del = require("del");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("clean", function() {
  return del("build");
});

gulp.task('svg-clean', function () {
  return gulp.src('source/img/*' +
    '.svg')
    .pipe(svgmin({
      plugins: [{
        removeViewBox: false
      }, {
        cleanupNumericValues: {
          floatPrecision: 2
        }
      },
        {
          convertColors: {
            names2hex: false,
            rgb2hex: false
          }
        }, {
          removeDimensions: false
        }]
    }))
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(gulp.dest('source/img'));
});

gulp.task("scripts", function() {
  return gulp.src(["!source/js/picturefill.min.js", "source/js/*.js"])
    .pipe(concat("scripts.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest("build/js"));
});

gulp.task("svg-sprite", function() {
  return gulp.src("source/img/svg-icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("svg-sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("html", function() {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"));
});

gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function() {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("build", function(done) {
  run(
    "clean",
    "copy",
    "style",
    "scripts",
    "svg-sprite",
    "html",
    done
  );
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/picturefill.min.js"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("serve", function() {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html", ["html"]).on("change", server.reload);
  gulp.watch("source/js/*.js", ["scripts"]).on("change", server.reload);
});
