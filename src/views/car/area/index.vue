<template>
  <div class="car_box">
    <div class="button_box">
      <el-button type="primary" @click="addArea">添加区域</el-button>
    </div>
    <ICommonTable
      ref="commonTableRef"
      :data="state.data"
      :page="state.page"
      :Loading="state.Loading"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @jumper-change="jumperChangeHandle"
      @selection-change="selectionChangeHandle"
      :key="state.commonTableKey"
    >
      <el-table-column prop="areaName" label="区域名称" />
      <el-table-column prop="spaceNumber" label="车位数(个)" />
      <el-table-column prop="areaProportion" label="面积(m²)" />
      <el-table-column prop="ruleName" label="计费规则" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" link @click="editArea(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="deleteArea(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>

      <!-- <el-table-column prop="propertyFeePrice" label="物业费(元/m²)" /> -->
    </ICommonTable>
    <AreaDialog ref="dialogRef" @addGetList="addGetList"></AreaDialog>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import * as util from "@/utils/util";
import { getList, getChangeApi, deleteAreaApi } from "@/api/car";
import AreaDialog from "./components/AreaDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
//添加模态框的数据源
const state = reactive({
  commonTableKey: util.guid(),
  data: [],
  Loading:false,
  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0,
  },
});

//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  getListData();
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getListData();
};
const jumperChangeHandle = (val: number) => {
  console.log(`jumper page: ${val}`);
};
const selectionChangeHandle = (val: any[]) => {
  console.log(`selection-change`, val);
};
//请求表格数据方法
const getListData = async () => {
   state.Loading=true
  const res: any = await getList({
    page: state.page.pageIndex,
    pageSize: state.page.pageSize,
  });
  state.data = res.data.rows;
  state.page.totalRecord = res.data.total;
  state.page.totalPage = res.data.total;
  state.Loading=false
};
getListData();
const dialogRef = ref<InstanceType<typeof AreaDialog>>();
const addArea = async () => {
  const res: any = await getChangeApi();
  console.log(res, "change");

  dialogRef.value?.openDialog({
    type: "add",
    title: "添加区域",
    data: res.data.rows,
  });
};
// 编辑
const editArea = async (row: any) => {
  const res: any = await getChangeApi();
  console.log(res, "change");
  dialogRef.value?.openDialog({
    type: "edit",
    title: "编辑区域",
    data: res.data.rows,
    editData: row,
  });
};
const addGetList = () => {
  getListData();
};
const deleteArea = async (id: number) => {
  ElMessageBox.confirm("是否删除当前区域", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res: any = await deleteAreaApi(id);
    console.log(res, "delres");
    if (res.code == 10000) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
      getListData();
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};
</script>

<style lang="scss" scoped>
.car_box {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  .button_box {
    width: 100%;
    height: 60px;
    .el-button {
      background: #4770ff;
      color: #fff;
    }
  }
}
</style>
