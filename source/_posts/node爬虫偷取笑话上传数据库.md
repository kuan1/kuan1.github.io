---
title: node爬虫偷取笑话上传数据库
date: 2018-03-09
---
#### node爬虫（笑话）
> 很喜欢async、await

```
const fs = require('fs');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

// 目标地址
let url = 'http://www.budejie.com/text/';

const mysql = require('knex')({
  client: 'mysql',
  connection: {
    host: '118.25.43.168',
    port: '3306',
    user: '***',
    password: '***',
    database: '***',
  }
});

let joke = [];

// 开始
start();

async function start() {
  for (let i = 0; i < 50; i++) {
    let res = await runHelper(spider(i));
    if (res) {
      console.log(i, res.name); // 方便观察进度
      joke = joke.concat(res);
    }
  }
  upload(joke); // 上传数据库
}

async function spider(page) {
  let currentUrl = url + page;
  let html = await fetch(currentUrl).then(res => res.text());
  let $ = cheerio.load(html);
  let ls = $('.j-r-list>ul>li');
  let data = [];
  ls.map((i, item) => {
    let avatar = $(item).find('img').attr('data-original');
    let name = $(item).find('.u-user-name').text();
    let joke = $(item).find('.j-r-list-c-desc a').text();
    data.push({
      name, avatar, joke
    });
  });
  return data;
}


function runHelper(fn, time = 2000) {
  const limit = new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });

  return Promise.race([limit, fn]);
}


async function upload(joke) {
  for (let i = 0; i < joke.length; i++) {
    let res = await mysql('kuan_joke').insert(joke[i]);
    console.log(res);
  }
}



```
  