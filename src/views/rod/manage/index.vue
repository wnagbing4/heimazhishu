<template>
  <div class="search">
    <Search @getSearchList="getSearchList"></Search>
  </div>
  <div class="btn_box">
    <el-button type="primary" @click="addCost">添加一体杆</el-button>
    <el-button @click="delectPole">批量删除</el-button>
  </div>
  <ICommonTable
    ref="commonTableRef"
    :data="state.data"
    :Loading="state.Loading"
    :selection="true"
    :page="state.page"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    @selection-change="selectionChangeHandle"
    :key="state.commonTableKey"
  >
    <el-table-column prop="poleName" label="一体杆名称" />
    <el-table-column prop="poleNumber" label="一体杆编号" />
    <el-table-column prop="poleIp" label="一体杆IP" />
    <el-table-column prop="areaName" label="安装区域" />
    <el-table-column label="一体杆类型">
      <template #default="scope">
        <div>{{ scope.row.poleType === "entrance" ? "入口" : "出口" }}</div>
      </template>
    </el-table-column>
    <el-table-column label="运行状态">
      <template #default="scope">
        <div>{{ scope.row.poleStatus === 1 ? "异常" : "正常" }}</div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
        <el-button type="primary" link @click="delectPole(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </ICommonTable>
  <PloeDialog ref="dialogRef" @getList="getList"></PloeDialog>
</template>
<script setup lang="ts">
// @ts-ignore
import Search from "./components/Search.vue";
import { ref, reactive } from "vue";
// @ts-ignore
import * as util from "@/utils/util";
import { getPoleListPole, deletePloeApi } from "@/api/pole";
import PloeDialog from "./components/PloeDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
//添加模态框的数据源
const state = reactive({
  commonTableKey: util.guid(),
  data: [],
  Loading: false,
  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0,
  },
});
//请求表格数据方法

//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  getPoleList();
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getPoleList();
};
// 定义多选删除的数据
const ids = ref<number[]>([]);
const selectionChangeHandle = (val: any[]) => {
  console.log(`selection-change`, val);
  val.forEach((item) => {
    ids.value.push(item.id);
  });
};
// 添加渲染数据
const getList=()=>{
  getPoleList()
}
// 获取列表数据
const getPoleList = async () => {
  state.Loading = true;
  const res = await getPoleListPole({
    page: state.page.pageIndex,
    pageSize: state.page.pageSize,
  });
  if (res.code === 10000) {
    state.data = res.data.rows;
    state.page.totalPage = res.data.total;
    state.page.totalRecord = res.data.total;
    state.Loading = false;
  }
};
getPoleList();
const getSearchList = (data: any) => {
  state.data = data;
};
// 定义打开模态框的变量
const dialogRef = ref<InstanceType<typeof PloeDialog>>();
const addCost = () => {
  dialogRef.value?.openDialog({
    title: "添加一体杆",
    type: "add",
  });
};
// 定义编辑模态框的数据
const edit = (item: object) => {
  dialogRef.value?.openDialog({
    title: "编辑一体杆",
    type: "edit",
    item:item
  });
};
// 删除数据
const delectPole = (id: number) => {
  if (ids.value.length > 0) {
    console.log(1);
    ElMessageBox.confirm("是否确认删除当前选中的一体杆?", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deletePloeApi(ids.value);
      console.log(res);
      if (res.code === 10000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getPoleList();
      }else{
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    });
  } else {
    ElMessageBox.confirm("是否确认删除当前的一体杆?", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(async () => {
      const res = await deletePloeApi(id);
      console.log(res);
      if (res.code === 10000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getPoleList();
      }else{
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #ccc;
}
.btn_box {
  margin-top: 40px;
  .el-button:first-child {
    background: #4770ff;
    color: #fff;
  }
}
</style>
