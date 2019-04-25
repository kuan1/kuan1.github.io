/**
 * 同步数据
 */
const fs = require('fs')
const axios = require('axios')

async function get() {
  const { data: { data } } = await axios.get('https://www.luzhongkuan.cn/api/blog/syncData')
  return data
}

async function download(list) {
  list.forEach(data => {
    const name = `${__dirname}/../source/_posts/${data.create_time.split(' ')[0]}${data.title.replace('/', '-').replace(/\s/ig, '-')}.md`
    console.log(data.title)
    const content = `---
title: ${data.title}
date: ${data.create_time}
---
${data.content}
  `
    fs.writeFileSync(name, content, 'utf-8')
  })
}

async function refrefsh() {
  const data = await get()
  download(data)
  console.log('success!!')
}

// 开始同步数据
refrefsh()
