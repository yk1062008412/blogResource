---
title: css弹性布局-flex布局
date: 2017-03-24 10:51:50
categories: "CSS"
tags: 
	- CSS3
---

本文介绍CSS3新增的布局方式，flex弹性布局，便于页面布局及项目。

## 传统的css布局

我们知道传统的css定位比较麻烦，比如垂直居中，比较难实现，但是问题比较多,很难实现自适应。

<div class="oldcenter"><div class="oldcenter-div">居中</div></div>

代码：

``` bash
// html代码
<div class="oldcenter">
	<div class="oldcenter-div">居中</div>
</div>
// css代码
.oldcenter{
	border: 1px solid #D53419;
	background-color: #50E9EE;
	width: 250px;
	height: 250px;
	position: relative;
}
.oldcenter-div {
	width: 50px;
	height: 50px;
	background-color: #DF6A41;
	margin: 0 auto;			//左右居中
	margin-top: 50%;		//外边框距离父元素高度顶部框线50%
	bottom: 25px;			//上移自身高度的一半 50/2 = 25px
	position: relative;		//设置为相对父元素定位
}
```

上面的代码可以实现居中，原理是先让子div向下移动其父元素50%的高度，再向上移动自身高度50px的一半,即25px;实现了垂直居中。代码非常冗余。

而且，如果是动态添加的列表元素，居中更麻烦

<div class="oldcenter"><ul class="old-ul"><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li><li>列表5</li></ul></div>

代码：

``` bash
// html代码
<div class="oldcenter">
	<ul class="old-ul">
		<li>列表1</li>
		<li>列表2</li>
		<li>列表3</li>
		<li>列表4</li>
		<li>列表5</li>
	</ul>
</div>
// css代码
.oldcenter{
	border: 1px solid #D53419;
	background-color: #50E9EE;
	width: 250px;
	height: 250px;
	position: relative;
}
.old-ul{
	margin-top: 0px;
	height: 250px;
}
.old-ul>li{
	height: 50px;
	line-height: 50px;
}
```

这个列表样式看似简单，但是如果列表中的内容是动态添加的呢？我们应该怎样设置每一个列表项的高度和行高？不可能每添加一次就改一次css代码，是不是非常的不方便。

传统的布局需要依赖于display,position,float等属性，样式调起来很不容易,所以需要改进。

## flex布局

2009年，W3C组织提出了一种新的布局方式--弹性布局，即flex布局。这种布局用少量、简单的代码，可以实现页面的响应式布局。并且如今已经得到除IE9-以外的所有浏览器的支持，完全不影响使用。

### 初识flex

我们先来认识一下flex，看看实现传统布局中的垂直居中是否方便。

<div class="newcenter">
	<div class="newcenter-div">flex居中</div>
</div>

代码:

``` bash
// html代码
<div class="newcenter">
	<div class="newcenter-div">flex居中</div>
</div>
// css代码
.newcenter{
	width: 250px;
	height: 250px;
	border: 1px solid #D53419;
	background-color: #50E9EE;
	display: flex;			//声明为flex布局
	justify-content: center;//水平方向左右居中
	align-items: center;	//垂直方向上下居中
}
.newcenter-div{
	width: 50px;
	height: 50px;
	background-color: #DF6A41;
}
```

是不是觉得简单易懂，而且用起来也比较方便。

### flex基本概念

将元素的display属性设置为flex后，该元素就成为了"flex容器",之后的操作类似于在容器中操作，它的子元素都是容器中的部分。

### flex容器属性

flex容器有6个属性

** 为了减少重复代码，且方便读者看懂，该标题(flex容器属性)下的所有代码的css均基于以下两个class属性 **

``` bash
.parent-container{
	width: 400px;
	height: 300px;
	border: 1px solid #D53419;
	background-color: #50E9EE;
}
.parent-container>p{
	width: 50px;
	height: 30px;
	border: 1px solid #2548E7;
	background-color: #dbc21d;
	margin: 5px;
}
```

