---
title: css网格布局-Grid布局
date: 2019-04-10 10:54:55
categories: "CSS"
tags: 
  - CSS3
---

本文介绍CSS的另一种布局方式 - Grid网格布局。

## 初识Grid布局

Grid布局可以理解为将一个容器划分为不同的网格，然后给网格里面填充自己需要的元素。

**声明：文章中大部分添加border属性的元素，是为了便于观察布局方式。**

### Grid布局和flex布局

Grid布局和flex布局有一定的相似性，都是将一个div元素看做容器，然后指定容器内的多个子元素的位置。
flex布局可以看做是一维布局，只能指定项目相对于“轴线”的位置，Grid布局可以看做是二维布局，它将容器分为行和列，产生多个单元格，然后指定每个单元格对应容器的位置。

## Grid基本概念

### 容器和项目

以下代码中，最外层的class为_container的div元素，就是“容器”，内部的六个div子元素，就是容器中的“项目”。

```
<div class="_container">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
</div>
```

### 行和列

容器中的水平方向区域称为“行”(row)，垂直方向区域称为“列”(column)。

### 单元格

行和列的交叉，形成的区域，我们称之为“单元格”。

可以类比想象以下table表格，每一个tr和td的交叉，形成的就是单元格。

n 行和 m 列会产生 n × m 个单元格。比如，3行 和 3列 交叉，会产生9个单元格。

### 网格线

划分行列的线，称为“网格线”。

正常情况下，n 行有 n + 1 个水平网格线， m 列有 m + 1个垂直网格线。

## 容器属性

### grid 和 inline-grid

我们使用 display:grid 来定义元素使用Grid网格布局。

grid 和 inline-grid 属性值有两个作用，作用一是声明该容器内部使用grid布局，作用二是对外声明是行内元素(inline-grid)还是块状元素(grid)。

属性值|含义
:--|---
grid|定义一个块级的网格容器
inline-grid|定义一个内联的网格容器
subgrid|定义一个继承其父级网格容器的行和列的大小的网格容器，它是其父级网格容器的一个子项

下面代码的 grid-template-columns 和 grid-template-rows先不用管，后面会讲到。

```
// html代码
<div>这里是header</div>
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
</div>
<div>这里是footer</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-1.png grid布局 %}

### grid-template-columns, grid-template-rows

Grid网格布局定义好以后，就要划分行和列。grid-template-columns用来定义每一列的列宽，grid-template-rows用来定义每一行的行高。

#### px布局

grid-template-columns 和 grid-template-rows接受px为单位，对每一行和每一列进行分别定义。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 50px 100px 30px;
    grid-template-rows: 50px 80px;
}
.border_style{
    border: 1px solid #f00;
}
```

grid-template-columns: 50px 100px 30px: 表示定义3列，第一列的宽度为50px, 第二列的宽度为100px, 第三列的宽度为30px.

grid-template-rows: 50px 80px: 表示定义2行，第一行的高度为50px, 第二行的高度为80px.

{% asset_img 3-2.png px布局 %}

#### 百分比

grid-template-columns 和 grid-template-rows还可以使用百分比写法，当然了，对于列，div的class为_container的父元素还必须有一定高度才可以使用百分比的写法。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 33.333% 33.333% 33.333%;
    grid-template-rows: 50px 80px;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-3.png 百分比布局 %}

#### repeat()函数

有时候，我们要写的网格很多，而这些网格的值又相同，这样的话，重复写很长一串相同的值是很麻烦的，所以我们需要借助repeat()方法来实现。

repeat(m, n)函数的第一个参数代表重复m次，n代表每一个项目的宽度或高度，n可以是一个或者多个参数，然后以空格隔开。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
    <div class="border_style">10</div>
    <div class="border_style">11</div>
    <div class="border_style">12</div>
    <div class="border_style">13</div>
    <div class="border_style">14</div>
    <div class="border_style">15</div>
    <div class="border_style">16</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(4, 80px 30px);
    grid-template-rows: repeat(2, 50px);
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-4.png repeat函数 %}

