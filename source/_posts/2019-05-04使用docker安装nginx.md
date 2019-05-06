---
title: 使用docker安装nginx
date: 2019-05-04 23:46:44
---
## 安装nginx步骤
```bash
# 创建服务
docker swarm init

# 创建应用
docker stack deploy -c docker-stack.yml <kuan-nginx>

# 列出与应用关联的服务
docker services ls

# 查看日志
docker logs <service-id>

# 停止nginx
docker stack rm <kuan-nginx>
```

#### docker-stack.yml
```bash
version: "3.7"
services: 
  kuan-nginx:
    image: nginx:stable-alpine
    deploy: 
     replicas: 1 # 启动一个实例（负载均衡、可以是多个）
     restart_policy:
      condition: on-failure
	  # 配置文件 挂载在宿主机(也可以定制静态文件地址）
    volumes:
      - <本地配置地址>:/etc/nginx/conf.d
    # 使用本机host网络、防止nginx不能获取到正确前端ip
    ports:
      - target: 80
        published: 80
        mode: host
      - target: 443
        published: 443
        mode: host
```
  