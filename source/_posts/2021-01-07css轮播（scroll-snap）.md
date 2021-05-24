---
title: css轮播（scroll-snap）
date: 2021-01-07 10:56:45
---
### css轮播（scroll-snap）
主动滚动到临界点
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>css轮播（scroll-snap）</title>
    <style>
      .container {
        width: 300px;
        height: 300px;
        margin: 0 auto;
        white-space: nowrap;
        overflow-x: auto;
        scroll-snap-type: x mandatory;
      }
      .item {
        width: 280px;
        height: 300px;
        display: inline-block;
        background-color: #eee;
        margin-right: 10px;
        scroll-snap-align: start;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="item">1</div>
      <div class="item">2</div>
      <div class="item">3</div>
      <div class="item">4</div>
      <div class="item">5</div>
      <div class="item">6</div>
      <div class="item">7</div>
      <div class="item">8</div>
      <div class="item">9</div>
      <div class="item">10</div>
    </div>
  </body>
</html>
```
### [caniuse 查看兼容](https://caniuse.com/?search=scroll-snap)

  