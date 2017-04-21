---
title: hexo引入自定义css文件
date: 2017-02-20 17:29:31
categories: "hexo"
tags:
	- hexo
---

在搭建hexo的时候，我在网络上搜了很多对于hexo导入自定义css文件的解法，很抱歉，可能是由于自己太菜，目前没有在网上找到解决方法，不过我自己想了一个方法导入了自定义css文件，废话不多说，下面来给大家解答，希望可以帮到大家。

首先，html页面内是识别"script"标签的，我们可以利用这个标签，通过js代码将css文件导入页面。所以可以在页面中添加script代码

``` bash
<script type="text/javascript" src="/js/my/test.js"></script>
```

为了不与主题自带的js混合，我们可以在主题文件夹下边的js文件夹里添加一个my文件夹，用来放自己的js文件。这里我在my文件夹里添加了一个test.js文件。

然后将上面这段"script"代码直接放入需要引入css的.md文件里。

为了方便页面加载的时候运行test.js，可以再引入jQuery.js文件。

** 这里一定注意jQuery文件要在上边这段"script"前面，否则会报错 **

``` bash
<script type="text/javascript" src="/js/jquery-2.1.0.min.js"></script>
<script type="text/javascript" src="/js/my/test.js"></script>
```

jquery版本可以使用主题自带的jquery版本。

然后在test.js内加入如下代码，进行动态添加css文件

``` bash
$(document).ready(function() {
	var url = '/css/my/test.css';
	var doc = document;
	var link = doc.createElement("link");
	link.setAttribute("rel","stylesheet");
	link.setAttribute("type","text/css");
	link.setAttribute("href",url);
	var heads = doc.getElementsByTagName("head");
	if (heads.length) {
		heads[0].appendChild(link);
	}else{
		doc.documentElement.appendChild(link);
	}
});
```

然后在主题的source文件夹下边的css文件夹里创建一个my文件夹，用来放自己的css文件。原因上边已经说了，和js一样，防止与主题自带的css混合，也方便自己添加。

接着，创建test.css文件，并给该css文件写需要用到的css。

然后重新生成项目

``` bash
hexo g
```

部署项目

``` bash
hexo d
```

完成后查看自己的页面，是不是将css加载进去了呢？


**切记，自定义css的名称不能与主题自带的css重名！！！！！！！**
**切记，自定义css的名称不能与主题自带的css重名！！！！！！！**
**切记，自定义css的名称不能与主题自带的css重名！！！！！！！**

为了防止这个情况，可以给css起一些比较特殊的名称，比如给所有css名称前添加 "my_" 。
例如,可以起这种名字：

``` bash
<div class="my_head"></div>
<div class="my_artical"></div>
<div class="my_test"></div>
<div class="my_container"></div>
```
这样就不会重复啦！

第一次写博客，也是第一次用hexo，有点啰嗦，不好意思，如果你们有更好的解决办法，或者hexo本来就自带添加自定义css文件的参数，希望联系我，和大家一起分享！谢谢！
