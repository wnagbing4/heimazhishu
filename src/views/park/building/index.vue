<script setup lang="ts">
// 引入buildingHooks
import type { BuildingResponseType } from '@/api/workbench/types';
import { useBuildingHook } from './useBuildingHooks'
// 引入dialog组件
const Dialog = defineAsyncComponent(() => import("./Dialog.vue"))
const {
  tableConfig,
  queryForm,
  tableData,
  total,
  handleSearch,
  handleDelete,
  handleSizeChange,
  handleCurrentChange,
  InitBuilding
} = useBuildingHook()

// 子组件
const DialogRef = ref<InstanceType<typeof Dialog>>()
// 添加楼宇
const handleAdd = () => {
  DialogRef.value?.openDialog("add","添加楼宇")
}
// 编辑回填
const handleEdit = (row: BuildingResponseType) => {
  DialogRef.value?.openDialog("edit", "编辑楼宇", row)
}
</script>
<template>
  <el-card>
    <!-- dialog -->
     <Dialog ref="DialogRef" @refresh="InitBuilding"/>
    <!-- 头部表单数据 -->
    <el-form inline>
      <el-form-item label="楼宇名称:">
        <el-input
          v-model="queryForm.name"
          placeholder="请输入楼宇名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="margin: 15px 0">
      <el-button type="primary" @click="handleAdd">添加楼宇</el-button>
    </div>
    <!-- 表格渲染 -->
    <TableConfig v-bind="tableConfig" v-model="tableData">
      <template #status="{ row }">
        {{ row.status === 0 ? '空置中' : '租赁中' }}
      </template>
      <template #Controls="{ row }">
        <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
        <el-button type="primary" link @click="handleDelete(row)"
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
</template>
<style lang="scss" scoped></style>
