---
title: 使用nodejs功能化krpano流程回顾
date: 2019-12-17 22:54:43
---
### 一、使用nodejs功能化krpano 流程简介
- [下载krpano](https://krpano.com/download)
- 注册krpanotools（不注册会有水印）
```bash
# 推荐购买，当然网上还是可以找到注册的密钥
./krpanotools register ******
```
- 使用nodejs运行执行krpanotool，进行文件切割，[具体config配置介绍](https://krpano.com/tools/kmakemultires/config/#top)
```bash
 ./krpanotools makepano -config=config文件路径 全景图片路径`;
```
- 循环上传七牛生成切割后全景图片，然后使用根据路径使用代码拼接xml
- 制作docker镜像进行部署

### 二、代码片段
####  1. nodejs执行krpanotools切割全景图片
> 切割`10000x5000`的全景一般需要`18-22s`的时间，图片越小时间越少

```js
const execa = require("execa")
const krpanotools = 'krpanotools 路径'
const config = `config 路径`
module.export = async () => {
    const {stderr} = await execa(shell, {
      shell: true
    })
    return stderr
}
```
#### 2. 获取全景文件MD5，来作为切割文件前缀的key，也可以redis来缓存，提高性能
```js
// 获取文件md5
const crypto = require("crypto");
const fs = require("fs");

module.exports = url => {
  return new Promise(reslove => {
    const md5sum = crypto.createHash("md5");
    let stream = fs.createReadStream(url);
    stream.on("data", chunk => {
      md5sum.update(chunk);
    });
    stream.on("end", function() {
      let fileMd5 = md5sum.digest("hex");
      reslove(fileMd5);
    });
  });
};
```
#### 3. 执行文件夹循环上传七牛
```js
// 指定目录上传
module.exports = async (staticPath, prefix) => {
  const promiseList = [];
  // 上传文件夹
  function uploadDir(dirPath) {
    const files = fs.readdirSync(dirPath);
    // 遍历目录下的内容
    files.forEach(item => {
      let path = `${dirPath}/${item}`;
      const stats = fs.statSync(path);
      if (stats.isDirectory()) {
        uploadDir(path);
      } else {
        // 上传全景的key
        const key = path.replace(staticPath, prefix);
        promiseList.push(uploadFile(key, path));
      }
    });
    return promiseList;
  }
  // 等待所有文件上传完成
  return Promise.all(uploadDir(staticPath));
};
```
#### 4. 服务器切割图片比较慢，打包zip后在服务器批量上传，使用了一个插件unzipper

### 三、Dockerfile
```
FROM ubuntu:18.04

LABEL author=luzhongk@126.com

ENV APP_ROOT /var/www/
# 注册krpanotools的key
ENV krpanoToken ******
# 复制文件之后krpanotools位置
ENV krpanotools /var/www/krpano/krpanotools
WORKDIR ${APP_ROOT}

# 注册krpano
RUN chmod +x ${krpanotools} && ${krpanotools} register ${krpanoToken}
# 安装node
RUN apt-get update && apt-get install nodejs -y && apt-get install npm -y
# 安装node依赖环境，分开拷贝借助缓存优化
COPY ./package.json ${APP_ROOT}
RUN npm config set registry http://registry.npm.taobao.org/ & npm i
# 复制项目
COPY . ${APP_ROOT}

EXPOSE 3000

CMD ["npm",  "start"]
```


###  四、 [官方网址](https://krpano.com/download/)
  