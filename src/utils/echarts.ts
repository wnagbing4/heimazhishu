import * as echarts from 'echarts';


export const workbenchEcharts = (ref: any, arr: any) => {
  const myChart = echarts.init(ref);

  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      right: "5%"
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: arr.xmonth
      }
    ],
    yAxis: [
      {
      }
    ],
    series: [
      {
        name: '物业费',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: arr.ybuilding,
        // 柱状图背景色
        itemStyle: {
          color: '#3656ff'
        },
        // 柱状图宽度
        barWidth: "20"
      },
      {
        name: '行业费',
        type: 'bar',
        stack: 'Ad',
        emphasis: {
          focus: 'series'
        },
        data: arr.yparking,
        itemStyle: {
          color: '#cde4ff'
        }
      },
    ]
  };
  option && myChart.setOption(option);

}
