---
title: linux mysql 安装
date: 2017-08-03 22:58:35
---
## mysql安装

- 下载  

```bash
wget http://repo.mysql.com/mysql-community-release-el6-5.noarch.rpm
rpm -Uvh mysql-community-release-el6-5.noarch.rpm
```

- 安装  

```bash
yum -y install mysql mysql-server
``

- 在配置文件中加入以下配置  

```bash
vi /etc/my.cnf  
lower_case_table_names=1  
character_set_server=utf8    
[client]  
default-character-set=utf8
```

- 启动

```bash
service mysqld start
```

- 重启

```bash
service mysqld restart
```

- 创建用户和实例（注意加分号！！！)

```bash
mysql -uroot -p

> use mysql;
> update user set password=PASSWORD('xxxx') where user='root';
> create user xxx@'%' identified by 'xxxx';
> create database xxxx;
> grant all privileges on *.* to xxxx@'%' identified by 'xxxx';
> flush privileges;
```

  