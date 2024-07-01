<script setup lang="ts">
import { ref, reactive } from 'vue'

const options = ref([{
  label: '11',
  value: 1
}])
</script>

<template>
  <div class="search_box">
    <el-form style="display: flex">
      <el-form-item label="一体杆名称">
        <el-input style="width: 200px" placeholder="请输入一体杆" />
      </el-form-item>
      <el-form-item label="一体杆编号">
        <el-input style="width: 200px" placeholder="请输入一体杆编号" />
      </el-form-item>
      <el-form-item label="处置状态">
        <el-select placeholder="请选择处置状态" style="width: 200px">
          <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label" />
        </el-select>
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
