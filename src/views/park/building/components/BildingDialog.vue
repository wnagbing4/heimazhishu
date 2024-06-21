<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500"   destroy-on-close>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px; height: 360px; padding: 30px"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="楼宇名称" prop="name">
        <el-input v-model="ruleForm.name" placeholder="请输入楼宇名称" />
      </el-form-item>

      <el-form-item label="楼宇层数" prop="floors">
        <el-input v-model="ruleForm.floors" placeholder="请输入楼宇层数" />
      </el-form-item>

      <el-form-item label="在管面积" prop="area">
        <el-input
          v-model="ruleForm.area"
          style="max-width: 600px"
          placeholder="请输入在管面积"
        >
          <template #append>㎡</template>
        </el-input>
      </el-form-item>

      <el-form-item label="物业费" prop="propertyFeePrice">
        <el-input
          v-model="ruleForm.propertyFeePrice"
          style="max-width: 600px"
          placeholder="请输入物业费"
        >
          <template #append>元/m²</template>
        </el-input>
      </el-form-item>

      <el-form-item style="float: right">
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>

        <el-button @click="dialogFormVisible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { addBuildingApi, editBuildingApi } from "@/api/park/building";

import { ElMessage } from "element-plus";
const dialogFormVisible = ref(false);

export type EmptyObject = {
  /**
   * 在管面积
   */
  area: number;
  /**
   * 层数
   */
  floors: number;
  /**
   * 楼宇名称
   */
  name: string;
  /**
   * 物业费单价
   */
  propertyFeePrice: number;
};
//添加模态框的数据源
let ruleForm = ref({
  area: '',
  floors: '',
  name: "",
  propertyFeePrice: '',
});
const rules = reactive<FormRules<EmptyObject>>({
  name: [{ required: true, message: "请输入楼宇名称", trigger: "change" }],
  floors: [
    { required: true, message: "请输入层数", trigger: "change" },

    {
      validator: (rule, value, callback) => {
        const num = parseInt(value, 10);
        if (num >= 1 && num <= 20) {
          callback();
        } else {
          callback(new Error("楼层最大值为20"));
        }
      },
      trigger: "blur",
    },
  ],
  area: [{ required: true, message: "请输入建筑面积", trigger: "change" }],
  propertyFeePrice: [{ required: true, message: "请输入物业费", trigger: "change" }],
});
const ruleFormRef = ref();
const title = ref();
const type = ref();
const id = ref();
const openDialog = (obj: any) => {
  ruleForm.value.area = '';
          ruleForm.value.floors = '';
          ruleForm.value.name = "";
          ruleForm.value.propertyFeePrice = '';
  dialogFormVisible.value = true;
  title.value = obj.title;
  type.value = obj.type;

  if (obj.type == "edit") {
    console.log(obj);

    const form = obj.row;
    ruleForm.value.name = form.name;
    ruleForm.value.area = form.area;
    ruleForm.value.floors = form.floors;
    ruleForm.value.propertyFeePrice = form.propertyFeePrice;
    id.value = form.id;
  }
};

const closeDialog = () => {
  dialogFormVisible.value = false;
  ruleForm.value.area = '';
  ruleForm.value.floors = '';
  ruleForm.value.name = "";
  ruleForm.value.propertyFeePrice = '';
};
defineExpose({
  openDialog,
  closeDialog,
});
const emmits = defineEmits(["addGetList"]);
//添加的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid: any, fields: any) => {
    if (valid) {
      if (type.value == "add") {
        addBuildingApi(ruleForm.value).then((res) => {
          if (res.code == 10000) {
            ElMessage({
              message: res.msg,
              type: "success",
            });
            dialogFormVisible.value = false;
            emmits("addGetList");
          }
          ruleForm.value.area = '';
          ruleForm.value.floors = '';
          ruleForm.value.name = "";
          ruleForm.value.propertyFeePrice = '';
          console.log(res);
        });
      } else {
        console.log(id.value, "idoid");

        editBuildingApi({
          area: ruleForm.value.area,
          floors: ruleForm.value.floors,
          id: id.value,
          name: ruleForm.value.name,
          propertyFeePrice: ruleForm.value.propertyFeePrice,
        }).then((res: any) => {
          if (res.code == 10000) {
            ElMessage({
              message: res.msg,
              type: "success",
            });
            dialogFormVisible.value = false;
            emmits("addGetList");
          }
          ruleForm.value.area = '';
          ruleForm.value.floors = '';
          ruleForm.value.name = "";
          ruleForm.value.propertyFeePrice = '';
          console.log(res, "editedit");
        });
      }
    }
  });
};
</script>
