<script setup lang="ts">
import { editEnterpriseApi } from '@/api/park/enterprise'
import type { ViewResponseType } from '@/api/park/enterprise/types'

// 保存请求的数据
const ViewListData = ref<ViewResponseType>()
const tableData = ref([])
const $route = useRoute()
const InitViewList = async () => {
  const res = await editEnterpriseApi($route.query.id as any)
  console.log(res, 'res')
  ViewListData.value = res!.data
  tableData.value = res?.data.rent
}
InitViewList()

// 表格配置项
const tableConfig = {
  tableStyle: {
    border: true
  },
  columnsConfig: [
    { label: '序号', type: 'index' ,tableColumnStyle:{width:"100"}},
    { label: '租赁楼宇', prop: 'name' },
    { label: '合同状态', slot: 'status' },
    { label: '租赁起止时间', slot: 'startEndTime',tableColumnStyle:{width:"230"} },
    { label: '租赁合同', slot: 'contractName',tableColumnStyle:{width:"180"} },
    { label: '录入时间', prop: 'createTime',tableColumnStyle:{width:"220"} },
    { label: '操作', slot: 'Controls' }
  ]
}
</script>
<template>
  <div class="park-detail">
    <el-card style="width: 100%">
      <div class="top flex-between">
        <div class="top-left flex-center" style="height: 30px">
          <el-icon><Back /></el-icon>
          <p style="margin: 0 10px" @click="$router.go(-1)">返回</p>
          |
          <span style="margin-left: 5px"> 查看企业</span>
        </div>
        <p>黑马管理员</p>
      </div>
    </el-card>
    <el-scrollbar>
      <el-card style="width: 70%; margin: 20px auto">
        <p class="border-left">企业信息</p>
        <div class="Message">
          <p>企业名称: {{ ViewListData?.name }}</p>
          <p>法人: {{ ViewListData?.legalPerson }}</p>
          <p>注册地址: {{ ViewListData?.registeredAddress }}</p>
          <p>所在行业: {{ ViewListData?.industryName }}</p>
          <p class="imgStart">
            <span>营业执照:</span>
            <img :src="ViewListData?.businessLicenseUrl" alt="" />
          </p>
        </div>
      </el-card>
      <el-card style="width: 70%; margin: 0 auto 20px">
        <p class="border-left">联系人信息</p>
        <div class="Message">
          <p>企业联系人: {{ ViewListData?.contact }}</p>
          <p>联系电话: {{ ViewListData?.contactNumber }}</p>
        </div>
      </el-card>
      <el-card style="width: 70%; margin: 0 auto 20px">
        <p class="border-left">租赁记录</p>
        <TableConfig v-bind="tableConfig" v-model="tableData">
          <!-- 状态插槽 -->
          <template #status="{ row }">
            <el-tag v-if="row.status === 0">待生效</el-tag>
            <el-tag v-else-if="row.status === 1" type="success">生效中</el-tag>
            <el-tag v-else-if="row.status === 2" type="danger">已到期</el-tag>
            <el-tag v-else-if="row.status === 3" type="info">已退租</el-tag>
          </template>
          <!-- 起止时间插槽 -->
          <template #startEndTime="{ row }">
            {{ row.startTime }} 至 {{ row.endTime }}
          </template>
          <!-- 租赁合同 -->
           <template #contractName="{row}">
            <el-link :href="row.contractUrl" type="primary">{{row.contractName}}</el-link>
           </template>
           <!-- 操作 -->
           <template #Controls="{row}">
            <el-link :href="row.contractUrl" type="primary">合同下载</el-link>
           </template>
        </TableConfig>
      </el-card>
    </el-scrollbar>
  </div>
</template>
<style lang="scss" scoped>
.park-add {
  width: 100%;
  height: calc(100vh - 70px);
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
