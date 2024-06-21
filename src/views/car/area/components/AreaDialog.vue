<template>
  <el-dialog v-model="dialogFormVisible" :title="title" width="500" destroy-on-close>
    <el-form
      ref="ruleFormRef"
      style="max-width: 600px; height: 450px; padding: 30px"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
    >
      <el-form-item label="区域名称" prop="areaName">
        <el-input v-model="ruleForm.areaName" placeholder="请输入区域名称" />
      </el-form-item>

      <el-form-item label="车位数(个)" prop="spaceNumber">
        <el-input v-model="ruleForm.spaceNumber" placeholder="请输入车位个数" />
      </el-form-item>

      <el-form-item label="面积" prop="areaProportion">
        <el-input
          v-model="ruleForm.areaProportion"
          style="max-width: 600px"
          placeholder="请输入面积"
        >
          <template #append>㎡</template>
        </el-input>
      </el-form-item>

      <el-form-item label="关联计费规则" prop="ruleId">
        <el-select
          v-model="ruleName"
          placeholder="Select"
          size="large"
          style="max-width: 600px"
          @change="changeRule"
        >
          <el-option
            v-for="item in changeList"
            :key="item.id"
            :label="item.ruleName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="备注">
        <el-input
          v-model="ruleForm.remark"
          style="max-width: 600px"
          :rows="2"
          type="textarea"
          placeholder="请输入物业费"
        />
      </el-form-item>
      <el-form-item style="float: right">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>


      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { addAreaApi,editAreaApi } from "@/api/car";
import { ElMessage } from "element-plus";
const dialogFormVisible = ref(false);

export type EmptyObject = {
  /**
   * 在管面积
   */
  areaProportion: number | string;
  /**
   * 层数
   */
  spaceNumber: number | string;
  /**
   * 楼宇名称
   */
  areaName: string;
  /**
   * 物业费单价
   */
  ruleId: number | string;
  remark: string;

};
//添加模态框的数据源
let ruleForm = ref<EmptyObject>({
  areaProportion: "",
  spaceNumber: "",
  areaName: "",
  ruleId: "",
  remark: "",

});
const ruleName=ref('')
// 获取下拉菜单的id
const changeRule=(val:number)=>{
    ruleForm.value.ruleId=val
}
const rules = reactive<FormRules<EmptyObject>>({
  areaName: [{ required: true, message: "请输入区域名称", trigger: "change" }],
  spaceNumber: [
    { required: true, message: "请输入车位数", trigger: "change" },

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
  areaProportion: [{ required: true, message: "请输入面积", trigger: "change" }],
  ruleId: [{ required: true, message: "请选择物业费", trigger: "change" }],
});
const ruleFormRef = ref();
const title = ref();
const type = ref();
const id = ref();
const changeList = ref([]);
const openDialog = (obj: any) => {
  dialogFormVisible.value = true;
  title.value = obj.title;
  type.value = obj.type;
  changeList.value = obj.data;
  if (obj.type == "edit") {
    console.log(obj.editData, "editData");
    const form = obj.editData;
    ruleForm.value.areaProportion = form.areaProportion;
    ruleForm.value.spaceNumber = form.spaceNumber;
    ruleForm.value.areaName = form.areaName;
    ruleForm.value.remark = form.remark;
    ruleName.value = form.ruleName;
    ruleForm.value.ruleId = form.ruleId;
    id.value = form.id;
  }
};

const closeDialog = () => {
  dialogFormVisible.value = false;
  ruleForm.value.areaProportion = "";
  ruleForm.value.spaceNumber = "";
  ruleForm.value.areaName = "";
  ruleForm.value.ruleId = "";
  ruleForm.value.remark = "";
};
defineExpose({
  openDialog,
  closeDialog,
});
const emmits = defineEmits(["addGetList"]);
//添加的方法
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate( (valid: any, fields: any) => {
    if (valid) {
      if (type.value == "add") {
        addAreaApi(ruleForm.value).then( (res) => {
          if (res.code == 10000) {

            dialogFormVisible.value = false;
            emmits("addGetList");
           ElMessage({
              message: '添加成功',
              type: "success",
            });
          }
          ruleForm.value.areaProportion = "";
          ruleForm.value.spaceNumber = "";
          ruleForm.value.areaName = "";
          ruleForm.value.ruleId = "";
          ruleForm.value.remark = "";
        }).catch((err) => {
          console.log(err);
        });
      } else {
        // console.log(id.value, "idoid");

        editAreaApi({
          areaProportion: ruleForm.value.areaProportion,
          spaceNumber: ruleForm.value.spaceNumber,
          id: id.value,
          areaName: ruleForm.value.areaName,
          remark: ruleForm.value.remark,
          ruleId:  ruleForm.value.ruleId
        }).then((res: any) => {
          if (res.code == 10000) {
            ElMessage({
              message: '编辑成功',
              type: "success",
            });
            dialogFormVisible.value = false;
            emmits("addGetList");
          }
          ruleForm.value.areaProportion = "";
          ruleForm.value.spaceNumber = "";
          ruleForm.value.areaName = "";
          ruleForm.value.ruleId = "";
          ruleForm.value.remark = ""
        });
      }
    }
  });
};
</script>
