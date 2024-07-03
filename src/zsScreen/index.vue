
<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import { getAreaDetailApi, getBuildingListApi, getParkInfoApi } from './api/park/park';
import type { ParkInfoParamsType } from './api/park/parkType';
import * as echarts from 'echarts';
import vScaleScreen from 'v-scale-screen'
import { Application } from '@splinetool/runtime'
import LoadingComponent from './composables/LoadingComponent.vue'
import Car from "./component/car.vue"

const ParkInfo = ref<ParkInfoParamsType>()
const getParkInfo = async () => {
    try {
        const res = await getParkInfoApi();
        ParkInfo.value = res.data;
        console.log(ParkInfo.value);
    } catch (error) {
        console.log(error)
    }
}

//1.安装并引入Echarts  2.创建渲染画布  3.实例化Echarts  4.设置配置项  5.渲染配置项  6.自适应

//渲染年度分析表

// 柱形图
const barChart = ref();
const initBarChart = () => {
    var myChart = echarts.init(barChart.value);
    var option;

    option = {
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
            data: ParkInfo.value?.parkIncome.xMonth, splitLine: {
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
                data: ParkInfo.value?.parkIncome.yIncome.map((item, index) => {

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

//饼图
const pieChart = ref();
const initPieChart = () => {
    const parkIndustry = ParkInfo.value?.parkIndustry;

    var myChart = echarts.init(pieChart.value);

    const option = {
        color: ['#00B2FF', '#2CF2FF', '#892CFF', '#FF624D', '#FFCF54', '#86ECA2'],
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '0',
            left: 'center',
            icon: 'rect',
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: '#c6d1db'
            }
        },
        series: [
            {
                name: '园区产业分析',
                type: 'pie',
                radius: ['55%', '60%'],
                avoidLabelOverlap: false,
                center: ["50%", "40%"],
                tooltip: {
                    trigger: 'item',
                    formatter: (params: any) => {
                        return `${params.seriesName}</br><div style='display:flex;justify-content: space-between;'><div>${params.marker}${params.name}</div><div>${params.percent}%</div></div>`

                    }
                },
                label: {
                    show: false,
                    position: 'center',
                },
                emphasis: {
                    label: {
                        show: false,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: parkIndustry
            }
        ]
    };

    option && myChart.setOption(option);

}

//3d模型
const ref3d = ref();
const loadTrue = ref<boolean>(false);
const showModel = ref(false)
let x = ref()
let y = ref()
const buildingInfo=ref({
    name:'',
    floors:0,
    area:0,
    rentEnterpriseName:''
});

const init3dModel = () => {
    loadTrue.value = true;
    //实例化模型加载器以及指定渲染
    const spline = new Application(ref3d.value);
    // 拉取模型
    spline.load('https://fe-hmzs.itheima.net/scene.splinecode').then(() => {
        //3D模型加载并渲染完毕会触发 .then方法
        console.log('3D模型加载并渲染完毕')
        loadTrue.value = false;

      spline.addEventListener('mouseDown', (e) => {
        x.value = ''
        y.value = ''
        // 坐标 没有
        console.log('e', e)
        // {name : '' , id : ''}
        const params = e.target

        // const obj = spline.findObjectByName(params.name)

        console.log('obj', params)
        if (params.name.indexOf('办公楼') !== -1) {
          console.log('楼宇')
          console.log('--->', params.id)
          getBuildingInfo(params.id)
          window.addEventListener('mousedown', (e) => {
            x.value = e.offsetX
            y.value = e.offsetY
          })
        } else if (params.name.indexOf('停车场') !== -1) {
          console.log('停车场')
          getAreaInfo(params.id)
          x.value = posi.value.x
          y.value = posi.value.y
          window.addEventListener('mousedown', (e) => {
            x.value = e.offsetX
            y.value = e.offsetY
          })
        }
        showModel.value = true
      })


    })
}

const getBuildingInfo=async(id:string)=>{
    try{
        const res=await getBuildingListApi({id});
        buildingInfo.value=res.data;
        console.log(buildingInfo.value.name);

    }catch(error){
        console.log(error);

    }
}

const getAreaInfo=async(id:string)=>{
    try{
        const res=await getAreaDetailApi(id);
        console.log(res.data);
        // buildingInfo.value=res.data;

    }catch(error){
        console.log(error);

    }
}

onMounted(async () => {
    await getParkInfo();
    initBarChart();
    initPieChart();
    init3dModel();
})
const  tip=document.querySelector('.tip')


const close=()=>{
    x.value=0;
    y.value=0;
    showModel.value=false;
}
const imgFlag=ref(false)
const ifImg=async ()=>{
  imgFlag.value=false
  await getParkInfo();
  initBarChart();
  initPieChart();
  init3dModel();

}
const img=()=>{
  imgFlag.value=true
}
</script>
<template>
  <v-scale-screen width="1920" height="1080">
    <div class="img_all">
      <div class="left_img_box">
        <img class="img-nav1" src="@/assets/daping/park-logo.png" alt="">
      </div>
      <div class="right_img_box">
        <img class="img-nav" src="@/assets/daping/park-default.png" @click="ifImg"  v-if="imgFlag===true">
        <img class="img-nav" src="@/assets/daping/park-active.png" @click="img" v-if="imgFlag===false">
        <img class="img-nav" src="@/assets/daping/car-default.png" @click="img" v-if="imgFlag===false">
        <img class="img-nav" src="@/assets/daping/car-active.png"  @click="ifImg" v-if="imgFlag===true">
      </div>
    </div>
    <div class="all-charts" v-if="imgFlag===false">
      <div class="section-one">
        <img class="img-header"
             src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E6%A6%82%E5%86%B5%402x.png"
             alt="" />
        <div class="cions-container">
          <div class="item">
            <div class="cions-item">
              <span class="number">{{ ParkInfo?.base.buildingTotal }}</span>
            </div>
            <span class="title">楼宇总数</span>
            <span class="unity">(栋)</span>
          </div>
          <div class="item">
            <div class="cions-item">
              <span class="number">{{ ParkInfo?.base.enterpriseTotal }}</span>
            </div>
            <span class="title">入住企业总数</span>
            <span class="unity">(家)</span>
          </div>
          <div class="item">
            <div class="cions-item">
              <span class="number">{{ ParkInfo?.base.parkingTotal }}</span>
            </div>
            <span class="title">车位总数</span>
            <span class="unity">(个)</span>
          </div>
          <div class="item">
            <div class="cions-item">
              <span class="number">{{ ParkInfo?.base.chargePoleTotal }}</span>
            </div>
            <span class="title">一体杆总数</span>
            <span class="unity">(个)</span>
          </div>
        </div>
      </div>
      <div class="section-two" v-if="imgFlag===false">
        <img class="img-header"
             src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E5%B9%B4%E5%BA%A6%E6%94%B6%E5%85%A5%E5%88%86%E6%9E%90%402x.png"
             alt="" />
        <div class="bar-chart-title">
          <span>单位：元</span>
          <div class="bar-chart-title-right">
            <span class="bar-icon blue-bar-icon"></span>
            <span class="bar-icon red-bar-icon"></span>
            <span>收入情况</span>
          </div>
        </div>
        <div class="bar-chart" ref="barChart"></div>
      </div>
      <div class="section-three">
        <img class="img-header"
             src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%9B%AD%E5%8C%BA%E4%BA%A7%E4%B8%9A%E5%88%86%E5%B8%83%402x.png"
             alt="" />
        <div class="pie-chart" ref="pieChart"></div>
      </div>
    </div>
    <div class="model-container" v-if="imgFlag===false">
      <!-- 准备3D渲染节点 -->
      <canvas class="canvas-3d" ref="ref3d" />
      <LoadingComponent :loadTrue="loadTrue" />

      <div :style="{ left: x+'px', top: y+'px' }" v-if="x && y" class="tip">
        <span class="close" @mousedown.stop="close"></span>
        <p>{{ buildingInfo.name }}</p>
        <div>
          <span>楼层数：{{ buildingInfo.floors }}</span>
          <span>总面积(m²)：{{ buildingInfo.area }}</span>
          <span>承租单位：{{ buildingInfo.rentEnterpriseName?'':'暂无' }}</span>
        </div>
      </div>
    </div>
    <Car v-if="imgFlag===true"></Car>
  </v-scale-screen>
</template>
<style lang='scss' scoped>
* {
    margin: 0;
    padding: 0;
}
.img_all{
  width: 100%;

  .left_img_box{
    width: 100%;
    position: absolute;
    top: 0;
  }
  .right_img_box{
    width: 100%;
    position: absolute;
    top: 0;
    left: 1600px;
    img{
      width: 150px;
      height: 50px;
    }
  }
}
.img-nav {
    z-index: 999;
    height: 40px;
}
.img-nav1 {
  z-index: 999;
  height: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
.all-charts {
    width: 480px;
    // background:linear-gradient(to right,rgba(0,0,0,1)20%,rgba(255,255,255,1));
    background: linear-gradient(to left, rgba(0, 6, 15, 0.00) 0%, rgba(0, 6, 15, 0.00) 20%, rgba(0, 0, 0, 0.40) 30%, rgba(0, 0, 0, 0.60) 40%, rgba(1, 4, 11, 1) 70%, #04070d 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #fff;
    padding: 88px 20px 0 20px;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
}

.img-header {
    height: 30px;
}

.section-one {
    flex-basis: 25%;

    .cions-container {
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .item {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;

            .cions-item {
                background-color: #cdd7e1;
                width: 100%;
                height: 80px;
                background: url('@/assets/daping/building-icon.png') no-repeat 50% 0 / contain;
                position: relative;

                .number {
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                    font-size: 18px;
                    color: #ffffff;
                }
            }

            .title,
            .unity {
                font-size: 14px;
                color: #cdd7e1;
            }

            .title {
                margin: 8px 0;
            }
        }

        :nth-child(2) .cions-item {
            background-image: url('@/assets/daping/enterprise-icon.png');
        }

        :nth-child(3) .cions-item {
            background-image: url('@/assets/daping/car-icon.png');
        }

        :nth-child(4) .cions-item {
            background-image: url('@/assets/daping/rod-icon.png');
        }
    }
}

.section-two {
    flex-basis: 35%;

    .bar-chart-title {
        width: 100%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .bar-chart-title-right {
            display: flex;
            align-items: center;

            .bar-icon {
                width: 8px;
                height: 3px;
                display: block;
            }

            .blue-bar-icon {
                background: linear-gradient(90deg, #74c0f8, rgba(116, 192, 248, 0));
            }

            .red-bar-icon {
                background: linear-gradient(90deg, #ff7152, rgba(255, 113, 82, 0));
            }
        }
    }

    .bar-chart {
        width: 100%;
        height: calc(100% - 60px);
    }
}

.section-three {
    flex-basis: 35%;

    .pie-chart {
        width: 80%;
        height: calc(100% - 30px);
        margin: 0 auto;
    }
}

.model-container {
    width: 100%;
    height: 100%;
    background-color: #000;
}

.tip {
    width: 281px;
    height: 140px;
    background: url('@/assets/daping/modal-bg.png') no-repeat;
    background-size: cover;
    position: absolute;
    color: #fff;
    .close{
        position: absolute;
        right: 10px;
        top: 10px;
        background: url('@/assets/daping/modal-close.png');
        width: 20px;
        height: 20px;
        display: block;
        //小手
        cursor: pointer;
    }
    p{
        font-size: 18px;
        margin: 10px;
    }
    div{
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        margin-left: 10px;
        span{
            display: block;
            margin: 5px;
            font-size: 14px;
            color: #aca9a9;
        }
    }
}
</style>
