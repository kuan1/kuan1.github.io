---
title: 让webpack更简单
date: 2018-09-22
---
# 让webpack更简单
> 根据自己习惯将webpack封装成一个npm包，不再需要安装任何webpack相关包，甚至不需要任何配置。思路借鉴`webpack-cli3`和`umi`

> 发布npm包基础 [点击进入](https://www.luzhongkuan.cn/detail/149)


## 一、安装必需webpack依赖插件


* **基础webpack配置依赖有：**：  
`babel、css、less、postcss、file-loader、url-loader、html-webpack-plugin、copy-webpack-plugin`【`node-sass`安装比较慢，不翻墙经常安装失败，这里选择了less】

* **开发模式依赖有：**：  
`webpack-dev-server`

* **开发模式默认依赖有：**：  
`clean-webpack-plugin、mini-css-extract-plugin、optimize-css-assets-webpack-plugin、uglifyjs-webpack-plugin`

**注意：**  
需要`npm i 依赖包名 -S`安装依赖，这样其他项目引入只需要安装这一个包，就不需要再重新安装此包的依赖

## 二、webpack.config加入默认配置
> 具体配置就不展示了，详情请看demo


**获取当前项目运行地址：** 下边的resolve都是的这个方法
```
// 获取当前项目运行地址
const resolve = (dir) => path.join(process.cwd(), dir)
```
* **设置webpack默认配置：**
1. 打包入口 
2. cdn地址
3. 输出文件夹 
4. html模板
5. 输出html地址和名字
6. proxy 代理地址

* **用户自定义配置文件：**
> 项目是为了零配置，但特殊情况下还是需要自定义配置。那么就规定一个默认配置文件

```
// 获取用户webpack配置
const userConfig = (() => {
  const configPath = resolve('kuan-pack.js') // 获取规定的配置文件地址
  if (!fs.existsSync(configPath)) return {}
  return require(configPath)
})()

```


## 三、将配置npm包设置自定义指令
在`package.json`下的`bin`中定义指向脚本的文件地址，根据特定参数触发webpack的开发和编译

注意：脚本文件最上方加入`#!/usr/bin/env node`，说明使用node来运行文件，否则脚本不能运行。

```
switch (process.argv[2]) {
  case 'dev':
    // 本地开发
    process.env.NODE_ENV = 'development'
    const serve = require('../src/dev')
    serve()
    break
  case 'build':
    process.env.NODE_ENV = 'production'
    const build = require('../src/build')
    build()
    break
  default:
    console.error(`Unknown command ${process.argv[2]}`)
    process.exit(1)
}
```
## 四、kuan-pack

[demo地址](https://github.com/kuan1/kuan-pack/blob/master/README.md)

**安装**
```
yarn add kuan-pack --dev
# or
npm run kuan-pack -D
```

**开发**
```
kuan-pack dev
```

**编译**
```
kuan-pack build
```

**自定义webpack配置**
> 项目根目录加入`kuan-pack.js`


```
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'test'), // 打包入口 默认： src/index.js
  publicPath: '', // sdn路径 默认：空
  distPath: path.resolve(__dirname, 'dist'), // 输入地址 默认： dist
  htmlTemplate: 'index.html', // 模板html 默认：根目录index.html > 内部自定义模板
  htmlName: 'index.html', // 输出html路径 默认：'index.html'
  proxy: { // 代理地址
    '/api': {
      target: 'https://luzhongkuan.cn/api',
      changeOrigin: true
    }
  },
  config: {
    // 会合并到webpack.config
  }
}
```

## 五、结语
> 因为个人描述和能力等问题，可能有些地方不正确或者不清楚, 有问题欢迎联系 QQ:869103451


## 后期修改
> kuan-pack配置文件不能与包名一直，在mac运行没有问题，但是window10环境运行 kuan-pack 自动打开配置文件，而没有运行node_module 下的bin
  