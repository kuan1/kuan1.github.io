---
title: jquery简单的滚动加载动画
date: 2016-06-29
---
### 滚动动画
```
 function listenAnimate(s, l) {
    let a = $(window).height();

    addClass(s);
    listenAdd(s);

    function listenAdd(s) {
      $(window).on('scroll', function () {
        addClass(s);
      });
    }

    function addClass(s) {
      let b = $(this).scrollTop();
      s.map(function () {
        let c = $(this).offset().top;
        if (a + b > c && c + $(this).height() > b) {
          $(this).addClass(l);
        } else {
          $(this).removeClass(l);
        }
      });
    }
  }
```
  