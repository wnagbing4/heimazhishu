import type { ParkInfoParamsType } from "@/Visualization/api/park/parkType";
import * as echarts from 'echarts';
import { ref } from "vue";
// 柱状图
export const useInitBarChart = (ParkInfo:ParkInfoParamsType) => {
    const initBarChart = () => {
        const barChart = ref();
        const myChart = echarts.init(barChart.value);
    
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '0px',
                top: '20px',
                right: '0',
                bottom: '40px',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ParkInfo.parkIncome.xMonth, splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    data: ParkInfo.parkIncome.yIncome.map((item, index) => {
    
                        if (index % 2 == 0) {
                            const color = {
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#74c0f8' },
                                        { offset: 1, color: 'rgba(255,255,255,0.1)' }
                                    ])
                                }
                            }
                            return { value: item, ...color }
                        } else {
                            const color = {
                                itemStyle: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        { offset: 0, color: '#ff7152' },
                                        { offset: 1, color: 'rgba(255,255,255,0.1)' }
                                    ])
                                }
                            }
                            return { value: item, ...color }
                        }
                    }),
                    type: 'bar',
                    barWidth: '10px',
                    // itemStyle: {
                    //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    //         { offset: 0, color:'#f97154' },
                    //         { offset: 1, color: 'rgba(255,255,255,0.1)' }
                    //     ])
                    // },
                }
            ],
            textStyle: {
                color: '#B4C0CC'
            }
        };
    
        option && myChart.setOption(option);
    }
    return {
        initBarChart
    }
}