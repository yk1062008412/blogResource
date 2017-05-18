---
title: CSS3新增属性(过渡、背景裁剪、动画、CSS变换)
date: 2017-02-20 11:43:05
categories: "CSS"
tags: 
	- CSS3
---
本文简述CSS3的过渡效果[transition](http://www.runoob.com/css3/css3-transitions.html)、动画[animation](http://www.runoob.com/css3/css3-animations.html)、背景相关操作[background](http://www.runoob.com/css3/css3-backgrounds.html)等。

## CSS3过渡效果transition

### 效果图

<div class="trans_div">
	请把鼠标放在该区域
</div>

### 代码实现

html代码：

``` bash
<div class="trans_div">请把鼠标放在该区域</div>
```

css样式：

``` bash
.trans_div{
	width: 100px;
	height: 100px;
	background: #ff0000;
	color: #ffffff;
	transition: width 2s , background 2s;
	-webkit-transition: width 2s , background 2s;
	-ms-transition: width 2s , background 2s;
	-moz-transition: width 2s , background 2s;
}
.trans_div:hover{
	width: 300px;
	background: #0000ff;
}
```

### 说明

trans_div这个class定义了div的过渡属性，width过渡时间为2s，background过渡时间为2s。之后在鼠标放上去hover的状态下，触发transition。

### 备注

transition包含4个过渡属性

| 属性 | 说明 |
|:-----|:-----|
|transition-property|定义应用过渡的 CSS 属性的名称。|
|transition-duration|定义实现过渡效果需要花费的时间。默认是 0。|
|transition-timing-function|规定过渡效果的时间曲线。默认是 "ease"。|
|transition-delay|规定过渡效果何时开始。默认是 0。|

## CSS变换transform

### 效果图

<div class="transform_div">
	div旋转
</div>

### 代码实现

html代码：

``` bash
<div class="transform_div">div旋转</div>
```

css代码：

``` bash
.transform_div{
	width: 100px;
	height: 100px;
	background: #00ff00;
	transform: rotate3d(1,2,3,30deg);
}
```
### 说明

transform使元素实现了2D、3D的翻转、拉伸、缩放、移动、倾斜等效果。

### 备注

transition包含2D和3D两种效果，属性太多了，懒得写了，请点击下面链接自行看。。。实在不好意思。。。
链接为css3菜鸟教程内容:[2d效果](http://www.runoob.com/css3/css3-2dtransforms.html)
链接为css3菜鸟教程内容:[3d效果](http://www.runoob.com/css3/css3-3dtransforms.html)

## 盒阴影box-shadow

### 效果图

<div class="shadow_div">
	阴影
</div>

### 代码实现

html代码：

``` bash
<div class="shadow_div">阴影</div>
```

css代码：

``` bash
.shadow_div{
	width: 100px;
	height: 100px;
	border: 2px solid #fff;
	border-radius: 5px;
	box-shadow: 10px 10px 5px #888888;
}
```
### 说明

box-shadow可以为img，div等添加阴影效果，使其出现层次感。border-radius实现边框圆角效果。

### 语法

``` bash
box-shadow: h-shadow v-shadow blur spread color inset;
```
| 值 | 说明 |
|:-----|:-----|
|h-shadow|必写。水平阴影的位置。允许负值|
|v-shadow|必写。垂直阴影的位置。允许负值|
|blur|可选。模糊距离|
|spread|可选。阴影的大小|
|color|可选。阴影的颜色。在CSS颜色值寻找颜色值的完整列表|
|inset|可选。从外层的阴影（开始时）改变阴影内侧阴影|

## CSS3动画

### 效果图

<div class="animation_div">CSS3动画</div>

### 代码实现

html代码：

``` bash
<div class="animation_div">CSS3动画</div>
```

css代码：

``` bash
.animation_div{
	position: relative;
	width: 100px;
	height: 100px;
	background: #ffff00;
	animation: myanimate 4s infinite;
}

@keyframes myanimate{
	0% {
		background: #ffff00;
		left: 0px;
		transform: rotate(0deg);
	}
	25% {
		background: #00ff00;
		left: 150px;
		transform: rotate(90deg);
	}
	50% {
		background: #00ffff;
		left: 300px;
		transform: rotate(180deg);
	}
	75% {
		background: #00ff00;
		left: 150px;
		transform: rotate(270deg);
	}
	100% {
		background: #ffff00;
		left: 0px;
		transform: rotate(360deg);
	}
}
```

### 说明

animate用来创建css动画效果，使用时，先给动画起个名字，然后用 @keyframes 语法来定义该动画的效果展示，动画效果开始为0%状态，结束为100%状态。根据不同时间节点，来定义该动画在不同节点上的展示效果。

### 备注

| 属性 | 说明 |
|:-----|:-----|
|@keyframes|规定动画在不同时间段的展示效果|
|animation|所有动画属性的简写属性，除了 animation-play-state 属性。|
|animation-name|规定 @keyframes 动画的名称。|
|animation-duration|规定动画完成一个周期所花费的秒或毫秒。默认是 0。|
|animation-timing-function|规定动画的速度曲线。默认是 "ease"。|
|animation-delay|规定动画何时开始。默认是 0。|
|animation-iteration-count|规定动画被播放的次数。默认是 1。无限循环为 infinite。|
|animation-direction|规定动画何时开始。默认是 0。|
|animation-play-state|规定动画是否正在运行或暂停。默认是 "running"。|


<script type="text/javascript" src="/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="/js/my/css3_1.js"></script>