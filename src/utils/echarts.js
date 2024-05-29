import * as echarts from 'echarts/core'
import {BarChart, PieChart,LineChart, RadarChart} from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    LegendComponent 
  } from 'echarts/components';
  // 标签自动布局、全局过渡动画等特性
  import { LabelLayout, UniversalTransition } from 'echarts/features';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';
  
// 注册必须的组件
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    PieChart,
    BarChart,
    LineChart,
    RadarChart,
    LabelLayout,
    UniversalTransition,
    CanvasRenderer,
    LegendComponent 
  ]);
  export function radarDemo(element){
    let piechart=echarts.init(element)
    var legendData = ['车辆数', '设计车位']; //图例
var indicator = [{
        text: '小型车',
        max: 6000,
    },
    {
        text: '中型车',
        max: 5000
    },
    {
        text: '大型车',
        max: 5000
    },
    {
        text: '货车',
        max: 5000,
        //  axisLabel: {show: true, textStyle: {fontSize: 18, color: '#333'}}
    },
    {
        text: '特种车',
        max: 5000
    },
    {
        text: '贵宾车',
        max: 5000
    }
];
var dataArr = [{
        value: [4300, 4700, 3600, 3900, 3800, 4200],
        name: legendData[0],
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#4A99FF',
                    // shadowColor: '#4A99FF',
                    // shadowBlur: 10,
                },
                shadowColor: '#4A99FF',
                shadowBlur: 10,
            },
        },
        areaStyle: {
                normal: { // 单项区域填充样式
                    color: {
                        type: 'linear',
                        x: 0, //右
                        y: 0, //下
                        x2: 1, //左
                        y2: 1, //上
                        colorStops: [{
                            offset: 0,
                            color: '#4A99FF'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: '#4A99FF'
                        }],
                        globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                }
            }
    },
    {
        value: [3200, 3000, 3400, 2000, 3900, 2000],
        name: legendData[1],
        itemStyle: {
            normal: {
                lineStyle: {
                    color: '#4BFFFC',
                    // shadowColor: '#4BFFFC',
                    // shadowBlur: 10,
                },
                shadowColor: '#4BFFFC',
                shadowBlur: 10,
            },
        },
         areaStyle: {
                normal: { // 单项区域填充样式
                    color: {
                        type: 'linear',
                        x: 0, //右
                        y: 0, //下
                        x2: 1, //左
                        y2: 1, //上
                        colorStops: [{
                            offset: 0,
                            color: '#4BFFFC'
                        }, {
                            offset: 0.5,
                            color: 'rgba(0,0,0,0)'
                        }, {
                            offset: 1,
                            color: '#4BFFFC'
                        }],
                        globalCoord: false
                    },
                    opacity: 1 // 区域透明度
                }
            }
    }
];
var colorArr = ['#4A99FF', '#4BFFFC']; //颜色
let option = {
  
    color: colorArr,
    legend: {
        orient:'vertical',
        icon: 'circle', //图例形状
        data: legendData,
        bottom:35,
        right:40,
        itemWidth: 14, // 图例标记的图形宽度。[ default: 25 ]
        itemHeight: 14, // 图例标记的图形高度。[ default: 14 ]
        itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: {
            fontSize: 12,
            color: '#00E4FF',
        },
    },
    radar: {
        // shape: 'circle',
        name: {
            textStyle: {
                color: '#fff',
                fontSize: 12
            },
        },
        indicator: indicator,
        splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
            show: true,
            areaStyle: { // 分隔区域的样式设置。
                color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
            }
        },
        axisLine: { //指向外圈文本的分隔线样式
            lineStyle: {
                color: '#153269'
            }
        },
        splitLine: {
            lineStyle: {
                color: '#113865', // 分隔线颜色
                width: 1, // 分隔线线宽
            }
        },
    },
    series: [{
        type: 'radar',
        symbolSize: 8,
        // symbol: 'angle',
        data: dataArr
    }]
};
    piechart.setOption(option)
    return piechart
  }
  export function pieDemo1(element){
    let piechart=echarts.init(element)
    var scale = 0.5;
    var echartData = [{
        value: 2154,
        name: 'xx'
    }, {
        value: 3854,
        name: 'aa'
    }, {
        value: 3515,
        name: 'bb'
    }, {
        value: 3515,
        name: 'cc'
    }, {
        value: 3854,
        name: 'dd'
    }, {
        value: 2154,
        name: 'ee'
    }]
    var rich = {
        yellow: {
            color: "#ffc72b",
            fontSize: 30 * scale,
            padding: [5, 4],
            align: 'center'
        },
        total: {
            color: "#ffc72b",
            fontSize: 40 * scale,
            align: 'center'
        },
        white: {
            color: "#fff",
            align: 'center',
            fontSize: 14 * scale,
            padding: [21, 0]
        },
        blue: {
            color: '#49dff0',
            fontSize: 16 * scale,
            align: 'center'
        },
        hr: {
            borderColor: '#0b5263',
            width: '100%',
            borderWidth: 1,
            height: 0,
        }
    }
    let option = {

        title: {
           
            left:'center',
            top:'53%',
            padding:[24,0],
            textStyle:{
                color:'#fff',
                fontSize:18*scale,
                align:'center'
            }
        },
        legend: {
            selectedMode:false,
            formatter: function(name) {
                var total = 0; //各科正确率总和
                var averagePercent; //综合正确率
                echartData.forEach(function(value, index, array) {
                    total += value.value;
                });
                return '{total|' + total + '}';
            },
            data: [echartData[0].name],
            // data: ['高等教育学'],
            // itemGap: 50,
            left: 'center',
            top: 'center',
            icon: 'none',
            align:'center',
            textStyle: {
                color: "#fff",
                fontSize: 16 * scale,
                rich: rich
            },
        },
        series: [{
            name: '总考生数量',
            type: 'pie',
            radius: ['42%', '50%'],
            hoverAnimation: false,
            color: ['#c487ee', '#deb140', '#49dff0', '#034079', '#6f81da', '#00ffb4'],
            label: {
                normal: {
                    formatter: function(params, ticket, callback) {
                        var total = 0; //考生总数量
                        var percent = 0; //考生占比
                        echartData.forEach(function(value, index, array) {
                            total += value.value;
                        });
                        percent = ((params.value / total) * 100).toFixed(1);
                        return '{white|' + params.name + '}\n{hr|}\n{yellow|' + params.value + '}\n{blue|' + percent + '%}';
                    },
                    rich: rich
                },
            },
            labelLine: {
                normal: {
                    length: 55 * scale,
                    length2: 0,
                    lineStyle: {
                        color: '#0b5263'
                    }
                }
            },
            data: echartData
        }]
    };
    piechart.setOption(option)
    return piechart
  }
  export function scatterDemo1(element){
    let scatterchart=echarts.init(element)
    var myColor = ['#eb2100', '#eb3600', '#d0570e', '#d0a00e', '#34da62', '#00e9db', '#00c0e9', '#0096f3', '#33CCFF', '#33FFCC'];
    let option = {

    grid: {
        left: '11%',
        top: '12%',
        right: '0%',
        bottom: '8%',
        containLabel: true
    },
    xAxis: [{
        show: false,
    }],
    yAxis: [{
        axisTick: 'none',
        axisLine: 'none',
        offset: '27',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '12',
            }
        },
        data: ['xx', 'aa', 'yy', 'zz', 'nn', 'cc', 'gg', 'hh', 'bb', 'mm']
    }, {
        axisTick: 'none',
        axisLine: 'none',
        axisLabel: {
            textStyle: {
                color: '#ffffff',
                fontSize: '12',
            }
        },
        data: ['10', '9', '8', '7', '6', '5', '4', '3', '2', '1']
    }, {
        name: '分拨延误TOP 10',
        nameGap: '50',
        nameTextStyle: {
            color: '#ffffff',
            fontSize: '12',
        },
        axisLine: {
            lineStyle: {
                color: 'rgba(0,0,0,0)'
            }
        },
        data: [],
    }],
    series: [{
            name: '条',
            type: 'bar',
            yAxisIndex: 0,
            data: [4, 13, 25, 29, 38, 44, 50, 52, 60, 72],
            label: {
                normal: {
                    show: true,
                    position: 'right',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: '12',
                    }
                }
            },
            barWidth: 5,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                }
            },
            z: 2
        }, {
            name: '白框',
            type: 'bar',
            yAxisIndex: 1,
            barGap: '-100%',
            data: [99, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5, 99.5],
            barWidth: 10,
            itemStyle: {
                normal: {
                    color: '#0e2147',
                    barBorderRadius: 5,
                }
            },
            z: 1
        }, {
            name: '外框',
            type: 'bar',
            yAxisIndex: 2,
            barGap: '-100%',
            data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
            barWidth: 14,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                    barBorderRadius: 5,
                }
            },
            z: 0
        },
        {
            name: '外圆',
            type: 'scatter',
            hoverAnimation: false,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yAxisIndex: 2,
            symbolSize: 18,
            itemStyle: {
                normal: {
                    color: function(params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                    opacity: 1,
                }
            },
            z: 2
        }
    ]
};
    scatterchart.setOption(option)
    return scatterchart
  }
  export function lineDemo1(element){
    let linechart=echarts.init(element)
    let option = {
    
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(0, 255, 233,0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(255, 255, 255,1)',
                        }, {
                            offset: 1,
                            color: 'rgba(0, 255, 233,0)'
                        }],
                        global: false
                    }
                },
            },
        },
        grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            axisLine: {
                show: true
            },
            splitArea: {
                // show: true,
                color: '#f00',
                lineStyle: {
                    color: '#f00'
                },
            },
            axisLabel: {
                color: '#fff'
            },
            splitLine: {
                show: false
            },
            boundaryGap: false,
            data: ['A', 'B', 'C', 'D', 'E', 'F'],
    
        }],
    
        yAxis: [{
            type: 'value',
            min: 0,
            // max: 140,
            splitNumber: 4,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.1)'
                }
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false,
                margin: 20,
                textStyle: {
                    color: '#d1e6eb',
    
                },
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
                name: '注册总量',
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: {
                    normal: {
                        color: "#6c50f3",
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#6c50f3',
                    }
                },
                itemStyle: {
                    color: "#6c50f3",
                    borderColor: "#fff",
                    borderWidth: 3,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(108,80,243,0.3)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(108,80,243,0)'
                            }
                        ], false),
                        shadowColor: 'rgba(108,80,243, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]
            },
            {
                name: '注册总量',
                type: 'line',
                // smooth: true, //是否平滑
                showAllSymbol: true,
                // symbol: 'image://./static/images/guang-circle.png',
                symbol: 'circle',
                symbolSize: 5,
                lineStyle: {
                    normal: {
                        color: "#00ca95",
                        shadowColor: 'rgba(0, 0, 0, .3)',
                        shadowBlur: 0,
                        shadowOffsetY: 5,
                        shadowOffsetX: 5,
                    },
                },
                label: {
                    show: true,
                    position: 'top',
                    textStyle: {
                        color: '#00ca95',
                    }
                },
    
                itemStyle: {
                    color: "#00ca95",
                    borderColor: "#fff",
                    borderWidth: 3,
                    shadowColor: 'rgba(0, 0, 0, .3)',
                    shadowBlur: 0,
                    shadowOffsetY: 2,
                    shadowOffsetX: 2,
                },
                tooltip: {
                    show: false
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0,202,149,0.3)'
                            },
                            {
                                offset: 1,
                                color: 'rgba(0,202,149,0)'
                            }
                        ], false),
                        shadowColor: 'rgba(0,202,149, 0.9)',
                        shadowBlur: 20
                    }
                },
                data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],
            },
        ]
    };
    linechart.setOption(option)
    return linechart
  }
  export function barchartsDemo2(element){
    let barchart=echarts.init(element)
    let option = {
        
     
       tooltip: {
           trigger: "axis",
           axisPointer: {
               type: "shadow",
               label: {
                   show: true
               }
           }
       },
   
       xAxis: {
           data: [
               "当年完成水量",
               "去年同期水量",
               "滚动目标值水量",
               "全年目标值水量",
               "当年完成金额",
               "去年同期金额",
               "滚动目标金额",
               "全年目标值",
               
           ],
           axisLine: {
               show: true, //隐藏X轴轴线
               lineStyle: {
                           color: '#fff'
                           }
           },
           axisTick: {
               show: true //隐藏X轴刻度
           },
           axisLabel: {
               show: true,
               textStyle: {
                   color: "#fff" //X轴文字颜色
               }
           },
            
       },
       yAxis: [{
               type: "value",
               name: "亿元",
               nameTextStyle: {
                   color: "#fff"
               },
               splitLine: {
                   show: false
               },
               axisTick: {
                   show: true
               },
               axisLine: {
                   show: true,
                   lineStyle: {
                               color: '#FFFFFF'
                               }
               },
               axisLabel: {
                   show: true,
                   textStyle: {
                       color: "#fff"
                   }
               },
                
           },
           {
               type: "value",
               name: "同比",
               nameTextStyle: {
                   color: "#fff"
               },
               position: "right",
               splitLine: {
                   show: false
               },
               axisTick: {
                   show: false
               },
               axisLine: {
                   show: false
               },
               axisLabel: {
                   show: true,
                   formatter: "{value} %", //右侧Y轴文字显示
                   textStyle: {
                       color: "#fff"
                   }
               }
           },
           {
               type: "value",
               gridIndex: 0,
               min: 50,
               max: 100,
               splitNumber: 8,
               splitLine: {
                   show: false
               },
               axisLine: {
                   show: false
               },
               axisTick: {
                   show: false
               },
               axisLabel: {
                   show: false
               },
               splitArea: {
                   show: true,
                   areaStyle: {
                       color: ["rgba(250,250,250,0.0)", "rgba(250,250,250,0.05)"]
                   }
               }
           }
       ],
       series: [{
               name: "销售水量",
               type: "line",
               yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
               smooth: true, //平滑曲线显示
               showAllSymbol: true, //显示所有图形。
               symbol: "circle", //标记的图形为实心圆
               symbolSize: 10, //标记的大小
               itemStyle: {
                   //折线拐点标志的样式
                   color: "#058cff"
               },
               lineStyle: {
                   color: "#058cff"
               },
               areaStyle:{
                   color: "rgba(5,140,255, 0.2)"
               },
               data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
           },
           {
               name: "主营业务",
               type: "bar",
               barWidth: 15,
               itemStyle: {
                   normal: {
                       color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                               offset: 0,
                               color: "#00FFE3"
                           },
                           {
                               offset: 1,
                               color: "#4693EC"
                           }
                       ])
                   }
               },
               data: [4.2, 3.8, 4.8, 3.5, 2.9, 2.8, 3, 5]
           }
       ]
   };
    barchart.setOption(option)
    return barchart
  }
  export function barChartsDemo1(element){
    let barchart=echarts.init(element)
    var option = {
       
           tooltip: {
             trigger: 'axis',
             axisPointer: { // 坐标轴指示器，坐标轴触发有效
               type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
             }
           },
           grid: {
             left: '2%',
             right: '4%',
             bottom: '14%',
             top:'16%',
             containLabel: true
           },
          
           xAxis: {
             type: 'category',
             data: ['2012','2013','2014','2015','2016','2017','2018','2019'],
             axisLine: {
               lineStyle: {
                 color: 'white'
   
               }
             },
             axisLabel: {
               // interval: 0,
               // rotate: 40,
               textStyle: {
                 fontFamily: 'Microsoft YaHei'
               }
             },
           },
   
           yAxis: {
             type: 'value',
             max:'1200',
             axisLine: {
               show: false,
               lineStyle: {
                 color: 'white'
               }
             },
             splitLine: {
               show: false,
               lineStyle: {
                 color: 'rgba(255,255,255,0.3)'
               }
             },
             axisLabel: {}
           },
           "dataZoom": [{
             "show": true,
             "height": 12,
             "xAxisIndex": [
               0
             ],
             bottom:'8%',
             "start": 10,
             "end": 90,
             handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
             handleSize: '110%',
             handleStyle:{
               color:"#d3dee5",
   
             },
             textStyle:{
               color:"#fff"},
             borderColor:"#90979c"
           }, {
             "type": "inside",
             "show": true,
             "height": 15,
             "start": 1,
             "end": 35
           }],
           series: [{
             name: '1',
             type: 'bar',
             barWidth: '15%',
             itemStyle: {
               normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: '#fccb05'
                   }, {
                       offset: 1,
                       color: '#f5804d'
                   }]),
                   barBorderRadius: 12,
               },
             },
             data: [400, 400, 300, 300, 300, 400, 400, 400, 300]
           },
           {
             name: '2',
             type: 'bar',
             barWidth: '15%',
             itemStyle: {
               normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: '#8bd46e'
                   }, {
                       offset: 1,
                       color: '#09bcb7'
                   }]),
                   barBorderRadius: 11,
               }
               
             },
             data: [400, 500, 500, 500, 500, 400,400, 500, 500]
           },
           {
             name: '3',
             type: 'bar',
             barWidth: '15%',
             itemStyle: {
               normal: {
                   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                       offset: 0,
                       color: '#248ff7'
                   }, {
                       offset: 1,
                       color: '#6851f1'
                   }]),
               barBorderRadius: 11,
               }
             },
             data: [400, 600, 700, 700, 1000, 400, 400, 600, 700]
           }]
         };
         barchart.setOption(option)
         return barchart
  }
   export function lineCharts(element,data,axisData,min){
    let barchart=echarts.init(element)
    let option = {
 
        tooltip: {
            trigger: 'axis',
            show: true,
            backgroundColor:'rgba(5,149,149,0.7)',
            borderColor:'rgba(5,149,149,0.7)',
            textStyle:{
                color:'#fff'
            }
        },
        grid: {
            top: '12%',
            left: '1%',
            right: '1%',
            bottom: '5%',
            containLabel: true,
        },

        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
                show: true,
                lineStyle: {
                    color: 'rgba(255,255,255,0.62)'
                },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
                textStyle: {
                    color: '#d1e6eb',
                    // margin: 15,
                },
            },
            axisTick: {
                show: false,
            },
            data: axisData,
        }],
        yAxis: [{
            type: 'value',
            min:min,
            splitNumber: 7,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(254,254,255,0.15)'
                }
            },
            // minInterval:4,
            axisLine: {
                show: false,
            },
            axisLabel: {
                margin: 20,
                textStyle: {
                    color: '#d1e6eb',
    
                },
            },
            axisTick: {
                show: false,
            },
        }],
        series: [{
            name:'电压',
            type: 'line',
            // smooth: true, //是否平滑曲线显示
            // 			symbol:'circle',  // 默认是空心圆（中间是白色的），改成实心圆

            lineStyle: {
                normal: {
                    color: "#08FFFF ", // 线条颜色
                },
                borderColor: '#fff'
            },
            label: {
                show: true,
                position: 'top',
                textStyle: {
                    color: '#fff',
                }
            },
            itemStyle: {
                normal: {
                    color: "#fff",
    
                }
            },

            areaStyle: { //区域填充样式
                normal: {
                    //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(8,255,255,0.15)'
                        },
                        {
                            offset: 1,
                            color: 'rgba(8,255,255,0)'
                        }
                    ], false),
                    shadowColor: 'rgba(53,142,215, 0.9)', //阴影颜色
                    shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
            },
            data: data
        }]
    
      
   }
   barchart.setOption(option)
   return barchart
   }