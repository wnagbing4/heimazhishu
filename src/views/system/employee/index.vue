<script lang="ts" setup>
import search from './component/search.vue'
import { ref, reactive } from 'vue'
// @ts-ignore
import * as util from '@/utils/util'
import addEmployee from './component/addEmployee.vue'
import { getEmployeeListApi,getDetailApi ,deleteRoleApi, resetPasswordApi} from '@/api/employee'
import { ElMessage, ElMessageBox } from 'element-plus'
// 定义搜搜的数据
const searchName = ref('')
//添加模态框的数据源
const state = reactive({
  commonTableKey: util.guid(),
  data: [],
  Loading: false,
  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0
  }
})
//请求表格数据方法
const getEmployeeList = async () => {
  state.Loading = true
  const res = await getEmployeeListApi({
    page: state.page.pageIndex,
    pageSize: state.page.pageSize,
    name:searchName.value,
  })
  if (res.code === 10000) {
    state.data = res.data.rows
    state.page.totalPage = res.data.total
    state.page.totalRecord = res.data.total
    state.Loading = false
  }
}
getEmployeeList()
//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val)
  state.page.pageSize = val
  getEmployeeList()
}
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val
  getEmployeeList()
}
// 搜索
const getSearch = (name: string) => {
  searchName.value = name
  getEmployeeList()
}
const dialogRef = ref<InstanceType<typeof addEmployee>>();
const add=()=>{
  dialogRef.value?.openDialog({
    title: "添加员工",
    type: "add",
  });
}

const edit=async (id)=>{
  const res=await getDetailApi(id)
  console.log(res,'detail');
  dialogRef.value?.openDialog({
    title: "编辑员工",
    type: "edit",
    id:id,
    detailData:res.data
  });
}
const del=(id:any)=>{
   ElMessageBox.confirm('确定要删除吗？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res=await deleteRoleApi(id)
          if(res.code===10000){
            ElMessage({
              type: 'success',
              message: '删除成功'
            })
            getEmployeeList()
          }
        })
}
// 重置密码
const resetPassword=(id:any)=>{
  ElMessageBox.confirm('确定将密码重置为“123456”？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res=await resetPasswordApi({id:id})
          if(res.code===10000){
            ElMessage({
              type: 'success',
              message: res.msg
            })
            getEmployeeList()
          }
        })
}
const getList=()=>{
  getEmployeeList()
}
</script>
<template>
  <div class="search">
    <search @getSearch="getSearch"></search>
  </div>
  <div class="button">
    <el-button type="primary" @click="add"> 添加员工</el-button>
  </div>
  <!--员工管理-->
  <ICommonTable
    ref="commonTableRef"
    :data="state.data"
    :page="state.page"
    :Loading="state.Loading"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    :key="state.commonTableKey"
  >
    <el-table-column prop="name" label="员工姓名" />
    <el-table-column prop="userName" label="登录账号" />
    <el-table-column prop="phonenumber" label="联系方式" />
    <el-table-column prop="roleName" label="角色" />
    <el-table-column prop="propertyFeePrice" label="状态">
      <template #default="scope">
        {{ scope.row.status === 1 ? '启用' : '停用' }}
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="添加时间" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary" link @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="primary" link @click="del(scope.row.id)">删除</el-button>
        <el-button type="primary" link @click="resetPassword(scope.row.id)">重置密码</el-button>
      </template>
    </el-table-column>
  </ICommonTable>
  <addEmployee ref="dialogRef" @getList='getList'></addEmployee>
</template>
<style lang='scss' scoped>
.search {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #efefef;
}

.button {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;

  .el-button {
    background: rgba(71, 112, 255);
    list-style: none;
  }
}
</style>
