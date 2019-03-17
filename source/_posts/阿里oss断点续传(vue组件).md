---
title: 阿里oss断点续传(vue组件)
date: 2018-08-14 17:42:02
---
## [点击查看官方文档](https://help.aliyun.com/document_detail/32068.html?spm=a2c4g.11186623.6.833.JCLacP)  (简单demo)
> 官网sdk介绍中js使用的库和node使用的是同一个包，ali-oss。   
和nodejs不同的是，js中使用需要在控制台设置允许跨域，和headers暴露信息

> * 注意设置回掉callback中键值对中value必须是string类型
> * 获取文件唯一MD5标识，文件过大会出现错误

#### 安装
```
yarn add ali-oss

# or

npm install ali-oss -S
```

#### 简易js代码
```
  import OSS from 'ali-oss'
  import SparkMD5 from 'spark-md5' // 依赖库，对文件进行md5加密唯一标识
  import VProgress from './Progress' // 一个简单的进度条组件
  
  // localstorage缓存上传进度指针，失败后可再次上传
  const pointerCache = {
    get(file, name) {
      const cache = localStorage.getItem(cacheKey)
      if (!cache) return null
      const cacheJson = JSON.parse(cache)
      if (cacheJson.name !== name) return null
      cacheJson.file = file
      return cacheJson
    },
    set(pointer) {
      localStorage.setItem(cacheKey, JSON.stringify(pointer))
    },
    remove() {
      localStorage.removeItem(cacheKey)
    }
  }
  
  export default {
    props: {
      data: {
        type: Object,
        default() {
          return {
            region: '',
            accessKeyId: '',
            accessKeySecret: '',
            bucket: ''
          }
        }
      },
      multiple: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        files: []
      }
    },
    methods: {
      async changFile() {
        const files = this.$refs.input.files || []
        for (let i = 0; i < files.length; i++) {
          const file = files[i]
          const name = await this.getName(file)
          if (!this.files.some(item => item.name === name)) {
            this.files.push({
              file,
              percent: 0,
              name
            })
          }
        }
        console.log(this.files)
      },
      getName(file) {
        return new Promise(resolve => {
          const {name} = file
          const suffix = name.substr(name.lastIndexOf('.'))
          const spark = new SparkMD5.ArrayBuffer()

          const reader = new FileReader()
          reader.readAsArrayBuffer(file)
          // Indicator.open() // loading 文件过大的时候读取时间非常长
          reader.addEventListener('load', (e) => {
            spark.append(e.target.result);
            // Indicator.close()
            resolve(spark.end() + suffix) // 文件md5加密，放置重复上传
          })
        })
      },
      async uploadAll() {
        if (this.files.length === 0) {
          // Toast('请选择文件')
          return
        }
        for (let i = 0; i < this.files.length; i++) {
          const {file, name} = this.files[i]
          await this.upload(file, name, i)
        }
      },
      async upload(file, name, index) {
        const that = this
        const client = new OSS(this.data) // 阿里文件上传对象

        let checkpoint = pointerCache.get(file, name) // 断点续传指针

        // 失败后尝试两次
        for (let i = 0; i < 2; i++) {
          try {
            const result = await client.multipartUpload(name, file, {
              checkpoint,
              async progress(percentage, cpt) { // 上传进度
                console.log(percentage)
                that.files[index].percent = parseInt(percentage * 100, 10)
                pointerCache.set(cpt)
                checkpoint = cpt
              },
            })
            pointerCache.remove()
            console.log('上传成功：', result)
            break // break if success
          } catch (e) {
            console.log('上传失败：', e)
          }
        }
      },
    },
    components: {
      VProgress
    }
  }
```

#### html部分
``` 
<template>
  <div class='upload-container'>
    <button class='btn main-btn' @click='uploadAll'>开始上传</button>

    <div class='upload-panel'>
      <p>将文件拖到此处，或 <span class='color-main'>点击上传</span></p>
      <input :multiple='multiple' @change='changFile' class='file-input' ref='input' type='file'>
    </div>

    <table v-if='files.length' class='table'>
      <tr>
        <th>原文件</th>
        <th>md5文件</th>
        <th>文件大小</th>
        <th>上传</th>
        <th>状态</th>
      </tr>
      <tr v-for='(item) in files' :key='item.file.name'>
        <td>{{item.file.name}}</td>
        <td>{{item.name}}</td>
        <td>{{item.file.size}}</td>
        <td>
          <v-progress :percent='item.percent'></v-progress>
        </td>
        <td>
          <div class='btn opacity' :class='{complete: item.percent === 100}'>{{item.percent === 100 ? '完成' : '等待'}}</div>
        </td>
      </tr>
    </table>
  </div>
</template>
```

#### css部分
```
<style lang='scss' scoped>
  .upload-container {
    overflow: hidden;
    margin: 20px;
  }
  .opacity {
    opacity: .7;
  }
  .color-main {
    color: #2989d8
  }

  .upload-panel {
    height: 400px;
    border: 1px dashed #ccc;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fcfcfc;
    border-radius: 15px;
    &:hover {
      border-color: #2989d8;
    }
  }

  .file-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }

  .btn {
    display: inline-block;
    font-weight: normal;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    white-space: nowrap;
    padding: 6px 12px;
    line-height: 1.42858;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    color: #fff;
    background-color: #2989d8;
    border-color: #2989d8;
    margin: 20px 0;
    font-size: 14px;
    &.main-btn {
      font-size: 20px;
    }
    &.complete {
      background-color: #ccc;
      border-color: #ccc;
    }
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    text-align: center;
    td, th {
      border: 1px solid #dfdfdf;
      padding: 10px 20px;
    }
  }

  div {
    justify-content: center;
  }
</style>

```
  