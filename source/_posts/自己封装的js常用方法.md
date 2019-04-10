---
title: 自己封装的js常用方法
date: 2018-08-12 18:55:36
categories: "Javascript"
tags:
  - Javascript
---

文章讲述我自己常用的一些封装js的方法，方便使用。


## HTML

### 小米官方屏幕适配

下面的代码放到css前调用。然后css使用rem单位进行适配。

``` bash
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
<title>标题</title>
<script>
  !function(n){
    var e=n.document, //获取document
    t=e.documentElement,  //获取根节点html
    i=720,  //初始值720px
    d=i/100,  //假设100px为1rem，那么720px为7.2rem
    o="orientationchange"in n?"orientationchange":"resize", //判断是否有改变横屏事件，没有的话用resize事件
    a=function(){
        var n=t.clientWidth||320; //获取手机屏幕宽度
        n > 720 && (n=720), //手机屏幕宽度大于720px默认设置为720px，即最大宽度为720px 
        t.style.fontSize=n/d+"px"    //设置根元素的字体大小为手机屏幕宽度/7.2,为上面自己定义的，当然你可以定义成别的，8.2，9.4都行
    }; 
    e.addEventListener && (n.addEventListener(o,a,!1), //判断是否有addeventlistener方法，如果有，就绑定上面判断的o事件
    e.addEventListener("DOMContentLoaded",a,!1))    //绑定DOMContentLoaded事件
  }(window);
</script>
<link rel="stylesheet" href="css/test.css">
```

## CSS

``` bash
@charset "UTF-8";
* {
  margin: 0;
  padding: 0;
  -webkit-tap-highlight-color: transparent;
  box-sizing: border-box;
}
html, body, .container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
button, input{
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
```

## JavaScript

### 封装jQuery的ajax

``` bash
/**
 * @param _url: 请求的URL参数
 * @param _param: data数据
 * @param _callback: 回调函数
 * @return {_callback}
 */
function myAjax(_url, _param, _callback) {
  $.ajax({
    type: 'GET',
    url: _url,
    data: _param,
    dataType: 'json',
    success: function(data) {
      console.log(data);
      _callback(data);
    },
    error: function(xhr, type) {
      // alert('Ajax error!')
    }
  })
}
```

### 封装jQuery点击事件

``` bash
/**
 * @param el: 点击的element元素
 * @param _callback: 点击后的回调函数
 */
function deClick(el, callback) {
  $(document).delegate(el, 'click', callback);
}
```

### 微信H5分享

``` bash
<script src="//res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="./js/wxShare.js"></script>
<script>
  function(){
    shareWx(window.location.href, 图片地址, 分享描述, 分享的标题);
  }
</script>
```

js/wxShare.js内容

``` bash
function shareWx(url, img, title, desc, callBack) {
    $.ajax({
        url: '******', //获取微信公众平台的各种参数接口
        type: "POST",
        data: {
            url: window.location.href,
            appid: "****" //微信公众号的appid
        },
        dataType: "json",
        success: function (data) {
            if (data.nonceStr != null && data.nonceStr != "") {
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: data.appId, // 必填，公众号的唯一标识
                    timestamp: data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                    signature: data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'hideAllNonBaseMenuItem', 'showMenuItems', 'addCard'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                //分享链接的缩略图
                var imgUrl = img;
                //分享链接的链接地址
                var lineLink = url;
                //分享链接的描述信息
                var descContent = desc;
                //分享链接的标题
                var shareTitle = title;
                //一般为空 就好
                var appid = '';
                //分享给好友
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: shareTitle, // 分享标题
                        link: lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            if (typeof callBack == "function") {
                                callBack();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: shareTitle, // 分享标题
                        desc: descContent, // 分享描述
                        link: lineLink, // 分享链接
                        imgUrl: imgUrl, // 分享图标
                        type: '', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success: function () {
                            // 用户确认分享后执行的回调函数
                            if (typeof callBack == "function") {
                                callBack();
                            }
                        },
                        cancel: function () {
                            // 用户取消分享后执行的回调函数
                        }
                    });
                    wx.hideAllNonBaseMenuItem();
                    wx.showMenuItems({
                        menuList: ['menuItem:share:appMessage', 'menuItem:share:timeline'] // 要显示的菜单项，所有menu项见附录3
                    });
                });

                wx.error(function (res) {
                    //alert("验证不通过");
                    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。

                });
            }
        }
    });
}

```





