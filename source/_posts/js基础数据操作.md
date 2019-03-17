---
title: js基础数据操作
date: 2016-07-09
---
## json数据： 
> JSON 对象使用在大括号({})中书写，对象可以包含多个 key/value（键/值）对。
> key 必须是字符串，value 可以是合法的 JSON 数据类型（字符串, 数字, 对象, 数组, 布尔值或 null）。
> key 和 value 中使用冒号(:)分割。
> 每个 key/value 对使用逗号(,)分割。

* JSON.stringify(obj) ：json数据转换成字符串
* JSON.parse(str) ：字符串形式的数据转换成json数据
* obj[i] = m : 修改i位置的值
* delete obj[i]：删除i位置的json数据
* Object.assign(a, b); 合并对象
* Object.values();  Object.keys();

* for(var i in obj){console.log(i,obj[i])}:遍历json中的数据
* obj.i、obj['i']：obj对应i位置的值

## 数组操作：  
* 声明数组：var arr = []; var arr = new Array()

* arr[3] = '增加/修改'：数组增改;
* arr.unshift(“增加数据”)：在开头增加数据
* arr.shift()：开头删除数据
* arr.push('添加数据') ： 结尾删除数据
* arr.pop() : 结尾删除数据
* slice(start,end):从开始下标到结束下标
* delete arr[i]：删除对应下标数据，其他数据下标不变
* splice(index,howmany,item1,item2...)：在index的位置删除howmany个数据，添加tiem数据
* arr.reverse()：数据倒序显示
* arr.sort()：基础排序
* arr.filter：后边跟方法
* arr.map：遍历
* arr.forEach: 遍历（没有返回值）  
* arr.find：找到一个对象或者null  

* arr.indexOf('ss')：ss在数组中第一次出现的下标

* for(var i in arr){}：数组遍历
* arr.forEach(function(value,index,array){})：数组的遍历

* c = a.concat(b)：合并数组

* join：将数组转化成字符串

## 字符串的操作：
* 字符串的声明方法：var str = 'abcd' 或者 var str = new String('abcd')

* str.length：字符串长度
* str.indexOf('b')：b第一次出现在字符串中的位置
* str.lastIndexOf('b'):b最后出现的位置
* str.charAt(i)：对应下标的字母
* str.split('m')：以m截短字符串为数组
* str.substring(m， n)：从m下标开始，第二个参数表示截取到字符串的第n位
* str.substr(m， n)：从m下标开始，第二个参数表示截取n位

* str.match('m')：查询字符串中第一次m出现的信息
* str.match(/m/ig)：查询字符串全部m
* str.replace('m','*')：用*替换第一个出现的m
* str.replace(/m/ig,'*')：用*替换所有m

##  Math是JS中用于处理数学操作的对象
* round():四舍五入；ceil():向上取整；floor:向下取整；max()：最大值；min():最小值；

```
// 扩展，获取数组中的最大数、最小数
var arr = [1,5,1,2,4,32,7,4,3,3,7,32, -12];
console.log(Math.max.apply(null, arr));
console.log(Math.min.apply(null, arr));
Math.pow(2,3);// 8
Math.sqrt(144);// 12
 
```


  