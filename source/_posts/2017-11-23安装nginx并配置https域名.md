---
title: 安装nginx并配置https域名
date: 2017-11-23 23:02:49
---
#### 安装nginx：
> yum install nginx -y

#### 配置静态页面
```
server {
        listen 80;
        server_name baidu.com;
        root /opt/test/;
        index index.html;
}
```
#### 配置ssl证书

* SSL 证书(解压后 Nginx 目录分别以 crt 和 key 作为后缀的文件)通过上传/etc/nginx目录
* Nginx 配置目录在 /etc/nginx/conf.d，我们在该目录创建 ssl.conf


```
server {
    listen 443;
    server_name www.example.com; # 改为绑定证书的域名
    # ssl 配置
    ssl on;
    ssl_certificate 1_www.example.com_bundle.crt; # 改为自己申请得到的 crt 文件的名称
    ssl_certificate_key 2_www.example.com.key; # 改为自己申请得到的 key 文件的名称
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:8765;
    }
}

# WebSocket 配置
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
        listen 443;
        server_name www.example.com; # 改为绑定证书的域名
        # ssl 配置
        ssl on;
        ssl_certificate 1_www.example.com_bundle.crt; # 改为自己申请得到的 crt 文件的名称
        ssl_certificate_key 2_www.example.com.key; # 改为自己申请得到的 key 文件的名称
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;

        # WebSocket 配置
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        location / {
            proxy_pass http://127.0.0.1:8765;
        }
    }
```

  