这样，我们就实现了宽度为80px和30px重复出现4次生成的8列,高度为50px的2行网格。repeat()方法对于百分比同样适用。

#### auto-fill 关键字

有的单元格大小固定，但是容器大小不固定，所以如果希望每一行（或者每一列）能够容纳足够多的单元格，就可以使用 auto-fill 关键字来表示自动填充。

可以类比为float:left。**注意：仅仅是呈现方式的类比，并不是真的浮动。**

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
    <div class="border_style">10</div>
    <div class="border_style">11</div>
    <div class="border_style">12</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(auto-fill, 100px);
    grid-template-rows: repeat(2, 50px);
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-5.png auto-fill关键字 %}

#### fr 关键字

fr 表示行或者列之间的倍数关系。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 1fr 2fr 3fr 4fr;
}
.border_style{
    border: 1px solid #f00;
}
```

grid-template-columns: 1fr 2fr 3fr 4fr; 表示第2列的宽度是第1列的2倍, 第3列的宽度是第1列的3倍, 第4列的宽度是第1列的4倍。

{% asset_img 3-6.png fr关键字 %}

#### minmax() 函数

有时候，我们需要一个元素宽度(或高度)自适应，但又不能低于某一个值，所以我们需要一个函数来定义元素宽度(或高度)的区间。

minmax(m, n)函数的第一个参数，表示元素宽度(或高度)的最小值，第二个参数表示元素宽度(或高度)的最大值。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 1fr 1fr minmax(300px, 2fr);
}
.border_style{
    border: 1px solid #f00;
}
```

grid-template-columns: 1fr 1fr minmax(300px, 2fr); 表示第3个单元格的宽度是第1个的2倍，但最小宽度不超过300px。

#### auto 关键字

auto 可以实现在同一行或者同一列中，多个子元素之间，部分子元素宽度或高度固定，其他子元素宽度或高度自适应。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 100px auto 100px;
    /* grid-template-columns: 1fr auto 1fr; */
}
.border_style{
    border: 1px solid #f00;
}
```

grid-template-columns: 100px auto 100px; 表示第1列的宽度是100px, 第3列的宽度是100px, 第二列的宽度占据水平宽度上剩下的所有空间。

**注意：auto尽量不要和fr关键字一起使用，否则可能会失效。**

#### 网格线名称

我们可以在grid-template-columns属性和grid-template-rows属性里面，使用方括号 []，来对每一条网格线起名字，方便后面的使用。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: [c1] 100px [c2] 200px [c3 another-name] auto [c4];
    grid-template-rows: [r1] 50px [r2 second-line] 80px [r3];
}
.border_style{
    border: 1px solid #f00;
}
```

3行2列的网格，有4条垂直的网格线和3条水平的网格线，使用[]对每一个网格线进行起名字。

网格线可以允许同一条网格线有多个名字，如上面代码中的第3条垂直的网格线，就有 'c3' 和 'another-name' 两个名字。

#### 两栏式布局

用Grid来实现两栏式布局

```
._container{
    display: grid;
    grid-template-columns: 70% 30%;
}
```

左边栏宽度为70%，右边栏宽度为30%

#### 十二网格布局

用Grid来实现十二网格布局

```
._container{
    display: grid;
    grid-template-columns: repeat(12, 1fr);
}
```

### grid-gap 属性

grid-row-gap: 设置行与行之间的间隔，即行间距; grid-column-gap: 设置列与列之间的间隔，即列间距。grid-gap: grid-column-gap和grid-row-gap的合并简写形式。

**grid-gap: <grid-row-gap> <grid-column-gap>;**

grid-gap: 行间距，列间距。如果省略了第二个值，则浏览器会默认第二个值等于第二个值，即列间距等于行间距。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-row-gap: 30px;
    grid-column-gap: 15px;
    /* grid-gap: 30px 15px; */
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-7.png grid-gap属性 %}

grid-row-gap: 30px; 表示行间距为30px. grid-column-gap: 15px; 表示列间距为15px.

可以简写合并为: grid-gap: 30px 15px;

如果写成 grid-gap: 30px; 则浏览器会默认为行间距和列间距都是30px。 

