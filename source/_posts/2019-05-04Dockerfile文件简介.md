---
title: Dockerfile文件简介
date: 2019-05-04 23:37:58
---
## Dockerfile

```bash
# 依赖镜像
FROM <image> [AS <name>]

# 备注
LABEL <key>=<value> <key>=<value> <key>=<value> 

# 添加文件
ADD hom* /workdir/ # 复制文件到容器

# 复制文件
COPY hom* /workdir/ # 复制文件到容器

# 环境变量
ENV

# 运行命令
RUN /bin/bash -c 'source $HOME/.bashrc; echo $HOME'

# 设定的信号停止进程
STOPSIGNAL

# 指定启动系统用户
USER

# 挂在系统文件到容器（放置重启丢失数据）
VOLUME ./mydir:/workdir

# 工作目录
WORKDIR /path/to/workdir

# 暴露变量
EXPOSE <port> [<port>/<protocol>...]
```

变量：${variable} $variable
  
  