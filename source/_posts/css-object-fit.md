---
title: css object-fit
date: 2018-10-03
---

## 把图片像背景(background-size)一样使用
假期惯例随便看看，熬个夜，不知道做社么，随便写点东西把。    
布局的时候，我们经常会用到背景图片`background-size:  cover || contain`，其实直接使用图片也可以做到这个效果，`object-fix`，这个css属性可以让图片可以像背景图片一样。不过再不要求兼容的情况下，使用起来确实很方便。

## 兼容
使用can i use 查看兼容 [https://caniuse.com/#search=object-fit](https://caniuse.com/#search=object-fit)
- IE 不支持
- Chrome浏览器支持良好
- Firebox61 支持
- Safari11.1 支持
- Ios Safari11.2 支持
- Opera 全部支持

## object-fit属性值
> fill | contain | cover | none | scale-down

- fill
被替换的内容大小可以填充元素的内容框。 整个对象将完全填充此框。 如果对象的高宽比不匹配其框的宽高比，那么该对象将被拉伸以适应。
- contain
被替换的内容将被缩放，以在填充元素的内容框时保持其宽高比。 整个对象在填充盒子的同时保留其长宽比，因此如果宽高比与框的宽高比不匹配，该对象将被添加“黑边”。
- cover
被替换的内容大小保持其宽高比，同时填充元素的整个内容框。 如果对象的宽高比与盒子的宽高比不匹配，该对象将被剪裁以适应。
- none
被替换的内容尺寸不会被改变。
- scale-down
内容的尺寸就像是指定了none或contain，取决于哪一个将导致更小的对象尺寸。

## 参考
[https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/object-fit)

- 同样有 `object-position` 类似 `background-position`
  