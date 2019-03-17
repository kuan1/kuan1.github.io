---
title: html中的多媒体
date: 2016-10-07
---
> html5中为了方便页面中引入音频和视频，audio|video
> 弊端：支持的格式比较少，早期有些支持格式还需要收费

#### audio
- 支持音频格式：mpeg-3，acc(wav),ogg
- controls：控制空间的显示隐藏
- autoplay：自动播放
- src：显示路径
- loop：循环播放
- pause：暂停
- muted：静音
- preload：预播放，在onload加载，在页面加载完成后加载，和autoplay只能有一个

- audio兼容写法
```
<audio controls>
<source src=''></source>
<source src=''></source>
浏览器不支持音频播放
</audio>
 
```

#### video
> 支持格式：mpeg-4,webm,ogv(ogg)  
> video比audio运用更加广泛，支持audio中所有的属性 
> poster = “url”：设置video封面的图片  
> height/width：设置video的宽高  
- 慎用兼容写法object：
```
<video width='800' height=''>
    <source src='myvideo.mp4' type='video/mp4'></source>
    <source src='myvideo.ogv' type='video/ogg'></source>
    <source src='myvideo.webm' type='video/webm'></source>
    <object width='' height='' type='application/x-shockwave-flash' data='myvideo.swf'>
    <param name='movie' value='myvideo.swf' />
         <param name='flashvars' value='autostart=true&amp;file=myvideo.swf' />
</object>
当前浏览器不支持 video直接播放，点击这里下载视频： <a href='myvideo.webm'>下载视频</a>
</video>
```

#### 音视频的判读属性
- oa.currentTime：获取当前播放的时间 | 返回的是秒
- oa.duration：获取当前音视频总共播放时间
- oa.paused：判断当前是暂停还是播放 | ture/false
- oa.muted：判断当前是否是静音状态 | true/false
- oa.currentSrc：获取当前播放的路径
- oa.volume：获取当前的音量（0~1）

#### 音视频中调用方法
- play()：执行播放
- pause()：执行暂停
- load()：重新加载
- - requestFullscreen() | mozRequestFullscreen() | webkitRequestFullscreen()：设置全屏

#### 关于音视频的监听状态
- play：播放时候触发
- ended：结束时候触发
- pause：暂停时候触发
- valumeChange：音量变化时候触发
  