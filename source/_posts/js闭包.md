---
title: js闭包
date: 2017-03-07 17:26:10
categories: "Javascript"
tags: 
	- Javascript
---

本文讲述Javascript的闭包。

## 引言(简单了解js闭包)

在讲述js闭包之前，我们先来说一个简单的例子:

``` bash
var a = 1;
function fn(){
	var b = 2;
	console.log("a: " + a + ", b: " + b);
}
fn();	//a: 1, b: 2
console.log("a: " + a + ", b: " + b);	//a: 1, b: undefined
```

这个相信大家都可以理解，就是变量的作用域，a为定义的全局变量，b为函数fn内部定义的变量,在函数内部，可以获取到全局变量a的值和函数局部变量b的值。在函数外部，不能获取到局部变量b的值。但是，如果我确实想得到函数fn内部的b元素的值呢？

想一想，这个fn其实是一个方法，既然是个方法，那应该可以给这个方法设置一个返回值吧，那如果将这个函数的返回值设置为b元素，会发生什么情况呢？

``` bash
function fn(){
	var b = 5;
	return b;
}
console.log(fn());	//5
```

实践证明，这样是可以获取到b元素值的。没错，这就是最简单的js闭包。

## 正题(js闭包讲解)

### js闭包概念：

官方对闭包的解释是：一个拥有许多变量和绑定了这些变量的环境的表达式（通常是一个函数），因而这些变量也是该表达式的一部分。

是不是有点看不懂？

其实，js闭包就是在外部可以访问函数内部的局部变量、参数或声明的其他内部函数。

可能你会说，那这个算不算闭包呢：

``` bash
function f1(){
	var a = 1;
	
	f2(a);
}

function f2(m){
	console.log(m);
}

f1();	//1
```

那么，你觉得下边这个函数和上边的有什么区别呢:

``` bash
function f1(){
	var a = 1;
	console.log(a);	
}
f1();	//1
```

这个函数和上边的函数其实并没有什么区别，完全可以合并为同一个函数。只不过有时候为了实现代码模块化或组件化，于是将通用的方法封装了起来，以便于方法的重用，所以它并不是闭包。

既然我们已经看到了比较简单的js闭包，那么我们再来加一点难度，看一下下面这段代码：

``` bash
var name = '张三';
var Comp = {
	name : '小张',
	getName : function(){
		return this.name;
	}
}
console.log(Comp.getName());	//小张
```

这个应该比较容易理解，Comp是一个对象，包含一个name属性和一个名为getName的方法，因为getName方法是属于Comp对象的，所以这个this指向Comp对象。因此调用Comp对象中的getName方法，这时候this.name的值应该是"小张"。

再加深一点难度：

``` bash
var name = '张三';
var Comp = {
	name : '小张',
	getName : function(){
		var here = this;
		return function(){
			return here.name;
		}
	}
}
console.log(Comp.getName()());	//小张
```

在这段代码中，定义了here作为getName()方法的局部变量，所以here指的对象并不是window对象，而是Comp对象。但是，由于返回值中有here，所以这个局部变量就一直存在内存中，当调用Comp.getName()()这个方法时，将here从内存中取出来，由于here指的就是Comp对象，所以返回的值就是Comp.name的值。

## 提升(this指向问题)

``` bash
var name = '张三';
var Comp = {
	name : '小张',
	getName : function(){
		return function(){
			return this.name;
		}
	}
}
console.log(Comp.getName()());	//张三
```

为什么这个函数中的this.name返回的是"张三"呢？我们可以先试着运行一下这个

``` bash
console.log(Comp.getName());	//function (){	return this.name;	}
```

这段代码输出的是一段字符串，而这段字符串是一个匿名函数，而且此时并没有执行这个方法，仅仅是返回了构成这个方法的字符串而已。然后调用这段字符串构成的方法，也就相当于调用window下的一个匿名函数。那这样说的话，是不是我可以将上边这个函数改成这个样子呢？

``` bash
var name = '张三';
var Comp = {
	name : '小张',
	getName : function(){
		return noNameFun;
	}
}
var noNameFun = function(){
	return this.name;
}
console.log(Comp.getName()());	//张三
```

可以看出，这个函数确实输出的是"张三",也就是说和上边这个函数是一样的。那我们就明白了，noNameFun()是属于window对象的，那么这个方法的this也属于window对象，所以this.name就代表的是"张三"。

## 闭包的优点

闭包的优点有两个：
1. 可以读取函数内部的变量;
2. 让这些变量的值始终保持在内存中。

## 补充(js闭包内存问题)

在我们的使用中，很多时候都会用到js闭包的概念，尤其是模块化开发。然而，js闭包虽然好用的，但是任何事物都有它的两面性，变量保持在内存中是优点，但也存在这样一个问题：

由于闭包会是函数中的变量一直存在于内存中，导致内存被占用，而如果这样的变量多了的话，会使内存消耗很大。所以，不能滥用闭包，否则会是网页性能变得很差，而且在IE中，有可能导致内存泄露。

什么是内存被占用，我举个例子来说一下：

``` bash
function fn(){
	var n = 1;
	function add(){
		n += 1;
		console.log(n);
	}
	return add;
}
var result = fn();
result();	//2
result();	//3
result();	//4
result();	//5
result();	//6
```

也就是说，这个变量n是一直存在于内存中的，所以每次调用，n就会加1。

## 题外(全局变量和局部变量)

对于全局变量和局部变量，有些新手可能不太明白。

外部声明的变量属于全局变量，方法内部声明的变量属于局部变量。但是如果在方法内部没有用var来声明一个变量，那这个变量应该也是一个全局变量。

``` bash
var n = 1;
function fn(){
	var m = 5;
	t = 10;
	console.log(m);
}

console.log(n);	//5
console.log(m);	//undefined
console.log(t);	//undefined
fn();			//5
console.log(m);	//undefined
console.log(t);	//10
```

为什么在执行fn()函数之前打印"t"这个全局变量会输出"undefined"呢？这个"t"到底是不是全局变量？

我们可以想一下，我现在声明了一个函数，但是我只是定义了这个函数，并没有调用它。那么这个函数内部的方法是不会执行的，也就是说，在我调用方法fn()之前，这个"t"是并没有被声明的，既然没有被声明，那就肯定会输出"undefined"。但是在调用了fn()函数之后，也就执行了函数内部的方法，即：声明了"t"变量。之后，就肯定可以获取到"t"这个全局变量啦。

对于函数里的方法也是一样的。

``` bash
function fn(){
	var n = 1;
	nAdd = function(){
		n += 1;
	}
	function f(){
		console.log(n);
	}
	return f;
}
//nAdd();	//undefined
var result = fn();
result();	//1
nAdd();
result();	//2
nAdd();
result();	//3
```

本章节完！
































