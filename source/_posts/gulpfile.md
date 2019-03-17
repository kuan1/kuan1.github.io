---
title: gulpfile
date: 2016-09-15 16:35:34
---
> 我项目中使用的gulpfile配置


```
const gulp = require('gulp');
const concat = require('gulp-concat');
const md5 = require('gulp-md5');
const del = require('del');

gulp.task('common-css', function () {
  return gulp.src('node_modules/normalize.css/normalize.css')
    .pipe(concat('common.css'))
    .pipe(gulp.dest('src/server/static/css'));
});

gulp.task('scripts', () => {
  return gulp.src(['src/**/*.js',
    '!src/server/static/**',
    '!src/client/**'])
    .pipe(gulp.dest('build'));
});

gulp.task('copy-images-dist', function () {
  return gulp.src(['src/server/static/images/**'], {ignoreInitial: false})
    .pipe(gulp.dest('src/server/static/dist/images/'));
});

gulp.task('copy-fonts-dist', function () {
  return gulp.src(['src/server/static/fonts/**'], {ignoreInitial: false})
    .pipe(gulp.dest('src/server/static/dist/fonts/'));
});

gulp.task('build-static', ['common-css'], function () {
  return gulp.src('src/server/static/css/*')
    .pipe(md5({separator: '.'}))
    .pipe(gulp.dest('src/server/static/dist/css'));
});

gulp.task('clean-static', ['build-static'], function () {
  return del('src/server/static/dist/css/app.d41d8cd98f00b204e9800998ecf8427e.css');
});

gulp.task('deploy', ['scripts', 'clean-static', 'copy-images-dist', 'copy-fonts-dist'], () => {
  return gulp.src('src/server/static/dist/**')
    .pipe(gulp.dest('build/server/static/dist'));
});

```
  