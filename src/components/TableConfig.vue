<script setup lang="ts">
defineProps<{
  // 表单配置项
  columnsConfig: any[]
  // 表格数据
  modelValue: any[]
  // 表格样式
  tableStyle?: any
}>()
</script>
<template>
  <el-table :data="modelValue" v-bind="tableStyle" :style="tableStyle">
    <template v-for="(item, index) in columnsConfig" :key="index">
      <!-- type为index时候渲染的渲染 -->
      <el-table-column
        width="150"
        v-if="item.type"
        v-bind="item.tableColumnStyle"
        :type="item.type"
        :label="item.label"
      />
      <!-- 无插槽的渲染 -->
      <el-table-column
        v-if="!item.slot && !item.type"
        v-bind="item.tableColumnStyle"
        :prop="item.prop"
        :label="item.label"
      />
      <!-- 有插槽的渲染 -->
      <el-table-column
        v-bind="item.tableColumnStyle"
        v-if="item.slot"
        :label="item.label"
      >
        <template #default="{ row }">
          <slot :name="item.slot" :row="row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<style lang="scss" scoped></style>