#### flex-direction

该属性用来定义，子元素的排列方向.


| 序号   | 属性值            | 含义                 |
| ---- | -------------- | ------------------ |
| 1    | row            | 水平方向，从左往右依次排列(默认值) |
| 2    | row-reverse    | 水平方向，从右往左依次排列      |
| 3    | column         | 垂直方向，从上往下依次排列      |
| 4    | column-reverse | 垂直方向，从下往上依次排列      |

1.row

<div class="parent-container container-row"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-row">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
</div>
// css代码
.container-row{
	display: flex;
	flex-direction: row;
}
```

2.row-reverse

<div class="parent-container container-rowreverse"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-rowreverse">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
</div>
// css代码
.container-rowreverse{
	display: flex;
	flex-direction: row-reverse;
}
```

3.column

<div class="parent-container container-column"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-column">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
</div>
// css代码
.container-column{
	display: flex;
	flex-direction: column;
}
```

4.column-reverse

<div class="parent-container container-columnreverse"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-columnreverse">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
</div>
// css代码
.container-columnreverse{
	display: flex;
	flex-direction: column-reverse;
}
```

#### flex-wrap

该属性用来定义，如果子元素一排排不下，那么它的换行情况.


| 序号   | 属性值          | 含义         |
| ---- | ------------ | ---------- |
| 1    | nowrap       | 表示不换行(默认值) |
| 2    | wrap         | 换行         |
| 3    | wrap-reverse | 换行，并且反向排列  |

1.nowrap

<div class="parent-container container-nowrap"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-nowrap">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
	<p>flex8</p>
	<p>flex9</p>
	<p>flex10</p>
	<p>flex11</p>
</div>
// css代码
.container-nowrap{
	display: flex;
	flex-wrap: nowrap;
}
```

2.wrap

<div class="parent-container container-wrap"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-wrap">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
	<p>flex8</p>
	<p>flex9</p>
	<p>flex10</p>
	<p>flex11</p>
</div>
// css代码
.container-wrap{
	display: flex;
	flex-wrap: wrap;
}
```

3.wrap-reverse

<div class="parent-container container-wrapreverse"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-wrapreverse">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
	<p>flex5</p>
	<p>flex6</p>
	<p>flex7</p>
	<p>flex8</p>
	<p>flex9</p>
	<p>flex10</p>
	<p>flex11</p>
</div>
// css代码
.container-wrapreverse{
	display: flex;
	flex-wrap: wrap-reverse;
}
```

#### flex-flow

该属性是flex-direction属性和flex-wrap属性的结合，即flex-direction属性和flex-wrap属性的简写形式,这里就不再说明.

``` bash
.container{
	flex-flow: flex-direction || flex-wrap;
}
```

#### justify-content

该属性用来定义，元素在水平方向上的对齐方式.


| 序号   | 属性值           | 含义                   |
| ---- | ------------- | -------------------- |
| 1    | flex-start    | 靠左对齐(默认值)            |
| 2    | flex-end      | 靠右对齐                 |
| 3    | center        | 水平居中对齐               |
| 4    | space-between | 两端对齐，子元素之间间隔相等，两端无间隔 |
| 5    | space-around  | 平均对齐，子元素两侧间隔相等，且不重叠  |

1.flex-start

<div class="parent-container container-justify-flexstart"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-justify-flexstart">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
</div>
// css代码
.container-justify-flexstart{
	display: flex;
	justify-content: flex-start;
}
```

2.flex-end

<div class="parent-container container-justify-flexend"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-justify-flexend">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
</div>
// css代码
.container-justify-flexend{
	display: flex;
	justify-content: flex-end;
}
```

3.center

<div class="parent-container container-justify-center"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-justify-center">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
</div>
// css代码
.container-justify-center{
	display: flex;
	justify-content: center;
}
```

