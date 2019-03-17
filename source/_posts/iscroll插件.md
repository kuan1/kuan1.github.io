---
title: iscroll插件
date: 2016-10-23
---
#### IScroll：滚动划屏类插件
> 原理就是css3的transform属性来模拟除了渐进原生的滚动插件  
> iscroll.min.js是最常用的版本，他是包含了下拉刷新，上拉加载等功能  
> iscroll-lite-min.js是移动端开发的版本，大小只有几kb，当然功能也进行了删减  
> iscroll-probe.js：当你需求滚动要求十分精确时候，采取使用  
> iscroll-zoom-min.js添加了对于zoom缩小放大监听  
> 
> iscroll对于jquery的兼容性较好，对于swiper的兼容性较差  
> iscroll已经出到5.0版本  
> iscroll是一个js类型的插件，所以对类名，没有严格的要求  

### 常见的布局格式

```
第一种：
<div class='wrapper' id='wrapper'>
<ul>
<li></li>
<li></li>
</ul>
</div>
第二种：
<div class='wrapper' id='wrapper'>
<div class='scroll-content'>
<p></p>
</div>
</div>
js代码：
var iscroll = new IScroll('#wrapper',{
    mouseWheel:true,//鼠标控制
    scrollbars:true,//显示滚动条
    scrollX:true,//控制横向滚动
    scrollY:false//控制纵向滚动
    tap:true,//允许使用tap时间

probeType:2，//1代表空闲时间监听，2代表每隔一段时间，3实时监听
})

```

#### 初始化注意事项：
- wrapper：设置position  
- 横向轮播：必须要自己编写样式，设置wrapper下边的div宽度  

#### 方法：
> scrollTo(x,y,time,timing-function) 
> iscroll.scrollTo(0,100,1000)：1秒后回到顶部上100px处返回 
> scrollToElement(el,time,timing-function)
> iscroll.sccrollTolElement($('#elem chrend:last-child').git(0).scopt)


- 移动端300毫秒延迟
> 当ios在触发事件的时候需要300ms进行判断是单击还是双击  
```
引入fastClick.js（framework7 | light7 | jingle | angular | mui | antd）
          tap：没有300秒延迟
```
- beginScrollStart：滚动之前触发
- scrollStart：手指按下未滚动时候触发
- scroll：滚动时候触发，probe都有的
- scrollEnd：滚动结束后触发
- zoomStart：缩放开始触发
- zoomEnd：缩放结束时候触发
- 
- probeType:2，//1代表空闲时间监听，2代表每隔一段时间，3实时监听



  