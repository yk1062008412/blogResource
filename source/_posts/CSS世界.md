---
title: CSS世界
date: 2019-04-10 10:50:51
categories: "CSS"
tags: 
  - CSS
---

## CSS变量: currentColor

含义: 表示当前的标签所继承的文字颜色。

例如:
```
div{
    color: red;
    border: 1px solid currentColor;
}
```
则表示字体为红色，边框跟随字体的当前颜色，即为红色。

## 块级元素 !== display:block

以下两个元素都是块级元素，但他们的display并不是block。
```
<li>元素：默认display: list-item.
<table>元素：默认display: table.
```

## 文字少,居中;文字多,居左

文字少，一行可以显示完的话，需要居中显示；文字多于一行的话，需要靠左显示。

html内容

```
<div class="box">
    <p id="conMore" class="content">这里是文字</p>
</div>
```

css样式

```
.box {
    padding: 10px;
    background-color: #cd0000;
    text-align: center;
}
.content {
    display: inline-block;
    text-align: left;
}
```

## max-width和important

如果一个标签有如下css样式：

```
div{
    width: 300px !important;
    max-width: 200px;
}
```

则，该标签最后的呈现样式为200px。

## img首屏替代图片

为了提高用户体验，首屏图片一般会用一张透明的图片占位。

```
<img src="transparent.png" />
```

实际上，这个透明占位图片也会占用带宽资源。可以这样实现来避免占用资源

```
html:
<img />
css:
img{
    visibility: hidden;
}
img[src]{
    visibility: visible;
}
```

**注意: 这里的<img>没有src属性，再强调一遍，是没有src属性，而不是src=""，因为src=""在很多浏览器下依然会有请求，而且请求的是当前页面数据。当图片的src属性缺省的时候，图片才不会有任何请求，是最高效的实现方式**

## img的src和content

img属性的content内容显示优先级高于src的显示优先级。如下代码：

```
html:
<img src="1.png" />
css:
img{
    content: url('2.png');
}
```

上述代码最终的显示图片为 2.png。

**注意：content属性改变的仅仅是视觉呈现，当我们以右键或其他方式开新窗口打开该图片或保存这张图片时，所打开或保存的还是原来src对应的图片。**

## quotes属性

quotes 属性设置嵌套引用（embedded quotation）的引号类型。

```
html:
<div class="ask">为什么要看<span class="ask">CSS世界</span>这本书？</div>
<div class="answer">因为.....</div>
css:
.ask{
    quotes: '提问：“' '”' '《' '》';
}
.answer{
    quotes: '回答: “' '”';
}
.ask:before, .answer:before{
    content: open-quote;
}
.ask:after, .answer:after{
    content: close-quote;
}
```

*最终页面展示效果:*

```
提问：“为什么要看《CSS世界》这本书？”
回答: “因为.....”
```

## content 计数器

### counter-reset属性

重置计数器，相当于给变量名赋起始值，表示从哪个数字开始计数。默认为0.

```
html:
<div class="counter">这是一条信息</div>
css:
.counter{
    counter-reset: first 1 second 2;
}
.counter:before { 
    content: counter(first); 
}
.counter:after { 
    content: counter(second); 
}
```

*最终页面展示效果:*

```
1这是一条信息2
```

### counter-increment属性

计数器递增，表示每次计数的变化值。默认为1.

```
html:
<div class="reset">
  <div class="count-list">列表</div>
  <div class="count-list">列表</div>
  <div class="count-list">列表</div>
  <div class="count-list">列表</div>
  <div class="count-list">列表</div>
</div>
css:
.reset{
  counter-reset: index;
}
.count-list:after{
  content: counter(index);
  counter-increment: index;
}
```

*最终页面展示效果:*

```
列表1
列表2
列表3
列表4
列表5
```

**注意：需要在父元素中重置counter-reset，子元素才可以按顺序排列**

### counter()/counters()方法

counter()/counters()是方法，不是属性。类似于CSS3中的calc()计算，表示计数功能。

用法：

- counter(name): name为counter-reset的名字
- counter(name, style): style的值与list-style-type的值相同，代表计数的样式
- counters(name, string): string表示子序号的连接字符串
- counters(name, string, style)

例如，将style设置为lower-roman：

```
.test{
    content: counter(index, lower-roman);
}
```

显示的就是罗马数字Ⅰ,Ⅱ,Ⅲ,Ⅳ......

### 高级用法

如下代码:

```
html:
<div class="reset">
    <div class="count-list">这是一级列表
        <div class="reset">
            <div class="count-list">这是二级列表</div>
            <div class="count-list">这是二级列表
                <div class="reset">
                    <div class="count-list">这是三级列表</div>
                    <div class="count-list">这是三级列表</div>
                    <div class="count-list">这是三级列表</div>
                </div>
            </div>
            <div class="count-list">这是二级列表</div>
        </div>
    </div>
    <div class="count-list">这是一级列表</div>
    <div class="count-list">这是一级列表
        <div class="reset">
            <div class="count-list">这是二级列表</div>
        </div>
    </div>
</div>
css:
.reset{
  counter-reset: index;
  padding-left: 20px;
}
.count-list:before{
  content: counters(index, '-') '. ';
  counter-increment: index;
}
```

显示效果:
```
  1. 这是一级列表
    1-1. 这是二级列表
    1-2. 这是二级列表
      1-2-1. 这是三级列表
      1-2-2. 这是三级列表
      1-2-3. 这是三级列表
    1-3. 这是二级列表
  2. 这是一级列表
  3. 这是一级列表
    3-1. 这是二级列表
```

**注意: 一个容器里的counter-reset是唯一的，如果不小心把计数显示和计数重置元素以兄弟元素形式放在一起，就很可能会出现[计数序号](https://demo.cssworld.cn/4/1-19.php)错乱的情况**

本章完！
