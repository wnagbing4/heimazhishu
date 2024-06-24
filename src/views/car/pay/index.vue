<template>
  <div>
    <div class="search_box">
    <el-form>
      <el-form-item label="车牌号码:" style="width: 300px">
        <el-input v-model="searchForm.carNumber" placeholder="请输入车牌号码"></el-input>
      </el-form-item>
      <el-form-item label="缴纳状态:" style="width: 300px">
        <el-select v-model="paymentStatusName" placeholder="未选择" size="large" style="width: 240px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"

          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getGayList">查询</el-button>
      </el-form-item>
    </el-form>

  </div>
    <ICommonTable
    ref="commonTableRef"
    :data="state.data"
    :page="state.page"
    @size-change="sizeChangeHandle"
    @current-change="currentChangeHandle"
    :key="state.commonTableKey"
  >
    <el-table-column prop="carNumber" label="车牌号码" />
    <el-table-column prop="phoneNumber" label="收费类型" >
      <template #default="scope">
        <span>{{ scope.row.chargeType==='card'?'月卡':'临时停车' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="parkingTime" label="停车总时长" />
    <el-table-column prop="actualCharge" label="缴纳费用(元)" />
    <el-table-column prop="totalEffectiveDate" label="缴纳状态" >
      <template #default="scope">
        <span>{{ scope.row.paymentStatus===0?'未缴纳':'已缴纳' }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="propertyFeePrice" label="缴纳方式">
      <template #default="scope">
         <span v-show="scope.row.paymentMethod==='Alipay'">支付宝</span>
         <span v-show="scope.row.paymentMethod==='WeChat'">微信</span>
         <span v-show="scope.row.paymentMethod==='Cash'">线下</span>
         <span v-show="scope.row.paymentMethod===null">--</span>
      </template>
    </el-table-column>
    <el-table-column prop="paymentTime" label="缴纳时间" />
  </ICommonTable>
  </div>


</template>
<script setup lang="ts">
// @ts-ignore
import * as util from "@/utils/util";
import { reactive, ref } from "vue";
import { getPaymentApi } from "@/api/car";
const state = reactive({
  commonTableKey: util.guid(),
  data: [
    {
      area: 99,
      floors: 20,
      id: 28,
      name: "99",
      propertyFeePrice: 999,
      status: 0,
    },
  ],
  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0,
  },
});
interface optionsType{
  value:string,
  label:string
}
// 0未缴纳，1已缴纳
const options=reactive<optionsType[]>([
  {
    value: '0',
    label: '未缴纳'
  },
  {
    value: '1',
    label: '已缴纳'
  },
])
interface searchFormType {
  paymentStatus: string;
  carNumber: string;
  page:number;
  pageSize:number;
}
const searchForm = ref<searchFormType>({
  carNumber: "",
  paymentStatus: "",
  pageSize:10,
  page:1,
});
const paymentStatusName=ref<string>('')
//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  getGayList()
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getGayList()
};
const getGayList=async ()=>{
  const res=await getPaymentApi(searchForm.value)
  console.log(res);
  state.data=res.data.rows
  state.page.totalPage=res.data.total
  state.page.totalRecord=res.data.total
}
getGayList()
</script>

<style lang="scss" scoped>
.search_box {
  width: 100%;
  height: 40px;
  background-color: #fff;
  padding: 20px;
  .el-form {
    display: flex;
    .el-form-item {
      margin-left: 30px;
      .el-button {
        background: #5a81ff;
        color: white;
      }
    }
  }
}
</style>
