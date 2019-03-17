---
title: 小程序 swiper 滚动时候倒角失效
date: 2018-12-10
---
## 小程序 swiper 滚动时候倒角失效
给swiper 添加 transform: translateY(0) bug不再出现

```
  swiper {
    transform: translateY(0);
    border-radius: 6rpx;
    overflow: hidden;
    width: 670rpx;
    height: 502rpx;
  }
```
  