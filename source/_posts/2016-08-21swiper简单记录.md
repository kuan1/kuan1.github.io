---
title: swiper简单记录
date: 2016-08-21 20:33:28
---
> swiper是一个轮播图插件  
> 它可以在移动端和pc端都可以使用的轮播图插件，不推荐在pc端使用  
> 可以利用sweiper来实现一些微场景  

```
使用需要引入js和css
html代码：  
<div class='swiper-container'>
<div class='swiper-wrapper'>
<div class='swiper-slide a'>第一张</div>
<div class='swiper-slide b'>第二张</div>
</div>
<!-- 分页符 -->
<div class='swiper-pagination'></div>
<!-- 前后按钮 -->
<div class='swiper-button-next'></div>
<div class='swiper-button-prev'></div>
</div>
js部分代码：
var swiper = new Swiper('.swiper-container',{
autoplay:1000,
autoplayDisableOnInteraction: false,//控制后不自动停止
loop:true,//不反弹播放（会在后边多加一个splice）
pagination:'.swiper-pagination',//出现分页符
paginationClickable:true,//分页符可用
prevButton:'.swiper-button-prev',//前按钮可用
nextButton:'.swiper-button-next',//后按钮可用
// speed：500，
//direction:'vertical',//垂直播放
//spaceBetween:100,//间隙
effect:'flip',//'coverflow',//'cube',//'flip',//'fade',//'slide',
centeredSlides: true,//第一张居中
slidesPerView:'auto'//显示数量
paginationBulletRender:function(index,className){
     return '<span class='+className+'>'+(index+1)+'</span>'
          }
});
//划上去停止播放
$('.swiper-container').hover(function(){
     swiper.stopAutoplay();
},function(){
     swiper.startAutoplay();
})
</script>
```

  