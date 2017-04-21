---
title: js容易混淆的几个函数
date: 2017-02-27 21:35:11
categories: "前端开发"
tags:
	- Javascript
---

今天我来为大家介绍一下Javascript中比较容易混淆的几个函数。

## call和apply

在Javascript中，call和apply都是用另一个对象替换当前对象的方法。

### call()

#### 定义

call方法用来调用一个对象的一个方法，以另一个对象来替换当前对象。

#### 例子1

``` bash
function add(a, b){
	return a + b;
}
function sub(a, b){
	return a - b;
}
var result = add.call(sub, 8, 5);
var result2 = sub.call(add, 8, 5);
console.log(result);	//13
console.log(result2);	//3
```

#### 解释

这段代码的意思就是：用add来替换sub，add.call(sub, 8, 5) == add(8,5);所以结果result为13。sub.call(add, 8, 5) == sub(8,5);所以结果result2为3.

#### 例子2

如果你还是看不懂，那么我再来举个例子，代码如下：

``` bash
function fn1(){
	this.a = 1;
	this.b = 2;
	this.add = function(){
		return this.a + this.b;
	}
}
function fn2(){
	this.a = 3;
	this.b = 4;
}
var f1 = new fn1();
var f2 = new fn2();
var result = f1.add.call(f2);
console.log(result);	// 7
```

#### 解释

上边的代码，很明显 fn2 中并没有add函数，我们这里使用了继承的方法，通过继承fn1方法中的add函数，对fn2来实现add的功能。这个应该可以看得懂了吧！

### apply()

#### 定义

apply方法用来调用一个对象的一个方法，以另一个对象来替换当前对象。

是不是发现apply()方法和call()方法的定义一模一样。没错，这里不是我写错了，而是它们确实用法一模一样。

** 唯一的区别就是，call方法的第二个参数及之后的参数可以是任意类型，而apply的第二个参数必须是数组形式。**

#### 例子1

我们用上面call的例子来写一下apply方法。

``` bash
function add(a, b){
	return a + b;
}
function sub(a, b){
	return a - b;
}

var result1 = add.apply(sub, [8, 5]);
var result2 = sub.apply(add, [8, 5]);
//var result3 = add.apply(sub, 8, 5);
//var result4 = sub.apply(add, 8, 5);

console.log(result1);	//13
console.log(result2);	//3
//console.log(result3);	//报错
//console.log(result4);	//报错
```

#### 解释

这段代码的意思就是：用add来替换sub，add.apply(sub, [8, 5]) == add(8,5);所以结果result为13。sub.apply(add, [8, 5]) == sub(8,5);所以结果result2为3.

#### 例子2

``` bash
function fn1(){
	this.add = function(a,b){
		return a + b;
	};
}
function fn2(){
}

var f1 = new fn1();
var f2 = new fn2();
var result1 = f1.add(1,2);
var result2 = f1.add.apply(f2,[3,4]);
console.log(result1);	//3
console.log(result2);	//7
```

上面例子中，函数fn2并没有add方法，但是我们可以通过apply函数调用fn1函数中的add方法，实现继承。

## typeof和instanceof

在Javascript中，有这样两个用来判断数据类型的方法，typeof和instanceof。

### typeof

#### 说明

typeof方法可以用来检测变量的数据类型，它有6个可能的返回值：
1. 'string'       ---------字符串类型
2. 'number'       ---------数值类型
3. 'object'       ---------对象类型或数组类型或null
4. 'boolean'      ---------布尔值，true或false
5. 'undefined'    ---------未定义或未赋值
6. 'function'     ---------函数或方法。

#### 代码

``` bash
var str = 'abc';
var num = 123;
var s = '123';
var arr = [1,2,3];
var obj = {name:'John',sex:'man'};
var bool = true;
var nothing;
var nul = null;
var fn = function(){};

console.log(typeof str);	//string
console.log(typeof num);	//number
console.log(typeof s);		//string
console.log(typeof arr);	//object
console.log(typeof obj);	//object
console.log(typeof bool);	//boolean
console.log(typeof nothing);//undefined
console.log(typeof nul);	//object
console.log(typeof fn);		//function
console.log(typeof aaa);	//undefined
```

### instanceof

#### 说明

instanceof 方法用来检测变量的数据类型是否为要检测的收据类型，它只有2个可能的返回值：
true 或 false，即布尔值。

#### 代码

``` bash
var str = 'abc';
var num = 123;
var s = new String('123');
var n = new Number(123);
var obj = {};
var arr = [];

console.log(str instanceof String);	//false
console.log(num instanceof Number);	//false
console.log(s instanceof String);	//true
console.log(n instanceof Number);	//true
console.log(obj instanceof Object);	//true
console.log(arr instanceof Array);	//true
```

#### 注意

从上面的代码可以看出，instanceof确实只返回一个布尔值。而且，要注意的是：
** instanceof只能用来判断对象和函数，不能用来判断字符串和数字等 **