### grid-template-areas 属性

上面讲过的 *网格线名称* 是给每一条网格线起名字。grid-template-areas 则是给单元格区域起名字。

#### 单元格名称

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
}
.border_style{
    border: 1px solid #f00;
}
```

这样，每一块单元格区域都有了自己的名字。单元格有了名字以后有什么用呢，接下来就试一试用单元格名称来划分区域。

#### 单元格区域划分

可以使用相同名称的单元格来划分区域，如果多个单元格具有相同名称，则这几个单元格就可以合并成一个区域。

```
// html代码
<div class="_container">
    <div class="border_style item-1">1</div>
    <div class="border_style item-2">2</div>
    <div class="border_style item-3">3</div>
    <div class="border_style item-4">4</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: 'a a a'
                         'b c c'
                         'd d d';
}
.item-1{ grid-area: a; }
.item-2{ grid-area: b; }
.item-3{ grid-area: c; }
.item-4{ grid-area: d; }
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-8.png 单元格区域划分 %}

**注意：通过命名来合并单元格，一定要根据实际布局情况来进行命名，不能隔开或者错行命名相同。**

#### 不命名

有的单元格我们可能用不到命名，就可以用(.)来代替。

```
._container{
    display: grid;
    grid-template-columns: 100px 100px 100px;
    grid-template-rows: 100px 100px 100px;
    grid-template-areas: 'a . c'
                         'd . f'
                         'g . i';
}
```

省去了命名的烦恼。

### grid-auto-flow 属性

该属性用来设置网格项的排列方式。默认的子元素放置顺序为“先行后列”(row)。

```
grid-auto-flow: row | column | row dense | column dense
```

#### row 先行后列

下面是网格默认的布局顺序。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(2, 50px);
    grid-auto-flow: row;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-9.png row先行后列 %}

#### column 先列后行

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(2, 50px);
    grid-auto-flow: column;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-10.png column先列后行 %}

#### row dense

这里可能涉及到Grid子元素的一些属性设置，可以先了解一下，也可以先把这部分略过，等看完子元素的章节部分，再回过来看这一部分。

dense 主要用于，某些项目指定位置以后，剩下的项目怎么自动放置。

row dense 表示"先行后列"，并且尽可能紧密填满，尽量不出现空格。

```
// html代码
<div class="_container">
    <div class="border_style item-1">1</div>
    <div class="border_style item-2">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(4, 50px);
    grid-auto-flow: row dense;
}
.border_style{
    border: 1px solid #f00;
}
.item-1{
    grid-column: 1 / span 2;
}
.item-2{
    grid-column: 1 / span 2;
}
```

{% asset_img 3-11.png row_dense %}

#### column dense

这里也涉及到Grid子元素的一些属性设置，可以先了解一下，也可以先把这部分略过，等看完子元素的章节部分，再回过来看这一部分。

row dense 表示"先列后行"，并且尽可能紧密填满，尽量不出现空格。

```
// html代码
<div class="_container">
    <div class="border_style item-1">1</div>
    <div class="border_style item-2">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 50px);
    grid-template-rows: repeat(4, 50px);
    grid-auto-flow: column dense;
}
.border_style{
    border: 1px solid #f00;
}
.item-1{
    grid-column: 1 / span 2;
}
.item-2{
    grid-column: 1 / span 2;
}
```

{% asset_img 3-12.png column_dense %}

### justify-items,align-items,place-items

- justify-items: 属性设置单元格内容的水平位置（左中右）。
- align-items: 属性设置单元格内容的垂直位置（上中下）。
- place-items: align-items属性和justify-items属性的合并。

#### justify-items


属性值 | 含义
---|---
start | 内容和网格区域的左边对齐
end | 内容和网格区域的右边对齐
center|内容和网格区域的中间对齐
stretch|填充整个网格区域的宽度（默认值）

```
// html代码
<div class="_container">
    Grid Layout
</div>
// css代码
._container{
    display: grid;
    justify-items: center;
}
```

justify-items: center; 表示单元格的内容水平居中

#### align-items

