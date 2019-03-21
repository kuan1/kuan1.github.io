---
title: js常见兼容
date: 2016-06-30 23:22:47
---
- 1)滚动条：
```
document.documentElement.scrollTop||document.body.scrollTop

```


- 2) 获取样式兼容

```
function getStyle(dom, styleName){
return dom.currentStyle?
dom.currentStyle[styleName]:
getComputedStyle(dom)[styleName];
}

```

- 3) 网页可视区域兼容
```
window.innerHeight || document.documentElement.clientHeight
window.innerWidth || document.documentElement.clientWidth

```
 
- 4） 事件对象兼容
```
evt = evt || window.event;
event.target.className
```

- 5） 阻止事件冒泡兼容
```
event.stopPropagation?
event.stopPropagation():
event.cancelBubble=true;
```

- 6）阻止默认行为兼容
```
evt.preventDefault?
evt.preventDefault():
evt.returnValue=false;
```
 
- 7）事件监听兼容
```
document.all?
    dom.attachEvent(“onclick”, fn)：
    dom.addEventListener(“click”, fn);
```

- 8）事件委托目标对象兼容

```
var t = event.target || event.srcElement;【if(t.nodeName.toLowerCase() == “li”)】
```
- 9）ajax请求的兼容
```
var http;
window.XMLHttpRequest?
http = new XMLHttpRequest():
http = new AtiveXObject('Microsoft.XMLHTTP');
````
  