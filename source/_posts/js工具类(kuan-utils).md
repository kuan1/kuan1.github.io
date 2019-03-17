---
title: js工具类(kuan-utils)
date: 2017-12-19 17:14:18
---

> <来自https://mp.weixin.qq.com/s/HytDNo6rbp1oxEguaHP0mA>

#### cookie

```
function getCookie(name) {
  var arr = document.cookie.replace(/s/g, '').split(';');
  for (var i = 0; i < arr.length; i++) {
    var tempArr = arr[i].split('=');
    if (tempArr[0] == name) {
      return decodeURIComponent(tempArr[1]);
    }
  }
  return '';
}

module.exports = getCookie;

function removeCookie(name) {
  // 设置已过期，系统会立刻删除cookie
  setCookie(name, 'mousewheel.js', -1);
}

module.exports = removeCookie;

function setCookie(name, value, days) {
  var date = new Date();
  date.setDate(date.getDate() + days);
  document.cookie = name + '=' + value + ';expires=' + date;
}

module.exports = setCookie;
```

#### 判断设备类型
```
module.exports = function isPc() {
  return !(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent));
};

```

#### 获取url参数
```
function getQueryString(name) {
  var reg = new RegExp('(^|&)'+ name +'=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if(r!=null) return unescape(r[2]); return null;
}

module.exports = getQueryString;

function parseQueryString(url) {
    url = url == null ? window.location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (!search) {
        return {}
    }
    return JSON.parse('{'' + decodeURIComponent(search).replace(/'/g, '\'').replace(/&/g, '','').replace(/=/g, '':'') + ''}')
}

module.exports = parseQueryString

```

#### 对象序列化
```
function stringfyQueryString(obj) {
  if (!obj) return '';
  var pairs = [];

  for (var key in obj) {
    var value = obj[key];

    if (value instanceof Array) {
      for (var i = 0; i < value.length; ++i) {
        pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
      }
      continue;
    }

    pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
  }

  return pairs.join('&');
}
```

#### 判断是否是邮箱
```
function isEmail(str) {
  return /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(str);
}

module.exports = isEmail;

```

#### 判断是否是身份证
```
function isEmail(str) {
  return /w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*/.test(str);
}

module.exports = isEmail;
```

#### 判断是否是手机号
```
function isPhoneNum(str) {
  return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str);
}

module.exports = isPhoneNum;
```

#### 判断是否是url
```
function isUrl(str) {
  return /[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}([-a-zA-Z0-9@:%_+.~#?&//=]*)/i.test(str);
}

module.exports = isUrl;
```
#### 获取随机颜色
```
function randomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

module.exports = randomColor;
```

#### 获取随机数字
```
function randomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}

module.exports = randomColor;
```

#### 距离现在时间
```
function formatPassTime(startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);
  if (year) return year + '年前';
  if (month) return month + '个月前';
  if (day) return day + '天前';
  if (hour) return hour + '小时前';
  if (min) return min + '分钟前';
  else return '刚刚';
}

module.exports = formatPassTime;

function formatRemainTime(endTime) {
  var startDate = new Date(); //开始时间
  var endDate = new Date(endTime); //结束时间
  var t = endDate.getTime() - startDate.getTime(); //时间差
  var d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }
  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
}

module.exports = formatRemainTime;
```
#### 深拷贝
```
function deepClone(values) {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == values || 'object' != typeof values) return values;

    // Handle Date
    if (values instanceof Date) {
        copy = new Date();
        copy.setTime(values.getTime());
        return copy;
    }

    // Handle Array
    if (values instanceof Array) {
        copy = [];
        for (var i = 0, len = values.length; i < len; i++) {
            copy[i] = deepClone(values[i]);
        }
        return copy;
    }

    // Handle Object
    if (values instanceof Object) {
        copy = {};
        for (var attr in values) {
            if (values.hasOwnProperty(attr)) copy[attr] = deepClone(values[attr]);
        }
        return copy;
    }

    throw new Error('Unable to copy values! Its type isn't supported.');
}

module.exports = deepClone
```

### 判断object是否是空的
```
function isEmptyObject(obj) {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj))
    return false;
  return !Object.keys(obj).length;
}

module.exports = isEmptyObject;
```

#### 判断滚轮方向
```
function mousewheel(obj, downfn, upfn) {
		obj.onmousewheel = fn;
		if (obj.addEventListener) {
			obj.addEventListener('DOMMouseScroll', fn, false);
		}

		function fn(ev) {
			var ev = ev || event;
			var b = true;
			if (ev.wheelDelta) {
				b = ev.wheelDelta > 0;
			} else {
				b = ev.detail < 0;
			}
			if (b) {
				upfn && upfn();
			} else {
				downfn && downfn();
			}
			if (ev.preventDefault) {
				ev.preventDefault();
			}
			return false;
		}
	}
```
  