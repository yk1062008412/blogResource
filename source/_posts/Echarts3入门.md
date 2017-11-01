---
title: Echarts3入门
date: 2017-06-16 11:10:09
categories: "前端开发"
tags: 
	- Echarts
---

本文介绍Echarts 3的入门用法

## 前言

ECharts，缩写来自Enterprise Charts，商业级数据图表，是百度的一个开源的数据可视化工具，业界给予了很多赞誉。

之前做项目一直用的是echarts2做的，后来同事说Echarts 3使用起来更方便，去官网一看，大部分实现过程和echarts2还是一样的，只是用echarts3不再需要通过 require 来加载echarts配置文件，不用其他的图表配置，直接引入echarts.js文件即可。而且Echarts 3的界面更加友好，用户体验比Echarts 2更加完美，体积也更小。

## 获取ECharts

你可以通过以下几种方式获取 ECharts.js文件。

* 从[官网下载](http://echarts.baidu.com/download.html)选择你需要的图表类型下载，根据开发者功能和体积上的需求，我们提供了不同打包的下载，如果你在体积上没有要求，可以直接下载[完整版本](http://echarts.baidu.com/dist/echarts.min.js)。开发环境建议下载[源代码](http://echarts.baidu.com/dist/echarts.js)版本，包含了常见的错误提示和警告。

* 在 ECharts 的 [GitHub](https://github.com/ecomfe/echarts) 上下载最新的 release 版本，解压出来的文件夹里的 dist 目录里可以找到最新版本的 echarts 库。

* 通过 npm 获取 echarts，npm install echarts --save，详见[“在 webpack 中使用 echarts”](http://echarts.baidu.com/tutorial.html#在 webpack 中使用 ECharts)

* cdn 引入，你可以在 [cdnjs](https://cdnjs.com/libraries/echarts)，[npmcdn](https://npmcdn.com/echarts@latest/dist/) 或者国内的 [bootcdn](http://www.bootcdn.cn/) 上找到 ECharts 的最新版本

## 引入 ECharts
ECharts 3 开始不再强制使用 AMD 的方式按需引入，代码里也不再内置 AMD 加载器。因此引入方式简单了很多，只需要像普通的 JavaScript 库一样用 script 标签引入。

``` bash
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <!-- 引入 ECharts 文件 -->
    <script src="echarts.min.js"></script>
</head>
</html>
```

## 入门

在绘图前我们需要为 ECharts 准备一个具备高宽的 DOM 容器。

``` bash
<body>
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main_1" style="width: 600px;height:400px;"></div>
</body>
```

然后就可以通过 [echarts.init](http://echarts.baidu.com/api.html#echarts.init) 方法初始化一个 echarts 实例并通过 [setOption](http://echarts.baidu.com/api.html#echartsInstance.setOption) 方法生成一个简单的柱状图，下面是完整代码。

``` bash
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="echarts.min.js"></script>
</head>
<body>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main_1" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main_1'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    </script>
</body>
</html>
```

这样你的第一个图表就诞生了！

<div id="main_1" style="width: 600px;height:400px;"></div>

这是一个柱状图的实例，改变上面代码中series，type由bar改为line可生产折线图:

``` bash
series: [{
	name: '销量',
	type: 'line',
	data: [5, 20, 36, 10, 10, 20]
}]
```

## 使用及参数配置

我们根据官网的一个[示例](http://echarts.baidu.com/demo.html#bar1)来讲解一下，下面就是相关的参数配置说明：

``` bash
<script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('demo1'));

    // 指定图表的配置项和数据
    var option = {
        title : {
            text: '某地区蒸发量和降水量',//大标题
            // textStyle: {
            //     color: '#3491D0'
            // },//标题颜色配置，源码已注释
            subtext: '纯属虚构'  // 小标题
        },
        tooltip : {
            trigger: 'axis' //提示框组件。，可自定义
        },
        legend: {
            data:['蒸发量','降水量'] //图例组件.图例组件展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示。
        },
        toolbox: { 
        //工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},//数据视图
                magicType : {show: true, type: ['line', 'bar']},//柱状很折线切换配置
                restore : {show: true},//重置
                saveAsImage : {show: true}//保存图片
            }
        },
        calculable : true,//是否显示拖拽用的手柄（手柄能拖拽调整选中范围）。默认false
        xAxis : [
            {   //直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放左右两个 x 轴
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                boundaryGap: true,
                name: "月份"
                // axisLabel:{
                //     interval: 'auto',
                //     //rotate:45,倾斜度 -90 至 90 默认为0
                //     margin:8,
                //     textStyle:{
                //          //data 的字体配置
                //         fontWeight:"normal",
                //         color:"#3491D0"
                //     }
                // },
                // nameTextStyle:{
                //      //横坐标说明 的字体配置，本例中“月份”
                //     color:"#3491D0",
                //     fontSize: 14  
                // }
            }
        ],
        yAxis : [
            {
                type : 'value',
                name: '数量'
                // axisLabel:{
                //         textStyle:{
                //             fontWeight:"normal",
                //             color:"#3491D0"
                //         }
                //     },
                // splitLine: {
                // 	lineStyle: {
                //     	color: '#233e53',           
                // 	}
                // } ,
                // nameTextStyle:{
                //     color:"#3491D0",
                //     fontSize: 14 
                // }  
            }
        ],
        series : [
            {
                name:'蒸发量',
                type:'bar',
                data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                markPoint : {
                    //蒸发量最大值，最小值
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    //平均值
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'降水量',
                type:'bar',
                data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                markPoint : {
                    data : [
                        {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183, symbolSize:18},
                        {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
</script>
```

本例效果图：

<!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
<div id="main_2" style="width: 800px;height:500px;"></div>

本文参考 [echarts官网案例](http://echarts.baidu.com/tutorial.html#5 分钟上手 ECharts)

本章完！


<script type="text/javascript" src="/js/echarts.min.js"></script>
<script type="text/javascript" src="/js/my/echarts3_draw.js"></script>