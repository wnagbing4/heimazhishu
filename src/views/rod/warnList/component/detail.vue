<script setup lang="ts">
import { useRoute } from 'vue-router';
import { request } from "@/utils/request";
import {onMounted} from "vue"
const router=useRouter()
const route=useRoute()

const goTo=()=>{
  router.back()
}
const detailData=ref()
onMounted(async () => {

});
const getDetailList=async ()=>{
  const res= await request(`/pole/warning/${route.query.id}`,'GET')
  if(res.code===10000){
    detailData.value=res.data
  }
}
getDetailList()
</script>

<template>
<div class="detail">
  <div class="header">
    <span @click="goTo">←</span>
    <span @click="goTo">返回</span>
    <span>|</span>
    <span>告警详情</span>
  </div>
  <div class="body_box">
    <div class="first">
      <div class="title">告警详情</div>
      <div class="context">
        <div>
          <p>
            <span >告警时间：</span>
            <span>{{!detailData? '--' : detailData?.warningTime}}</span>
          </p>
          <p>
            <span>告警区域：</span>
            <span>{{!detailData? '--' :detailData?.areaName}}</span>
          </p>
          <p>
            <span>故障类型：</span>
            <span>{{!detailData? '--' :detailData?.errorType}}</span>
          </p>
        </div>
        <div>
          <p>
            <span>一体杆名称：</span>
            <span>{{!detailData? '--' :detailData?.poleName}}</span>
          </p>
          <p>
            <span>一体杆编号：</span>
            <span>{{!detailData? '--' :detailData?.poleNumber}}</span>
          </p>
          <p>
            <span>处置状态：</span>
            <span v-if="detailData?.handleStatus===1">已派单</span>
            <span v-if="detailData?.handleStatus===0">未派单</span>
            <span v-if="detailData?.handleStatus===2">已接单</span>
            <span v-if="detailData?.handleStatus===3">已完成</span>
            <span v-if="!detailData">--</span>
          </p>
        </div>
      </div>
    </div>
    <div class="second">
      <div class="title">告警处理</div>
      <div class="context">
        <div>
          <p>
            <span >处理人：</span>
            <span>{{!detailData? '--' :detailData?.handleUser}}</span>
          </p>
          <p>
            <span>处理结果：</span>
            <span>{{!detailData? '--' :detailData?.handleResult}}</span>
          </p>
        </div>
        <div>
          <p>
            <span>联系方式：</span>
            <span>{{!detailData? '--' :detailData?.phonenumber}}</span>
          </p>
          <p>
            <span>完成时间：</span>
            <span>{{!detailData? '--' :detailData?.handleTime}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">

.detail{
   width: 100%;
  height: 100%;
  background: #f4f6f8;
  .header{
    width: 100%;
    height: 50px;
    background: #fff;
    line-height: 50px;
    span:nth-child(1){
       cursor: pointer;
    }
    span:nth-child(2){
      cursor: pointer;
    }
    span:nth-child(3){
     color: gray;
    }
    span{
      margin:5px;
    }
  }
  .body_box{
    width: 100%;
    height: calc(100% - 50px);
    display: flex;
    flex-direction: column;
    align-items: center;
    .first{
      width: 80%;
      height: 300px;
      background: #fff;
      margin-top: 20px;
      .title{
        width: 100%;
        height: 20px;
        margin: 10px 10px;
      }
      .context{
        width: 100%;
        height: calc(100% - 20px);
        display: flex;
        justify-content: space-around;
        div{
          width: 40%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          p{
            width: 60%;
            margin: 30px;
            span:nth-child(1){
              color: gray;
            }
          }
        }
      }
    }
    .second{
      width: 80%;
      height: 300px;
      background: #fff;
      margin-top: 30px;
      .title{
        width: 100%;
        height: 20px;
        margin: 10px 10px;
      }
      .context{
        width: 100%;
        height: calc(100% - 20px);
        display: flex;
        justify-content: space-around;
        div{
          width: 40%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          p{
            width: 60%;
            margin: 30px;
            span:nth-child(1){
              color: gray;
            }
          }
        }
      }
    }
  }
}
</style>
