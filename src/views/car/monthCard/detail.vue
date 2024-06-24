<script setup lang="ts">
import { getDetailApi } from '@/api/car'
import type { ViewResponseType } from '@/api/park/enterprise/types'

// 保存请求的数据
const ViewListData = ref<ViewResponseType>()
const tableData = ref([])
const $route = useRoute()
const InitViewList = async () => {
  const res = await getDetailApi($route.query.id as any)
  console.log(res, 'res')
  ViewListData.value = res!.data
  tableData.value = res?.data.rechargeList
}
InitViewList()

// 表格配置项
const tableConfig = {
  tableStyle: {
    border: true
  },
  columnsConfig: [
    { label: '序号', type: 'index' ,tableColumnStyle:{width:"100"}},
    { label: '有效时间', slot: 'startEndTime' },
    { label: '支付金额', prop:'paymentAmount' },
    { label: '支付方式', prop:'paymentMethod',tableColumnStyle:{width:"230"} },
    { label: '办理时间', prop: 'createTime',tableColumnStyle:{width:"180"} },
    { label: '办理人', prop: 'createUser',tableColumnStyle:{width:"220"} },
  ]
}
</script>
<template>
  <div class="park-detail">
    <el-card style="width: 100%">
      <div class="top flex-between">
        <div class="top-left flex-center" style="height: 30px">
          <el-icon style="cursor: pointer"><Back /></el-icon>
          <p style="margin: 0 10px; cursor: pointer" @click="$router.go(-1)">返回</p>
          |
          <span style="margin-left: 5px"> 查看企业</span>
        </div>
        <p>黑马管理员</p>
      </div>
    </el-card>
    <el-scrollbar>
      <el-card style="width: 70%; margin: 20px auto">
        <p class="border-left">车辆信息</p>
        <div class="Message">
          <p>车主姓名: {{ ViewListData?.personName }}</p>
          <p>联系方式: {{ ViewListData?.phoneNumber }}</p>
          <p>插排号码: {{ ViewListData?.carNumber }}</p>
          <p>车辆品牌: {{ ViewListData?.carBrand }}</p>
        </div>
      </el-card>
      <el-card style="width: 70%; margin: 0 auto 20px">
        <p class="border-left">月卡缴费记录</p>
        <TableConfig v-bind="tableConfig" v-model="tableData">
          <!-- 起止时间插槽 -->
          <template #startEndTime="{ row }">
            {{ row.cardStartDate }} 至 {{ row.cardEndDate }}
          </template>
          <!-- 租赁合同 -->
           <template #contractName="{row}">
            <el-link :href="row.contractUrl" type="primary">{{row.contractName}}</el-link>
           </template>
        </TableConfig>
      </el-card>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
.park-add {
  width: 100%;
  height: calc(100% - 70px);
  background-color: #f4f6f8;
}
.card-bottom {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
}
.border-left {
  border-left: 2px solid #4770ff;
  padding-left: 10px;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 30px;
}
.demo-image__error .image-slot {
  font-size: 30px;
}
.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
.Message {
  display: flex;
  flex-wrap: wrap;
  p {
    width: 40%;
    margin-bottom: 10px;
    padding-left: 10%;
  }
  .imgStart {
    display: flex;
    align-items: start;
    img {
      width: 250px;
    }
  }
}
</style>
