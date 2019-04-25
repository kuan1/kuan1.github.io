---
title: vue-cli Invalid Host/Origin header
date: 2018-12-24 12:12:57
---
因为webpack-dev-server升级，vue.config.js需要设置disableHostCheck
```
devServer: {
    disableHostCheck: true
 }

```
  