---
title: nginx重定向问题
date: 2017-11-21
---
> 配置nginx重定向，return301后，下次浏览器会直接访问重定向的页面，再次修改配置后需要清除浏览器缓存

```
server {
    listen 80;
    server_name baidu.com;
    return 301 http://www.baidu.com$request_uri;
}
```

> create-react-app 打包之后的文件部署，使用try_files，否则页面无法刷新

```
server {
        listen 80;
        server_name test.baidu.com;
        root /opt/web/test/;
        location / {
          try_files $uri /index.html;
        }
}
```
  