---
title: CSS3伪类选择器
date: 2017-02-22 19:58:26
categories: "CSS"
tags:
	- CSS3
---

本文主要针对伪类选择器的使用进行说明，伪类选择器可以动态的对页面的内容进行样式化，目前有16个强大的新伪类选择器被列入最新的W3C规范中。

## 早期伪类选择器

CSS1时期(1996年)就被纳入规范中的伪类选择器,也是我们最常用到的选择器,这些选择器最常被用到 "a" 标签中。

``` bash
:link
:visited
:hover
:active
```

1. :link 为链接平常的状态。
2. :visited 链接被访问过后的状态。
3. :hover 鼠标放在链接上时的状态。
4. :active 鼠标被按下，还未松开鼠标时的状态。

## CSS2时期引入的伪类选择器

CSS2规范实在1998年5月发布的。

``` bash
:lang
:first-child
```

1. :lang 指明一个文档所使用的语言。类似于

``` bash
<html lang="en">
```

2. :first-child 指明父元素下的一组同级元素中的第一个。

## CSS3时代

### 结构伪类

#### root

``` bash
:root
```

:root 伪类选择器表示页面的根元素。即 &lt; html &rt; 元素。

``` bash
:nth-child(n)
```

#### nth-child(n)

:nth-child(n) 伪类选择器表示第n个子元素。

``` bash
<ul>
	<li>1</li> ------- li:nth-child(1)
	<li>2</li> ------- li:nth-child(2)
	<li>3</li> ------- li:nth-child(3)
	<li>4</li> ------- li:nth-child(4)
	<li>5</li> ------- li:nth-child(5)
</ul>
```

li:nth-child(even) 代表代码中偶数行，也可以用 li:nth-child(2n)
li:nth-child(odd) 代表代码中奇数行，也可以用 li:nth-child(2n+1)

<ul class="myli_nth"><li>列表第1行</li><li>列表第2行</li><li>列表第3行</li><li>列表第4行</li><li>列表第5行</li></ul>

可以看出，偶数行与奇数行表现的颜色不同。

代码如下:

html代码

``` bash
<ul class="myli_nth">
	<li>列表第1行</li>
	<li>列表第2行</li>
	<li>列表第3行</li>
	<li>列表第4行</li>
	<li>列表第5行</li>
</ul>
```

CSS代码

``` bash
.myli_nth li:nth-child(odd){
	background: #FFD700;
}

.myli_nth li:nth-child(even){
	background: #BFEFFF;
}
```

假如要选中一个列表的前3项，我们可以写

``` bash
li:nth-child(-n+3)
```

#### nth-last-child(n)

:nth-last-child(n) 和 nth-child(n) 用法完全相同，唯一不同的就是 nth-child(n) 是从第一个开始往下算。而 :nth-last-child(n)是从最后一个往前倒着算。

``` bash
<ul>
	<li>1</li> ------- li:nth-last-child(5)
	<li>2</li> ------- li:nth-last-child(4)
	<li>3</li> ------- li:nth-last-child(3)
	<li>4</li> ------- li:nth-last-child(2)
	<li>5</li> ------- li:nth-last-child(1)
</ul>
```

#### nth-of-type(n)

:nth-of-type(n) 只针对特定类型的元素应用样式。

例如：我们需要使用更大的字体来表示文章的第一个段落：

``` bash
article p:nth-of-type(1) {font-size: 1.5em;}
```

#### nth-last-of-type(n)

同 :nth-of-type(n) 原理一样，唯一不同的就是 :nth-last-of-type(n) 是从后往前倒序工作。

#### first-of-type

相当于 :nth-of-type(1)

#### last-of-type

相当于 :nth-last-of-type(1)

#### only-of-type

这个伪类用来选择父元素下只有唯一一个某种类型的元素。

``` bash
<div>
	<p>第1个段落</p>
	<p>第2个段落</p>
</div>
<div>
	<p>第3个段落</p>
</div>
```

如果上面一段代码有这样一个css：

``` bash
p:only-of-type{color: red;}
```

那么结果是只有第三个段落的字体颜色会变红。因为只有第三个段落的父元素div有唯一的一个p元素。

#### last-child

:first-child 代表的是第一个子元素。
:last-child 代表的是最后一个子元素。

#### only-child

如果一个元素是它父元素下的唯一子元素，就可以使用 :only-child 来选中该元素。

#### empty

:empty 这个伪类选择器用来选择没有子元素和内容的元素。

``` bash
#result:empty{
	background-color: #f00;
}
```

我们可以使用上边的CSS代码来表示用户搜索结果为空的情况。

### 目标伪类

#### target

:target 这个伪类允许我们基于url对页面上的元素设置样式。如果url中有一个标识符(即以'#'开头的字符串)，那么 :target 就可以对以该标识符为id的元素进行样式设置。

如果有这样一个url：

``` bash
http://www.test.com/test#summary
```

id属性为summary的区域可以这样来写

``` bash
:target{
	background-color: #f00;
}
```

### 元素状态伪类

#### enabled

:enabled 表示元素可编辑状态时的样式。例如：

``` bash
input:enabled{
	background-color: green;
}
```

表示input输入框在可编辑状态下时背景为绿色。

#### disabled

:disabled 表示元素在不可编辑状态时的样式。例如：

``` bash
input:disabled{
	background-color: red;
}
```

表示input输入框在可编辑状态下时背景为红色。

#### checked

:checked 表示单选框或多选框在选中状态下时的样式。

``` bash
input[type=checkbox]:checked{
	font-weight: bold;
}
```

表示多选框在选中状态下时，变为粗体。

### 否定伪类选择器

#### not

:not 选择器表示除指定元素外的所有元素。

``` bash
:not(header){
	background-color: blue;
}
```

表示页面上除了 header 元素以外的所有元素。

## 总结

一般的项目中，可能我们用到的伪类选择器就那么几个，但是其他不常用的选择器还是需要稍微了解一下，万一在用到的时候，不至于一时想不起来。

<script type="text/javascript" src="/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="/js/my/css3_2.js"></script>
