---
title: vue中使用钉钉群接受运维警报
date: 2018-06-12
---
#### #使用钉钉机器人发送错误信息到钉钉群  [==官网api入口](https://open-doc.dingtalk.com/docs/doc.htm?spm=a219a.7629140.0.0.p2lr6t&treeId=257&articleId=105733&docType=1)

##### 前端代码
```
const isDev = process.env.NODE_ENV === 'development'

// 支持markdown语法
export function sendDingding({ content = '测试内容', title = '错误日志' }) {
  const url = window.location.href
  const userAgen = navigator.userAgent
  const text = `### 项目名称：
 > 口碑活动手机项目 

 ### 访问URL：
 > ${url} 

  ### UserAgent：
 > ${userAgen} 

 ### 错误信息：
 > ${content}`

  axios({
    url: '代理地址',
    method: 'post',
    data: {
      isDev,
      msgtype: 'markdown',
      markdown: {
        title,
        text
      }
    }
  })
}

```
##### #node代理（防止跨域）
```
  // 发送钉钉消息
  async dingding(ctx) {
    const body = ctx.request.body
    const access_token = body.isDev
      ? '这里是token'
      : '这里是token'
    const { data } = await axios({
      url: 'https://oapi.dingtalk.com/robot/send',
      method: 'post',
      params: {
        access_token
      },
      data: body
    })
    ctx.state.data = data
  }
```
#### main.js中全局错误处理（注意不能cach住异步错误）
```
Vue.config.errorHandler = (err, vm, info) => {
  console.log(`组件${vm.$vnode.tag}发生错误：${err.message},${info}`)
  sendDingding({
    content: `组件${vm.$vnode.tag}发生错误：${err.message},${info}`
  })
}
```
#### 群机器人设置入口
![image](http://pic.luzhongkuan.cn/1528777540207.jpg)
![image](http://pic.luzhongkuan.cn/1528777911873.jpg)

#### 预览图片
> 错误信息就可以发送至钉钉群中

![image](http://pic.luzhongkuan.cn/1528776870613.jpg)
  