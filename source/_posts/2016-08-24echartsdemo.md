---
title: echarts demo
date: 2016-08-24 21:32:13
---
> 注意：使用echarts的时候，不要直接给所有的div设置宽度！！

```
<!doctype html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Document</title>
  <style>
    #chart {
      width: 900px;
      height: 500px;
    }
  </style>
</head>
<body>
<div id='chart'></div>

<script src='./lib/echarts.min.js'></script>
<script src='./lib/macarons.js'></script>
<script>
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      }
    },
    legend: {
      data:['蒸发量','降水量','平均温度'],
      y: 'bottom'
    },
    grid: {
      left: '6%',
      right: '4%',
      bottom: '8%',
      top: 30,
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
        axisTick: {
          alignWithLabel: true // x坐标轴对齐
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '完成产值 (万元)',
        min: 0,
        // interval: 50,
        axisLabel: {
          formatter: '{value}'
        }
      }
    ],
    series: [
      {
        name:'蒸发量',
        type:'bar',
        stack: '总量',
        barWidth: '30%',
        data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        // label: {
        //   normal: {
        //     show: true
        //   }
        // }
      },
      {
        name:'降水量',
        type:'bar',
        stack: '总量',
        barWidth: '30%',
        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        // label: {
        //   normal: {
        //     show: true
        //   }
        // }
      },
      {
        name:'平均温度',
        type:'line',
        barWidth: '30%',
        smooth: true,
        data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3].map(item => (item * 3).toFixed(2)),
        label: {
          normal: {
            show: true
          }
        }
      }
    ]
  };

  let myCharts = echarts.init(document.getElementById('chart'), 'macarons');
  myCharts.setOption(option);
</script>
</body>
</html>

```
  