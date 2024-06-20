<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import { ref } from 'vue'
import type { FormResponseType } from './FormConfigTypes'
// import type { formConfigType } from './type';

// 配置项中收集数据模版
// const formConfig = ref({
//     // 表单配置
//     formStyleOrigin: {
//         labelWidth: "100px",
//         inline: true,
//         // "label-position": "top",
//     },
//     // 表单item配置项
//     formItems: [
//         {
//             itemStyle: {
//                 width: "45%"
//             },
//             type: "input",
//             label: "用户名",
//             placeholder: "请输入用户名",
//             field: "name",
//             id: 1,
//             itemOrigin: {
//                 width: "100%",
//                 "prefix-icon": "Search"
//             }
//         },
//         {
//             itemStyle: {
//                 width: "45%"
//             },
//             type: "select",
//             label: "状态",
//             field: "status",
//             id: 2,
//             itemOrigin: {
//                 width: "100%",
//                 "prefix-icon": "Search",
//                 "placeholder": "请输入禁用/启用"
//             },
//             options: [
//                 {
//                     label: "禁用",
//                     value: "0"
//                 },
//                 {
//                     label: "启用",
//                     value: "1"
//                 }
//             ]
//         },
//         {
//             itemStyle: {
//                 width: "45%"
//             },
//             type: "password",
//             label: "密码",
//             field: "password",
//             id: 3,
//             itemOrigin: {
//                 width: "100%",
//                 "prefix-icon": "Search",
//                 "show-password": true,
//                  "placeholder": "请输入密码"
//             }
//         },
//         {
//             itemStyle: {
//                 width: "45%"
//             },
//             type: "switch",
//             label: "是否启用",
//             field: "qiyong",
//             id: 4
//         },
//         {
//             itemStyle: {
//                 width: "100%"
//             },
//             type: "daterange",
//             label: "是否启用",
//             field: "daterange",
//             id: 4,
//             placeholder: "请输入日期",
//             itemOrigin: {
//                 width: "100%",
//                 "start-placeholder": "请输入起始时间",
//                 "end-placeholder": "请输入结束时间",
//                 "range-separator": "至",
//                 "value-format": "YYYY-MM-DD"
//             },
//         },
//         // 复选框
//         {
//             itemStyle: {
//                 width: "45%"
//             },
//             type: "checkbox",
//             label: "复选框",
//             field: "['1']",
//             id: 5,
//             options: [
//                 {
//                     label: "复选框1",
//                     value: "1"
//                 },
//                 {
//                     label: "复选框2",
//                     value: "2"
//                 }
//             ]
//         },
//         // 单选框
//         {
//             itemStyle: {
//                 width: "45%"
//             },
//             type: "radio",
//             label: "单选框",
//             field: "1",
//             id: 5,
//             itemParentOrigin: {
//                 disabled: false
//             },
//             itemOrigin: {
//                 border: true,
//             },
//             options: [
//                 {
//                     label: "单选框1",
//                     value: "1"
//                 },
//                 {
//                     label: "单选框2",
//                     value: "2"
//                 }
//             ]
//         }
//     ],
//     // 头部样式
//     headerStyle: {
//         "text-align": "center",
//         "font-size": "20px",
//         "font-weight": "bold",
//         "margin-bottom": "20px"
//     },
//     // 表单校验
//     formRules: {
//         name: [
//             { required: true, message: '请输入用户名', trigger: 'blur' },
//             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
//         ],
//         password: [
//             { required: true, message: '请输入密码', trigger: 'blur' },
//             { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
//         ]
//     }
// })
// let formItems = formConfig.value.formItems ?? []
// // 初始化
// let fromDataInit: any = {}
// formItems.map((item: any) => {
//     if (item.type === "checkbox") {
//         fromDataInit[item.field] = []
//     } else if (item.type === "switch") {
//         fromDataInit[item.field] = false
//     } else if (item.type === "daterange") {
//         fromDataInit[item.field] = []
//     } else {
//         fromDataInit[item.field] = ""
//     }
// })
// // 表单数据
// let formData = ref(fromDataInit)

// 接受数据
// const props = defineProps<formConfigType>({
//     // 表单配置项
//     formItems: {
//         type: Array,
//         default: () => []
//     },
//     // 表单样式
//     formStyleOrigin: {
//         type: Object,
//         default: {}
//     },
//     // 表单数据
//     modelValue: {
//         type: Object,
//         default: () => ({})
//     },
//     // 头部样式
//     headerStyle: {
//         type: Object,
//         default: () => ({})
//     },
//     // 表单校验
//     formRules: {
//         type: Object,
//         default: () => ({})
//     },
//     // 额外内容插槽样式
//     formMainStyle:{
//         type: Object,
//         default: () => ({})
//     }
// })

