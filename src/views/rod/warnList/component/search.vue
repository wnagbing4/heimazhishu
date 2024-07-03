<script setup lang="ts">
import { ref, reactive } from 'vue'
import {request} from "@/utils/request"
// 0:未派单,1:已派单,2:已接单,3:已完成
const options = ref([
  {
    label: '未派单',
    value: 0
  },
  {
    label: '已派单',
    value: 1
  },
  {
    label: '已接单',
    value: 2
  },
  {
    label: '已完成',
    value: 3
  }
])
const changeStatus=(val:any)=>{
   ruleForm.handleStatus=val
}
const ruleForm = reactive({
  poleName: '',
  poleNumber: '',
  handleStatus: '',
  page:1,
  pageSize:10,
})
const emits=defineEmits(['getSearch'])
const getSearchList=()=>{
   emits('getSearch',ruleForm)
}
</script>

<template>
  <div class="search_box">
    <el-form style="display: flex">
      <el-form-item label="一体杆名称">
        <el-input style="width: 200px" v-model="ruleForm.poleName" placeholder="请输入一体杆" />
      </el-form-item>
      <el-form-item label="一体杆编号">
        <el-input style="width: 200px" placeholder="请输入一体杆编号" v-model="ruleForm.poleNumber" />
      </el-form-item>
      <el-form-item label="处置状态">
        <el-select placeholder="请选择处置状态" v-model="ruleForm.handleStatus" style="width: 200px" @change="changeStatus">
          <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="background:#7094ff;" @click="getSearchList">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.search_box {
  .el-form {
    .el-form-item {
      margin-left: 20px;
    }
  }
}
</style>
