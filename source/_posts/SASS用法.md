---
title: SASS用法
date: 2017-05-18 17:50:09
categories: "CSS"
tags: 
	- CSS
	- SASS
---

## SASS起源

CSS不是一种编程语言，写起来比较麻烦，而且如果要修改整体颜色风格的话，比较费事，需要改很多地方，还要一个一个地找。所以如果将一些公共元素定义为函数中的变量，就可以只修改一处，多处共同更新了。这就是"CSS预处理器"的初步提现。

CSS预处理器：CSS 预处理器用一种专门的编程语言，进行 Web 页面样式设计，然后再编译成正常的 CSS 文件，以供项目使用。CSS 预处理器为 CSS 增加一些编程的特性，无需考虑浏览器的兼容性问题。其基本思想是，用一种专门的编程语言，为 CSS 增加了一些编程的特性，将 CSS 作为目标生成文件，然后开发者就只要使用这种语言进行编码工作。

常用的"CSS预处理器"有：[SASS](http://sass-lang.com/) , [LESS](http://lesscss.org/) , [Stylus](http://www.zhangxinxu.com/jq/stylus/)

## SASS简介

SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。

## 安装

SASS底层是由Ruby语言编写的，但是这两者没有必然的联系，不需要学会Ruby语言也可以编写SASS。但是，在安装SASS之前，必须先安装Ruby。

### 安装Ruby

- Mac OS 或 Linux 安装Ruby ,[点击查看安装方法](http://www.jianshu.com/p/daa92187621c);

- Windows 安装Ruby ,[点击进入下载页面](http://rubyinstaller.org/downloads);

### 安装SASS

Ruby安装完成后，Windows打开安装好的Ruby，点击"Start Command Prompt with Ruby"，出现命令行，在命令行中输入

``` bash
gem install sass
```

然后等待安装完成就可以使用了。

## 配置

打开Ruby命令行

{% asset_img openRuby.jpg 打开Ruby %}

通过Ruby命令行，进入到需要创建css的目录(此处以windows为例)。
{% asset_img goToDir.jpg 进入目录 %}

在目录下新建文件test.scss。新建完成后，在test.scss文件中，写以下css：

``` bash
$blue: #2828ff;
div {
	color: $blue;
}
```

完成后，保存，并运行：

``` bash
sass test.scss
```

命令行窗口显示编译后的css样式：

{% asset_img runTestscss.jpg test.scss %}

这时候我们需要生成test.css文件，在命令行窗口运行

``` bash
sass test.scss test.css
```

运行后，将在同级目录下自动生成test.css文件。

一般我们不可能每修改一次test.scss文件，编译一次。所以，SASS提供了监听机制，用来监听文件或目录，一旦修改源文件，编译后的文件也会自动生成。

``` bash
//监听单文件
sass --watch test.scss:test.css
//监听目录 sassStudy和sassToCss都是文件夹，即目录。
sass --watch sassStudy:sassToCss
```

** SASS提供了四种编译风格 **

- nested：嵌套缩进的css代码，它是默认值。
- expanded：没有缩进的、扩展的css代码。
- compact：简洁格式的css代码。
- compressed：压缩后的css代码。

一般我们使用compressed编译风格，使用方法为：

``` bash
sass --style compressed test.sass test.css
```

## 基本语法

### 后缀名

SASS有两种文件后缀名：test.sass和test.scss。两个的用法都差不多，区别在于，sass语法更适用于python类不带括号和分号的程序员，scss跟我们平时写css的格式差不多。

``` bash
//后缀名为.sass的写法
body
  background: #eee
  font-size:12px
p
  background: #0982c1
  
//后缀名为.scss的写法
body {
  background: #eee;
  font-size:12px;
}
p {
  background: #0982c1;
}
```

### 变量

#### 普通变量

SASS允许使用变量来定义属性名,CSS类名,或属性值，变量的定义类似于PHP，以"$"符号开头：

定义属性值：

``` bash
$red: #f00;
  
div {
	color: $red;
}
```

定义属性名：

``` bash
$direction: top;
  
div{
	border-#{$direction}: 1px solid #eee;
}
```

定义类名：

``` bash
$direction: top;
  
.myborder-#{$direction} {
	border-#{$direction}: 1px solid #eee;
}
```

#### 默认变量

SASS设置默认变量

``` bash
$baseLineHeight: 1.5 !default;
  
body{
	line-height: $baseLineHeight; //line-height: 1.5;
}
```

SASS的默认变量一般用来设置默认值，然后根据需求来覆盖，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可。

``` bash
//sass style
//-------------------------------
$baseLineHeight:        2;
$baseLineHeight:        1.5 !default;

body{
	line-height: $baseLineHeight; //line-height: 2;
}
```

#### 多值变量

多值变量分为list类型和map类型，list类似于js中的数组，map类似于js中的对象。

- list变量

``` bash
$linkColor:#08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
a {
  color:nth($linkColor,1); //color: #08c;
  
  &:hover {
    color:nth($linkColor,2); //color: #333; 
  }
}
```

- map变量

``` bash
// SASS
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}
  
// CSS
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```

### 注释

SASS提供了两种类型的注释：

- 单行注释 "// 注释",只保留在SASS源文件中，编译后的CSS文件无该注释。

- 多行注释 "/* 注释 */",这种注释会保留到编译后的CSS文件里。

- 多行注释里还有一种, "/*! 注释 */",在 "/* "后面加一个感叹号 "!",表明这是重要注释，即使是压缩模式编译，也会保留这行注释，通常用来声明版权信息。

### 嵌套

SASS嵌套分为两种：选择器嵌套和属性嵌套。

1.选择器嵌套

选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性.

在选择器嵌套中，可以使用&表示父元素选择器.

``` bash
// SASS
#top_nav{
  background-color:#333;
  li{
    float:left;
  }
  a{
    display: block;
    padding: 0 10px;
    color: #fff;
  
    &:hover{
      color:#ddd;
    }
  }
}
  
// CSS
#top_nav{
  background-color:#333;
}  
#top_nav li{
  float:left;
}
#top_nav a{
  display: block;
  padding: 0 10px;
  color: #fff;
}
#top_nav a:hover{
  color:#ddd;
}
```

2.属性嵌套

** 属性后面必须加上冒号 **

``` bash
//SASS
p {
  border: {
    color: red;
  }
}
  
//CSS
p {
  border-color: red;
}
```

### 运算

SASS支持运算功能，可以对数值型的参数，变量等进行加减乘除等运算。

** 运算符前后请留一个空格，不然会出错。 **

``` bash
$var: 80%;
body {
  margin: (14px/2);
  top: 50px + 100px;
  width: $var + 10%;
}
```

## CSS重用

### 继承@extend

SASS允许一个选择器，继承另一个选择器的样式。关键词为 "@extend".

例：class2要继承class1的样式。
``` bash
// SASS
.class1 {
  border: 1px solid #ddd;
}
.class2 {
  @extend .class1;
  font-size: 1.2em;
}
  
// CSS
.class1 {
  border: 1px solid #ddd;
}
.class2 {
  border: 1px solid #ddd;
  font-size: 1.2em;
}
```

### 定义代码块@mixin,@include

Mixin类似于C语言的宏，是可以重用的代码块。

mixin有两种类型：一种是不带参数的mixin，一种是带参数的mixin；

#### 不带参数mixin

``` bash
// SASS
@mixin center-block {
  margin-left:auto;
  margin-right:auto;
}
.demo {
  @include center-block;
}

//CSS
.demo {
  margin-left:auto;
  margin-right:auto;
}
```

#### 带参数mixin

带参数的mixin，如果不指定参数，则使用默认值。

``` bash
// SASS
@mixin left($value: 10px) {
  float: left;
  margin-right: $value;
}
div1 {
  @include left;
}
div2 {
  @include left(20px);
}
  
// CSS
div1 {
  float: left;
  margin-right: 10px;
}
div2 {
  float: left;
  margin-right: 20px;
}
```

### 导入CSS @import

- @import命令，用来插入外部文件。
	@import "path/filename.scss";
- 如果插入的是.css文件，则等同于css的import命令。
	@import "foo.css";
  
通过@import将b.css文件导入a.scss文件,b.css文件的内容不会被导入编译后的a.css文件中。

通过@import将c.scss文件导入a.scss文件,c.scss文件的内容将会被导入编译后的a.css文件中。

## 高级用法

SASS不仅有变量，运算符等用法，还有循环、判断等函数用法，使CSS更灵活。

### if,else判断

``` bash
p {
  @if 1 + 1 == 2 { border: 1px solid; }
  @if 5 < 3 { border: 2px dotted; }
}

@if lightness($color) > 30% {
  background-color: #000;
} @else {
  background-color: #fff;
}
```

### for循环

``` bash
// SASS
@for $i from 1 to 3 {
  .item-#{$i} { width: 2em * $i; }
}
  
// CSS
.item-1 {
  width: 2em; 
}
.item-2 {
  width: 4em; 
}
.item-3 {
  width: 6em; 
}
```

### while循环

``` bash
// SASS
$i: 6;
@while $i > 0 {
  .item-#{$i} { width: 2em * $i; }
  $i: $i - 2;
}
// CSS
.item-6 {
  width: 12em;
}
.item-4 {
  width: 8em;
}
.item-2 {
  width: 4em;
}
```

### each循环

``` bash
// SASS
$img-list: a,b,c,d;
@each $img in img-list {
  .show-#{$img} {
    background-image: url("/image/#{$img}.jpg");
  }
}
  
// CSS
.show-a {
  background-image: url("/image/a.jpg");
}
.show-b {
  background-image: url("/image/b.jpg");
}
.show-c {
  background-image: url("/image/c.jpg");
}
.show-d {
  background-image: url("/image/d.jpg");
}
```

### 自定义函数@function

SASS为用户提供了自定义编写函数的方法。

``` bash
// SASS
@function multiply($i) {
  @return $i * 2;
}
#navbar {
  font-size: multiply(15px);
}
  
// CSS
#navbar {
  font-size: 30px;
}
```

本章完！