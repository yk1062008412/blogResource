---
title: 原生js操作DOM元素
date: 2017-06-05 21:39:09
categories: "前端开发"
tags:
	- Javascript
---

本文主要讲述一些原生的js来操作DOM元素的方法。

目前市场上的一些js库很多：jQuery、Angular、prototype、lodash、react、vue等方便了我们应用。但有时候如果开发一些自己的js库，还是要用到原生js。

## 当前元素节点

- obj.getElementById()
	返回带有指定 ID 的元素。
- obj.getElementsByTagName()
	返回包含带有指定标签名称的所有元素的节点列表（集合/节点数组）。
- obj.etElementsByClassName()
	返回包含带有指定类名的所有元素的节点列表。
- obj.getElementsByName()
	方法可返回带有指定名称的对象的集合。

## 元素相关节点

- node.childNodes
	只读 childNodes 属性返回节点的子节点集合，以 NodeList 对象。注意他包括文本节点和元素节点(即像换行，空白这些也算 .nodeName 当前元素类型名称|.nodeType 当前元素类型)
- node.children
	只读 children则不包括文本节点，只有元素节点，子节点列表。
- node.firstChild
	只读 node里的第一个节点 （注意，标准下包含文本节点+元素节点  非标准下只含元素节点）推荐使用children[0]
- node.lastChild
	只读 node里的最后一个节点
- node.nextSibling || node.nextElementSibling
	下一个兄弟节点 （注意，这个包含文本节点，前者标准和非标，后者ie下没有）
- node.previousSibling || node.previousElementSibling
	上一个兄弟节点 （注意，这个包含文本节点，前者标准和非标，后者ie下没有）
- node.parentNode
	node的父亲节点，仅有一个 只读 无兼容问题。
- node.offsetParent
	只读 父节点（有定位的父节点，有多个则离他最近的一个）
	1.如果没有定位的父节点则博人body。
	2.如果他自身是定位则ie7以下为html，其他为body。
	3.如果他的父级有一个设置了zoom：1 则表示这个父级

## 创建节点

- document/node.createElement(“标签名”)
	创建元素节点。
- createTextNode(内容)
	创建文本节点。
- node.appendChild(node)
	把新的子节点添加到该node节点里面并且是最后面。这个新节点可以是文档中某个已存在的节点，也可以是创建新的节点。
- node.insertBefore(newnode必填,existingnode)
	在该节点里面指定的子节点前面插入新的子节点。这个新节点可以是文档中某个已存在的节点，也可以是创建新的节点。
- node.removeChild(node)
	删除该节点里面的node子节点。
- node.replaceChild(newnode,oldnode)
	新替换该节点里面旧(newnode,oldnode)这个新节点可以是文档中某个已存在的节点，也可以是创建新的节点。
- createAttribute()
	创建属性节点。
- element.getAttribute(属性名)
	返回指定的属性值。
- element.setAttribute(属性名，属性值)
	setAttribute() 方法添加指定的属性，并为其赋指定的值。如果这个指定的属性已存在，则仅设置/更改值

## 浏览器宽高

- div容器宽: obj.style.width;
- div容器高: obj.style.height;
- 网页可见区域宽: document.body.clientWidth;
- 网页可见区域高: document.body.clientHeight;
- 网页可见区域宽: document.body.offsetWidth   (包括边线的宽);
- 网页可见区域高: document.body.offsetHeight  (包括边线的宽);
- 网页正文全文宽: document.body.scrollWidth;
- 网页正文全文高: document.body.scrollHeight;
- 网页被卷去的高: document.body.scrollTop;
- 网页被卷去的左: document.body.scrollLeft;
- 网页正文部分上: window.screenTop;
- 网页正文部分左: window.screenLeft;
- 屏幕分辨率的高: window.screen.height;
- 屏幕分辨率的宽: window.screen.width;
- 屏幕可用工作区高度：window.screen.availHeight;
- 屏幕可用工作区宽度：window.screen.availWidth;
- 滚动条滚动距离:scrollLeft/scrollTop 
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
- 边框的厚度: clientLeft/clientTop
- 鼠标位置: ev.clientX/ev.clientY

## 基于jQuery一些方法

- 目标选择器距离网页页面顶端的高度
	var test = $(".test").offset().top;
- 浏览器窗口的高度
	var win_h = $(window).height();
- 滚动条的高度
	var scr_h = $(window).scrollTop();
- 滚动窗口触发事件函数
	``` bash
	$(window).scroll(function(){
		//...
	})
	```