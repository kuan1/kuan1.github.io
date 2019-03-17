---
title: node使用wechaty制作微信机器人每天给老婆发送暖心
date: 2019-03-08 20:57:09
---
> 在掘金上看到了一篇文章，一直想自己写一份。终于在工作之余，抽时间自己写了一份。这里只展示主要代码，详细代码请到github仓库


> 很惭愧！一天之后就放弃了，平均8个小时微信自动掉线(github有推荐收费pad版，暂时不尝试了)(*/ω＼*)

## 代码 [github地址](https://github.com/kuan1/kuan-wechaty)

#### 核心代码 【登录微信】
```js
const qrcodeTerminal = require('qrcode-terminal')
const { Wechaty, Contact, Message, log } = require('wechaty')
const startSchedule = require('./schedule') // 定时任务 可以理解为一个function

const bot = new Wechaty()

let schedule

// 二维码登录
bot.on('scan', (qrcode, status) => {
  if (status === 0) {
    qrcodeTerminal.generate(qrcode, { small: true }) // show qrcode on console
  }
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode)
  ].join('')
  console.log(qrcodeImageUrl)
})
// 登录
bot.on('login', user => {
  console.log(`${user} 登录成功`)
  main()
})
// 登出
bot.on('logout', user => {
  console.log(`${user} 退出登录`)
  process.exit()
  if (schedule) schedule.stop()
})


// 接受到信息
bot.on('message', async msg => {
  if (msg.self()) return

  await msg.say(msg.text() || '我现在只能识别文字')
})

// 登录成功之后的事情
async function main() {
  const girl = await bot.Contact.find('对应微信名字')

  if (girl) {
    // await girl.say('想说的话')  // 通过这种办法，发送微信消息
    /**
     * 自定义开始聊天
    **/
    schedule = startSchedule(girl) 
  }
}

bot
  .start()
  .then(() => console.log('微信机器人启动成功'))
  .catch(console.error)

```

#### 定时任务 【天气预报、每日一句】 (schedule.js)
```js
const axios = require('axios')
const moment = require('moment')
const HourSchedule = require('./utils/HourSchedule')
const one = require('./spider/one.js')
const weather = require('./spider/weather')


// 定时发送天气预报
async function tellWwather(...peopleList) {
  const text = await weather()
  for (let i = 0; i < peopleList.length; i++) {
    const people = peopleList[i]
    if (people) {
      people.say(text)
    }
  }
}

// 定时发送每日一句
async function sayOne(...peopleList) {
  const text = await one()
  for (let i = 0; i < peopleList.length; i++) {
    const people = peopleList[i]
    if (people) {
      people.say(text)
    }
  }
}

// 开始定时任务
module.exports = (gile) => {
  // 此处省略，自定义处理
}

```

## 信息网站
- [ONE - 暖心话来源](http://wufazhuce.com/)  
- [墨迹天气 - 天气信息来源](https://tianqi.moji.com/weather/china/shanghai/shanghai)

## 参考技术
- [wechaty](https://github.com/chatie/wechaty)  
一个微信开发的库，收发信息，添加好友等等。  
-  [入门DEMO](https://github.com/wechaty/wechaty-getting-started)  
github上wechaty入门代码，里边有多个等级 
- [cheerio](https://github.com/cheeriojs/cheerio)  
像jquery一样解析html的库

## 碰到问题
- centos服务器部署失败
```bash
# https://github.com/Chatie/wechaty/issues/1515
1.yum install libXScrnSaver*
2.yum install epel-release
3.yum install libappindicator-gtk3
```
  