4.space-between

<div class="parent-container container-justify-spacebetween"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-justify-spacebetween">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
</div>
// css代码
.container-justify-spacebetween{
	display: flex;
	justify-content: space-between;
}
```

5.space-around

<div class="parent-container container-justify-spacearound"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-justify-spacearound">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	<p>flex4</p>
</div>
// css代码
.container-justify-spacearound{
	display: flex;
	justify-content: space-around;
}
```

#### align-items

该属性用来定义，元素在垂直方向上的对齐方式.


| 序号   | 属性值        | 含义                                       |
| ---- | ---------- | ---------------------------------------- |
| 1    | flex-start | 顶部对齐(默认值)                                |
| 2    | flex-end   | 底部对齐                                     |
| 3    | center     | 垂直居中对齐                                   |
| 4    | baseline   | 子元素第一行文字的基线对齐                            |
| 5    | stretch    | 占满父元素整个垂直方向的高度,即高度与父元素相同(项目未设置高度或设为auto的情况下生效)(默认值) |

1.flex-start

<div class="parent-container container-aItems-flexstart"><p style="height: 80px">flex1</p><p style="height: 40px">flex2</p><p style="height: 120px">flex3</p><p style="height: 100px">flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aItems-flexstart">
	<p style="height: 80px">flex1</p>
	<p style="height: 40px">flex2</p>
	<p style="height: 120px">flex3</p>
	<p style="height: 100px">flex4</p>
</div>
// css代码
.container-aItems-flexstart{
	display: flex;
	align-items: flex-start;
}
```

2.flex-end

<div class="parent-container container-aItems-flexend"><p style="height: 80px">flex1</p><p style="height: 40px">flex2</p><p style="height: 120px">flex3</p><p style="height: 100px">flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aItems-flexend">
	<p style="height: 80px">flex1</p>
	<p style="height: 40px">flex2</p>
	<p style="height: 120px">flex3</p>
	<p style="height: 100px">flex4</p>
</div>
// css代码
.container-aItems-flexend{
	display: flex;
	align-items: flex-end;
}
```

3.center

<div class="parent-container container-aItems-center"><p style="height: 80px">flex1</p><p style="height: 40px">flex2</p><p style="height: 120px">flex3</p><p style="height: 100px">flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aItems-center">
	<p style="height: 80px">flex1</p>
	<p style="height: 40px">flex2</p>
	<p style="height: 120px">flex3</p>
	<p style="height: 100px">flex4</p>
</div>
// css代码
.container-aItems-center{
	display: flex;
	align-items: center;
}
```

4.baseline

<div class="parent-container container-aItems-baseline"><p style="height: 80px;font-size: 20px">flex1</p><p style="height: 40px;font-size: 14px">flex2</p><p style="height: 120px;font-size: 22px">flex3</p><p style="height: 100px;font-size: 25px">flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aItems-baseline">
	<p style="height: 80px;font-size: 20px">flex1</p>
	<p style="height: 40px;font-size: 14px">flex2</p>
	<p style="height: 120px;font-size: 22px">flex3</p>
	<p style="height: 100px;font-size: 25px">flex4</p>
</div>
// css代码
.container-aItems-baseline{
	display: flex;
	align-items: baseline;
}
```

5.stretch

<div class="parent-container container-aItems-stretch"><p style="height: initial;">flex1</p><p style="height: initial;">flex2</p><p style="height: 50px;">flex3</p><p style="height: 150px;">flex4</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aItems-stretch">
	<p style="height: initial;">flex1</p>
	<p style="height: initial;">flex2</p>
	<p style="height: 50px;">flex3</p>
	<p style="height: 150px;">flex4</p>
