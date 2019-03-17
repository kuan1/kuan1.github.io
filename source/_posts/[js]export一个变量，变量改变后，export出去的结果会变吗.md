---
title: [js]export一个变量，变量改变后，export出去的结果会变吗
date: 2018-09-07
---
## [js]export一个变量，变量改变后，export出去的结果会变吗
> 答案： 会改变

#### test.vue
```
<template>
  <div>
    <button @click="handleClick">添加</button>
  </div>
</template>

<script>
  import {add, num} from './test.js'

  export default {
    methods: {
      handleClick() {
        add() // 添加
        console.log(num) // num会变吗？ 答案是会
      }
    }
  }
</script>

```

#### test.js
```
let num = 0;

const add = () => {
  num += 1
}

export {
  num,
  add
}

```
  