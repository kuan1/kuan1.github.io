---
title: 使用docker安装mysql数据库
date: 2019-05-04 23:51:56
---
## 安装mysql步骤
```bash
# 创建服务
docker swarm init

# 创建应用
docker stack deploy -c docker-stack.yml <kuan-mysql>

# 列出与应用关联的服务
#  (服务启动成功之后就可以用yml文件中设置的账号密码，访问数据库了)
docker services ls

# 查看日志
docker logs <service-id>

# 停止mysql
docker stack rm <kuan-mysql>
```

#### docker-stack.yml
```bash
version: "3.7"
services: 
  kuan-mysql:
    image: mysql:5.6.44  # 一直使用5.6版本，没有升级
    deploy: 
     replicas: 1
     restart_policy:
      condition: on-failure
    environment:
      MYSQL_USER: <设置mysql登录账号>
      MYSQL_PASSWORD: <设置mysql登录密码>
    volumes:
      - <宿主机数据保存地址>:/var/lib/mysql
    ports: # 暴露出连接的端口号
      - "3306:3306"
```
  