</div>
// css代码
.container-aItems-stretch{
	display: flex;
	align-items: stretch;
}
```

#### align-content

该属性用来定义，多排子元素在垂直方向上每一排之间的对齐方式.

** 该属性必须在具有多排子元素的父元素中才能生效，即必须有 flex-wrap: wrap; 或 flex-wrap: wrap-reverse;且父元素中有多个子元素，一排放不下的情况下才有效果. **


| 序号   | 属性值           | 含义                               |
| ---- | ------------- | -------------------------------- |
| 1    | flex-start    | 垂直方向上，排之间靠近顶部对齐                  |
| 2    | flex-end      | 垂直方向上，排之间靠近底部对齐                  |
| 3    | center        | 垂直方向上，排之间居中对齐                    |
| 4    | space-between | 垂直方向上，第一排与最后一排上下两端紧靠父元素，排之间的间隔平分 |
| 5    | space-around  | 垂直方向上平均对齐，排之间两侧间隔相等，且不重叠         |
| 6    | stretch       | 所有排占满父元素整个垂直方向的高度(默认值)           |

1.flex-start

<div class="parent-container container-aContent-flexstart"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p><p>flex12</p><p>flex13</p><p>flex14</p><p>flex15</p><p>flex16</p><p>flex17</p><p>flex18</p><p>flex19</p><p>flex20</p><p>flex21</p><p>flex22</p><p>flex23</p><p>flex24</p><p>flex25</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aContent-flexstart">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	···			//多个p元素
	<p>flex23</p>
	<p>flex24</p>
	<p>flex25</p>
</div>
// css代码
.container-aContent-flexstart{
	display: flex;
	flex-wrap: wrap;
	align-content: flex-start;
}
```

2.flex-end

<div class="parent-container container-aContent-flexend"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p><p>flex12</p><p>flex13</p><p>flex14</p><p>flex15</p><p>flex16</p><p>flex17</p><p>flex18</p><p>flex19</p><p>flex20</p><p>flex21</p><p>flex22</p><p>flex23</p><p>flex24</p><p>flex25</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aContent-flexend">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	···			//多个p元素
	<p>flex23</p>
	<p>flex24</p>
	<p>flex25</p>
</div>
// css代码
.container-aContent-flexend{
	display: flex;
	flex-wrap: wrap;
	align-content: flex-end;
}
```

3.center

<div class="parent-container container-aContent-center"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p><p>flex12</p><p>flex13</p><p>flex14</p><p>flex15</p><p>flex16</p><p>flex17</p><p>flex18</p><p>flex19</p><p>flex20</p><p>flex21</p><p>flex22</p><p>flex23</p><p>flex24</p><p>flex25</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aContent-center">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	···			//多个p元素
	<p>flex23</p>
	<p>flex24</p>
	<p>flex25</p>
</div>
// css代码
.container-aContent-center{
	display: flex;
	flex-wrap: wrap;
	align-content: center;
}
```

4.space-between

<div class="parent-container container-aContent-spacebetween"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p><p>flex12</p><p>flex13</p><p>flex14</p><p>flex15</p><p>flex16</p><p>flex17</p><p>flex18</p><p>flex19</p><p>flex20</p><p>flex21</p><p>flex22</p><p>flex23</p><p>flex24</p><p>flex25</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aContent-spacebetween">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	···			//多个p元素
	<p>flex23</p>
	<p>flex24</p>
	<p>flex25</p>
</div>
// css代码
.container-aContent-spacebetween{
	display: flex;
	flex-wrap: wrap;
	align-content: space-between;
}
```

5.space-around

<div class="parent-container container-aContent-spacearound"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p><p>flex12</p><p>flex13</p><p>flex14</p><p>flex15</p><p>flex16</p><p>flex17</p><p>flex18</p><p>flex19</p><p>flex20</p><p>flex21</p><p>flex22</p><p>flex23</p><p>flex24</p><p>flex25</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aContent-spacearound">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	···			//多个p元素
	<p>flex23</p>
	<p>flex24</p>
	<p>flex25</p>
</div>
// css代码
.container-aContent-spacearound{
	display: flex;
	flex-wrap: wrap;
	align-content: space-around;
}
```

