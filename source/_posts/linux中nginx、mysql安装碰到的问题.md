---
title: linux中nginx、mysql安装碰到的问题
date: 2019-01-14 23:44:42
---
服务器到期新买了一台服务器，记录一下重新安装基本环境碰到了一些问题

## 安装nginx
#### 1. 启动失败
`403 forbidden nginx`

解决方案：（个人使用直接用了root账号，修改对应nginx启动用户）  
* vi conf/nginx.conf  
* user 改成对应用户

---

#### 2. 重启失败

```
/var/log/nginx 日志文件：
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:80 failed (98: Address already in use)
nginx: [emerg] bind() to 0.0.0.0:443 failed (98: Address already in use)
nginx: [emerg] bind() to [::]:80 failed (98: Address already in use)
nginx: [emerg] still could not bind()
```


解决方案：杀死80端口nginx程序重新启动：  
* lsof -i :80  （发现是nginx在占用）  
* kill [pid] 

---

## mysql启动卡在启动命令
```
cat /var/log/mysqld.log 日志：
2019-01-14 23:13:29 6051 [Note] InnoDB: Using atomics to ref count buffer pool pages
2019-01-14 23:13:29 6051 [Note] InnoDB: The InnoDB memory heap is disabled
2019-01-14 23:13:29 6051 [Note] InnoDB: Mutexes and rw_locks use GCC atomic builtins
2019-01-14 23:13:29 6051 [Note] InnoDB: Memory barrier is not used
2019-01-14 23:13:29 6051 [Note] InnoDB: Compressed tables use zlib 1.2.11
2019-01-14 23:13:29 6051 [Note] InnoDB: Using Linux native AIO
2019-01-14 23:13:29 6051 [Note] InnoDB: Using CPU crc32 instructions
2019-01-14 23:13:29 6051 [Note] InnoDB: Initializing buffer pool, size = 128.0M
InnoDB: mmap(137363456 bytes) failed; errno 12
2019-01-14 23:13:29 6051 [ERROR] InnoDB: Cannot allocate memory for the buffer pool
2019-01-14 23:13:29 6051 [ERROR] Plugin 'InnoDB' init function returned error.
2019-01-14 23:13:29 6051 [ERROR] Plugin 'InnoDB' registration as a STORAGE ENGINE failed.
2019-01-14 23:13:29 6051 [ERROR] Unknown/unsupported storage engine: InnoDB
2019-01-14 23:13:29 6051 [ERROR] Aborting
```

[解决方案：(以下是网上答案)](https://blog.csdn.net/sxyandapp/article/details/77091007)
* dd if=/dev/zero of=/swap bs=1M count=512  # 创建一个swap文件，大小为512M
* mkswap /swap                              # 将swap文件变为swap分区文件
* swapon /swap                              # 将其映射为swap分区

* vi /etc/fstab # 在其中添加如下一行
`/swap swap swap defaults 0 0`
  