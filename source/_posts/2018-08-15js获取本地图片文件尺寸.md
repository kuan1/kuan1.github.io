---
title: js获取本地图片文件尺寸
date: 2018-08-15 18:34:46
---
## js获取本地图片文件尺寸
> 第一次碰到这种需求，随手记录一下

```
<!doctype html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <meta name='viewport'
        content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0'>
  <meta http-equiv='X-UA-Compatible' content='ie=edge'>
  <title>Document</title>
</head>
<body>
<input type='file'>
<script>
  document.querySelector('input').onchange = function () {
    if (!file) return // 没有选择图片，直接return
    const [file] = this.files // 过滤图片类型
    if (!(/^image\/[jpeg|png|jpg|gif|svg|ico]/ig.test(file.type))) {
      alert('请上传图片类型文件')
      return
    }

    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = function() {
      console.log(this.height, this.width)
    }
  }
</script>
</body>
</html>
```
  