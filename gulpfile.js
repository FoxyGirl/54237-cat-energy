"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var svgmin = require("gulp-svgmin");
var svgstore = require("gulp-svgstore");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var rename = require("gulp-rename");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

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

gulp.task("svg-sprite", function() {
  return gulp.src("source/img/svg-icons/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("svg-sprite.svg"))
    .pipe(gulp.dest("source/img"));
});

gulp.task("style", function() {
  gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("source/*.html").on("change", server.reload);
});
