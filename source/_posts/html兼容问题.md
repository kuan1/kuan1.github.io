---
title: html兼容问题
date: 2016-07-05
---
#### 透明属性：
opacity：0.5；filter：alpha（opacity=50）
图片时候用gif，不适用png透明

#### margin-top的bug：
给子元素设置margin-top；父元素也会掉下来


#### img将div撑大3像素
hack1：将div和img写在一行
hack2：将img转化为块元素
hack3：设置div{vertical：middle}

#### 倒角
border-radius：
移动端要写成100%

#### 默认高度问题
IE6及以下版本块元素拥有默认高度（不低于18px）。
hack1：给元素声明：font-size:0
hack2：给元素声明overflow：hidden

## 最小高度
min-height： _height：
min-height： height：auto !important height：

## 双倍浮向问题
IE6及以下版本错误的将浮动元素错误解析浮向边距为双倍；
hack1：给浮动元素添加display：inline；

## 表单元素行高不一致
给元素添加float

## 按钮默认大小和样式不一样
hack1：统一大小和样式，用a标签模拟
hack2：input外套一个标签，在这个标签里写按钮的样式，把input的边框去掉
hack3：如果这个按钮是一个图片，直接把图片作为按钮的背景图片即可

## 指针bug：
cursor属性的hand属性只有ie8浏览器可以识别，使用pointer

#### li中的a标签float：left；或者display：block；出现行高不一致，多出三像素
hack1：给a添加dispaly：inline-block  
hack2：给a添加diaplay：inline  
hack3：给float：float；并加固定宽度  






  