属性值 | 含义
---|---
start | 内容和网格区域的顶部对齐
end | 内容和网格区域的底部对齐
center|内容和网格区域的中间对齐
stretch|填充整个网格区域的高度（默认值）

```
// html代码
<div class="_container">
    Grid Layout
</div>
// css代码
._container{
    display: grid;
    justify-items: end;
}
```

align-items: end; 表示单元格的内容在网格底部。

#### place-items

align-items属性和justify-items属性的合并。

```
place-items: <align-items> <justify-items>;
```

如果省略第二个值，浏览器就会认为第二个值等于第一个值。

### justify-content,align-content,place-content

- justify-content: 属性设置网格水平方向上的对齐方式。
- align-content: 属性设置网格垂直方向上的对齐方式。
- place-content: align-content属性和justify-content属性的合并。

#### justify-content

属性值 | 含义
--- | ---
start | 左对齐
end | 右对齐
center | 居中对齐
stretch | 填充网格容器
space-around | 在每个网格子项中间放置均等的空间，在始末两端只有一半大小
space-between | 两边对齐，在每个网格子项中间放置均等的空间，在始末两端没有空间
space-evenly | 网格间隔相等，包括始末两端

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 50px);
    height: 200px;
    justify-content: space-around;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-13.png justify-content %}

#### align-content

属性值 | 含义
--- | ---
start | 顶部对齐
end | 底部对齐
center | 居中对齐
stretch | 填充网格容器
space-around | 在每个网格子项中间放置均等的空间，在上下两端只有一半大小
space-between | 上下对齐，在每个网格子项中间放置均等的空间，在上下两端没有空间
space-evenly | 在每个网格子项中间放置均等的空间，包括上下两端

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-rows: repeat(3, 50px);
    height: 200px;
    align-content: space-between;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-14.png align-content %}

#### place-content

align-content属性和justify-content属性的合并。

```
place-content: <align-content> <justify-content>;
```

如果省略第二个值，浏览器就会认为第二个值等于第一个值。

### grid-auto-columns,grid-auto-rows

有时候，由于子元素的一些样式定义，或者项目的指定位置超出了定义好的现有网格布局。比如网格只有3列，但是某一个项目却定义在了第4列。这时候，浏览器会自动生成多余的网格，以便于放置项目。但是这样就会有一个问题出现，网格外部子元素的行高和列宽无法确定。所以就有了 grid-auto-columns 和 grid-auto-rows 属性。

grid-auto-columns 和 grid-auto-rows 与文章开始讲到的 grid-template-columns 和 grid-template-rows 用法相同，只不过前者是用来定义网格布局外的项目，后者用来定义网格布局内的项目。

```
// html代码
<div class="_container">
    <div class="border_style">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 100px);
    grid-auto-rows: 50px;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 3-15.png grid-auto %}

### grid 属性

grid属性是grid-template-rows、grid-template-columns、grid-template-areas、 grid-auto-rows、grid-auto-columns、grid-auto-flow这六个属性的合并简写形式。

```
grid: none | <grid-template-rows> / <grid-template-columns> | <grid-auto-flow> [<grid-auto-rows> [ / <grid-auto-columns>] ];
```

## 项目属性

### grid-(column|row)-(start|end)

通过网格线来定义网格项的位置。grid-column-start、grid-row-start定义网格项的开始位置，grid-column-end、grid-row-end定义网格项的结束位置。

```
grid-column-start: <number> | <name> | span <number> | span <name> | auto ; 
grid-column-end: <number> | <name> | span <number> | span <name> | auto ;
grid-row-start: <number> | <name> | span <number> | span <name> | auto ; 
grid-row-end: <number> | <name> | span <number> | span <name> | auto ;
```

#### 指定网格线条数

```
// html代码
<div class="_container">
    <div class="border_style item_1">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
}
.item_1{
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 4-1.png 指定网格线条数 %}

可以看到，item_1项目的单元格区域，在行方向上(column)，从第1条网格线开始，到第三条网格线结束。在列方向上(row)，从第2条网格线开始，到第4条网格线结束。

#### 指定网格线名称

