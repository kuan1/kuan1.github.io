---
title: docker删除不在运行container
date: 2019-12-16 11:03:26
---
### docker删除不在运行container
```bash
 docker rm $(docker ps -a -q)
```

### 临时运行加入--rm的参数，停止后会自动删除容器
```bash
# 临时运行node环境
docker run -it --rm node:10.14.2-alpine node
```
  