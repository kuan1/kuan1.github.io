---
title: nodeJs使用knex操作数据库（基础）
date: 2017-08-18 21:17:47
---
* [knex官网](https://knexjs.org/)

### knex入门
```js
const configs = require('../../config');

module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: configs.mysql.host,
    port: configs.mysql.port,
    user: configs.mysql.user,
    password: configs.mysql.pass,
		database: configs.mysql.db,
  }
});

```

### 基础查询

```js
knex.column('title', 'author', 'year').select().from('books')

// select 'title', 'author', 'year' from 'books'
```
### 基础插入
```
knex('user')
  .returning('id')
  .insert({name: '名字'})

// insert into 'user' ('name') values ('名字') returning 'id'
```

### 修改

```js
knex('books')
.where('published_date', '<', 2000)
.update({
  status: 'archived',
  thisKeyIsSkipped: undefined
})

// update 'books' set 'status' = 'archived' where 'published_date' < 2000
```

### 删除

```js
knex('accounts')
.where('activated', false)
.del()

// delete from 'accounts' where 'activated' = false

knex('accounts').truncate(); // 清空表

```

### 排序

```js
knex('users').orderBy('name', 'desc')

// select * from 'users' order by 'name' desc
```

### 模糊查询 like

```js
knex('users').where('columnName', 'like', '%rowlikeme%')
Outputs:
select * from `users` where `columnName` like '%rowlikeme%'
```

### 运算

> count(column)   
> min(column)  
> max(column)   
> sum(column)  
> avg(column)	
> increment(column, amount)	
> decrement(column, amount)

### 关闭连接
>   knex.destroy();
  