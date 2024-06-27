<template>
  <div class="search">
    <Search @getSearch="getSearch"></Search>
  </div>
  <div class="button">
    <el-button type="primary" @click="addCost">添加账单</el-button>
  </div>
  <ICommonTable
    ref="commonTableRef"
    :data="state.data"
    :page="state.page"
    :Loading="state.Loading"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    :key="state.commonTableKey"
  >
    <el-table-column prop="billNumber" label="账单编号" />
    <el-table-column prop="enterpriseName" label="企业名称" />
    <el-table-column prop="buildingName" label="租聘楼宇" />
    <el-table-column prop="propertyFeePrice" label="物业费(元/m²)" />
    <el-table-column prop="paymentAmount" label="账单金额(元)" />
    <el-table-column prop="createTime" label="缴费时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="viewDetail(scope.row.id)">
          查看
        </el-button>
        <el-button link type="primary" size="small" @click="del(scope.row.id)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </ICommonTable>
  <CostDialog ref="dialogRef" @getCostListAdd="getCostListAdd" ></CostDialog>
</template>
<script setup lang="ts">
// @ts-ignore
import Search from "../components/Search.vue";
import { ref, reactive } from "vue";
// @ts-ignore
import * as util from "@/utils/util";
import {
  getCostListApi,
  getLoYuApi,
  getCellApi,
  getBillDetailApi,
  deleteCostApi,
} from "@/api/cost";
import CostDialog from "../components/CostDialog.vue";
import { ElMessage, ElMessageBox } from "element-plus";
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
//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  getCostList();
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getCostList();
};
// 获取物业费列表
const getCostList = async () => {
  state.Loading = true;
  const res = await getCostListApi({
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
getCostList();
const getCostListAdd = () => {
  getCostList();
};
const getSearch=(data)=>{
  state.data=data
}
const dialogRef = ref<InstanceType<typeof CostDialog>>();
// 获取租聘楼宇api
const addCost = () => {
  Promise.all([getLoYuApi(), getCellApi()]).then((res) => {
    if (res.length === 2) {
      dialogRef.value?.openDialog({
        title: "添加账单",
        type: "add",
        louyudata: res[0].data,
        cellData: res[1].data,
      });
    }
  });
};
// 查看详情
const viewDetail = async (id: number) => {
  const res = await getBillDetailApi(id);
  if (res.code === 10000) {
    dialogRef.value?.openDialog({
      title: "查看账单",
      type: "edit",
      detailData: res.data,
    });
  }
};
const del = (id: number) => {
  ElMessageBox.confirm("是否确认删除当前账单?", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      const res = await deleteCostApi(id);
      if (res.code === 10000) {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        getCostListAdd();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #efefef;
}
.button {
  width: 100%;
  height: 50px;
  margin-top: 20px;
  .el-button {
    background: #7094ff;
    color: #fff;
    list-style: none;
  }
}
</style>
