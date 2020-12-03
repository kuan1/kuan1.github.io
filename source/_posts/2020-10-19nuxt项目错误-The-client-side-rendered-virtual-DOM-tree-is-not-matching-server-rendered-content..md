---
title: nuxt项目错误-The client-side rendered virtual DOM tree is not matching server-rendered content.
date: 2020-10-19 15:29:02
---
### Q：nuxt项目中出现下述问题 
`[Vue warn]: The client-side rendered virtual DOM tree is not matching server-rendered content.`

### 问题分析：
出现上边问题是服务端和客户端dom结构不一致。   
后来排查原因，浏览器自动识别手机号变成了`a`标签，可以加入meta禁止浏览器默认行为。
```html
 <!-- 禁止浏览器识别手机号和邮箱 -->
 <meta name="format-detection" content="telephone=no, email=no"/>
```


  