// 加ts时接受 类型在formConfigType中定义 随时用随时定义
 withDefaults(defineProps<FormResponseType>(), {
  // 表单配置项
  formItems: () => [],
  // 表单样式
  formStyleOrigin: () => ({}),
  // 表单数据
  modelValue: () => ({}),
  // 头部样式
  headerStyle: () => ({}),
  // 底部样式
  footerStyle: () => ({}),
  // 内容样式
  formMainStyle: () => ({}),
  // 表单校验
  formRules: () => ({})
})

// 表单ref
const formDataRef = ref<FormInstance>()
// 重置方法
const resetForm = () => {
  formDataRef.value?.resetFields()
}

// 提交方法
const submitForm = () => {
  // 将表单实例返回出去根据需求调用
  return formDataRef.value
}

defineExpose({
  resetForm,
  submitForm
})
</script>
<template>
  <!-- 头部插槽 -->
  <div class="header" :style="headerStyle">
    <slot name="header"></slot>
  </div>
  <!-- 通过配置项二次封装ElementPlus表单 -->
  <!-- formStyleOrigin:表单样式  formRules:表单校验  modelValue:表单数据收集 -->
  <el-form
    v-bind="formStyleOrigin"
    :rules="formRules"
    :model="modelValue"
    :style="formStyleOrigin"
    ref="formDataRef"
  >
    <template v-for="item in formItems" :key="item.id">
      <!-- itemStyle:表单item样式  label:表单前文字 -->
      <el-form-item
        :style="item.itemStyle"
        :label="item.label"
        :prop="item.field"
      >
        <!-- input -->
        <template v-if="item.type === 'input'">
          <!-- modelValue[item.field]:表单数据收集  itemOrigin:input框配置需要是一个对象  -->
          <el-input
            v-model="modelValue[item.field]"
            v-bind="item.itemOrigin"
          />
        </template>
        <!-- 密码 -->
        <template v-if="item.type === 'password'">
          <el-input v-model="modelValue[item.field]" v-bind="item.itemOrigin" />
        </template>
        <!-- 下拉菜单 -->
        <template v-if="item.type === 'select'">
          <el-select v-bind="item.itemOrigin" v-model="modelValue[item.field]">
            <el-option
              v-for="option in item.options"
              :key="option.value"
              :label="option.label"
              :value="option.value"
            />
          </el-select>
        </template>
        <!-- switch -->
        <template v-if="item.type === 'switch'">
          <el-switch
            v-bind="item.itemOrigin"
            v-model="modelValue[item.field]"
          />
        </template>
        <!-- 日期选择器 -->
        <template v-if="item.type === 'daterange'">
          <el-date-picker
            v-bind="item.itemOrigin"
            v-model="modelValue[item.field]"
            :type="item.type"
            style="width: 100%"
          />
        </template>
        <!-- 复选框 -->
        <template v-if="item.type === 'checkbox'">
          <el-checkbox-group v-model="modelValue[item.field]">
            <el-checkbox
              v-bind="item.itemOrigin"
              v-for="checkbox in item.options"
              :key="checkbox.value"
              :label="checkbox.label"
              :value="checkbox.value"
            >
              {{ checkbox.label }}
            </el-checkbox>
          </el-checkbox-group>
        </template>
        <!-- 单选框 -->
        <template v-if="item.type === 'radio'">
          <el-radio-group
            v-bind="item.itemParentOrigin"
            v-model="modelValue[item.field]"
          >
            <el-radio
              v-bind="item.itemOrigin"
              v-for="radio in item.options"
              :key="radio.value"
              :value="radio.value"
            >
              {{ radio.label }}
            </el-radio>
          </el-radio-group>
        </template>
        <!-- 数字步进器 -->
        <template v-if="item.type === 'number'">
          <el-input-number
            v-bind="item.itemOrigin"
            v-model="modelValue[item.field]"
          />
        </template>
        <!-- 文本域 -->
        <template v-if="item.type === 'textarea'">
          <el-input
            v-model="modelValue[item.field]"
            type="textarea"
            v-bind="item.itemOrigin"
          />
        </template>
        <!-- 插槽 -->
        <template v-else-if="item.type === 'slot'">
          <slot :name="item.slotName"></slot>
        </template>
      </el-form-item>
    </template>
  </el-form>
  <!-- 底部插槽 -->
  <div class="footer" :style="footerStyle">
    <slot name="footer"></slot>
  </div>
</template>
<style lang="scss" scoped></style>
