"use strict";

var gulp = require("gulp"),
  $ = require("gulp-load-plugins")(),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload,
  del = require("del"),
  runSequence = require("run-sequence"),
  prettify = require("gulp-html-prettify"),
  beautify = require("gulp-jsbeautify"),
  archiver = require("gulp-archiver");

gulp.task("styles", function () {
  return (
    gulp
      .src("src/styles/*.scss")
      .pipe($.plumber())
      .pipe(
        $.sass
          .sync({
            outputStyle: "expanded",
            precision: 10,
            includePaths: ["."],
          })
          .on("error", $.sass.logError)
      )
      .pipe($.autoprefixer({ browsers: ["last 100 versions"] }))
      // .pipe($.cssBase64())
      .pipe(gulp.dest(".tmp/styles"))
      .pipe(reload({ stream: true }))
  );
});

gulp.task("styles-build", function () {
  return (
    gulp
      .src("src/styles/*.scss")
      .pipe($.plumber())
      .pipe(
        $.sass
          .sync({
            outputStyle: "expanded",
            precision: 10,
            includePaths: ["."],
          })
          .on("error", $.sass.logError)
      )
      .pipe($.autoprefixer({ browsers: ["last 10 versions"] }))
      // .pipe($.cssBase64())
      .pipe($.cssnano({ safe: true, autoprefixer: false }))
      .pipe(gulp.dest("dist/styles"))
      .pipe(reload({ stream: true }))
  );
});

gulp.task("scripts", function () {
  return (
    gulp
      .src("src/scripts/**/*.js")
      .pipe($.plumber())
      // .pipe(beautify({indentSize: 4}))
      .pipe(gulp.dest(".tmp/scripts"))
      .pipe(reload({ stream: true }))
  );
});

gulp.task("image-min", function () {
  return (
    gulp
      .src("src/images/**/*")
      // .pipe($.imagemin({
      // 	interlaced: true,
      // 	progressive: true,
      // 	optimizationLevel: 5,
      // 	svgoPlugins: [{removeViewBox: true}]
      // }))
      .pipe(gulp.dest("dist/images"))
  );
});

gulp.task("nunjucks", function () {
  return gulp
    .src("src/templates/pages/**/*.html")
    .pipe($.plumber())
    .pipe(
      $.nunjucksRender({
        path: ["src/templates/layout"],
      })
    )
    .pipe(gulp.dest(".tmp"));
});

gulp.task("htmlmin", ["styles", "nunjucks"], function () {
  return (
    gulp
      .src(".tmp/*.html")
      .pipe($.useref({ searchPath: [".tmp", "src", "."] }))
      // .pipe($.if(/\.js$/, $.uglify({ compress: { drop_console: true } })))
      .pipe($.if(/\.css$/, $.cssnano({ safe: true, autoprefixer: false })))
      .pipe(
        $.if(
          /\.html$/,
          $.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: { compress: { drop_console: true } },
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          })
        )
      )
      .pipe($.if(/\.html$/, prettify({ indent_char: " ", indent_size: 4 })))
      .pipe(gulp.dest("dist"))
  );
});

gulp.task("html", ["styles", "scripts", "nunjucks"], function () {
  return (
    gulp
      .src(".tmp/*.html")
      .pipe($.useref({ searchPath: [".tmp", "src", "."] }))
      // .pipe($.if(/\.js$/, beautify({indentSize: 4})))
      .pipe(
        $.if(
          /\.html$/,
          $.htmlmin({
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: { compress: { drop_console: true } },
            processConditionalComments: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
          })
        )
      )
      .pipe($.if(/\.html$/, prettify({ indent_char: " ", indent_size: 4 })))
      .pipe(gulp.dest("dist"))
  );
});

gulp.task("serve", function () {
  runSequence(["clean"], ["styles", "scripts", "nunjucks"], function () {
    gulp
      .src(".tmp/*.html")
      .pipe(
        $.listfiles({
          filename: "pages-list.txt",
        })
      )
      .pipe(gulp.dest(".tmp"));

    browserSync.init({
      notify: false,
      port: 9000,
      server: {
        baseDir: [".tmp", "src"],
      },
    });

    gulp.watch(["src/templates/**/*"]).on("change", reload);
    gulp.watch("src/templates/**/*", ["nunjucks", "pages-list:tmp"]);
    gulp.watch("src/styles/**/*.scss", ["styles"]);
    gulp.watch("src/scripts/**/*.js", ["scripts"]);
  });
});

gulp.task("move", function () {
  return gulp
    .src(
      [
        "src/**/*",
        "!src/styles/*",
        "!src/scripts/*",
        "!src/templates",
        "!src/libs",
      ],
      {
        dot: true,
      }
    )
    .pipe(gulp.dest("dist"));
});

gulp.task("pages-list", function () {
  return gulp
    .src("dist/**/*.html")
    .pipe($.cache($.listfiles()))
    .pipe(gulp.dest("dist"));
});

gulp.task("pages-list:tmp", function () {
  return gulp
    .src(".tmp/*.html")
    .pipe(
      $.listfiles({
        filename: "pages-list.txt",
      })
    )
    .pipe(gulp.dest(".tmp"));
});

gulp.task("build", function () {
  runSequence(["clean"], ["htmlmin", "image-min", "move"], function () {
    return gulp
      .src("dist/**")
      .pipe(archiver("archive.zip"))
      .pipe(gulp.dest("dist"));
  });
});

gulp.task("build-css", ["styles-build"]);

gulp.task("clean", del.bind(null, [".tmp", "dist"]));
