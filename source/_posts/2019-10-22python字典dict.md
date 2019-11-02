---
title: python字典dict
date: 2019-10-22 23:00:57
---
#### python字典dict练习
```python
# 字典相当于js中的JSON
a = {}
print(a, type(a))
a = dict(a=1, b=2, c=3)
print(a, type(a))

# 结构： {key: value}
a = {'a': 1, 'b': '2', 'c': 3}
print(a)

# 根据key获取value, 不可以只用不存在的key
a = {'a': 1, 'b': '2', 'c': 3}
print(a['a'])

# 字典转换 双值序列、子序列
a = [('a', 1), ('b', 2)]
print(dict(a))

# 获取健值对
a = {'a': 1, 'b': 2}
print(len(a))

# in: 字典中是否有健； not in
a = {'a': 1, 'b': 2}
print('c' in a, 'a' in a)

# 不知道是否存在key，可以通过get获取
a = {'a': 1}
print(a.get('b', '默认值'))

# 修改或者添加字典
a = {'a': 1}
a['b'] = 3
print(a)

# setDefault，有不做行为，没有修改
a = {'a': 1}
a.setdefault('a', 2)
a.setdefault('b', 2)
print(a)

# update 合并字典 a修改、b不修改
a = {'a': 1, 'b': 2}
b = {'b': 1, 'c': 2}
a.update(b)
print(a, b)

# 删除健值对
a = {'a': 1, 'b': 2}
del a['a']
print(a)

# popitem 删除并返回最后一个，返回元组，空字典删除会报错
a = {'b': 1, 'a': 2}
print(a.popitem())
print(a)

# pop根据key删除健值对
a = {'b': 1, 'a': 2}
a.pop('a')
print(a)

# pop指定默认值删除不报错，返回默认值
a = {'a': 1}
print(a.pop('b', 2))  # 2
print(a)

# 清空 clear
a = {'a': 1}
a.clear()
print(a)

# 浅拷贝
a = {'a': 1}
b = a.copy()
print(a is b, a == b)

# 遍历字典
# keys 返回所有的key
a = {'a': 1, 'b': 2, 'c': 3}
for key in a.keys():
    print(key, a[key])

# values 返回所有的value
for key in a.values():
    print(key)

# items 返回所有的双值子序列
for item in a.items():
    print(item)

```
  