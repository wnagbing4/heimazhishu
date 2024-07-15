<script setup lang="ts">
import { useRouter } from 'vue-router'
import {ref,reactive} from 'vue'
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
interface RuleForm {
  name: string
}
const ruleForm=reactive<RuleForm>({
  name:''
})
const goStatus=ref(1)
const rules = reactive<FormRules<RuleForm>>({
name:[{required:true,message:'请输入名字',trigger:'blur'}],
})
const router = useRouter()
//返回
const back = () => {
  router.back()
}
// 点击下一步
const go=()=>{
   if(goStatus.value<=3){
    goStatus.value= goStatus.value+1
   }
}
const backStatus=()=>{
  goStatus.value=goStatus.value-1
}
</script>

<template>
  <div class="allbox">
    <div class="header">
      <div>
        <span>←</span>
        <span @click="back">返回</span>
        <span>|</span>
        <span>添加角色</span>
      </div>
    </div>
    <div class="center">
      <div style="height: 300px; max-width: 600px;margin-left: 30px;margin-top:30px">
        <el-steps direction="vertical" :active="goStatus">
          <el-step title="角色信息"/>
          <el-step title="权限信息"/>
          <el-step title="检查并完成"/>
        </el-steps>
      </div>
      <div class="centerLeft">
        <div class="title">
          角色信息
        </div>
        <div class="form" v-if="goStatus===1">
          <el-form  ref="ruleFormRef"   :model="ruleForm" :rules="rules">
            <el-form-item label="角色信息" prop="name">
              <el-input style="width: 500px" v-model="ruleForm.name"/>
            </el-form-item>
            <el-form-item label="角色描述" >
              <el-input type="textarea" style="width: 500px" />
            </el-form-item>

          </el-form>
        </div>
      </div>
      <div class="tree_box">
        <el-tree

        />
      </div>
    </div>
    <div class="button">
      <el-button v-if="goStatus!=1"  @click="backStatus">上一步</el-button>
      <el-button type="primary" v-if="goStatus!=3" @click="go">下一步</el-button>
      <el-button v-if="goStatus==3" type="primary">确认添加</el-button>
    </div>
  </div>


</template>

<style scoped lang="scss">
.allbox {
  width: 100%;
  height: 100%;
  background: #f4f6f8;

  .header {
    width: 100%;
    height: 50px;
    background: white;

    div {
      height: 100%;
      display: flex;
      align-items: center;

      span:nth-child(1) {
        font-size: 19px;
      }

      span:nth-child(2) {
        margin-left: 5px;
        cursor: pointer;
      }

      span:nth-child(3) {
        margin-left: 20px;
      }

      span:nth-child(4) {
        margin-left: 20px;
      }
    }
  }

  .center {
    width: 100%;
    height: 80%;
    display: flex;

    .centerLeft {
      width: 900px;
      height: 300px;
      background: white;
      margin-left: 450px;
      margin-top: 30px;
      box-sizing: border-box;

      .title {
        margin-top: 10px;
        margin-left: 10px;
      }
      .form{
        margin-top: 40px;
        display: flex;
        justify-content: center;
      }
    }
  }
  .button{
    width: 100%;
    height: 50px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
  }
}
</style>
