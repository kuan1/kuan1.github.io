---
title: node自动打包项目为tar.gz压缩文件
date: 2017-02-24
---
> 使用tar自动打包项目(注意tar为2.2.1版本，其他版本引入报错，有心者可以继续研究)

```
'use strict';

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const fstream = require('fstream');
const tar = require('tar');

const processPath = path.resolve(__dirname, 'process.json');
const buildPath = path.resolve(__dirname, '../build');

const content = fs.readFileSync(path.resolve(__dirname, '../package.json'));
let packageJson = JSON.parse(content);
delete packageJson.devDependencies;
delete packageJson.betterScripts;
delete packageJson.repository;
packageJson.engines.node = '>=7.6';
packageJson.main = 'server.js';
packageJson.scripts = {
  start: 'better-npm-run start'
};
packageJson.betterScripts = {
  start: {
    command: 'nohup node ./server/app.js &',
    env: {
      'NODE_ENV': 'production'
    }
  }
};

fs.createReadStream(processPath).pipe(fs.createWriteStream(buildPath + '/process.json'));
fs.writeFileSync(path.resolve(__dirname, '../build/package.json'), JSON.stringify(packageJson, null, 2));

// zip
fstream.Reader({'path': path.resolve(__dirname, '../build/'), 'type': 'Directory'})
  .pipe(tar.Pack({noRepository: true, fromBase: true}))
  .pipe(zlib.Gzip())
  .pipe(fstream.Writer({'path': path.resolve(__dirname, '../build/build.tar.gz')}));

console.log('build 完成');

```
  