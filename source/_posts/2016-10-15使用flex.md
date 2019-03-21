---
title: 使用flex
date: 2016-10-15 16:04:11
---
####  使用flex：
```
.box{ display: flex/inline-flex/-webkit-flex }
```

####  flex-direction：主轴方向上的排列方向  
水平|水平倒序|垂直|垂直倒序
```
.box { flex-direction: row | row-reverse | column | column-reverse; }
```

#### flex-wrap：是否换行  
不换行|换行|换行倒序
```
.box{ flex-wrap: nowrap | wrap | wrap-reverse; }
```

#### flex-flow属性是flex-direction属性和flex-wrap属性的简写形式
```
.box { flex-flow: <flex-direction> || <flex-wrap>; }
```

#### justify-content：定义主轴方向上的对齐方式  
左对齐|右对齐|居中对齐|两端对齐|等间隙对齐
```
.box { justify-content: flex-start | flex-end | center | space-between | space-around; }
```

#### align-items：副轴方向上对齐  

flex-start：交叉轴的起点对齐|flex-end：交叉轴的终点对齐|center：交叉轴的中点对齐。|baseline: 项目的第一行文字的基线对齐|stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。
```
.box { align-items: flex-start | flex-end | center | baseline | stretch; }
```

#### align-content：多条轴线上的对齐方式;  
flex-start：与交叉轴的起点对齐 | flex-end：与交叉轴的终点对齐 | center：与交叉轴的中点对齐 | space-between：与交叉轴两端对齐，轴线之间的间隔平均分布 | space-around：每根轴线两侧的间隔都相等 | stretch（默认值）：轴线占满整个交叉轴。
```
.box { align-content: flex-start | flex-end | center | space-between | space-around | stretch; }
```
#### order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0
```
.item { order: <integer>; }
```
#### flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大
```
.item { flex-grow: <number>; /* default 0 */ }
```
#### flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```
.item { flex-shrink: <number>; /* default 1 */ }
```
#### flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间
```
.item { flex-basis: <length> | auto; /* default auto */ }
```
#### flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto
```
.item { flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ] }
```
#### align-self属性允许单个项目
```
.item { align-self: auto | flex-start | flex-end | center | baseline | stretch; }
```


  