---
title: unicode转化为汉字
date: 2017-09-18 20:27:57
---
#### unicode转化为汉字
> 使用node爬虫经常碰到unicode编码的汉字

```
unescape(string.replace(/&#x/g,'%u').replace(/;/g,''))
```
  