---
title: 谷歌HTML/CSS规范
date: 2017-04-24 09:52:16
categories: "前端开发"
tags:
	- HTML
---

原文链接：[https://google.github.io/styleguide/htmlcssguide.html](https://google.github.io/styleguide/htmlcssguide.html)

## 背景

这篇文章定义了 HTML 和 CSS 的格式和代码规范，旨在提高代码质量和协作效率。

## 通用

### 通用样式规范

#### URL协议

省略img图片、css样式、Javascript脚本以及其他媒体文件 URL 的协议部分(http:,https:),除非文件在两种协议下都不可用。这种方案称为 protocol-relative URL，好处是无论你是使用HTTPS 还是 HTTP 访问页面，浏览器都会以相同的协议请求页面中的资源，同时可以节省一部分字节。

``` bash
<!-- 不推荐使用 -->
<script src="https://www.google.com/js/gweb/analytics/autotrack.js"></script>
  
<!-- 推荐使用 -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```

``` bash
<!-- 不推荐使用 -->
.example {
  background: url(https://www.google.com/images/example);
}
  
<!-- 推荐使用 -->
.example {
  background: url(//www.google.com/images/example);
}
```

### 通用格式规范

#### 代码缩进

一次缩进2个空格

不要使用制表符(tab键)或混合tab键和空格进行缩进。

``` bash
<!-- 推荐使用 -->
<ul>
  <li></li>
  <li></li>
</ul>
```

``` bash
.example{
  color:blue;
}
```

#### 大小写

以下元素都应尽量使用小写：
HTML元素名称、属性、属性值(除非text/CDATA)，CSS选择器，属性和属性值(字符串除外)。

``` bash
<!-- 不推荐使用 -->
<A HREF="/">Home</A>
  
<!-- 推荐使用 -->
<img src="google.png" alt="Google">
```

``` bash
/* 不推荐使用 */
color: #E5E5E5;
  
/* 推荐使用 */
color: #e5e5e5;
```

#### 结尾空格

结尾的空格是比较多余的，可能使代码更加复杂化。

``` bash
<!-- 不推荐使用 -->
<p>What?_</p>
  
<!-- 推荐使用 -->
<p>Yes please.</p>
```

### 通用元规范

#### 编码

在 HTML 中需要指定编码方式，CSS 中不需要指定，因为默认是 UTF-8。

#### 注释

使用注释来解释代码：包含的模块，功能以及优点。便于后期维护。

#### 任务项

用 TODO 来标记待办事项，而不是用一些其他的标记，像 @@。

``` bash
<!-- 推荐使用 -->
  
<!-- TODO: remove optional tags -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
  
<!-- 不推荐使用 -->
  
<!-- @ remove optional tags @ -->
<ul>
  <li>Apples</li>
  <li>Oranges</li>
</ul>
```

## HTML

### HTML 风格规范

#### 文档类型

HTML 文档应使用 HTML5 的文档类型：<!DOCTYPE html>。
单标记标签无需封闭自身，<br> 不要写成 <br />。

#### HTML 正确性

尽可能使用正确的 HTML。

``` bash
<!-- 不推荐使用 -->
<title>Test</title>
<article>This is only a test.
  
<!-- 推荐使用 -->
<!DOCTYPE html>
<meta charset="utf-8">
<title>Test</title>
<article>This is only a test.</article>
```

#### 语义化

根据使用场景选择正确的 HTML 元素（有时被错误的称为“标签”）。例如，使用  h1 元素创建标题，p 元素创建段落，a 元素创建链接等等。正确的使用 HTML 元素对于可访问性、可重用性、搜索引擎以及编码效率都很重要。

``` bash
<!-- 不推荐使用 -->
<div onclick="goToRecommendations();">All recommendations</div>
  
<!-- 推荐使用 -->
<a href="recommendations/">All recommendations</a>
```

#### 多媒体元素降级

对于像图片、视频、canvas 动画等多媒体元素，确保提供其他可访问的内容。图片可以使用替代文本（alt），视频和音频可以使用文字版本。

``` bash
<!-- 不推荐使用 -->
<img src="spreadsheet.png">
  
<!-- 推荐使用 -->
<img src="spreadsheet.png" alt="Spreadsheet screenshot.">
```

#### 关注分离

标记、样式和脚本分离，确保相互耦合最小化。

#### 实体引用

如果团队中文件和编辑器使用同样的编码方式，就没必要使用实体引用，如 <code>& mdash;</code>，<code>& rdquo;</code>，<code>& #x263a;</code>，除了一些在 HTML 中有特殊含义的字符（如 < 和 &）以及不可见的字符（如空格）。

``` bash
<!-- 不推荐使用 -->
The currency symbol for the Euro is &ldquo;&eur;&rdquo;.
  
<!-- 推荐使用 -->
The currency symbol for the Euro is “€”.
```

#### type 属性

在引用样式表和脚本时，不要指定 type 属性，除非不是 CSS 或 JavaScript。
因为 HTML5 中已经默认指定样式变的 type 是 text/css，脚本的type 是 text/javascript。

``` bash
<!-- 不推荐使用 -->
<link rel="stylesheet" href="//www.google.com/css/maia.css" type="text/css">
  
<!-- 推荐使用 -->
<link rel="stylesheet" href="//www.google.com/css/maia.css">
  
<!-- 不推荐使用 -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js" type="text/javascript"></script>
  
<!-- 推荐使用 -->
<script src="//www.google.com/js/gweb/analytics/autotrack.js"></script>
```

### HTML格式规范

#### HTML 引号

属性值应该使用双引号。

``` bash
<!-- 不推荐使用 -->
<a class='maia-button maia-button-secondary'>Sign in</a>
  
<!-- 推荐使用 -->
<a class="maia-button maia-button-secondary">Sign in</a>
```

## CSS

### CSS样式规则

#### ID 和 Class 命名

使用有含义的 id 和 class 名称。

``` bash
/* 不推荐使用: meaningless */
#yee-1901 {}
  
/* 不推荐使用: presentational */
.button-green {}
.clear {}
  
/* 推荐使用: specific */
#gallery {}
#login {}
.video {}
  
/* 推荐使用: generic */
.aux {}
.alt {}
```

#### ID 和 Class 命名风格

id 和 class 应该尽量简短，同时要容易理解。

``` bash
/* 不推荐使用 */
#navigation {}
.atr {}
  
/* 推荐使用 */
#nav {}
.author {}
```

#### 选择器

除非需要，否则不要在 id 或 class 前加元素名。

``` bash
/* 不推荐使用 */
ul#example {}
div.error {}
  
/* 推荐使用 */
#example {}
.error {}
```

#### 属性简写

尽量使用 CSS 中可以简写的属性 (如 font)，可以提高编码效率以及代码可读性。

``` bash
/* 不推荐使用 */
border-top-style: none;
font-family: palatino, georgia, serif;
font-size: 100%;
line-height: 1.6;
padding-bottom: 2em;
padding-left: 1em;
padding-right: 1em;
padding-top: 0;
  
/* 推荐使用 */
border-top: 0;
font: 100%/1.6 palatino, georgia, serif;
padding: 0 1em 2em;
```

#### 0 和单位

值为 0 时不用添加单位。

``` bash
margin: 0;
padding: 0;
```

#### 开头的 0

值在 -1 和 1 之间时，不需要加 0。

``` bash
font-size: .8em;
```

#### 16进制表示法

``` bash
/* 不推荐使用 */
color: #eebbcc;
  
/* 推荐使用 */
color: #ebc;
```

#### 前缀

使用带前缀的命名空间可以防止命名冲突，同时提高代码可维护性。

``` bash
.adw-help {} /* AdWords */
#maia-note {} /* Maia */
```

#### ID 和 Class 命名分隔符

选择器中使用连字符可以提高可读性。

``` bash
/* 不推荐使用: 因为没有将“demo” 和 “image” 用分隔符分开 */
.demoimage {}
  
/* 不推荐使用: 因为使用了下划线，而不是分隔符 */
.error_status {}
  
/* 推荐使用 */
#video-id {}
.ads-sample {}
```

### CSS格式规则

#### 书写顺序

按照属性首字母顺序书写 CSS 易于阅读和维护，排序时可以忽略带有浏览器前缀的属性。

``` bash
background: fuchsia;
border: 1px solid;
-moz-border-radius: 4px;
-webkit-border-radius: 4px;
border-radius: 4px;
color: black;
text-align: center;
text-indent: 2em;
```

#### 块级内容缩进

为了反映层级关系和提高可读性，块级内容都应缩进。

``` bash
@media screen, projection {
  
  html {
    background: #fff;
    color: #444;
  }
  
}
```

#### 声明结束

每行 CSS 都应以分号结尾。

``` bash
/* 不推荐使用 */
.test {
  display: block;
  height: 100px
}
  
/* 推荐使用 */
.test {
  display: block;
  height: 100px;
}
```

#### 属性名结尾

属性名和值之间都应有一个空格。

``` bash
/* 不推荐使用 */
h3 {
  font-weight:bold;
}
  
/* 推荐使用 */
h3 {
  font-weight: bold;
}
```

#### 声明样式块的分隔

在选择器和 {} 之间用空格隔开。

``` bash
/* 不推荐使用: 因为缺少空格 */
#video{
  margin-top: 1em;
}
  
/* 不推荐使用: 因为有不必要的换行符 */
#video
{
  margin-top: 1em;
}
  
/* 推荐使用 */
#video {
  margin-top: 1em;
}
```

#### 选择器分隔

每个选择器都另起一行。

``` bash
/* 不推荐使用 */
a:focus, a:active {
  position: relative; top: 1px;
}
  
/* 推荐使用 */
h1,
h2,
h3 {
  font-weight: normal;
  line-height: 1.2;
}
```

#### 规则分隔

规则之间都用空行隔开。

``` bash
html {
  background: #fff;
}
  
body {
  margin: auto;
  width: 50%;
}
```

#### CSS 引号

属性选择器和属性值用单引号，URI 的值不需要引号。

``` bash
/* 不推荐使用 */
@import url("//www.google.com/css/maia.css");
  
html {
  font-family: "open sans", arial, sans-serif;
}
  
/* 推荐使用 */
@import url(//www.google.com/css/maia.css);
  
html {
  font-family: 'open sans', arial, sans-serif;
}
```

### CSS元规则

#### 分段注释

用注释把 CSS 分成各个部分。

``` bash
/* Header */
  
#adw-header {}
  
/* Footer */
  
#adw-footer {}
  
/* Gallery */
  
.adw-gallery {}
```

## 结语

坚持遵循代码规范。
写代码前先看看周围同事的代码，然后决定代码风格。
代码规范的意义在于提供一个参照物。这里提供了一份全局的规范，但是你也得参照公司内部的规范，否则阅读你代码的人会很痛苦。

本章完！
