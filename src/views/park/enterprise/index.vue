<script setup lang="ts">
// 引入buildingHooks
import { useBuildingHook } from './useEnterpriseHooks'
import Contract from "./ContractDialog.vue"
import {ref} from "vue"
const {
  tableConfig,
  queryForm,
  tableData,
  total,
  handleSearch,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  handleExpand,
  handleAdd,
  handleEdit,
  handleView,
  InitBuilding
} = useBuildingHook()
const dialogRef = ref<InstanceType<typeof Contract>>();
const addContract=(id:any)=>{
  dialogRef.value?.openDialog(id);
}
const getList=()=>{
  InitBuilding()
}
</script>
<template>
  <el-card>
    <!-- 头部表单数据 -->
    <el-form inline>
      <el-form-item label="企业名称:">
        <el-input
          v-model="queryForm.name"
          placeholder="请输入企业名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 15px 0">
      <el-button type="primary" @click="handleAdd">添加企业</el-button>
    </div>
    <!-- 表格渲染 -->
    <TableConfig
      @expand-change="handleExpand"
      v-bind="tableConfig"
      v-model="tableData"
    >
      <!-- 展开行  -->
      <template #expand>
        <el-table-column type="expand">
          <template #default="props">
            <el-table :data="props.row.children">
              <el-table-column label="租赁楼宇" prop="buildingName" />
              <el-table-column label="租赁起止时间" prop="startTime">
                <template #default="{ row }">
                  {{ row.startTime }} - {{ row.endTime }}
                </template>
              </el-table-column>
              <el-table-column label="合同状态" prop="status">
                <template #default="{ row }">
                  <el-tag v-if="row.status === 0">待生效</el-tag>
                  <el-tag v-else-if="row.status === 1" type="success"
                    >生效中</el-tag
                  >
                  <el-tag v-else-if="row.status === 2" type="danger"
                    >已到期</el-tag
                  >
                  <el-tag v-else-if="row.status === 3" type="info"
                    >已退租</el-tag
                  >
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template #default="{ row }">
                  <el-button
                    :type="row.renewFlag === 0 ? '' : 'primary'"
                    link
                    :disabled="row.renewFlag === 0"
                    >续租</el-button
                  >
                  <el-button
                    :type="row.exitFlag === 0 ? '' : 'primary'"
                    link
                    :disabled="row.exitFlag === 0"
                    >退租</el-button
                  >
                  <el-button
                    :type="row.exitFlag !== 0 ? '' : 'primary'"
                    link
                    :disabled="row.status === 0"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
      </template>
      <template #status="{ row }">
        {{ row.status === 0 ? '空置中' : '租赁中' }}
      </template>
      <template #Controls="{ row }">
        <el-button type="primary" link  @click="addContract(row.id)">添加合同</el-button>
        <el-button type="primary" link @click="handleView(row.id)">查看</el-button>
        <el-button type="primary" link @click="handleEdit(row.id)">编辑</el-button>
        <el-button
          :type="row.existContractFlag !== 1 ? 'primary' : ''"
          :disabled="row.existContractFlag == 1"
          link
          @click="handleDelete(row)"
          >删除</el-button
        >
      </template>
    </TableConfig>
    <!-- 分页渲染 -->
    <el-row justify="end" style="margin-top: 20px;">
      <el-pagination
        :page-sizes="[5, 10, 20, 30]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-row>
  </el-card>
  <Contract ref="dialogRef" @getList='getList'></Contract>
</template>
<style lang="scss" scoped></style>
