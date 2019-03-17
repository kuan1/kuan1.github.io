---
title: prototype、_proto_和constructor的关系
date: 2016-12-15
---
#### 构造函数创建对象  
```
function Person() {
 
}
var person = new Person();
person.name = 'name';
console.log(person.name) // name
```

#### prototype
> 每一个函数都有一个prototyp属性  

```
function Person() {
 
}

// prototype是函数才会有的属性
Person.prototype.name = 'name';
var person1 = new Person();
var person2 = new Person();
console.log(person1.name) // name
console.log(person2.name) // name

//函数的prototype属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型,也就是这个例子中的person1和person2的原型。
//每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型”继承”属性。
```

#### \__proto__
> 每一个JavaScript对象(除了null)都具有的一个属性，叫__proto__，这个属性会指向该对象的原型。

#### constructor  
> 每个原型都有一个constructor属性指向关联的构造函数

```
function Person() {
 
}
console.log(Person === Person.prototype.constructor); //true
```

#### 实例与原型
> 当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止。
  