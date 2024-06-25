<template>
  <div class="dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="title"
      destroy-on-close
      width="700"
      :before-close="closeDialog"
    >
      <div class="dialog_box">
        <el-form
          ref="ruleFormRef"
          style="margin-top: 20px"
          :model="ruleForm"
          :rules="rules"

          label-position="top"
        >
          <el-form-item label="计费规则编号" prop="ruleNumber">
            <el-input v-model="ruleForm.ruleNumber" placeholder="请输入计费规则编号" />
          </el-form-item>
          <el-form-item label="计费规则名称" prop="ruleName">
            <el-input v-model="ruleForm.ruleName" placeholder="请输入计费规则名称" />
          </el-form-item>
          <el-form-item label="计费方式(全天收费)" prop="chargeType">
            <el-radio-group v-model="ruleForm.chargeType" @change="changeValue">
              <el-radio
                size="large"
                border
                v-for="item in options"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <div style="display: flex">
            <el-form-item label="免费时常">
              <el-input-number
                v-model="ruleForm.freeDuration"
                :min="1"
                :max="10"
                placeholder="请输入免费时长"
                controls-position="right"
                size="large"
                @change="handleChange"
              />分钟
            </el-form-item>
            <el-form-item label="收费上限" style="margin-left: 10px; margin-top: 5px">
              <el-input v-model="ruleForm.chargeCeiling" placeholder="请输入收费上限" />
            </el-form-item>
          </div>
          <!-- v-if="ruleForm.chargeType === 'duration'" -->
          <div style="display: flex" v-if="ruleForm.chargeType === 'duration'">
            <el-form-item label="计费规则" prop="durationTime">
              每
              <el-input-number
                v-model="ruleForm.durationTime"
                :min="1"
                :max="10"
                placeholder="请输入"
                controls-position="right"
                size="large"
              />
            </el-form-item>
            <el-form-item prop="durationType" style="margin-top: 30px; margin-left: 10px">
              <el-select
                v-model="ruleForm.durationType"
                placeholder="请选择"
                size="large"
                style="width: 240px"
                @change="changeValue1"
              >
                <el-option
                  v-for="item in option"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              prop="durationPrice"
              style="margin-top: 35px; margin-left: 10px"
            >
              <el-input v-model="ruleForm.durationPrice" placeholder="请输入" />
            </el-form-item>
          </div>
          <!-- turn -->
          <div style="display: flex" v-if="ruleForm.chargeType === 'turn'">
            <el-form-item
              label="计费规则"
              prop="turnPrice"
              style="margin-top: 35px; margin-left: 10px"
            >
              <el-input v-model="ruleForm.turnPrice" placeholder="请输入" />
            </el-form-item>
          </div>
          <!-- partition -->
          <div v-if="ruleForm.chargeType === 'partition'">
            <div style="display: flex">
              <el-form-item label="计费规则" prop="partitionFrameTime">
                <el-input-number
                  v-model="ruleForm.partitionFrameTime"
                  :min="1"
                  :max="10"
                  placeholder="请输入"
                  controls-position="right"
                  size="large"
                />小时内
              </el-form-item>
              <el-form-item
                prop="partitionFramePrice"
                style="display: flex; margin-top: 30px; margin-left: 20px"
              >
                <p>,每小时收费</p>
                <el-input
                  placeholder="请输入"
                  v-model="ruleForm.partitionFramePrice"
                  style="width: 180px"
                />
                <p>元</p>
              </el-form-item>
            </div>

            <div style="display: flex">
              <el-form-item prop="partitionIncreaseTime">
                每增加<el-input
                  v-model="ruleForm.partitionIncreaseTime"
                  placeholder="请输入"
                  style="width: 180px"
                />小时
              </el-form-item>
              <el-form-item prop="partitionIncreasePrice">
                增加<el-input
                  v-model="ruleForm.partitionIncreasePrice"
                  placeholder="请输入"
                  style="width: 180px"
                />元
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { ComponentSize, FormInstance, FormRules } from "element-plus";
import { addRuleApi, getDetailListApi ,editRulesApi} from "@/api/car";
const options = reactive([
  {
    value: "duration",
    label: "时长收费",
  },
  {
    value: "turn",
    label: "按次收费",
  },
  {
    value: "partition",
    label: "分段收费",
  },
]);
const option = reactive([
  {
    value: "minute",
    label: "分钟",
  },
  {
    value: "hour",
    label: "小时",
  },
]);
//获取计费方式
const changeValue = (val: string) => {
  console.log(val);
  ruleForm.chargeType = val;
};
// 获取计费规则
const changeValue1 = (val: string) => {
  ruleForm.durationType = val;
};
interface RuleForm {
  ruleNumber: string;
  ruleName: string;
  chargeType: string;
  freeDuration: number;
  chargeCeiling: number;
  durationTime: number;
  durationType: string;
  durationPrice: number;
  turnPrice: number;
  partitionFrameTime: number;
  partitionFramePrice: string;
  partitionIncreaseTime: number;
  partitionIncreasePrice: number;
}
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  ruleNumber: "",
  ruleName: "",
  chargeType: "duration",
  freeDuration: null,
  chargeCeiling: null,
  durationTime: null,
  durationType: "",
  durationPrice: null,
  turnPrice: null,
  partitionFrameTime: null,
  partitionFramePrice: "",
  partitionIncreaseTime: null,
  partitionIncreasePrice: null,
});
const handleChange = (value: number) => {
  console.log(value);
};
const rules = reactive<FormRules<RuleForm>>({
  ruleNumber: [{ required: true, message: "请输入计费规则编号!", trigger: "blur" }],
  ruleName: [{ required: true, message: "请输入计费规则名称!", trigger: "blur" }],
  chargeType: [{ required: true, message: "请选择计费方式!", trigger: "blur" }],
  durationTime: [{ required: true, message: "请输入计费时间!", trigger: "blur" }],
  durationType: [{ required: true, message: "请选择时间单位!", trigger: "blur" }],
  durationPrice: [{ required: true, message: "请输入计费金额!", trigger: "blur" }],
  turnPrice: [{ required: true, message: "请输入计费金额!", trigger: "blur" }],
  partitionFrameTime: [{ required: true, message: "请输入计费时间!", trigger: "blur" }],
});

