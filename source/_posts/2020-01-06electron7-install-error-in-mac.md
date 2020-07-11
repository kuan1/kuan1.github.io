---
title: electron7 install error in mac
date: 2020-01-06 09:27:22
---
## 安装electron报错
> `electron Response code 404 (Not Found)`

### 解决方案
```bash
vi ~/.npmrc

# 末尾加入
electron_mirror=https://cdn.npm.taobao.org/dist/electron/
```

### [electron/issues](https://github.com/electron/electron/issues/20841)
  