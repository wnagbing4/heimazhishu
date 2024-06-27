<template>
  <div class="boss">
    <div class="top" style="display: flex">
      <el-form-item label="楼宇名称:" style="max-width: 300px">
        <el-input v-model="userch.name" placeholder="请输入楼宇名称" />
      </el-form-item>
      <el-button type="primary" style="margin-left: 10px" @click="builist"
        >查询</el-button
      >
    </div>
    <el-divider style="padding: 0; margin: 0; margin-bottom: 15px" />
    <el-button type="primary" @click="addBilding">添加楼宇</el-button>
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
      <el-table-column prop="name" label="楼宇名称" />
      <el-table-column prop="floors" label="层数" />
      <el-table-column prop="area" label="在管面积(m²)" />
      <el-table-column prop="propertyFeePrice" label="物业费(元/m²)" />
      <el-table-column prop="status" label="状态">
        <template #default="scoped">
          <span v-if="scoped.row.status === 0">空置中</span>
          <span v-if="scoped.row.status === 1">租赁中</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editBilding(scope.row)">
            编辑
          </el-button>
          <el-button
            link
            type="primary"
            size="small"
            @click="deletabuilding(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </ICommonTable>
  </div>
  <BildingDialog ref="dialogRef" @addGetList="addGetList"></BildingDialog>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import { getBuildingListApi, deleteBuildingApi } from "@/api/park/building";
// @ts-ignore
import BildingDialog from "./components/BildingDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
import * as util from "@/utils/util";
//添加模态框的数据源
const state = reactive({
  commonTableKey: util.guid(),
  data: [],
  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0,
  },
  Loading: false,
});
let userch = ref({
  name: "",
});
//请求表格数据方法
const builist = () => {
  state.Loading = true;

  getBuildingListApi({
    // @ts-ignore
    page: state.page.pageIndex,
    // @ts-ignore
    pageSize: state.page.pageSize,
    name: userch.value.name,
  }).then((res) => {
    console.log("111", res);
    state.page.totalRecord = res.data.total;
    state.data = res.data.rows;
    state.Loading = false;
  });
};
builist();
//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  builist();
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  builist();
};
const jumperChangeHandle = (val: number) => {
  console.log(`jumper page: ${val}`);
};
const selectionChangeHandle = (val: any[]) => {
  console.log(`selection-change`, val);
};
const dialogRef = ref<InstanceType<typeof BildingDialog>>();
const addBilding = () => {
  dialogRef.value?.openDialog({
    type: "add",
    title: "添加楼宇",
  });
};
const editBilding = (row: any) => {
  dialogRef.value?.openDialog({
    title: "编辑楼宇",
    type: "edit",
    row,
  });
};
const addGetList = () => {
  builist();
};
const deletabuilding = (id: number) => {
  console.log(id, "id");
  ElMessageBox.confirm("是否删除当前楼宇", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res: any = await deleteBuildingApi(id);
    console.log(res, "delres");
    if (res.code == 10000) {
      ElMessage({
        type: "success",
        message: res.msg,
      });
      builist();
    } else {
      ElMessage({
        type: "error",
        message: res.msg,
      });
    }
  });
};
</script>
<style scoped>
.boss {
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
}
</style>
