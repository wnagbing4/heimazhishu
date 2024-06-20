<script setup lang="ts">
import { addBuildingApi, editBuildingApi } from '@/api/park/building'
import { useDialogHook } from './useDialogHooks'
const { dialogTitle, dialogType, dialogTableVisible, formConfig, formData } =
  useDialogHook()

// 关闭弹框
const formRef = ref()
const handleClose = () => {
  formRef.value.resetForm()
  dialogTableVisible.value = false
}
// 定义一个打开方法
const openDialog = (type: string, title: string, data?: Object) => {
  dialogTitle.value = title
  dialogType.value = type
  if (type === 'edit') {
    console.log('data', data)
    formData.value = { ...data }
  }
  dialogTableVisible.value = true
}

// 添加和编辑功能实现
const emits = defineEmits(['refresh'])
const handleSubmit = async () => {
  // 处理表单提交逻辑
  if (dialogType.value === 'add') {
    // 添加逻辑
    const res = await addBuildingApi(formData.value)
    ElMessage.success(res!.msg)
  } else {
    // 编辑逻辑
    delete formData.value.status
    const res = await editBuildingApi(formData.value)
    ElMessage.success(res!.msg)
  }
  handleClose()
  emits('refresh')
}
// 暴露给父组件
defineExpose({
  openDialog
})
</script>
<template>
  <el-dialog
    @close="handleClose"
    v-model="dialogTableVisible"
    :title="dialogTitle"
    width="600"
  >
    <!-- 表单数据 -->
    <FormConfig v-bind="formConfig" v-model="formData" ref="formRef">
      <template #SquareMeter>
        <el-input v-model="formData.area" placeholder="请输入在管面积">
          <template #append>㎡</template>
        </el-input>
      </template>
      <template #PerSquareMeter>
        <el-input
          v-model="formData.propertyFeePrice"
          placeholder="请输入物业费"
        >
          <template #append>元/㎡</template>
        </el-input>
      </template>
    </FormConfig>
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleSubmit"> 确认 </el-button>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
