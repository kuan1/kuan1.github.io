---
title: vue自定义指令(元素出现在可视区域添加class)
date: 2018-07-16
---
#### 自定义指令(元素出现在可视区域添加class)
```
export default {
  inserted: function (el, binding) {
    // 聚焦元素
    binding.addClass = () => {
      const { top } = el.getBoundingClientRect()
      const h = document.documentElement.clientHeight || document.body.clientHeight
      if (top < h) {
        el.className = binding.value
        if (binding.addClass) {
          window.removeEventListener('scroll', binding.addClass)
        }
      }
    }

    window.addEventListener('scroll', binding.addClass)

    binding.addClass()
  },
  unbind: function (el, binding) {
    if (binding.addClass) {
      window.removeEventListener('scroll', binding.addClass)
      console.log('取消事件绑定')
    }
  }
}

```

#### 使用
```
    <h2 v-class=''animated fadeInUp'' v-for='item in 1000' :key='item'>测试测试测试</h2>
```
  