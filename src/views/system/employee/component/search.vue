<script lang="ts" setup>
import { getEmployeeListApi } from '@/api/employee'
import {reactive} from 'vue'
// 定义搜索的数据
const ruleForm =reactive({
  name:''
})
const emits=defineEmits(['getSearch'])

const search=()=>{
  emits('getSearch',ruleForm.name)
}
</script>

<template>
  <div class="search_box">
    <el-form style="display: flex">
      <el-form-item label="员工姓名">
        <el-input placeholder="请输入员工姓名" v-model="ruleForm.name" style="width: 200px" />
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<style lang="scss" scoped>
.search_box {
  width: 100%;
  height: 30px;
  .el-button {
    background: rgba(71, 112, 255);
  }
}
</style>
