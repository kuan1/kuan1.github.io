---
title: 基础mysql操作
date: 2017-09-03
---
## 数据操作
```
查询： select name, age from students where sex='男' limit 1,5 desc;
模糊查询： SELECT * FROM students where addr like '%东京%'

增加： insert into student (name,sex,age) values ('名字','男',11); 

删除： delete from student;

更新： update student set age=110 where name='小明';

更新时间：
DATE_ADD(date,INTERVAL expr type)
DATE_SUB(date,INTERVAL expr type)
```
## 数据统计
```
SELECT MIN(balance) from kuan_balance GROUP BY YEAR(create_time),MONTH(create_time),DAY(create_time)

mysql('kuan_balance')
  .select(knex.raw('MIN(balance)'))  .groupByRaw('YEAR(create_time),MONTH(create_time),DAY(create_time)')
  .limit(1).offset(0);


查询今天的信息记录：
select * from `article` where to_days(`add_time`) = to_days(now());


查询昨天的信息记录：
select * from `article` where to_days(now()) – to_days(`add_time`) <= 1;


查询近7天的信息记录：
select * from `article` where date_sub(curdate(), INTERVAL 7 DAY) <= date(`add_time`);


查询近30天的信息记录：
select * from `article` where date_sub(curdate(), INTERVAL 30 DAY) <= date(`add_time`);


查询本月的信息记录：
 select * from `article` where date_format(`add_time`, ‘%Y%m') = date_format(curdate() , ‘%Y%m');
 
查询上一月的信息记录：
select * from `article` where period_diff(date_format(now() , ‘%Y%m') , date_format(`add_time`, ‘%Y%m')) =1;

查询当前这周的数据 
SELECT name,submittime FROM enterprise WHERE YEARWEEK(date_format(submittime,'%Y-%m-%d')) = YEARWEEK(now()); 


查询上周的数据 
SELECT name,submittime FROM enterprise WHERE YEARWEEK(date_format(submittime,'%Y-%m-%d')) = YEARWEEK(now())-1; 

查询本季度数据 
select * from `ht_invoice_information` where QUARTER(create_date)=QUARTER(now()); 

#查询上季度数据 
select * from `ht_invoice_information` where QUARTER(create_date)=QUARTER(DATE_SUB(now(),interval 1 QUARTER)); 

#查询本年数据 
select * from `ht_invoice_information` where YEAR(create_date)=YEAR(NOW()); 

#查询上年数据 
select * from `ht_invoice_information` where year(create_date)=year(date_sub(now(),interval 1 year)) 
```



## 数据库

#### 进入mysql 命令行
```
mysql -uroot -p
```

#### 查看所有数据库
```
show databases
```

#### 创建数据库
```
create database db_name charset utf8;
```
#### 删除数据库
```
drop database db_name
```
#### 选择数据库
```
use databases
```

#### 查看所有表
```
show tables
```
#### 查看创建数据库的语句
```
show create database databasename
```
#### 查看创建表的语句
```
show create table tablename
```
#### 查看表结构
```
desc tablenmae
```

  