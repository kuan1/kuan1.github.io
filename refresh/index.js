/**
 * 同步数据
 */
const fs = require('fs')
const axios = require('axios')

async function get() {
  const { data: { data } } = await axios.get('https://www.luzhongkuan.cn/api/blog/article')
  return data.list
}

async function download() {

}

async function refrefsh() {
  const data = await get()
  console.log(data)
  download()
}

// 开始同步数据
refrefsh()
