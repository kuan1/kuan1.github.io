---
title: swiper4.0配置
date: 2018-05-29 18:20:55
---
#### swiper4.0配置
> 一个项目中使用到了swiper4.0，配置和3.0有些差别，记录一下

```
 const config = {
  slidesPerView: 'auto', // 宽度自适应
	spaceBetween: 30, // 间隙
	centeredSlides: true, // 居中显示
  autoplay: {
    delay: 3000, // 延迟时间
    disableOnInteraction: false // 用户操作后不停止播放
  },
	 navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
  speed: 1000, // 速度
  // loop: true, // 最后一页事件不能绑定
  // initialSlide: this.pageIndex, // 默认页面
  direction: 'horizontal', // 垂直滚动
  // 注意不要跟 vue-router 的 hash 模式冲突了, 两者不可共用
  // hashNavigation: {
  //   replaceState: true, // 翻页不产生历史记录
  //   watchState: true,
  // },
  hashNavigation: false,
  observer: true, // 子元素发生变化自动初始化swiper
  observeParents: true, // 父元素发生变化自动初始化swiper
  on: {
    init() { // 初始化
    },
		slideChangeTransitionEnd() {},
    slideChange() { // 页面改变
			console.log(this.realIndex) // 当前轮播页面
    },
    resize() { // 页面宽度改变
    },
  },
};
this.mySwiper = new Swiper(container, config);
```

* 取消拖动：
swiper-no-swiping
  