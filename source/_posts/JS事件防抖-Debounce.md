---
title: JS事件防抖(Debounce)
date: 2019-11-25 17:22:44
categories: "Javascript"
tags: 
  - Javascript
---

# 引言

前端开发中，我们经常会遇到各种各样的频繁事件触发，例如：

- touchmove, resize, scroll
- mousemove, mousedown
- keyup, keydown
- input, change
- ...

如果事件触发的频率很高，而浏览器的响应速度如果跟不上事件的触发频率，则会造成浏览器的卡顿，延迟，假死等情况，影响用户的体验。

# 问题

例如需要根据用户在输入框输入的内容进行ajax请求，进行模糊搜索，我们看一下如下代码：

``` bash
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="text" name="name" id="userName">
	<script type="text/javascript">
		var userName = document.getElementById('userName');
		userName.addEventListener('input', getAjax);
		// 通过ajax方法获取模糊搜索数据
		function getAjax(e){
			console.log('use ajax function', e.target.value, ' time:', new Date().toLocaleTimeString());
		}
	</script>
</body>
</html>
```
输出如下:

{% asset_img img1.png 图片1 %}

可以看出，每输入一个字符，都会引起ajax请求，这样很容易造成浏览器卡死，甚至服务器收到的请求过多而拥挤。

解决这类问题，一般有两种方案：

- **节流(Throttle)**
- **防抖(Debounce)**

# 防抖(Debounce)

本章我们先来讲讲防抖(Debounce)的实现。

## 原理

防抖的原理就是：在事件触发n秒后，再执行事件对应的回调函数，如果这n秒内这个事件被重新触发，则重新计时。即将多次频繁触发的事件合并为一次，并在最后执行。

## 举例

电梯关门(不考虑人手动按开关电梯键的情况)：如果5秒内没有人进出电梯，则电梯自动关门。如果5秒内有人进出电梯，则重新计时，等待5秒。直至超过5秒，则电梯关门。

## 实现

### 基础版

每当事件触发，就重置定时器，直到n秒内再也没有事件触发，则开始执行事件对应的回调函数。

``` bash
userName.addEventListener('input', debounce(getAjax, 1000));
// debounce
function debounce(fn, wait){
	var timeEvent;
	return function(e){
		timeEvent && clearTimeout(timeEvent)
		timeEvent = setTimeout(()=>{
			fn(e)
		}, wait);
	}
}
```

输出如下:

{% asset_img img2.png 图片2 %}

现在我们在输入框输入数据，可以看到，不管事件触发的频率有多高，都是在停止输入的1000ms后才会执行回调函数。

这样就实现了基本的防抖功能，但是这样就引发了this的指向问题。

### 进阶版(解决this指向问题)

我们来输出一下getAjax函数的this指向。

``` bash
userName.addEventListener('input', getAjax);
function getAjax(e){
	console.log(this);
	console.log('use ajax function', e.target.value, ' time:', new Date().toLocaleTimeString());
}
```

在不使用debounce函数的时候，getAjax()函数中this的指向为当前Element元素

{% asset_img img3.png 图片3 %}

``` bash
userName.addEventListener('input', debounce(getAjax, 1000));
```
在使用debounce函数的时候，getAjax()函数中this指向为Window对象

{% asset_img img4.png 图片4 %}

所以我们需要修改一下代码，将this指向为正确的对象

``` bash
function debounce(fn, wait){
	var timeEvent;
	return function(e){
		var _this = this;
		timeEvent && clearTimeout(timeEvent)
		timeEvent = setTimeout(()=>{
		    // 使用call方法改变this的指向
			fn.call(_this, e);
		}, wait);
	}
}
```

这样我们就解决了this指向的问题，但是如果想要使这个方法更通用的话，我们还要解决参数问题。

### 完整版(解决传参问题)

参数问题，可以使用 arguments 来解决

``` bash
function debounce(fn, wait){
	var timeEvent;
	return function(e){
		var _this = this,
		args = arguments;
		timeEvent && clearTimeout(timeEvent)
		timeEvent = setTimeout(()=>{
			fn.call(_this, ...args);
		}, wait);
	}
}
```

这样的话，无论传多少个参数，我们都不需要修改debounce方法。

**到此为止，我们的事件防抖功能已经很完善了，可以用于实际生产了。**

但是为了更加完美，我们接下来需要考虑一个新的需求：

我们不希望等到事件停止触发n秒后才执行回调函数，而是希望立即执行回调函数，然后等到事件停止触发n秒后，才允许重新执行下一次回调函数。

### 增强版(允许立即执行)

我们来添加一个immediate参数来控制是否立即执行回调函数。

