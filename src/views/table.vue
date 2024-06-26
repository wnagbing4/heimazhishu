
<template>
  <ICommonTable
    ref="commonTableRef"
    :data="state.data"
    :page="state.page"
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
  </ICommonTable>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
// @ts-ignore
import * as util from "@/utils/util";
//添加模态框的数据源
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
let userch = ref({
  name: "",
});
//请求表格数据方法

//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;

};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;

};
const jumperChangeHandle = (val: number) => {
  console.log(`jumper page: ${val}`);
};
const selectionChangeHandle = (val: any[]) => {
  console.log(`selection-change`, val);
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
