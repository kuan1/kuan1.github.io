---
title: centos系统yum命令错误rpmdb open failed
date: 2021-03-15 10:42:03
---
```bash
# 重新生成db文件
cd /var/lib/rpm
rm -f __db.*
rpm --rebuilddb
yum clean all 

# 查看是否成功
yum --help 
```
  