6.stretch

<div class="parent-container container-aContent-stretch"><p>flex1</p><p>flex2</p><p>flex3</p><p>flex4</p><p>flex5</p><p>flex6</p><p>flex7</p><p>flex8</p><p>flex9</p><p>flex10</p><p>flex11</p><p>flex12</p><p>flex13</p><p>flex14</p><p>flex15</p><p>flex16</p><p>flex17</p><p>flex18</p><p>flex19</p><p>flex20</p><p>flex21</p><p>flex22</p><p>flex23</p><p>flex24</p><p>flex25</p></div>

代码:

``` bash
// html代码
<div class="parent-container container-aContent-stretch">
	<p>flex1</p>
	<p>flex2</p>
	<p>flex3</p>
	···			//多个p元素
	<p>flex23</p>
	<p>flex24</p>
	<p>flex25</p>
</div>
// css代码
.container-aContent-stretch{
	display: flex;
	flex-wrap: wrap;
	align-content: stretch;
}
```

### flex容器中子元素的属性

** 为了减少重复代码，且方便读者看懂，该标题(flex容器中子元素的属性)下的所有代码的css均基于以下两个class属性 **

``` bash
.child-container{
	border: 1px solid #D53419;
	background-color: #50E9EE;
	width: 350px;
	height: 100px;
	display: flex;
}
.child-container>p{
	background-color: #dbc21d;
	height: 50px;
}
```

flex子元素具有6个相关的属性，可以将属性设置在子元素上。

| 序号   | 属性          | 含义                                       |
| ---- | ----------- | ---------------------------------------- |
| 1    | order       | 定义子元素的排列顺序。数值越小，排列越靠前，默认为0。              |
| 2    | flex-grow   | 定义子元素的放大比例，如果存在剩余空间，也会等比例放大，默认为0。        |
| 3    | flex-shrink | 定义子元素的缩小比例，如果空间不足，该子元素将缩小，默认为1。          |
| 4    | flex-basis  | 定义在分配多余空间之前，子元素占据的水平或垂直空间，默认为auto。       |
| 5    | flex        | 是flex-grow, flex-shrink 和 flex-basis的简写，后两个属性可选，默认值为0 1 auto。 |
| 6    | align-self  | 允许单个子元素有与其他子元素不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于默认值stretch。 |

#### order

定义项目的排列顺序。数值越小，排列越靠前。

<div class="child-container childorder"><p style="order: 36">flex1</p><p style="order: 18">flex2</p><p style="order: 5">flex3</p><p style="order: 9">flex4</p><p style="order: 6">flex5</p></div>

代码:

``` bash
// html代码
<div class="child-container childorder">
	<p style="order: 36">flex1</p>
	<p style="order: 18">flex2</p>
	<p style="order: 5">flex3</p>
	<p style="order: 9">flex4</p>
	<p style="order: 6">flex5</p>
</div>
// css代码
.childorder>p{
	width:50px;
	margin: 5px;
}
```

#### flex-grow

如果所有子元素的flex-grow属性都为1，则它们将等分一排空间.
如果一个子元素的flex-grow属性为2，其他子元素都为1，则前者占据的宽度是其他子元素的2倍。
** 如果想要flex-grow样式正常执行，则不能给子元素定义宽度width！否则样式会与预想中的不同 **

<div class="child-container"><p style="background-color:#ff7f50;flex-grow: 1;"></p><p style="background-color:#2bafd9;flex-grow: 2;"></p><p style="background-color:#f0e68c;flex-grow: 1;"></p><p style="background-color:#ffc0cb;flex-grow: 3;"></p></div>

代码:

``` bash
// html代码
<div class="child-container">
	<p style="background-color:#ff7f50;flex-grow: 1;"></p>
	<p style="background-color:#2bafd9;flex-grow: 2;"></p>
	<p style="background-color:#f0e68c;flex-grow: 1;"></p>
	<p style="background-color:#ffc0cb;flex-grow: 3;"></p>
</div>
```

