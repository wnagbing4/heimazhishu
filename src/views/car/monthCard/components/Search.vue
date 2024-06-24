<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-form-item label="车牌号码">
      <el-input v-model="formInline.carNumber" placeholder="请输入车牌号码" clearable />
    </el-form-item>
    <el-form-item label="车主姓名">
      <el-input v-model="formInline.personName" placeholder="请输入车主姓名" clearable />
    </el-form-item>
    <el-form-item label="状态">
      <el-select
        v-model="statusName"
        placeholder="请选择状态"
        clearable
        @change="changeStatus"
      >
        <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />

      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>

  </div>
</template>

<script lang="ts" setup>
import { reactive,ref } from 'vue'
import {getMounthCardListApi} from "@/api/car"
const options=ref([
  {name:'全部',id:2},
  {name:'可用',id:0},
  {name:'已过期',id:1}
])
const formInline = reactive({
  personName: '',
  carNumber: '',
  cardStatus: '',
})
const statusName=ref('')
const changeStatus=(val:any)=>{
  formInline.cardStatus=val
}
const emits=defineEmits(['getSearch'])
const onSubmit = async () => {
  // console.log('submit!')
  const res=await getMounthCardListApi({
    pageNum:1,
    pageSize:10,
    cardStatus:formInline.cardStatus,
    carNumber:formInline.carNumber,
    personName:formInline.personName
  })
  if(res.code===10000){
    emits('getSearch',res.data.rows)
  }
}
</script>

<style lang="scss" scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