const dialogVisible = ref(false);
const title = ref("");
const type = ref<string>("");
const id = ref();
const openDialog = (obj: any) => {
  dialogVisible.value = true;
  title.value = obj.title;
  type.value = obj.type;
  if (obj.type === "edit") {
    title.value = obj.title;
    type.value = obj.type;
    id.value = obj.id;
    getEditRuleSlist();
  }
};
const getEditRuleSlist = async () => {
  const res = await getDetailListApi(id.value);
  console.log(res, "详情");
  if (res.data.chargeType === "turn") {
    ruleForm.chargeType = res.data.chargeType;
    ruleForm.chargeCeiling = res.data.chargeCeiling;
    ruleForm.freeDuration = res.data.freeDuration;
    ruleForm.ruleName = res.data.ruleName;
    ruleForm.ruleNumber = res.data.ruleNumber;
    ruleForm.turnPrice = res.data.turnPrice;
  } else if (res.data.chargeType === "partition") {
    ruleForm.chargeCeiling = res.data.chargeCeiling;
    ruleForm.chargeType = res.data.chargeType;
    ruleForm.freeDuration = res.data.freeDuration;
    ruleForm.ruleName = res.data.ruleName;
    ruleForm.ruleNumber = res.data.ruleNumber;
    ruleForm.partitionFramePrice = res.data.partitionFramePrice;
    ruleForm.partitionFrameTime = res.data.partitionFrameTime;
    ruleForm.partitionIncreasePrice = res.data.partitionIncreasePrice;
    ruleForm.partitionIncreaseTime = res.data.partitionIncreaseTime;
  } else {
    ruleForm.chargeCeiling = res.data.chargeCeiling;
    ruleForm.chargeType = res.data.chargeType;
    ruleForm.durationPrice = res.data.durationPrice;
    ruleForm.durationTime = res.data.durationTime;
    ruleForm.durationType = res.data.durationType;
    ruleForm.freeDuration = res.data.freeDuration;
    ruleForm.ruleName = res.data.ruleName;
    ruleForm.ruleNumber = res.data.ruleNumber;
  }
};
onMounted(() => {});
const emits = defineEmits(["getListApi"]);
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // console.log("submit!");
      if (type.value === "add") {
        if (ruleForm.chargeType === "duration") {
          const res = await addRuleApi({
            chargeCeiling: ruleForm.chargeCeiling,
            chargeType: ruleForm.chargeType,
            durationPrice: ruleForm.durationPrice,
            durationTime: ruleForm.durationTime,
            durationType: ruleForm.durationType,
            freeDuration: ruleForm.freeDuration,
            ruleName: ruleForm.ruleName,
            ruleNumber: ruleForm.ruleNumber,
          });
          console.log(res, "时长收费");
          if (res.code === 10000) {
            ElMessage({
              type: "success",
              message: "添加成功",
            });
            dialogVisible.value = false;
            emits("getListApi");
          }
          ruleForm.ruleNumber = "";
          ruleForm.ruleName = "";
          ruleForm.chargeType = "duration";
          ruleForm.freeDuration = null;
          ruleForm.chargeCeiling = null;
          ruleForm.durationTime = null;
          ruleForm.durationType = "";
          ruleForm.durationPrice = null;
          ruleForm.turnPrice = null;
          ruleForm.partitionFrameTime = null;
          ruleForm.partitionFramePrice = "";
          ruleForm.partitionIncreaseTime = null;
          ruleForm.partitionIncreasePrice = null;
        } else if (ruleForm.chargeType === "turn") {
          const res = await addRuleApi({
            chargeCeiling: ruleForm.chargeCeiling,
            chargeType: ruleForm.chargeType,
            freeDuration: ruleForm.freeDuration,
            ruleName: ruleForm.ruleName,
            ruleNumber: ruleForm.ruleNumber,
            turnPrice: ruleForm.turnPrice,
          });
          if (res.code === 10000) {
            ElMessage({
              type: "success",
              message: "添加成功",
            });
            dialogVisible.value = false;
            emits("getListApi");
          }
          ruleForm.ruleNumber = "";
          ruleForm.ruleName = "";
          ruleForm.chargeType = "duration";
          ruleForm.freeDuration = null;
          ruleForm.chargeCeiling = null;
          ruleForm.durationTime = null;
          ruleForm.durationType = "";
          ruleForm.durationPrice = null;
          ruleForm.turnPrice = null;
          ruleForm.partitionFrameTime = null;
          ruleForm.partitionFramePrice = "";
          ruleForm.partitionIncreaseTime = null;
          ruleForm.partitionIncreasePrice = null;
        } else {
          const res = await addRuleApi({
            chargeCeiling: ruleForm.chargeCeiling,
            chargeType: ruleForm.chargeType,
            freeDuration: ruleForm.freeDuration,
            ruleName: ruleForm.ruleName,
            ruleNumber: ruleForm.ruleNumber,
            partitionFramePrice: ruleForm.partitionFramePrice,
            partitionFrameTime: ruleForm.partitionFrameTime,
            partitionIncreasePrice: ruleForm.partitionIncreasePrice,
            partitionIncreaseTime: ruleForm.partitionIncreaseTime,
          });

          if (res.code === 10000) {
            ElMessage({
              type: "success",
              message: "添加成功",
            });
            dialogVisible.value = false;
            emits("getListApi");
          }
          ruleForm.ruleNumber = "";
          ruleForm.ruleName = "";
          ruleForm.chargeType = "duration";
          ruleForm.freeDuration = null;
          ruleForm.chargeCeiling = null;
          ruleForm.durationTime = null;
          ruleForm.durationType = "";
          ruleForm.durationPrice = null;
          ruleForm.turnPrice = null;
          ruleForm.partitionFrameTime = null;
          ruleForm.partitionFramePrice = "";
          ruleForm.partitionIncreaseTime = null;
          ruleForm.partitionIncreasePrice = null;
        }
      } else {
        if (ruleForm.chargeType === "duration") {
          const res = await editRulesApi({
            chargeCeiling: ruleForm.chargeCeiling,
            chargeType: ruleForm.chargeType,
            durationPrice: ruleForm.durationPrice,
            durationTime: ruleForm.durationTime,
            durationType: ruleForm.durationType,
            freeDuration: ruleForm.freeDuration,
            ruleName: ruleForm.ruleName,
            ruleNumber: ruleForm.ruleNumber,
            id:id.value
          });
          console.log(res, "时长收费");
          if (res.code === 10000) {
            ElMessage({
              type: "success",
              message: "修改成功",
            });
            dialogVisible.value = false;
            emits("getListApi");
          }
          ruleForm.ruleNumber = "";
          ruleForm.ruleName = "";
          ruleForm.chargeType = "duration";
          ruleForm.freeDuration = null;
          ruleForm.chargeCeiling = null;
          ruleForm.durationTime = null;
          ruleForm.durationType = "";
          ruleForm.durationPrice = null;
          ruleForm.turnPrice = null;
          ruleForm.partitionFrameTime = null;
          ruleForm.partitionFramePrice = "";
          ruleForm.partitionIncreaseTime = null;
          ruleForm.partitionIncreasePrice = null;
        } else if (ruleForm.chargeType === "turn") {
          const res = await editRulesApi({
            chargeCeiling: ruleForm.chargeCeiling,
            chargeType: ruleForm.chargeType,
            freeDuration: ruleForm.freeDuration,
            ruleName: ruleForm.ruleName,
            ruleNumber: ruleForm.ruleNumber,
            turnPrice: ruleForm.turnPrice,
            id:id.value
          });
          if (res.code === 10000) {
            ElMessage({
              type: "success",
              message: "修改成功",
            });
            dialogVisible.value = false;
            emits("getListApi");
          }
          ruleForm.ruleNumber = "";
          ruleForm.ruleName = "";
          ruleForm.chargeType = "duration";
          ruleForm.freeDuration = null;
          ruleForm.chargeCeiling = null;
          ruleForm.durationTime = null;
          ruleForm.durationType = "";
          ruleForm.durationPrice = null;
          ruleForm.turnPrice = null;
          ruleForm.partitionFrameTime = null;
          ruleForm.partitionFramePrice = "";
          ruleForm.partitionIncreaseTime = null;
          ruleForm.partitionIncreasePrice = null;
        } else {
          const res = await editRulesApi({
            chargeCeiling: ruleForm.chargeCeiling,
            chargeType: ruleForm.chargeType,
            freeDuration: ruleForm.freeDuration,
            ruleName: ruleForm.ruleName,
            ruleNumber: ruleForm.ruleNumber,
            partitionFramePrice: ruleForm.partitionFramePrice,
            partitionFrameTime: ruleForm.partitionFrameTime,
            partitionIncreasePrice: ruleForm.partitionIncreasePrice,
            partitionIncreaseTime: ruleForm.partitionIncreaseTime,
            id:id.value
          });

          if (res.code === 10000) {
            ElMessage({
              type: "success",
              message: "修改成功",
            });
            dialogVisible.value = false;
            emits("getListApi");
          }
          ruleForm.ruleNumber = "";
          ruleForm.ruleName = "";
          ruleForm.chargeType = "duration";
          ruleForm.freeDuration = null;
          ruleForm.chargeCeiling = null;
          ruleForm.durationTime = null;
          ruleForm.durationType = "";
          ruleForm.durationPrice = null;
          ruleForm.turnPrice = null;
          ruleForm.partitionFrameTime = null;
          ruleForm.partitionFramePrice = "";
          ruleForm.partitionIncreaseTime = null;
          ruleForm.partitionIncreasePrice = null;
        }
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
const closeDialog = () => {
  dialogVisible.value = false;
  ruleForm.ruleNumber = "";
  ruleForm.ruleName = "";
  ruleForm.chargeType = "duration";
  ruleForm.freeDuration = null;
  ruleForm.chargeCeiling = null;
  ruleForm.durationTime = null;
  ruleForm.durationType = "";
  ruleForm.durationPrice = null;
  ruleForm.turnPrice = null;
  ruleForm.partitionFrameTime = null;
  ruleForm.partitionFramePrice = "";
  ruleForm.partitionIncreaseTime = null;
  ruleForm.partitionIncreasePrice = null;
};
defineExpose({ openDialog, closeDialog });
</script>
<style lang="scss" scoped></style>