这里就可以使用到上面提到的给网格线起名了。

```
// html代码
<div class="_container">
    <div class="border_style item_1">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: [c1] 100px [c2] 100px [c3] 100px [c4];
    grid-template-rows: [r1] 100px [r2] 100px [r3] 100px [r4 another-name];
}
.item_1{
    grid-column-start: c1;
    grid-column-end: c3;
    grid-row-start: r2;
    grid-row-end: another-name;
}
.border_style{
    border: 1px solid #f00;
}
```

运行一下这段样式，可以看到和上面一样的效果。

#### span 跨越网格

span关键字，表示"跨越"，即左右边框（上下边框）之间跨越多少个网格。

```
// html代码
<div class="_container">
    <div class="border_style item_1">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(2, 100px);
}
.item_1{
    grid-column-start: span 2;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 4-2.png span跨越网格 %}

grid-column-start: span 2; 表示 item_1 项目的左边框起始位置距离右边结束位置跨越2个网格。

### grid-column,grid-row

grid-column属性是grid-column-start和grid-column-end的合并简写形式，grid-row属性是grid-row-start属性和grid-row-end的合并简写形式。

```
grid-column: <start-line> / <end-line> | <start-line> / span <value>;   
grid-row: <start-line> / <end-line> | <start-line> / span <value>;
```

下面是一段等同的代码

```
.item_1 {
    grid-column: 1 / 3;
    grid-row: 1 / 2;
}
/* 等同于 */
.item_1 {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
}
/* 等同于 */
.item_1 {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
}
```

### grid-area 属性

grid-area属性指定项目放在哪一个区域。同时，这个属性还可以用来更简短地表示grid-row-start+ grid-column-start + grid-row-end+ grid-column-end。

```
grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
```

#### 使用area名称

使用area的名称指定项目的位置

```
// html代码
<div class="_container">
    <div class="border_style item_1">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
    grid-template-areas: 'a b c'
                         'd e f'
                         'g h i';
}
.item_1{
    grid-area: e;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 4-3.png 使用area名称 %}

可以看到 item_1项目被放在了名字为e的区域位置。

#### 使用合并的方式

```
// html代码
<div class="_container">
    <div class="border_style item_1">1</div>
    <div class="border_style">2</div>
    <div class="border_style">3</div>
    <div class="border_style">4</div>
    <div class="border_style">5</div>
    <div class="border_style">6</div>
    <div class="border_style">7</div>
    <div class="border_style">8</div>
    <div class="border_style">9</div>
</div>
// css代码
._container{
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-template-rows: repeat(3, 100px);
}
.item_1{
    grid-area: 2 / 2 / 3 / 3;
}
.border_style{
    border: 1px solid #f00;
}
```

可以实现和上面使用area名称来指定位置同样的效果。

### (justify|align|place)-self

justify-self属性设置单元格内容的水平位置（左中右），跟justify-items属性的用法完全一致，但只作用于单个项目。

align-self属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致，也是只作用于单个项目。

place-self属性是align-self属性和justify-self属性的合并简写形式。

justify-self和align-self这两个属性都可以取下面的属性值

属性值 | 含义
--- | ---
start | 对齐单元格的起始边缘
end | 对齐单元格的结束边缘
center | 单元格内部居中
stretch | 拉伸，占满单元格的整个宽度（默认值）

```
// html代码
<div class="_container">
    <div class="border_style item_1">Grid Layout</div>
</div>
// css代码
._container{
    display: grid;
    height: 200px;
}
.item_1{
    justify-self: end;
    align-self: center;
}
.border_style{
    border: 1px solid #f00;
}
```

{% asset_img 4-4.png (justify|align|place)-self %}

可以看到子项目的位置在行的末尾(end)，在列的中间(center)。

```
place-self: <align-self> <justify-self>;
```

如果省略第二个值，place-self属性会认为这两个值相等。

## 总结

目前部分浏览器对于Grid布局的支持性还不是很强，但是这不应该是不去学习，接受新知识的原因。将来会有更多浏览器支持Grid布局，何不先睹为快？

本章完！