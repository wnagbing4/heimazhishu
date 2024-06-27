<template>
  <div class="dialog">
    <el-dialog v-model="DialogVisible" :title="title" width="500" destroy-on-close>
      <div
        style="display: flex; justify-content: center; align-items: center"
        v-show="type === 'add'"
      >
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top">
          <el-form-item label="选择租户" prop="enterpriseId">
            <el-select
              v-model="ruleForm.enterpriseId"
              placeholder="请选择租户"
              size="large"
              style="width: 300px"
              @change="changeCell"
            >
              <el-option
                v-for="item in cellData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="租聘楼宇" prop="buildingId">
            <el-select
              v-model="ruleForm.buildingId"
              placeholder="请选择租聘楼宇"
              size="large"
              style="width: 300px"
              @change="changeTenement"
            >
              <el-option
                v-for="item in tenementData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="缴费周期" prop="Time">
            <el-date-picker
              v-model="ruleForm.Time"
              type="daterange"
              range-separator="——"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="changePicker"
            />
          </el-form-item>
          <el-form-item label="支付金额" prop="paymentAmount">
            <el-input
              disabled
              v-model="ruleForm.paymentAmount"
              placeholder="请输入支付金额"
            />
          </el-form-item>
          <el-form-item label="支付方式" prop="paymentMethod">
            <el-select
              v-model="ruleForm.paymentMethod"
              placeholder="请选择支付方式"
              size="large"
              style="width: 300px"
              @change="changePayment"
            >
              <el-option
                v-for="item in paymentList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <div class="fotter_box" v-show="type==='edit'">
        <div>
          <span>租户姓名:</span>
          <span>{{ detailData.enterpriseName }}</span>
        </div>
        <div>
          <span>租户楼宇:</span>
          <span>{{ detailData.buildingName }}</span>
        </div>
        <div>
          <span>缴费周期:</span>
          <span>{{ detailData.startTime+ '至'+detailData.endTime}}</span>
        </div>
        <div>
          <span>物业费(元/㎡):</span>
          <span>{{ detailData.propertyFeePrice }}</span>
        </div>
        <div>
          <span>账单金额(元):</span>
          <span>{{ detailData.paymentAmount }}</span>
        </div>
        <div>
          <span>支付方式:</span>
          <span>{{ detailData.paymentMethodValue }}</span>
        </div>
        <div>
          <span>缴费时间:</span>
          <span>{{ detailData.createTime }}</span>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" v-if="type==='add'" @click="submitForm(ruleFormRef)"> 确定 </el-button>
          <el-button type="primary" v-else @click="closeDialog"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage, type ComponentSize, type FormInstance, type FormRules } from "element-plus";
import { formatTime } from "@/utils/day";
import { getYuSuanApi, addBillApi } from "@/api/cost";
const DialogVisible = ref(false);
interface RuleForm {
  enterpriseId: number;
  buildingId: number;
  startTime: string;
  endTime: string;
  paymentAmount: string;
  paymentMethod: number;
  Time: any[];
}
const ruleFormRef = ref<FormInstance>();
// 标题
const title = ref("");
// 控制添加还是编辑的变量
const type = ref("");
// 定义获取楼宇的变量
const tenementData = ref([]);
// 定义获取租户的变量
const cellData = ref([]);
// 定义支付方式的数据
const paymentList = ref([
  {
    id: 1,
    name: "微信",
  },
  {
    id: 2,
    name: "支付宝",
  },
  {
    id: 3,
    name: "现金",
  },
]);
const ruleForm = reactive<RuleForm>({
  enterpriseId: null,
  buildingId: null,
  startTime: "",
  endTime: "",
  paymentAmount: "",
  paymentMethod: null,
  Time: [],
});
const rules = reactive<FormRules<RuleForm>>({
  enterpriseId: [{ required: true, message: "请选择租户", trigger: "blur" }],
  buildingId: [{ required: true, message: "请选择楼宇", trigger: "blur" }],
  Time: [{ required: true, message: "请选择缴费周期", trigger: "blur" }],
  paymentAmount: [{ required: true, message: "请输入支付金额", trigger: "blur" }],
  paymentMethod: [{ required: true, message: "请选择支付方式", trigger: "blur" }],
});
// 获取租户的id
const changeCell = (val: number) => {
  ruleForm.enterpriseId = val;
};
// 获取选择楼宇的id
const changeTenement = (val: number) => {
  ruleForm.buildingId = val;
};
// 获取日期
const changePicker = (val: any) => {
  ruleForm.startTime = formatTime(val[0]);
  ruleForm.endTime = formatTime(val[1]);
  getYuSuanApi({
    buildingId: ruleForm.buildingId,
    startTime: ruleForm.startTime,
    endTime: ruleForm.endTime,
  }).then((res: any) => {
    ruleForm.paymentAmount = res.data;
  });
};
// 获取选额支付方式id
const changePayment = (val: number) => {
  ruleForm.paymentMethod = val;
};
// 打开模态框
const detailData=ref<any>({})
const openDialog = (obj: any) => {
  DialogVisible.value = true;
  console.log(obj, "obj");
  title.value = obj.title;
  type.value = obj.type;
  tenementData.value = obj.louyudata;
  cellData.value = obj.cellData;
  if(obj.type==='edit'){
    detailData.value=obj.detailData
  }
};
const closeDialog = () => {
  DialogVisible.value = false;
  ruleForm.enterpriseId= null;
  ruleForm.buildingId= null;
  ruleForm.startTime= "";
  ruleForm.endTime= "";
  ruleForm.paymentAmount= "";
  ruleForm.paymentMethod= null;
  ruleForm.Time= [];
};
const emits=defineEmits(['getCostListAdd'])
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (type.value === "add") {
        const res = await  addBillApi({
          enterpriseId: ruleForm.enterpriseId,
          buildingId: ruleForm.buildingId,
          startTime: ruleForm.startTime,
          endTime: ruleForm.endTime,
          paymentAmount: ruleForm.paymentAmount,
          paymentMethod: ruleForm.paymentMethod,
        });
        if(res.code===10000){

          ElMessage({
            type:'success',
            message:'添加成功'
          })
          closeDialog()
          emits('getCostListAdd')
        }
      }
      // console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

// 导出方法
defineExpose({ openDialog, closeDialog });
</script>
<style lang="scss" scoped>
.el-form-item {
  width: 300px;
}
.fotter_box {
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-top: 20px;
    span {
      font-size: 15px;
    }
    span:last-child {
      margin-left: 15px;
    }
  }
}
</style>
