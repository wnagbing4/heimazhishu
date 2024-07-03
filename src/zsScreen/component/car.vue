<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

onMounted(() => {
  initPieChart()
})
const initPieChart = () => {
  // const parkIndustry = ParkInfo.value?.parkIndustry;
  var chartDom = document.getElementById('main_box')
  var myChart = echarts.init(chartDom)
  var option

  option = {
    tooltip: {
      trigger: 'item'
    },


    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '60%'],
        center: ['26%', '40%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' }

        ]
      }
    ]
  }

  option && myChart.setOption(option)


}
</script>

<template>

  <div class="car_all">
    <div class="left">
      <div class="left_first">
        <div class="img">
          <img
            src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%81%9C%E8%BD%A6%E5%9C%BA%E5%AE%9E%E6%97%B6%E6%83%85%E5%86%B5%402x.png"
            alt="">
        </div>
        <div class="header">
          <div class="header_title">车位总数量</div>
          <div class="total_box">
            <div>1</div>
            <div>5</div>
            <div>3</div>
            <div>0</div>
            <span style="margin:8px 10px">(单位：个)</span>
          </div>
        </div>
        <div class="all">
          <div id="main_box"></div>
          <!--           <div class="main_right">-->
          <!--             <div>总空闲车位数量 497</div>-->
          <!--             <div>实时车位占有率 0.68%</div>-->
          <!--             <div>总占用车位数量 1033</div>-->
          <!--           </div>-->
        </div>
      </div>
      <div class="left_second">
        <div class="img">
          <img
            src="https://yjy-teach-oss.oss-cn-beijing.aliyuncs.com/smartPark/%E5%A4%A7%E5%B1%8F%E5%88%87%E5%9B%BE/%E5%90%84%E5%81%9C%E8%BD%A6%E5%8C%BA%E5%9F%9F%E8%BD%A6%E4%BD%8D%E4%BD%BF%E7%94%A8%E6%83%85%E5%86%B5%402x.png"
            alt="">
        </div>
      </div>
    </div>
    <div class="center">center</div>
    <div class="right">right</div>
  </div>
</template>

<style scoped lang="scss">
.car_all {
  width: 100%;
  height: 100%;
  margin-top: 60px;
  color: white;
  display: flex;

  .left {
    width: 33%;
    height: 100%;
    //background: pink;
    .left_first {
      width: 100%;
      height: 30%;
      position: relative;

      .all {
        width: 100%;
        height: calc(100% - 100px);
        display: flex;

        #main_box {
          width: 40%;
          height: 100%;
          margin-top: 10px;
        }

        .main_right {
          width: 60%;
          margin-top: 10px;
          position: absolute;
          top: 160px;
          right: 160px;
          display: flex;
          justify-content: space-between;

          div {
            width: 25%;
            box-sizing: border-box;
          }
        }
      }

      .img {
        width: 80%;
        height: 40px;

        img {
          width: 80%;
          height: 40px;
        }
      }

      .header {
        width: 100%;
        height: 60px;
        margin-top: 15px;
        //渐变
        background: linear-gradient(90deg, rgba(103, 116, 160, 0), rgba(57, 71, 120, .38), rgba(103, 116, 160, 0));
        display: flex;
        align-items: center;

        .total_box {
          margin-left: 180px;
          display: flex;

          div {
            width: 20px;
            height: 30px;
            border: 1px solid #3388ee;
            margin-left: 10px;
            text-align: center;
            line-height: 30px;
          }
        }
      }
    }

    .left_second {
      width: 100%;
      height: 70%;
      margin-top: 30px;
      .img{
        width: 80%;
        height: 40px;
        img{
          width: 80%;
          height: 40px;
        }
      }
    }
  }

  .right {
    width: 33%;
    height: 100%;
    background: red;
  }

  .center {
    width: 33%;
    height: 100%;
    background: green;
  }
}
</style>
