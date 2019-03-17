---
title:  js 驼峰命名和下划线互换
date: 2017-03-03
---
```
// 下划线转换驼峰
function toHump(name) {
    return name.replace(/\_(w)/g, function(all, letter){
        return letter.toUpperCase();
    });
}
// 驼峰转换下划线
function toLine(name) {
  return name.replace(/([A-Z])/g,'_$1').toLowerCase();
}


// 测试
let a = 'a_b2_345_c2345';
console.log(toHump(a));

let b = 'aBdaNf';
console.log(toLine(b));
```
  