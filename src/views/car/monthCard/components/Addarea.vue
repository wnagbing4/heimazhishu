<template>
  <div class="addarea_box">
    <div class="header_box">
      <el-icon style="cursor: pointer"><Back /></el-icon>
      <span style="margin-left: 5px; cursor: pointer" @click="router.back()">返回</span>
      <span style="margin-left: 5px; color: #e3e5ea">|</span>
      <span style="margin-left: 5px">{{ title }} </span>
    </div>
    <div class="addAdress_box">
      <div class="title_box_1">车辆信息</div>
      <el-form
        ref="ruleFormRef"
        style=""
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="车主姓名" style="margin-left: 190px" prop="personName">
          <el-input :disabled="flag" style="width: 500px" v-model="ruleForm.personName" />
        </el-form-item>
        <el-form-item label="联系方式" style="margin-left: 50px" prop="phoneNumber">
          <el-input
            :disabled="flag"
            style="width: 500px"
            v-model="ruleForm.phoneNumber"
          />
        </el-form-item>
        <el-form-item
          label="车牌号码"
          style="margin-left: 190px; margin-top: 40px"
          prop="carNumber"
        >
          <el-input :disabled="flag" style="width: 500px" v-model="ruleForm.carNumber" />
        </el-form-item>
        <el-form-item
          label="车辆品牌"
          style="margin-left: 50px; margin-top: 40px"
          prop="carBrand"
        >
          <el-input :disabled="flag" style="width: 500px" v-model="ruleForm.carBrand" />
        </el-form-item>
      </el-form>
    </div>
    <div class="addAdress_box">
      <div class="title_box_1">最近一次月卡缴费信息</div>
      <el-form
        ref="ruleFormRef"
        style=""
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="有效日期" style="margin-left: 190px" prop="timeData">
          <el-date-picker
            v-model="timeData"
            type="daterange"
            :disabledDate="disabledDate"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            @change="changeTime"
          />
        </el-form-item>
        <el-form-item label="支付金额" style="margin-left: 50px" prop="paymentAmount">
          <el-input style="width: 500px" v-model="ruleForm.paymentAmount" />
        </el-form-item>
        <el-form-item
          label="支付方式 "
          style="margin-left: 190px; margin-top: 40px"
          prop="paymentMethod"
        >
          <el-select
            v-model="ruleForm.paymentMethod"
            placeholder="Select"
            size="large"
            style="width: 240px"
            @change="changePaymentMethod"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="fotter_box">
      <el-button>重置</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ComponentSize, ElMessage, FormInstance, FormRules } from "element-plus";
import { formatTime } from "@/utils/day";
import { addMounthCardApi, getEditDetailsApi, editAreaApiYue,renewMounthCardApi } from "@/api/car";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
interface RuleForm {
  personName: string;
  phoneNumber: number | string;
  carNumber: string;
  carBrand: number | string;
  paymentAmount: string;
  paymentMethod: any;
  cardStartDate: string;
  cardEndDate: string;
}
const options = ref([
  {
    value: "Alipay",
    name: "支付宝",
  },
  {
    value: "WeChat",
    name: "微信",
  },
  {
    value: "Cash",
    name: "线下",
  },
]);
const type = ref<any>("");
const carInfoId = ref();
const title: any = ref("");
const rechargeId = ref();
onMounted(() => {
  // console.log(route.query.type,'fffffff');
  type.value = route.query.type;
  carInfoId.value = route.query.id;
  title.value = route.query.title;
  if (route.query.type === "edit") {
    getDetail();
  }
  if (route.query.type === "Renew") {
    getDetail();
  }
});
const flag = ref<boolean>(false);
// 获取编辑详情
const getDetail = async () => {
  const res: any = await getEditDetailsApi(carInfoId.value);
  console.log(res, "详情");
    if(route.query.type === "edit"){
      ruleForm.personName = res.data.personName;
  ruleForm.phoneNumber = res.data.phoneNumber;
  ruleForm.carNumber = res.data.carNumber;
  ruleForm.carBrand = res.data.carBrand;
  ruleForm.paymentAmount = res.data.paymentAmount;
  ruleForm.paymentMethod = res.data.paymentMethod;
  ruleForm.cardStartDate = res.data.cardStartDate;
  ruleForm.cardEndDate = res.data.cardEndDate;
  rechargeId.value = res.data.rechargeId;
  timeData.value = [res.data.cardStartDate, res.data.cardEndDate];
    }
  // 设置时间
  if (route.query.type === "Renew") {
    ruleForm.personName = res.data.personName;
    ruleForm.phoneNumber = res.data.phoneNumber;
    ruleForm.carNumber = res.data.carNumber;
    ruleForm.carBrand = res.data.carBrand;
    flag.value = true;
    timeData.value = [res.data.cardStartDate];
  }
};

