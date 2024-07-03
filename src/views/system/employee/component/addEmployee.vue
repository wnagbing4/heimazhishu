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
        <el-form-item label="员工姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请填写员工姓名" />
        </el-form-item>
        <el-form-item label="登录账号" prop="userName">
          <el-input v-model="ruleForm.userName" placeholder="请填写登录账号" />
        </el-form-item>
        <el-form-item label="联系方式" prop="phonenumber">
          <el-input v-model="ruleForm.phonenumber" placeholder="请填写联系方式" />
        </el-form-item>
        <div>默认密码：123456</div>
        <el-form-item label="分配角色" prop="roleId">
          <el-select
            @change="changeRelevance"
            v-model="ruleForm.roleId"
            placeholder="请选择分配角色"
          >
            <el-option
              v-for="item in RelevanceList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工状态" prop="status">
          <el-radio-group v-model="ruleForm.status" @change="changePoleType" class="ml-4">
            <el-radio
              v-for="item in options"
              :key="item.value"
              :value="item.value"
              size="large"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
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
import { getRoleLostApi, addRoleApi, updataRoleApi } from "@/api/employee";
const DialogVisible = ref(false);
const title = ref("");
const type = ref("");

// 定义一体杆类型的数据
const options = ref([
  {
    value: 0,
    label: "未启用",
  },
  {
    value: 1,
    label: "启用",
  },
]);
// 选择一体杆类型对的id
const changePoleType = (val: any) => {
  ruleForm.status = val;
};
// 添加表单的校验规则
interface RuleForm {
  name: string;
  userName: string;
  phonenumber: string;
  roleId: number;
  status: string;
}
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
// 定义添加的数据
const ruleForm = reactive<RuleForm>({
  name: "",
  userName: "",
  phonenumber: "",
  roleId: null,
  status: "",
});
// 表单的校验规则
const rules = reactive<FormRules<RuleForm>>({
  name: [{ required: true, message: "请填写员工姓名", trigger: "blur" }],
  userName: [{ required: true, message: "请填写登录账号", trigger: "blur" }],
  phonenumber: [
    { required: true, message: "请填写联系方式", trigger: "blur" },
    { pattern: /^1[345789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" },
  ],
  roleId: [{ required: true, message: "请选择分配角色", trigger: "blur" }],
  status: [{ required: true, message: "请选择员工状态", trigger: "blur" }],
});
// 定义触发父组件的数据
const emits = defineEmits(["getList"]);
// 添加数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type.value === "add") {
        const res = await addRoleApi(ruleForm);
        if (res.code === 10000) {
          ElMessage({ type: "success", message: "添加成功" });
          closeDialog();
          emits("getList");
        } else {
          ElMessage({ type: "error", message: res.msg });
        }
      } else {
        const res = await updataRoleApi({
          name: ruleForm.name,
          userName: ruleForm.userName,
          phonenumber: ruleForm.phonenumber,
          roleId: ruleForm.roleId,
          status: ruleForm.status,
          id: id.value,
        });
        if (res.code === 10000) {
          ElMessage({ type: "success", message: "修改成功" });
          closeDialog();
          emits("getList");
        } else {
          ElMessage({ type: "error", message: res.msg });
        }
      }
    }
  });
};
// 定义关联区域数据
const RelevanceList = ref([]);
const getRoleList = async () => {
  const res = await getRoleLostApi();
  RelevanceList.value = res.data;
};
getRoleList();
// 选择关联区域的id
const changeRelevance = (val: any) => {
  ruleForm.roleId = val;
};
// 定义修改的id
const id = ref();
const openDialog = (obj: any) => {
  DialogVisible.value = true;
  title.value = obj.title;
  type.value = obj.type;
  if (obj.type === "edit") {
    console.log(obj);

    id.value = obj.id;
    ruleForm.name = obj.detailData.name;
    ruleForm.userName = obj.detailData.userName;
    ruleForm.phonenumber = obj.detailData.phonenumber;
    ruleForm.roleId = obj.detailData.roleId;
    ruleForm.status = obj.detailData.status;
  }
};

const closeDialog = () => {
  DialogVisible.value = false;
  ruleForm.name = "";
  ruleForm.userName = "";
  ruleForm.phonenumber = "";
  ruleForm.roleId = null;
  ruleForm.status = "";
};
// 导出方法
defineExpose({ openDialog, closeDialog });
</script>
<style lang="scss" scoped></style>
