---
title: 使用nodeJS爬取一些测试图片
date: 2019-03-06 15:12:20
---
```
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://pixabay.com'

let page = 1

const url = 'https://pixabay.com/images/search/nature/?cat=science'

function downloadImage(src) {
  const name = src.substr(src.lastIndexOf('/') + 1)
  console.log(`${src}开始下载`)
  return new Promise(resolve => {
    axios({
      url: src,
      responseType: 'stream'
    })
      .then(response => {
        response.data.pipe(fs.createWriteStream(`images/${name}`))
        console.log(`${name}下载成功`)
        resolve()
      })
      .catch(e => {
        console.log('图片下载错误', e)
        resolve(e)
      })
  })
}

async function spider(url) {
  console.log('开始收集图片', url)

  let $

  for (let i = 0; i < 5; i++) {
    try {
      const { data: html } = await axios.get(url)
      $ = cheerio.load(html)
      const images = $('#content .media_list .search_results img')
      const urls = []
      images.map((index, item) => {
        const src = $(item).attr('src')
        const realSrc = src.startsWith('https')
          ? src
          : $(item)
              .attr('data-lazy-srcset')
              .split(' 1x,')[0]
        urls.push(realSrc)
      })

      for (let i = 0; i < urls.length; i++) {
        await downloadImage(urls[i])
      }
      break
    } catch (e) {}
  }

  // 下一页
  if (page < 40) {
    const href = $('#content .media_list>a.pure-button').attr('href')
    page += 1
    spider(baseUrl + href)
  }
}

spider(url)

```
  