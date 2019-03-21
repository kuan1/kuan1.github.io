---
title: react的几个问题
date: 2017-05-21 12:22:57
---
> 临时整理的react的几个问题

```
- 定时器要在componentWillUnmount中清除

- 遍历的时候需要唯一的key
 
- 操作真是dom需要再didmount中操作，比如echarts
 
- react中的this指向问题，使用箭头函数或者bind this
 
- 用setState才能改变页面，比如input的value在state中定义，这时候input是不能输入值的，只能通过改变state才能给state赋值（单向数据流）
 
- shouldComponentUpdate用来性能优化的时候必须返回true才会刷新页面，如果只写了生命周期，页面就不会刷新

- babel-polyfill，转译es6的时候，项目中只能引入一次，否则部署上线会报错

```
  