#### flex-shrink

如果所有子元素的flex-shrink属性都为1，当空间不足时，所有子元素都将等比例缩小。如果一个子元素的flex-shrink属性为0，其他子元素都为1，则空间不足时，前者不缩小。

<div class="child-container child-flexshrink"><p style="flex-shrink: 1;"></p><p style="flex-shrink: 0;"></p><p style="flex-shrink: 1;"></p><p style="flex-shrink: 1;"></p><p style="flex-shrink: 1;"></p><p style="flex-shrink: 1;"></p><p style="flex-shrink: 1;"></p><p style="flex-shrink: 1;"></p><p style="flex-shrink: 1;"></p></div>

代码:

``` bash
// html代码
<div class="child-container child-flexshrink">
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 0;"></p>
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 1;"></p>
	<p style="flex-shrink: 1;"></p>
</div>
// css代码
.child-flexshrink>p{
	height: 50px;
	width: 50px;
	margin: 5px;
	background-color:#be5ad1;
}
```

#### flex-basis

定义在一排空间未被占满之前，子元素的width或height的值(例如100px)，定义之后，子元素将占据固定空间。

<div class="child-container child-flexshrink"><p></p><p style="flex-basis: 100px;"></p><p></p><p></p></div>

代码:

``` bash
// html代码
<div class="child-container child-flexshrink">
	<p></p>
	<p style="flex-basis: 100px;"></p>
	<p></p>
	<p></p>
</div>
// css代码
.child-flexshrink>p{
	height: 50px;
	width: 50px;
	margin: 5px;
	background-color:#be5ad1;
}
```

#### flex

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。

``` bash
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### align-self

该属性有6个属性值

| 序号   | 属性值        |
| ---- | ---------- |
| 1    | flex-start |
| 2    | flex-end   |
| 3    | center     |
| 4    | baseline   |
| 5    | stretch    |
| 6    | auto       |

属性值含义可查看 [align-items](#align-items) 与align-items属性值的含义相同(auto除外);

align-self默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch属性值。

<div class="child-container child-alignself"><p></p><p style="align-self: flex-end;"></p><p></p><p></p></div>

代码:

``` bash
// html代码
<div class="child-container child-alignself">
	<p></p>
	<p style="align-self: flex-end;"></p>
	<p></p>
	<p></p>
</div>
// css代码
.child-alignself>p{
	height: 50px;
	width: 50px;
	margin: 5px;
	background-color:#be5ad1;
}
```

## 总结

flex弹性布局的诞生，解决了传统CSS布局的很多问题，而且使用起来更加方便。

我们回到之前最开始的那个问题，如果列表是动态的话，使用flex是不是很方便？

``` bash
// html代码
<div class="newlist">
	<ul class="new-ul">
		<li>列表1</li>
		<li>列表2</li>
		<li>列表3</li>
	</ul>
</div>
// css代码
.newlist{
	border: 1px solid #D53419;
	background-color: #50E9EE;
	width: 250px;
	height: 250px;
}
.new-ul{
	margin-top: 0px;
	height: 250px;
	display: flex;
	flex-wrap: wrap;
	align-content: space-around;
}
.new-ul>li{
	width: 100%;
}
```
三个列表的情况

<div class="newlist"><ul class="new-ul"><li>列表1</li><li>列表2</li><li>列表3</li></ul></div>

四个列表情况

<div class="newlist"><ul class="new-ul"><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li></ul></div>

五个列表情况

<div class="newlist"><ul class="new-ul"><li>列表1</li><li>列表2</li><li>列表3</li><li>列表4</li><li>列表5</li></ul></div>

无需一直修改css文件，非常方便！

本章完~

<script type="text/javascript" src="/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="/js/my/flexincss.js"></script>