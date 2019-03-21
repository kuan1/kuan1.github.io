---
title: gulp自动化管理精灵图
date: 2016-11-18 17:33:08
---
## 安装
> npm install gulp --save-dev
> npm install gulp.spritesmith --save-dev

```
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('autoSprite', function () {
  gulp.src('./src/img/*.png').pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.css',
    padding: 20 
  })).pipe(gulp.dest('./dist/img/'));
});

gulp.task('default',['autoSprite'],function(){
	console.log('运行成功')
})

```
  