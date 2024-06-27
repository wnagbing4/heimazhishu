<template>
  <div class="month_box">
    <div class="search_box">

      <Search @getSearch="getSearch"></Search>
    </div>
    <div class="button_box">
      <div class="button">
        <el-button
          style="background: #4770ff; color: #fff"
          type="primary"
          @click="addAreaCard"
          >添加月卡</el-button
        >
        <el-button style="background: #4770ff; color: #fff" type="primary" @click="deleteCar"
          >批量删除</el-button
        >
      </div>
      <div class="title">
        <div class="title_title">
          <el-icon style="color: #1890ff"><WarningFilled /></el-icon>
          <p>
            本园区共计 {{ ProportionData.spaceNumber }} 个车位，月卡用户
            {{ ProportionData.cardCount }} 人，车位占有率 {{ ProportionData.proportion }}
          </p>
        </div>
      </div>
    </div>
    <ICommonTable
      ref="commonTableRef"
      :data="state.data"
      :Loading="state.Loading"
      :selection="true"
      :page="state.page"
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      @selection-change="selectionChangeHandle"
      :key="state.commonTableKey"
    >
      <el-table-column prop="personName" label="车主名称" />
      <el-table-column prop="phoneNumber" label="联系方式" />
      <el-table-column prop="carNumber" label="车牌号码" />
      <el-table-column prop="carBrand" label="车辆品牌" />
      <el-table-column prop="totalEffectiveDate" label="剩余有效天数" />
      <el-table-column prop="propertyFeePrice" label="状态">
        <template #default="scope">
          <span v-show="scope.row.cardStatus == 0">可用</span>
          <span v-show="scope.row.cardStatus == 1">已过期</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editRenew(scope.row.id)"> 续费 </el-button>
          <el-button link type="primary" size="small" @click="goToDetail(scope.row.id)">查看</el-button>
          <el-button link type="primary" size="small" @click="editCar(scope.row.id)"> 编辑  </el-button>
          <el-button link type="primary" size="small" @click="deleteCar(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </ICommonTable>
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import Search from "./components/Search.vue";
import { reactive, ref } from "vue";
// @ts-ignore
import { getProportionList, getMounthCardListApi, deleteMounthCardApi } from "@/api/car";
// @ts-ignore
import * as util from "@/utils/util";
import { useRouter } from "vue-router";
import { ElMessage, ElMessageBox } from "element-plus";
const router = useRouter();
//添加模态框的数据源
const state = reactive({
  commonTableKey: util.guid(),
  data: [

  ],

  page: {
    pageIndex: 1,
    pageSize: 10,
    totalPage: 0,
    totalRecord: 0,
  },
  Loading:false
});
//分页器部件二
const sizeChangeHandle = (val: number) => {
  console.log(val);
  state.page.pageSize = val;
  getMounthCardList();
};
//分页器部件二
const currentChangeHandle = (val: number) => {
  state.page.pageIndex = val;
  getMounthCardList();
};
const getSearch=(data:any)=>{
console.log(data,'data');
state.data=data
}
const ids:any = ref([]);
const selectionChangeHandle = (val: any[]) => {
  console.log(`selection-change`, val);
  ids.value = val.map((item) => item.id);
};
const ProportionData:any = ref([]);
// 获取月卡占有率
const getProportion = async () => {
  const res = await getProportionList();
  ProportionData.value = res.data;
};
getProportion();
// 获取用户列表
const getMounthCardList = async () => {
  state.Loading=true
  const res = await getMounthCardListApi({});
  console.log(res);
  state.data = res.data.rows;
  state.page.totalPage = res.data.total;
  state.page.totalRecord = res.data.total;
  state.Loading=false
};
getMounthCardList();
const addAreaCard = () => {
  router.push({
    path:"/car/addMonthCard",
    query: {
      type:'add',
      title:'添加月卡'
    },
  });
};
const deleteCar = async (id: number) => {
      if(ids.value.length>0){
        ElMessageBox.confirm("确定要删除月卡", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await deleteMounthCardApi(ids.value);
    if (res.code === 10000) {
      getMounthCardList();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    }
  });
      }else{
        ElMessageBox.confirm("确定要删除月卡", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(async () => {
    const res = await deleteMounthCardApi(id);
    if (res.code === 10000) {
      getMounthCardList();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    }
  });
      }
};
const editCar=(id:number)=>{
  router.push({
    path:"/car/addMonthCard",
    query: {
      type:'edit',
      id:id,
      title:'编辑月卡'
    },
  });
}
// 前往详情页面
const goToDetail=(id:number)=>{
    router.push({
      path:"/car/viewMonthCard",
      query: {
        id:id,
      },
    });
}
const editRenew=(id:number)=>{
  router.push({
    path:"/car/addMonthCard",
    query: {
      type:'Renew',
      title:'月卡续费',
      id:id
    },
  });
}
</script>
<style lang="scss" scoped>
.month_box {
  width: 100%;
  height: 100%;
  background: #fff;
  .search_box {
    width: 100%;
    height: 70px;
    background: #fff;
    padding: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ccc;
  }
  .button_box {
    width: 100%;
    height: 70px;
    display: flex;
    .button {
      width: 70%;
      height: 100%;
      margin: 20px;
    }
    .title {
      width: 30%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 20px;
      box-sizing: border-box;
      .title_title {
        width: 100%;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #e6f7ff;
        border: 1px solid #e6f7ff;
      }
    }
  }
}
</style>
