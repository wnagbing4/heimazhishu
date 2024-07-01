<template>
  <div class="search_box">
    <el-form style="display: flex">
      <el-form-item label="一体杆名称">
        <el-input v-model="ruleForm.poleName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="一体杆编号" style="margin-left: 20px">
        <el-input v-model="ruleForm.poleNumber" placeholder="请输入编号" />
      </el-form-item>
      <el-form-item label="运行编号" style="margin-left: 20px">
        <el-select v-model="ruleForm.poleStatus" placeholder="Select" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            @change="cahangeStatus"
          />
        </el-select>
      </el-form-item>
      <el-form-item style="margin-left: 20px">
        <el-button type="primary" @click="getSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { getPoleListPole } from "@/api/pole";
const ruleForm = reactive({
  page: 1,
  pageSize: 10,
  poleName: "",
  poleNumber: "",
  poleStatus: "",
});
const options = ref([
  {
    value: 0,
    label: "正常",
  },
  {
    value: 1,
    label: "异常",
  }
]);
const cahangeStatus=(val:any)=>{
  ruleForm.poleStatus=val
}
const emits=defineEmits(['getSearchList'])
 const getSearch=async ()=>{
   const res=await getPoleListPole(ruleForm)
   console.log(res,'search');

   if(res.code===10000){
    emits('getSearchList',res.data.rows)
  }

 }
</script>
<style lang="scss" scoped>
.el-button {
  background: #7094ff;
  color: #fff;
  list-style: none;
}
</style>
