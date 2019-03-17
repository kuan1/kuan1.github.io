---
title: spark-md5获取文件md5唯一标识
date: 2018-12-27 11:11:52
---
#### 获取文件md5唯一标识

spark-md5： https://github.com/satazor/js-spark-md5    
示例：https://github.com/kuan1/kuan-utils/blob/master/src/uploader.js

```
import SparkMD5 from 'spark-md5'

// 获取文件MD5
export function getFileMD5(file, processFn) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader() //分块读取文件对象

    //file的slice方法，注意它的兼容性，在不同浏览器的写法不同
    const blobSlice =
      File.prototype.mozSlice ||
      File.prototype.webkitSlice ||
      File.prototype.slice

    const chunkSize = 10 * 1024 * 1024 //分块大小，20M
    const chunks = Math.ceil(file.size / chunkSize) //总块数
    let currentChunk = 0 //当前块数
    const spark = new SparkMD5() //获取MD5对象

    fileReader.onload = e => {
      //数据加载完毕事件
      let binaryStr = ''
      const bytes = new Uint8Array(e.target.result)
      const length = bytes.byteLength
      for (let i = 0; i < length; i++) {
        binaryStr += String.fromCharCode(bytes[i]) //二进制转换字符串
      }
      spark.appendBinary(binaryStr)
      currentChunk++
      if (processFn) {
        processFn(`${Math.ceil((currentChunk / chunks) * 100)}%`)
      } else {
        console.log('读取文件', `${Math.ceil((currentChunk / chunks) * 100)}%`)
      }
      if (currentChunk < chunks) {
        loadNext() //读取下一块数据
      } else {
        const fileMd5 = spark.end() //得到文件MD5值
        resolve(fileMd5)
      }
    }
    fileReader.onerror = e => {
      reject(e)
    }

    function loadNext() {
      const start = currentChunk * chunkSize
      const end = start + chunkSize >= file.size ? file.size : start + chunkSize
      //根据开始和结束位置，切割文件
      const b = blobSlice.call(file, start, end)
      //readAsBinaryString ie浏览器不兼容此方法
      //fileReader.readAsBinaryString(blobSlice.call(file, start, end));
      fileReader.readAsArrayBuffer(b) //ie，chrome，firefox等主流浏览器兼容此方法
    }
    loadNext()
  })
}

// 选择文件
export function selectFile() {
  const id = 'kuan-upload-input'
  let uploadInput = document.getElementById(id)
  if (!uploadInput) {
    uploadInput = document.createElement('input')
    uploadInput.id = id
    uploadInput.type = 'file'
    uploadInput.style.display = 'none'
    document.body.appendChild(uploadInput)
  }
  uploadInput.click()

  return new Promise(resolve => {
    uploadInput.onchange = () => {
      const [file] = uploadInput.files
      uploadInput.value = ''
      resolve(file)
    }
    setTimeout(() => {}, 100)
  })
}

export async function getFile({ needMD5 = true, readProcess } = {}) {
  const file = await selectFile()
  let md5 = ''
  if (needMD5) {
    md5 = await getFileMD5(file, readProcess)
  }
  return {
    file,
    md5
  }
}

export default {
  getFileMD5,
  selectFile,
  getFile
}
```
  