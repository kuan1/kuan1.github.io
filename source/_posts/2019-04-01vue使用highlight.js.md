---
title: vue使用highlight.js
date: 2019-04-01 11:58:06
---
## vue使用highlight.js
```html
<template>
  <div ref="code" class="code" v-html="html"></div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/androidstudio.css'

export default {
  props: {
    html: {
      type: String,
      default: ''
    }
  },
  watch: {
    html() {
      this.$nextTick(() => {
        this.init()
      })
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const codes = this.$refs.code.querySelectorAll('pre code');
			// 不使用ol样式太丑了
      codes.forEach((block, num) => {
        hljs.highlightBlock(block)
        let i = 1
        const n = (m) => `<em class="line-label">${m > 9 ? m : '0' + m}</em>`
        block.innerHTML = `<div class="line">${n(i)}${block.innerHTML.replace(/\n/g, function (word) {
          i += 1
          return `</div><div class="line">${n(i)}`
        })}</div>`
      })
    }
  }
}
</script>

<style lang="scss">
.hljs {
  .line {
    padding: 0;
		line-height: 1.4;
    .line-label {
      color: #999;
      height: 100%;
      padding: 0 0.8rem 0 0.2rem;
    }
  }
}
</style>

```
  