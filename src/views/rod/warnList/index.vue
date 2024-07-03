<script setup lang="ts">
import  Search from "./component/search.vue"
import { ref, reactive } from "vue";
// /pole/warning/list
import { request } from "@/utils/request";
import * as util from "@/utils/util";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
const router=useRouter()
//添加模态框的数据源
const state = reactive({
  commonTableKey: util.guid(),
  data: [

  ],
  Loading:false,
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
  getList()
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getList()

};
const getList=async ()=>{
  state.Loading = true;
  const res=await request("/pole/warning/list",'GET',{
    page:1,
    pageSize:10
  })
  if(res.code===10000){
    state.data=res.data.rows
    state.page.totalPage=res.data.total
    state.page.totalRecord=res.data.total
    state.Loading=false
  }
}
getList()
const getSearch=async (data?:any)=>{
  state.Loading = true;
  const res=await request("/pole/warning/list",'GET',data)
  if(res.code===10000){
    state.data=res.data.rows
    state.page.totalPage=res.data.total
    state.page.totalRecord=res.data.total
    state.Loading=false
  }
}
const del=(id:number)=>{
  ElMessageBox.confirm(
    '是否确认删除当前告警记录?',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async() => {
      const res=await request(`/pole/warning/${id}`,'DELETE')
      if(res.code===10000){
        ElMessage({
          type: 'success',
          message: '删除成功',
        })
        getList()
      }else {
        ElMessage({
          type:'error',
          message:res.msg
        })
      }

    })
}
const detail= (id:number)=>{
    router.push({
      path:'/warn/detail',
     query:{
       id:id
     }
    })

}
</script>
<template>
<div class="search">
  <Search @getSearch="getSearch"></Search>
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
    <el-table-column prop="poleName" label="一体杆名称" />
    <el-table-column prop="poleNumber" label="一体杆编号" />
    <el-table-column prop="errorType" label="故障类型" />
    <el-table-column prop="handleStatus" label="处置状态" >
      <template #default="scope">
        <span v-if="scope.row.handleStatus===0">未派单</span>
        <span v-if="scope.row.handleStatus===1">已派单</span>
        <span v-if="scope.row.handleStatus===2">已接单</span>
        <span v-if="scope.row.handleStatus===3">已完成</span>
      </template>
    </el-table-column>
    <el-table-column prop="warningTime" label="告警时间" />
    <el-table-column  label="操作" >
      <template #default="scope">
        <el-button type="primary" link :disabled="scope.row.handleStatus!=0">派单</el-button>
        <el-button type="primary" link @click="detail(scope.row.id)">详情</el-button>
        <el-button type="primary" link :disabled="scope.row.handleStatus!=3" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </ICommonTable>
</template>
<style lang='scss' scoped>
.search{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #efefef;
}
</style>
