<template>
  <div class="search_box">
    <el-form style="display: flex">
      <el-form-item label="企业名称">
        <el-input v-model="ruleForm.enterpriseName" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="缴费时间" style="margin-left: 20px">
        <el-date-picker
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          v-model="Time"
          @chnage="changePicker"
        />
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button type="primary" @click="getCostList">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {reactive,ref} from "vue"
import { getCostListApi } from "@/api/cost";
import { formatTime } from "@/utils/day";
const ruleForm=reactive({
  page: 1,
  pageSize: 10,
  enterpriseName:'',
  start:'',
  end:''
})
const Time=ref([])
const changePicker = (val: any) => {
  ruleForm.start = formatTime(val[0]);
  ruleForm.end = formatTime(val[1]);
};
const emits=defineEmits(['getSearch'])
// 获取物业费列表
const getCostList = async () => {
  const res = await getCostListApi(ruleForm);
  console.log(res,'search');
  if(res.code===10000){
    emits('getSearch',res.data.rows)
  }
};
</script>
<style lang="scss" scoped>
.el-button {
  background: #7094ff;
  color: #fff;
  list-style: none;
}
</style>
