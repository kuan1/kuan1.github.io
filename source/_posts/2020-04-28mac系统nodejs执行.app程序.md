---
title: mac系统nodejs执行.app程序
date: 2020-04-28 21:37:52
---
### 一、执行路径后添加`Contents/MacOS/${app名字}`

```js
const path = require('path')
const { execFile } = require('child_process')

const appName = `halovr0427.app`

const exeFile = path.resolve(__dirname, `${appName}/Contents/MacOS/halovr0427`)

const params = `halovr://scene?caseid=1096`

execFile(exeFile, [params], (err, data) => {
  if (err) {
    return console.error(err)
  }
  console.log(data.toString())
})

```
  