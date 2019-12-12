---
title: linux设置Swap分区的大小
date: 2019-10-15 16:22:42
---
### 查看Swap分区详情
```bash
swapon -s
free -m
```

### 添加Swap分区
```bash
dd if=/dev/zero of=/swapfile bs=1M count=2048
mkswap /swapfile
# chmod 600 /swapfile 
swapon /swapfile 
free -m
```

### 关闭和开启Swap分区
```bash
# 关闭
swapoff -a
# 开启
swapon -a
```

### 查看使用swap的权重
```bash
cat /proc/sys/vm/swappiness
vim /etc/sysctl.conf
# 加入一行：vm.swappiness=0
```

### 开机启动
```bash
vim /etc/fstab
# 加入一行：/swapfile swap swap defaults 0 0
```

###刷新Swap
```
# 刷新
swapoff -a && swapon -a
# 重启
sysctl -p 
```
  