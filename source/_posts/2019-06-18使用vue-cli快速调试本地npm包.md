---
title: 使用vue-cli快速调试本地npm包
date: 2019-06-18 17:29:07
---
## 使用vue-cli快速调试本地npm包

开发`a`npm包，在`b`文件夹下边测试

- 进入`a`文件夹
```bash
npm link
```

- 进入`b`文件夹
```bash
npm link a # a包的名字
```

- `b`文件夹下创建index.js
```js
import a from 'a'
// 测试代码
```


- `b`文件夹下创建vue.config.js
```js
  module.exports = {
    configureWebpack: {
      resolve: {
        symlinks: false // 使用npm link
      }
    }
 }
```

- 使用vue-cli启动服务
```bash
vue serve
```

  