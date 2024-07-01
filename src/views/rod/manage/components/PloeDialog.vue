<template>
  <el-dialog v-model="DialogVisible" :title="title" width="500">
    <div>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
        label-position="top"
      >
        <el-form-item label="一体杆名称" prop="poleName">
          <el-input v-model="ruleForm.poleName" placeholder="请输入一体杆名称" />
        </el-form-item>
        <el-form-item label="一体杆编号" prop="poleNumber">
          <el-input v-model="ruleForm.poleNumber" placeholder="请输入一体杆编号" />
        </el-form-item>
        <el-form-item label="一体杆ip" prop="poleIp">
          <el-input v-model="ruleForm.poleIp" placeholder="请输入一体杆ip" />
        </el-form-item>
        <el-form-item label="关联区域" prop="areaId">
          <el-select
            @change="changeRelevance"
            v-model="ruleForm.areaId"
            placeholder="请选择关联区域"
          >
            <el-option
              v-for="item in RelevanceList"
              :key="item.areaId"
              :label="item.areaName"
              :value="item.areaId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="一体杆类型" prop="poleType">
          <el-select
            v-model="ruleForm.poleType"
            placeholder="请选择一体杆类型"
            @change="changePoleType"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { ComponentSize, ElMessage, FormInstance, FormRules } from "element-plus";
import { getRelevanceApi, addPoleApi,editPoleApi } from "@/api/pole";
const DialogVisible = ref(false);
const title = ref("");
const type = ref("");
// 定义一体杆类型的数据
const options = ref([
  {
    value: "entrance",
    label: "入口",
  },
  {
    value: "export",
    label: "出口",
  },
]);
// 选择一体杆类型对的id
const changePoleType = (val: any) => {
  ruleForm.poleType = val;
};
// 添加表单的校验规则
interface RuleForm {
  poleName: string;
  poleNumber: string;
  poleIp: string;
  areaId: number;
  poleType: string;
}
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
// 定义添加的数据
const ruleForm = reactive<RuleForm>({
  poleName: "",
  poleNumber: "",
  poleIp: "",
  areaId: null,
  poleType: "",
});
// 表单的校验规则
const rules = reactive<FormRules<RuleForm>>({
  poleName: [{ required: true, message: "请输入一体杆名称", trigger: "blur" }],
  poleNumber: [{ required: true, message: "请输入一体杆编号", trigger: "blur" }],
  poleIp: [
    { required: true, message: "请输入一体杆ip", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入IP地址"));
        } else {
          const reg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
          if (!reg.test(value)) {
            callback(new Error("请输入正确的IP地址"));
          } else {
            callback();


          }
        }
      },
    },
  ],
  areaId: [{ required: true, message: "请选择关联区域", trigger: "blur" }],
  poleType: [{ required: true, message: "请选择一体杆类型", trigger: "blur" }],
});
// 定义触发父组件的数据
const emits=defineEmits(['getList'])
// 添加数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type.value === "add") {
        const res = await addPoleApi(ruleForm);
        if (res.code === 10000) {
          ElMessage({ type: "success", message: "添加成功" });
          closeDialog();
          emits('getList')
        }else{
          ElMessage({ type: "error", message: res.msg });
        }
      }else{
        const res = await editPoleApi({
          poleName:  ruleForm.poleName,
          poleNumber:ruleForm.poleNumber,
          poleIp:ruleForm.poleIp,
          areaId: ruleForm.areaId,
          poleType:  ruleForm.poleType,
          id:id.value
        });
        if (res.code === 10000) {
          ElMessage({ type: "success", message: "修改成功" });
          closeDialog();
          emits('getList')
        }else{
          ElMessage({ type: "error", message: res.msg });
        }
      }
    }
  });
};
// 定义关联区域数据
const RelevanceList = ref([]);
// 获取关联区域的数据
const getRelevanceList = async () => {
  const res = await getRelevanceApi();
  RelevanceList.value = res.data;
};
getRelevanceList();
// 选择关联区域的id
const changeRelevance = (val: any) => {
  ruleForm.areaId = val;
};
// 定义修改的id
const id=ref()
const openDialog = (obj: any) => {
  DialogVisible.value = true;
  title.value = obj.title;
  type.value = obj.type;
  if(obj.type==='edit'){
      id.value=obj.item.id
      ruleForm.poleName=obj.item.poleName
      ruleForm.poleNumber=obj.item.poleNumber
      ruleForm.poleIp=obj.item.poleIp
      ruleForm.areaId=obj.item.areaId
      ruleForm.poleType=obj.item.poleType
  }
};
const closeDialog = () => {
  DialogVisible.value = false;
  ruleForm.areaId = null;
  ruleForm.poleName = "";
  ruleForm.poleNumber = "";
  ruleForm.poleType = "";
  ruleForm.poleIp = "";
};
// 导出方法
defineExpose({ openDialog, closeDialog });
</script>
<style lang="scss" scoped></style>
