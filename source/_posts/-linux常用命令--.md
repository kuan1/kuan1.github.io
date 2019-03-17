---
title:  linux常用命令  
date: 2017-07-13
---
## linux常用命令  

**shift + g**：来到底部  

**删除文件夹**： rm -fr ‘文件夹名字’  

**删除文件**： rm ‘文件名字’ 

**重命名文件**：mv （原文件） （新文件）

**压缩文件**：tar czvf a.tar ./*

**解压文件**： unzip ‘文件夹名字’   tar (z)xvf '‘文件夹名字’


**查看内存使用**： df -h

**scp上传文件**：  scp (-P  端口号)（上传文件路径） root@106.15.45.126:（上传路径）

**ssh连接服务器**： ssh （-p 端口号） root@106.15.45.126

**设置所有权限**：chmod 777 文件名字


**安装软件**：sudo yum -y '软件'


**选择目录：** cd

**npm仓库重启：**

/root/verfaccio目录下
 nohup verdaccio &

**nexus服务器重启：**

cd /opt/software/nexus-3.2.1-01/bin
/opt/software/nexus-3.2.1-01/bin   
或者  
/bin/systemctl start nginx.service
./nexus restart

**nginx重启：**
cd /etc/nginx/conf.d/default.conf
/usr/sbin/nginx -s reload 重启

 ps -ef | grep nginx 查看主进程号

**数据库重启**：service  mysql  reload 

* 列出所有处于监听状态的tcp端口  
netstat -lt
* 查看所有的端口信息, 包括 PID 和进程名称  
netstat -tulpn

* 查看进程：  
ps -ef | gref java


  