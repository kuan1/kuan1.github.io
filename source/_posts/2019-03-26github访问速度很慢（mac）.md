---
title: github访问速度很慢（mac）
date: 2019-03-26 22:57:55
---
公司和家里的电脑访问github一直很快，最近几天家里边的电脑访问速度很慢，速度一秒一k地速度，实在受不了。网上看到了这个修改host文件的方法很管用，github访问和下载速度变得很快  
[简书](https://www.jianshu.com/p/bb3bb7e57216)

#### 打开终端，编辑hosts文件
```bash
sudo vim /etc/hosts
```

#### 添加以下内容
```bash
# github
151.101.185.194 github.global.ssl.fastly.net
192.30.253.112 github.com 
151.101.112.133 assets-cdn.github.com 
151.101.184.133 assets-cdn.github.com 
185.199.108.153 documentcloud.github.com 
192.30.253.118 gist.github.com
185.199.108.153 help.github.com 
192.30.253.120 nodeload.github.com 
151.101.112.133 raw.github.com 
23.21.63.56 status.github.com 
192.30.253.1668 training.github.com 
192.30.253.112 www.github.com 
151.101.13.194 github.global.ssl.fastly.net 
151.101.76.133     raw.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
```

#### 刷新dns
```bash
dscacheutil -flushcache
```
  