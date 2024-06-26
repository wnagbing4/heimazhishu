<template>
  <div class="billing_box">
    <div class="button_box">
      <el-button @click="addBilling">增加停车计费规则</el-button>
    </div>
    <ICommonTable
      ref="commonTableRef"
      :data="state.data"
      :page="state.page"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :key="state.commonTableKey"
    >
      <el-table-column prop="ruleNumber" label="计费规则编号" width="120"/>
      <el-table-column prop="ruleName" label="计费规则名称" width="120"/>
      <el-table-column prop="freeDuration" label="免费时长(分钟)" width="120"/>
      <el-table-column prop="chargeCeiling" label="	收费上限（元）" width="140">
        <template #default="scope">
         <span v-if="scope.row.chargeCeiling===null">--</span>
         <span v-else>{{ scope.row.chargeCeiling }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="paymentTime" label="计费方式" width="120">
        <template #default="scope">
          <span v-show="scope.row.chargeType==='duration'">时长收费</span>
          <span v-show="scope.row.chargeType==='turn'">按次收费</span>
          <span v-show="scope.row.chargeType==='partition'">分段收费</span>
        </template>
      </el-table-column>
      <el-table-column prop="ruleNameView" label="计费规则" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editRule(scope.row.id)"> 编辑 </el-button>
          <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </ICommonTable>
  </div>
  <!-- 弹窗组件 -->
  <billingDialog ref="dialogRef" @getListApi="getListApi"></billingDialog>
</template>
<script setup lang="ts">
import { reactive,ref } from "vue";
// @ts-ignore
import * as util from "@/utils/util";
// @ts-ignore
import {getRuleListApi,delRulesApi} from "@/api/car"
import billingDialog from "./components/billingDialog.vue"
import { ElMessage, ElMessageBox } from "element-plus";
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  getRuleList()
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getRuleList()
};
const state = reactive({
  commonTableKey: util.guid(),
  data: [
  ],
  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0,
  },
});
const getRuleList=async ()=>{
   const res=await getRuleListApi({
    page:1,
    pageSize:10
   })
   state.data=res.data.rows
   state.page.totalPage=res.data.total
   state.page.totalRecord=res.data.total
}
getRuleList()
const getListApi=()=>{
  getRuleList()
}
// 添加
const dialogRef = ref<InstanceType<typeof billingDialog>>();
const addBilling=()=>{
  dialogRef.value?.openDialog({
    title:'添加计费规则',
    type:'add',
  })
}
// 修改
const editRule=(id:number)=>{
  dialogRef.value?.openDialog({
    title:'修改计费规则',
    type:'edit',
    id:id
  })
}
// 删除
const del=(id:number)=>{
   ElMessageBox.confirm('是否确认删除当前计费规则?', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    // 删除
    const res=await delRulesApi(id)
    console.log(res,'del');
    if(res.code===10000){
      ElMessage.success('删除成功')
      getRuleList()
    }
  })
}
</script>

<style lang="scss" scoped>
.billing_box {
  width: 100%;
  height: 100%;
  .button_box {
    .el-button {
      background: #4d75ff;
      color: #fff;
    }
  }
}
</style>