// 选择支付方式
const changePaymentMethod = (val: any) => {
  console.log(val);
  ruleForm.paymentMethod = val;
  if (route.query.type === "edit") {
    rechargeId.value = val;
  }
};
// 选择时间
const changeTime = (val: any) => {
  console.log(val);
  ruleForm.cardStartDate = formatTime(val[0]);
  ruleForm.cardEndDate = formatTime(val[1]);
};
// 定义时间的变量
const timeData = ref();
const disabledDate = (time: Date) => {
  return time.getTime() < Date.now() - 8.64e7;
};
const formSize = ref<ComponentSize>("default");
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  personName: "",
  phoneNumber: "",
  carNumber: "",
  carBrand: "",
  paymentAmount: "",
  paymentMethod: "",
  cardStartDate: "",
  cardEndDate: "",
});

const rules = reactive<FormRules<RuleForm>>({
  personName: [{ required: true, message: "请输入车主姓名", trigger: "blur" }],
  phoneNumber: [
    { required: true, message: "请输入手机号", trigger: "blur" },
    { pattern: /^1[345789]\d{9}$/, message: "手机号码格式不正确", trigger: "blur" },
  ],
  carNumber: [
    { required: true, message: "请输入车牌号", trigger: "blur" },
    {
      required: true,
      message: "车牌号格式不正确",
      pattern: /^[\u4e00-\u9fa5]{1}[a-zA-Z]{1}[0-9]{6}$/,
    },
  ],
  carBrand: [{ required: true, message: "请输入车辆品牌", trigger: "blur" }],
  paymentAmount: [{ required: true, message: "请输入支付金额", trigger: "blur" }],
  paymentMethod: [{ required: true, message: "请选择支付方式", trigger: "blur" }],
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // console.log("submit!");
      if (type.value === "add") {
        const res = await addMounthCardApi(ruleForm);
        if (res.code === 10000) {
          console.log(res);
          ElMessage({
            message: "添加成功",
            type: "success",
          });
          router.back();
        }
      } else if(route.query.type === "Renew"){
        console.log(1);

         const res:any= await renewMounthCardApi({
          carInfoId: carInfoId.value,
          cardStartDate: ruleForm.cardStartDate,
          cardEndDate: ruleForm.cardEndDate,
          paymentAmount: ruleForm.paymentAmount,
          paymentMethod: ruleForm.paymentMethod,
         })
         console.log(res,'resrs');

         if(res.code===10000){
          ElMessage({
            message: "续费成功",
            type: "success",
          });
          router.back()
         }else{
          ElMessage({
            message: res.msg,
            type: "error",
          });
         }

      } else {
        // return
        const res = await editAreaApiYue({
          carInfoId: carInfoId.value,
          personName: ruleForm.personName,
          phoneNumber: ruleForm.phoneNumber,
          carNumber: ruleForm.carNumber,
          carBrand: ruleForm.carBrand,
          paymentAmount: ruleForm.paymentAmount,
          rechargeId: rechargeId.value,
          paymentMethod: ruleForm.paymentMethod,
          cardStartDate: ruleForm.cardStartDate,
          cardEndDate: ruleForm.cardEndDate,
        });
        // console.log(res,'编辑');
        if (res.code === 10000) {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          router.back();
        }
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="scss" scoped>
.addarea_box {
  width: 100%;
  height: 100%;
  background: #f4f6f8;
  .addAdress_box {
    width: 80%;
    height: 270px;
    background: #fff;
    margin: 40px auto;
    .demo-ruleForm {
      display: flex;
      flex-wrap: wrap;
      margin: 20px auto;
    }
    .title_box_1 {
      width: 100%;
      height: 50px;
      border-bottom: 1px solid #f7f7f7;
      padding: 15px;
      box-sizing: border-box;
    }
  }
  .header_box {
    width: 100%;
    height: 60px;
    background: #fff;
    display: fixed;
    top: 0;
    padding: 10px;
    box-sizing: border-box;
  }
  .fotter_box {
    width: 100%;
    height: 60px;
    background: #fff;
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

function ElMessage(arg0: { message: string; type: string; }) { throw new Error("Function
not implemented."); }
