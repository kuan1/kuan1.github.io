---
title: nodejs使用axios抓取gb2312格式网页中文乱码
date: 2019-08-03 17:08:48
---
### 使用iconv-lite转码
```js
const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
const iconv = require('iconv-lite')

async function getHtml(i = 0) {
  const url = `https://www.2345.com/jzw/${i + 1}.htm`
  const res = await axios({
    url,
    responseType: 'stream'
  })
  return new Promise(resolve => {
    const chunks = []
    res.data.on('data', chunk => {
      chunks.push(chunk)
    })
    res.data.on('end', () => {
      const buffer = Buffer.concat(chunks)
      const str = iconv.decode(buffer, 'gb2312')
      resolve(str)
    })
  })
}

let str = ''

async function fetchData() {
  for (let i = 0; i < 73; i++) {
    console.log(`当前是第${i}页`)
    const html = await getHtml(i)
    const $ = cheerio.load(html, { decodeEntities: false })
    const $list = $('#J_listTable li')
    $list.each((index, item) => {
      const question = $(item)
        .find('.table_left')
        .text()
      const answer = $(item)
        .find('.table_right a')
        .attr('onclick')
        .match(/\'([^.]*)\'/)[1]
      str += `${question}\n${answer}\n\n\n`
    })
  }
  fs.writeFileSync('data.txt', str)
}

fetchData()

```
  