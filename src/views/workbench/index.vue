<script lang="ts" setup>
// 获取菜单仓库
import { useMenuStore } from '@/stores/useMenuStore'
import { workbenchEcharts } from '@/utils/echarts'
import { useRouter } from 'vue-router'
import CostDialog from '@/views/propety/components/CostDialog.vue'
import {
  getCostListApi,
  getLoYuApi,
  getCellApi,
  getBillDetailApi,
  deleteCostApi
} from '@/api/cost'

const router = useRouter()
const menuStore = useMenuStore()
const { WorkbenchList }: any = menuStore
// console.log('WorkbenchList', WorkbenchList)
const myChart = ref()
// 图表渲染
onMounted(() => {
  workbenchEcharts(myChart.value, WorkbenchList.annualIncomeArray)
})
const goWarnList = () => {
  router.push('/rod/warnList')
}
// /park/enterprise/add
const goParkAdd = () => {
  router.push('/park/enterprise/add')
}
// /system/employee
const goEmployee = () => {
  router.push('/system/employee')
}
const goScreen = () => {
  router.push('/bigscreen/home')
}
const dialogRef = ref<InstanceType<typeof CostDialog>>()
const addCost = () => {
  Promise.all([getLoYuApi(), getCellApi()]).then((res) => {
    if (res.length === 2) {
      dialogRef.value?.openDialog({
        title: '添加账单',
        type: 'add',
        louyudata: res[0].data,
        cellData: res[1].data
      })
    }
  })
}
</script>
<template>
  <el-row
    :gutter="20"
    style="margin-bottom: 20px; height: 110px; box-sizing: border-box"
  >
    <el-col :span="16" style="height: inherit">
      <p
        style="
          height: 20px;
          line-height: 20px;
          padding-left: 30px;
          padding-top: 10px;
          background-color: #fff;
        "
      >
        园区数据
      </p>
      <div class="flex-between" style="height: 80px">
        <div class="flex-direction">
          <span>年度累计收费(元)</span>
          <b>{{ WorkbenchList!.annualIncome }}</b>
        </div>
        <div class="flex-direction">
          <span>入驻企业总数（个）</span>
          <b>{{ WorkbenchList!.enterpriseTotal }}</b>
        </div>
        <div class="flex-direction">
          <span>月卡车辆总数（辆）</span>
          <b>{{ WorkbenchList!.monthCardTotal }}</b>
        </div>
        <div class="flex-direction">
          <span>一体杆总数（台）</span>
          <b>{{ WorkbenchList!.chargePoleTotal }}</b>
        </div>
      </div>
    </el-col>
    <el-col :span="8" style="height: inherit">
      <p
        style="
          height: 20px;
          line-height: 20px;
          padding-left: 30px;
          padding-top: 10px;
          background-color: #fff;
        "
      >
        快捷入口
      </p>
      <div class="flex-between" style="height: 80px">
        <div class="flex-direction2" @click="goParkAdd">
          <img
            alt=""
            src="data:image/png;base64,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"
            @click="goParkAdd"
          />
          <span>添加企业</span>
        </div>
        <div class="flex-direction2">
          <img
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAMAAABGS8AGAAAC+lBMVEUAAAD+9+799+399+789+3//O/9+O389+z++O799+399u39+e799+799+3+9u3/9+/79uv/+O/+yJv99u7++O789ez99+399uv99ej99er99Ob98+T98+j98uH98d/97df/zmP98Nz/gQj/iBH979r969H98eb+s0f/fgX/fAP/wFP////96Mn/uEv/kBr96c//yV3/x1v/vlH/u03+qEn/y1//gwv948H/xFf/hQ7+gAv96Mv/tUn9rkT9qkH/niz/jRj88OT95MP937j/rEz/kh7+rmH/wlb7mjT/ixT937v+2q//sUL8pj//mSX97dT95cf9zZb/vU/8oTv9kyX+0sv93LT+2av91KX/1Gn/0Wf8nzb/oTH8iRv+06L9xoj+pUT/rD7/lSD+iBf98t394r3/jqL/xVr/r0/8o0j/p0T9ozj7ljD/myj8jyf9jR79vXv/slX9qVT9miv7kyv9jiL9gxH95+P+ycP/pKz+1qn+z5v9bpn8nJj8apb9okP7nUH6mj/+qDv+hRT+2tr+1tP+zMf/iaL/gaL90aD/mqD9eKD+y5P77uH87N7+2Mr91L7+vb38zq//k6P/haL+nqH/e6D9dJ79x47+uXP+t2v/rln6nUb4kz79nTL9lyv/liP96dz+w8H+trn9s7P8q6r/lqH/fqD9cZv+woP9v37+smj/smD4iVj3iUr/+PX96dT+tMP9w7f+rLH8pqP9rpn6vpf7ZpL+m4/8lYv9oHz/1XT6qXD/vG36j2r9p17/8u785tr939H+xc39t6z+3Z3/3I79x4v7loX7lXv/wnr+vHf5jnb8rnL7mnH7gGn9sWT7nmP9n0D+ljT9+O791rb+5rT8w6v9gaf9zKX9uJb9oon8nIT8r4H7jn79tnz/xWz+pWv/tlz5nVb3jEL/rLf9v6b/n6X8do78u4n9w4b+xX/+o3X7o1r/ulT/nT77zdD8l7P8j6j7iaH/p5H7oJD6nJD/r4r/xoX+xYP5tX3/2Xv6cXv6j09LMSFaAAAAFnRSTlMAv9/fYBCfQM+QcDCvgFAggH/+37+g0NwKpAAAB+JJREFUWMO12QV0EnEcwHFRxDm77oA7h4kBioGiYs7Gwhhi5+za7M3W2d3b7O7u7u7u7u72PX+/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"
            @click="goEmployee"
          />
          <span>员工管理</span>
        </div>
        <div class="flex-direction2">
          <img
            alt=""
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABZCAMAAACNFxOjAAAC91BMVEUAAADq+/jp+vgpnYXq/Pnj///q+/fp/Pjp+/jo+vjp+/jr+/fn+/fp+/jn+vfp/Pfn+/fq+/nr+vbo+vbp+/nq+/jn+/no+vjo+fbp+/jo+/jm+vbk+fXi+PTh+PLf9/KA69ra9e+E7dze+PWI79176Nfj+vPV8+yL8d/l+vVh28vd9vGN8uDe9/Da9u3S8ep96dhAyr1Iz7V13avX9O7e+O01w6z////c9vDX9ell3c2u58YtwLR536l13qfO7+d15dU4xrhCzLLg+fXI7uOk681M0cG56tRh28govrJx3KXN8uK+69lc2clIzsCp7+XK8d935tWz6M1c2cQlvLAiu6/a9+nU8+jW9uWr6+Op6uJ05NSq7dJFzb+o5r48x7tR1LpO0rhGza+V46WG4pvh+e+o6uCw8Nh459aE4tZw49JQ0sRN0LUswLCc5K5y3ajQ8efG7t/D7N+08dtt4dBo385V1b6i5bdEzbQ5x6/L8OXR8+TB7dye6sk8ybcxwrY+ybBN0K4ju6qw7uTD79dY18EovqtT0qq59ZPB8c6X58Or5740w7eG4rY0xLN/37Ja1q0twKxo26tHzKua5qeu8ZWT6JWz85TO893G79zA7tO77M563MtW1cec6sWS5r+P5LyC37dn3LJ44LEyw7Bv3q4huq1Nzqda06ap8JW87NV93tGn7dC16c6X6cBEzLxIz7um5rlBy7iD47N94K9h2a1g16mS452l7pax7+bR8+G77d3J8dl+6tm168qy6sNL0LtX1rc5x7Se5bNV0KSO45yY6pa29JS79pLI8tat79Rp39B63tC878e37Mej68Zd17aK5LVGxrWl6LRT07A0wqec65ag7ZWQ4tbW+dJ32cmu6r3P+LnR9vHJ9e+V6t7Q9tJx3dBo1sN+5MBy2cCI5LqO5rmf566N46O+7+ig8OOW8+K16dPI9M+L4syH6cVl071s3rmQ5bKW5q31/PnY+PPe+t+O7chw2sh04byU55uO6dyV788HwzOXAAAAGXRSTlMAv98FnxBg35AwgEBAz2BQIK9wcM/PgHCwU5kYKQAACDpJREFUWMO001EKwkAMBNBkSdLdLdJaCzL3v6j5cdFC+6HJO8AQZggdabOtyp334nCpOGaWvi1N6YqaFPxoF1tPYmfGn9iiY4dppoOKIP27XEYY/tyREYhp6AhVx24I9l6wwCWUYQg3j+UyTl6RQFOacObBggTiwTckmIgUKZQaUjRakMLogRRP6khRSZBCTh76xUn9u6QTx3EcH79/wRe+3PXVw34fKRINdVMgQYtEOKVLLUeZo/YPSKBbg12LNbRJ0BZYcNFUQUabFmRqbolJQ78ben3eHxLLzu7Tg8/nfXpwT47PcFe1IWu1+5/D/yzCtYFOpmx8LSzCPR3d/Bz+a/ExdrXq4ZMWsRH+YxFWXC5FUVxYgCv94wP77ZJ5+FW4yVTaPR4TlIXDXtP7hcmnaeLXYwKOExcdw9/f7+2okSAIW7MIz5Np2vzSqnFELiThsG+8XWg89KGxxiAsCYbj4VAYz7/eTH1W8oZJdZXKCEtC4WKYlHwtumkWo6S6SsqSjLJA+CpKdrvbLcSYaiaTYWF0QSB8Qkrt3WJU02Ka9pwh5UFZlkXCxRhX2mXicSxOr0yS5ywp93VRWbIb9oW0L1RVRY8EAoHJuwJks/W+LirbDMO9rgJyhFf9/kDTXR4KhboDZaRth0Hl/DSAVZfJEvbmIeTzdSfKg3QYtsMUqyy0yKH5YdMwDKSTbjcvoysSzs00BWd0fQvFWW7HIEnPqNvxH4chEF6Hc1YMYoGu6+coznErL6lU6sU4HfGMOh38METClSCnc2mWjESGI9e3ExvbG2f7yb2xfo/byV5Ztv3Gi0xli+QgnX46OHivzN5CmozDOI5PW0c6R0XZNiIwRDbJOd1YJcUsahFDrHnRCSsistrqwtyWzZBGLdPMiyxLp1liWZ4yUNFqdpGQeQpCoYuyMojodNFlv+fZ9N3hpa0vbXn14eF5/+/LdMm5ycnJ399++1FTV9s6+Onh64ZslYqXsfL/YLSFe4qSuZzRbwMDNYDbWj9h6j6jBmsGHPUqiOPYbWpqAnrmzObNlZXPnhGsbmsdrHr4+kGf8bBWHp+QECX87uhOoSbqDNoMd/QA4MePy9Qb2mgXGXuOGGnLUcJrju31mXvRI9TSwqwz9/4BwKWlj8tOqnkXGXv6TluUdDAgR4a/wPNHKtwWYp3OtzhvIyMjpe3txUWD2MWljAd9R07rooNxf35ZF1hLQUtBgZN69ofO24jL1d6uSzO2FVc/PItdnDYoceAirgJyXCC8v4B67nTm5+dXHshFhS5XPcOt1dgF4NM6ehBFAyfuF2L2+fN8lFqZjAoLC1319bo004aSwarbvAtblKuIS3h7a9Om/fvx2kSxi5wE5+QU3rvXS7C6pLj60tkHGLkTq4gMw42PP7xJ6Ap1JzU1Nfc9jnJOzoAhyWz+nbZit0ZzOANLBqyMuGO4BMs1lyc7d5nYOz4YZy7nWmeakNEPRzUxDaw5J0Quy0M+eKCz0+HAxKYOe3bUE6O4BLia9QEdR1dR6uhmgq9du9fba06rONmGHTP8FQNHXgXDu4NUhtEoTQyXYVy8SdiBJ3I4HCsKbwsM8AXqO84EYOFUVPngdEwc8fMxnQnN7uxtWRyx9D9UNDQOGK6rt96Y5iCYj9tXLVYcCeYzAThr166sXVlZeEN3s+6e50ZzC5ELN0jtHk9t68eq2wQ76MaLAEPGJgAPwYNIL8oPXx1nF7d0WZm6tria77yvqlVxCSITzws9xQw3DA0N5acG9Ib7Po5nWymebmV1fO0A77HI4uIi/p6HVaxi+PrLi69+bphqI7Udecbh4kFfVldb8pEORYZVGY8nhQi8KGhg/yo6GA5UGUYlH2rYrcOKce1em1QKnAkxWBoIB08McsNGtVrN7ElEstrjqSG31gM4075bIwccLksls0J2LMBjberJSGWYbNCekhJPcbW+qyNbpZSJTjxHsiTQnbp4HV0vL/aPeX/9Ojgx8eJQcBMTB3958/bpb3Rdt+s08njRT4XLJTPCYDlgXnLP2PDw5/Lyg0+oFxx+OFh+4vOwu6f/YhEGpk2ITrxAMjtsx3KlSme/3nXjZn/PWPPw5xOghcqJHXaP9d/kgfFBiD5ghcOzJdNDd7yK4GyjqYhk977mPK/3hJDXm9fc7O6BW2QyZvthDCTyN8jYINcHq8wYGXJ3jx50cx7lpTeo+9z6nm64FUYMrJXLRH9bWMp/ghRgnlim0Kp0ZqOpguRuvd7t3ifkduv13eya7GYMDDhB5OJJAc8IhXnJZjvJDTcbGzMz9YFlZjY2bm2Aa7SbfR+8wwZG8wFPD7qjeRc8Mss7GrZuhS0EdWvDDge72IQCMFYcJi+UoJjAYwFYJlMoVZAtRpO1wrEDthCpOxxWq8logcsDi8ExEmqu4PqXTCOnrDVbbDar1XrKAXwqh+OU1WqwpVvMa1WrMTBckRsEm+CRA2EeWa7Urk5Zm2RJtxkMBsKFrAaDzWaxJK1NgUsDi7gzgYaODJgPBstEp9ts0P0Rmp5uSQKbsjpRoZDxpQuD54p80cQj05oTE1cznQRciFSwGBeuHK4YPIfM8GUAZlkBmWjChVgFq/W5YpuICf0SS9gyzyznoWGnsM4BhUrs1LxwRb7EElomPIcYZhk028yzyCWCnXTDHhSzJCHNjQ06GRRo2JTW52sxKaF+lucNdmPmSsKbH8MTM+yXMTbwkORQeVzeL/onyy2cL53nv7MR04h4f2yyChcFqLHSGRG+6Z29YPEyKb4VjkU+m3n2hEiNRfNiFklnLZkxm9DomzZtGl78LiShf5KI/QUyKw0KIwe9JgAAAABJRU5ErkJggg=="
            @click="addCost"
          />
          <span>添加账单</span>
        </div>
        <div class="flex-direction2">
          <img
            alt=""
            src="data:image/png;base64,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"
            @click="goScreen"
          />
          <span>数据大屏</span>
        </div>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="20" style="margin-bottom: 20px">
    <el-col :span="16">
      <el-card style="height: 100%">
        <div>年度收入统计</div>
        <div ref="myChart" style="height: 360px; width: 100%"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card>
        <p
          style="
            height: 20px;
            line-height: 20px;
            padding-left: 30px;
            padding-top: 10px;
            background-color: #fff;
          "
        >
          设备告警派单
        </p>

        <div class="flex-between">
          <el-empty description="" style="width: 100px" />
        </div>
        <el-button round style="width: 100%" type="primary" @click="goWarnList">更多></el-button>
      </el-card>
    </el-col>
  </el-row>

  <el-row :gutter="20" style="margin-bottom: 20px">
    <el-col :span="16">
      <el-card>
        <div>临期合同提醒</div>
      </el-card>
    </el-col>
  </el-row>
  <CostDialog ref="dialogRef"></CostDialog>
</template>
<style lang="scss" scoped>
.flex-direction {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  span {
    color: gray;
  }
}

.flex-direction2 {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  img {
    width: 30px;
  }
}
</style>