``` bash
userName.addEventListener('input', debounce(getAjax, 1000, true));
function debounce(fn, wait, immediate = false){
	var timeEvent;
	return function(){
		var _this = this,
			args = arguments;
		timeEvent && clearTimeout(timeEvent)
		if (immediate) {
			// 如果timeEvent没有值，则立即执行
			var runNow = !timeEvent;
			timeEvent = setTimeout(()=>{
				timeEvent = null;
			}, wait)
			if (runNow) fn.call(_this, ...args);
		}else{
			timeEvent = setTimeout(()=>{
				fn.call(_this, ...args);
			}, wait);
		}
	}
}
```

这样就实现了，事件触发时立即执行回调函数，之后等到停止触发 1000,ms 后，才允许执行下一次事件触发的回调函数。

此时我们要注意一下，getAjax方法可能是有返回值的，所以我们需要加上返回值。

### 增强版(添加返回值)

这里要说明一下，immediate如果是false的话，如果将 fn.call(\_this, ...args) 的返回值赋值给变量result， 由于 setTimeout 的原因，result将一直为 undefined，所以我们只考虑 immediate 为true 的情况

``` bash
function debounce(fn, wait, immediate = false){
	var timeEvent, result;
	return function(){
		var _this = this,
			args = arguments;
		timeEvent && clearTimeout(timeEvent)
		if (immediate) {
			// 如果timeEvent没有值，则立即执行
			var runNow = !timeEvent;
			timeEvent = setTimeout(()=>{
				timeEvent = null;
			}, wait)
			if (runNow) result = fn.call(_this, ...args);
		}else{
			timeEvent = setTimeout(()=>{
				fn.call(_this, ...args);
			}, wait);
		}
		return result;
	}
}
```

### 增强版(取消防抖)

如果设置的事件触发时间间隔较长，导致并没有很好地实现用户体验。比如时间间隔设置的是5秒，则用户只有等待5秒才可以重新触发事件，所以我们需要允许用户根据需要取消防抖，这样就不用让用户再等待5秒钟，就又可以立刻执行了，所以我们将方法改造一下，添加一个取消防抖的接口：

``` bash
function debounce(fn, wait, immediate = false){
	var timeEvent, result;
	var debounced =  function(){
		var _this = this,
			args = arguments;
		timeEvent && clearTimeout(timeEvent)
		if (immediate) {
			// 如果timeEvent没有值，则立即执行
			var runNow = !timeEvent;
			timeEvent = setTimeout(()=>{
				timeEvent = null;
			}, wait)
			if (runNow) result = fn.call(_this, ...args);
		}else{
			timeEvent = setTimeout(()=>{
				fn.call(_this, ...args);
			}, wait);
		}
		return result;
	}
	// 取消防抖
	debounced.cancel = function(){
		console.log('取消防抖');
		timeEvent && clearTimeout(timeEvent)
		timeEvent = null;
	}
	return debounced;
}
```

这样我们就从头到尾实现了一个完整的事件防抖功能debounce。

# 总结

至此，我们已经完整的实现了防抖(Debounce)，下期我们来讲一下事件的节流(Throttle)!

完整代码敬上，大家可以自己试一试：

``` bash
<!DOCTYPE html>
<html lang="zh-CN">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	<input type="text" name="name" id="userName">
	<button name="cancel" id="cancelBtn">取消防抖</button>
	<script type="text/javascript">
		var userName = document.getElementById('userName'),
			cancelBtn = document.getElementById('cancelBtn');
		var setDebounce = debounce(getAjax, 5000, true);
		userName.addEventListener('input', setDebounce);
		cancelBtn.addEventListener('click', ()=>{
			setDebounce.cancel()
		});
		// userName.addEventListener('input', getAjax);
		// debounce
		function debounce(fn, wait, immediate = false){
			var timeEvent, result;
			var debounced =  function(){
				var _this = this,
					args = arguments;
				timeEvent && clearTimeout(timeEvent)
				if (immediate) {
					// 如果timeEvent没有值，则立即执行
					var runNow = !timeEvent;
					timeEvent = setTimeout(()=>{
						timeEvent = null;
					}, wait)
					if (runNow) result = fn.call(_this, ...args);
				}else{
					timeEvent = setTimeout(()=>{
						fn.call(_this, ...args);
					}, wait);
				}
				return result;
			}
			// 取消防抖
			debounced.cancel = function(){
				console.log('取消防抖');
				timeEvent && clearTimeout(timeEvent)
				timeEvent = null;
			}
			return debounced;
		}
		// 通过ajax方法获取模糊搜索数据
		function getAjax(e){
			console.log(e);
			console.log('use ajax function', e.target.value, ' time:', new Date().toLocaleTimeString());
		}
	</script>
</body>
</html>
```

感谢收看，本章完！