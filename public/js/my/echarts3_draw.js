// 标准柱状图
(function draw1() {
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
})();

// 降水量图
(function draw2(){
 // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main_2'));

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
                //   lineStyle: {
                //       color: '#233e53',           
                //   }
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
})(); 