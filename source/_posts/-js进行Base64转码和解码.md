---
title:  js进行Base64转码和解码
date: 2018-08-20
---
##  js进行Base64转码和解码

```
  // base64编码
  const b = window.btoa('1234')
  console.log(b)
  // base64解码
  const a = window.atob(b)
  console.log(a)

  // 中文在base64处理之前需要转换 encodeURIComponent()
  console.log(encodeURIComponent('哈哈哈'))
```
  