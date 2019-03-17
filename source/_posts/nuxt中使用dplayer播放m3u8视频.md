---
title: nuxt中使用dplayer播放m3u8视频
date: 2018-10-26
---
# nuxt中使用dplayer播放m3u8视频
dplayer是一个很强大的h5视频播放库，有很多直接可以使用的api，支持播放弹幕、字母、流畅度切换等等。中文文档地址：http://dplayer.js.org/#/zh-Hans/?id=%E5%85%A5%E9%97%A8

##  简单记录nuxt使用dplayer的注意事项
- 安装


```
yarn add dplayer

yarn add hls.js # 播放m3u8需要另外安装这个
```


- 引入样式


```
import 'dplayer/dist/DPlayer.min.css'
```


- 使用dplayer（服务端渲染需要mounted中引入插件）


```
// nuxt服务端不可以直接使用dplayer，可以在mounted的钩子中使用。（mounted只会在客户端触发）
export default {
    mounted() {
        window.Hls = require('hls.js');
        this.DPlayer = require('dplayer')
        this.init()
    },
    methods: {
        init() {
            const dp = new DPlayer({
                container: this.$refs.dplayer,
                logo: 'logo.png',
                 // screenshot: true, // 截图   
                video: {
                    // url: 'demo.mp4', // 单清晰度视屏播放
                    quality: [{ // 多清晰度
                        name: 'HD',
                        url: 'demo.m3u8',
                        type: 'hls'
                    }, {
                        name: 'SD',
                        url: 'demo.mp4',
                        type: 'normal'
                    }],
                    defaultQuality: 0,
                    pic: 'demo.png',
                    thumbnails: 'thumbnails.jpg'
                }
            });
        }
    }
    
}

```

## 未处理问题  
新版谷歌浏览器，封面闪烁后自动显示视频内容，后来设置了图片作为封面，点击主动隐藏图片触发播放
  