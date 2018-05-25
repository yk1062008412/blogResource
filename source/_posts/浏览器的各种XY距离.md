---
title: 浏览器的各种XY距离
date: 2018-05-25 14:23:13
categories: 
  - "前端开发"
tags:
  - 移动端
  - Javascript
---

本文介绍浏览器中PC端页面开发中的 offsetX,clientX,pageX,screenX,layerX,x 距离的区别。

移动端页面开发中的 clientX,pageX,radiusX,screenX 距离的区别。

本文中就只讲述 X 的距离了，因为 Y 与 X 意义都相同，只不过一个是水平方向，一个是垂直方向上的。

## PC端

| 距离 | 意义 |
|:-----|:-----|
|offset|相对于当前注册点击事件的左上角，鼠标偏移量。|
|client|相对于浏览器左上角的鼠标偏移量。点击同一个位置：有滚动条时，会随着滚动条的变化而改变。|
|page|相对于整个document左上角的偏移量，不会随着滚动条的变化而改变。|
|screen|相对于电脑屏幕的距离。鼠标不动的情况下，点击两个不同区域，xy值不会变化。|
|layer|相对于父元素为 position:relative 或position:absolute. 的左上角的鼠标点击偏移量。|
|x|等同于 client 的解释。|

## 移动端

移动端测试我借用了jquery封装的 e.originalEvent.touches[0] 属性来获取的屏幕触点值。

| 距离 | 意义 |
|:-----|:-----|
|client|相对于浏览器左上角的鼠标偏移量。会随着滚动条的变化而变化。|
|pageX|相对于整个document左上角的偏移量，不会随着滚动条的变化而改变。|
|radiusX|能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径|
|screenX|相对于电脑屏幕的距离。鼠标不动的情况下，点击两个不同区域，xy值不会变化。|

为了方便大家可以自己试一试，我把我测试过程中的代码放在下面，以便大家自己测试。

## Code

### PC端code

``` bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>pc端距离测试</title>
  <style>
    *{margin:0;padding:0;}
    html{
      width: 100%;
      height: 100%;
    }
    body{
      width: 2500px;
      height: 1600px;
      position: relative;
    }
    .title{
      text-align: center;
    }
    .main{
      margin-left: 500px;
      margin-top: 400px;
      width: 400px;
      height: 300px;
      border: 1px solid #f00;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      /*position: relative;*/
    }
    .box{
      width: 200px;
      height: 150px;
      border: 1px solid #0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="main">
    <div class="box" id="myBox">box</div>
  </div>
  <div class="title">测试 offsetX, clientX, pageX, screenX, layerX, x</div>

  <script>
    var myBox = document.getElementById('myBox');
    myBox.addEventListener('mousedown',function(e){
      // console.log(e);
      // offset 相对于当前注册点击事件的左上角，鼠标偏移量。
      // console.log("e.offsetX: " + e.offsetX + " ---------- e.offsetY: " + e.offsetY);
      // client 相对于浏览器左上角的鼠标偏移量。点击同一个位置：有滚动条时，会随着滚动条的变化而改变。
      // console.log("e.clientX: " + e.clientX + " ---------- e.clientY: " + e.clientY);
      // page 相对于整个document左上角的偏移量，不会随着滚动条的变化而改变。
      // console.log("e.pageX: " + e.pageX + " ---------- e.pageY: " + e.pageY);
      // screen 相对于电脑屏幕的距离。鼠标不动的情况下，点击两个不同区域，xy值不会变化。
      // console.log("e.screenX: " + e.screenX + " ---------- e.screenY: " + e.screenY);
      // layer相对于父元素为 position:relative 或position:absolute. 的左上角的鼠标点击偏移量。
      // console.log("e.layerX: " + e.layerX + " ---------- e.layerY: " + e.layerY);
      // xy 等同于 client 的解释。
      // console.log("e.x: " + e.x + " ---------- e.y: " + e.y);
    })
  </script>
</body>
</html>
```

### 移动端code

``` bash
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=9,IE=edge,chrome=1" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <meta name="renderer" content="webkit">
    <meta charset="utf-8">
  <title>移动端的距离</title>
  <style>
    *{margin:0;padding:0;}
    html{
      width: 100%;
      height: 100%;
    }
    body{
      width: 1500px;
      height: 1000px;
      position: relative;
    }
    .title{
      text-align: center;
    }
    .main{
      margin-left: 200px;
      margin-top: 100px;
      width: 400px;
      height: 200px;
      border: 1px solid #f00;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      /*position: relative;*/
    }
    .box{
      width: 200px;
      height: 100px;
      border: 1px solid #0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
    }
  </style>
</head>
<body>
  <div class="main">
    <button class="box" id="mBox">移动端</button>
  </div>
  <div class="title">(基于jQuery.min.js)测试 clientX, pageX, radiusX, screenX</div>

  <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
  <script>
    // var myBox = document.getElementById('mBox');
    // myBox.addEventListener('click', function(e){
    //  alert("ss");
    // });
    // $("body").on('click', '#mBox', function(event) {
    //  event.preventDefault();
    //  alert("22");
    // });

    // var myBox = $("#mBox");

    // myBox.on('touchstart', function(e) {
    //  e.preventDefault();
    //  console.log(e);
    //  let t = e.originalEvent.touches[0];
    //  // client 相对于浏览器左上角的鼠标偏移量。会随着滚动条的变化而变化。
    //  // console.log("t.clientX: " + t.clientX + " ---------- t.clientY: " + t.clientY);
    //  // page 相对于整个document左上角的偏移量，不会随着滚动条的变化而改变。
    //  // console.log("t.pageX: " + t.pageX + " ---------- t.pageY: " + t.pageY);
    //  // 能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径
    //  // console.log("t.radiusX: " + t.radiusX + " ---------- t.radiusY: " + t.radiusY);
    //  // screen相对于电脑屏幕的距离。鼠标不动的情况下，点击两个不同区域，xy值不会变化。
    //  console.log("t.screenX: " + t.screenX + " ---------- t.screenY: " + t.screenY);
    // });
  </script>
</body>
</html>
```

本章完！




