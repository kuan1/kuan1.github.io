---
title: vue创建一个body作为父元素的弹窗
date: 2018-07-16 23:42:31
---
> 分别借鉴elementui的dialog和mint-ui的toast组件

#### 最新版弹窗
```
<template>
  <div v-if='visible' class='my-model center-flex'>
    <div @click='close' ref='model' class='bg'></div>
    <div class='wrapper'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      visible: {
        type: Boolean,
        default: true
      },
      appendToBody: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      }
    },
    watch: {
      visible() {
        this.disabledScroll()
      }
    },
    methods: {
      close() {
        this.$emit('close')
      },
      initModel() {
        if (this.appendToBody) {
          document.body.appendChild(this.$el)
        }
      },
      disabledScroll() {
        if (this.visible) {
          this.$nextTick(() => {
            this.$refs.model.ontouchmove = (e) => {
              e.preventDefault()
            }
          })
        }
      }
    },
    mounted() {
      this.initModel()
      this.disabledScroll()
    },
    beforeDestroy() {
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  }
</script>

<style lang='scss' scoped>
  .my-model {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
  }

  .wrapper {
    position: relative;
    z-index: 1;
    background: white;
  }
</style>

```


#### 老版本弹窗
model.js
```
import Vue from 'vue'

const Model = Vue.extend(require('./MyModel').default)
let instance

export default {
  show(component) {
    if (!instance) {
      // 第一次创建
      instance = new Model({
        el: document.createElement('div')
      })
      document.body.appendChild(instance.$el)
      instance.componentName = component
    } else {
      // 已经创建
      if (instance.visible) return
      instance.componentName = component
      instance.visible = true
    }
  },

  close() {
    if (instance) {
      instance.visible = false
    }
  }
}

```
组件
```
<template>
  <div v-if='visible' class='my-model center-flex'>
    <div @click='close' ref='model' class='bg'></div>
    <div class='wrapper'>
      <component v-if='componentName' :is='componentName'></component>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: true,
        componentName: ''
      }
    },
    methods: {
      close() {
        this.visible = false
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.model.ontouchmove = (e) => {
          e.preventDefault()
        }
      })
    }
  }
</script>

<style lang='scss' scoped>
  .my-model {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .bg {
    display: block;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
  }

  .wrapper {
    position: relative;
    z-index: 1;
    background: white;
  }
</style>

```

  