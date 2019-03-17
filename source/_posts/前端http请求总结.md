---
title: 前端http请求总结
date: 2016-09-22
---
#### 原生js-ajax使用方法
```
varhttp;
window.XMLHttpRequest?
http=newXMLHttpRequest():
http=newAtiveXObject('Microsoft.XMLHTTP');

http.onreadystatechange=function(){
if(http.readyState==400&&http.status==200){
//console.log(http.responseText);
};
get方式：
http.open('GET','http://wthrcdn.etouch.cn/weather_mini?city='+cityName,true);
http.send();
post方式：
http.open('POST','ajax.php',true);
http.setRequestHeader('Content-type','application/x-www-form-urlencodeed');
http.send('uid=12');
```

#### jquery方法
```
// get方法：
$.get(
'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=abcd&cb=?',
'jsonp'
).done(function(data){
console.log(data)})
// post方法：
$.post(
'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?',
{'wd':'火影金刚'},
function(data){
console.log(data);
},
'jsonp'
);

// $.ajax方法:
$.ajax({
url:'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?cb=?',
type:'GET',
data:{'wd':'火车票'},
dataType:'jsonp',
}).done(function(data){ console.logdata });
```


#### js-ajax跨域办法
```
vars=document.createElement('script');
s.src='http://www.kuaidi100.com/query?type=yuantong&postid=560598241336&callback=aaa';
document.body.appendChild(s);
functionaaa(data){
console.log(data)
}

```

  