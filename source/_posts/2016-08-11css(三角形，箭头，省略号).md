---
title: css(三角形，箭头，省略号)
date: 2016-08-11 13:13:17
---
```
/*三角形*/
div {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}

/*超出显示省略号：*/
p {
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

p {
  width: 300px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
/*css画箭头*/
.arrow {
  height: 200px;
  padding-right: 13px;
  position: relative
}

.arrow:after {
  content: ' ';
  display: inline-block;
  height: 6px;
  width: 6px;
  border-width: 2px 2px 0 0;
  border-color: #c8c8cd;
  border-style: solid;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 50%;
  margin-top: -4px;
  right: 2px
}
```
  