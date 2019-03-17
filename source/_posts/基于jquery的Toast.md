---
title: 基于jquery的Toast
date: 2016-07-17
---
> 基于jquery的Toast  

```
(function ($, win) {
  var style = document.createElement('style');
  var toastDiv = document.createElement(('div'));
  toastDiv.className = 'toast';
  style.innerHTML = '.toast {
' +
    '  position: fixed;
' +
    '  left: 50%;
' +
    '  top: 50%;
' +
    '  text-align: center;
' +
    '  max-width: 300px;
' +
    '  line-height: 20px;
' +
    '  vertical-align: middle;
' +
    '  vertical-align: auto;
' +
    '  zoom: 1;
' +
    '  transition: all 0.3s ease;
' +
    '  font-family: '微软雅黑','Microsoft Yahei';
' +
    '  -moz-user-select: -moz-none;
' +
    '  -ms-user-select: none;
' +
    '  -webkit-user-select: none;
' +
    '  user-select: none;
' +
    '  word-wrap: break-word;
' +
    '  padding: 10px 20px;
' +
    '  background: rgba(7,17,27,0.66);
' +
    '  background-radius: 6px;
' +
    '  color: white;
' +
    '  -webkit-transform: translate3d(-50%,-50%,0);
' +
    '  -moz-transform: translate3d(-50%,-50%,0);
' +
    '  transform: translate3d(-50%,-50%,0);
' +
    '  display: none;' +
    '}';
  document.getElementsByTagName('head')[0].appendChild(style);
  document.body.appendChild(toastDiv);
  win.toast = function(content, time) {
    time = time || 2000;
    if (win.toastTimer) clearTimeout(win.toastTimer);
    $(toastDiv).html(content);
    $(toastDiv).show();
    win.toastTimer = setTimeout(function () {
      $(toastDiv).fadeOut();
    }, time)
  }
})($, window);

```
  