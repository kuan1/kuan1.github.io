---
title: js使用encodeURIComponent实现PHP的rawurlencode
date: 2020-06-11 16:21:10
---
### js使用encodeURIComponent实现PHP的rawurlencode
```js
function rawurlencode(str = "") {
  const replaceList = [
    { reg: /!/g, value: '%21' },
    { reg: /\*/g, value: '%2A' },
    { reg: /\(/g, value: '%28' },
    { reg: /\)/g, value: '%29' },
    { reg: /'/g, value: '%21' },
  ];
  let resStr = encodeURIComponent(str);
  replaceList.forEach(({ reg, value }) => {
    resStr = resStr.replace(reg, value);
  });
  return resStr;
}
```
  