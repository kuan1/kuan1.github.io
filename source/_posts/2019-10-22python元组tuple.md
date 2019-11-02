---
title: python元组tuple
date: 2019-10-22 23:02:49
---
#### python元组tuple练习

```python
# tuple不可修改列表
my_tuple = ()
print(my_tuple, type(my_tuple))
my_tuple = tuple(range(10))
print(my_tuple)

# 可以省略括号
my_tuple = 1, 2, 3, 4
print(my_tuple)

# 只有一个逗号的时候，必须有一个逗号
my_tuple = (1,)
print(my_tuple)
my_tuple = 1,
print(my_tuple)

# 元组解构
my_tuple = 'a', 'b', 'c'
(a, b, c) = my_tuple
print(a, b, c)

# 解构必须一致
my_tuple = (1, 2, 3, 4, 5, 6)
(a, b, *c) = my_tuple
print(a, b, c)

# 交换变量
a = 1
b = 2
(a, b) = (b, a)
print(a, b)

```
  