<script setup lang="ts">
import { loginApi } from '@/api/login'
import type { LoginRequestType } from '@/api/login/types'
import type { FormInstance, FormRules } from 'element-plus'

// 跳转
const router = useRouter()
// 登录数据
const formData = reactive<LoginRequestType>({
  username: 'demo',
  password: 'zh@hm#23'
})
const formDataRef = ref<FormInstance>()
// 校验规则
const rules = reactive<FormRules<LoginRequestType>>({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ]
})
// 登录
const submitForm = () => {
  formDataRef.value?.validate(async (valid: boolean) => {
    if (valid) {
      // 登录逻辑
      const res = await loginApi(formData)
      // console.log(res)
      if (res!.code === 10000) {
        localStorage.setItem('token', res!.data.token)
        ElNotification({
          title: 'Success',
          message: '登录成功!',
          type: 'success'
        })
        router.push('/workbench')
      } else {
        ElNotification({
          title: 'Error',
          message: res!.msg,
          type: 'error'
        })
      }
    } else {
      console.log('校验失败')
    }
  })
}
</script>
<template>
  <div class="login">
    <div class="login-bg"></div>
    <div class="login-container">
      <h3>智慧园区-登录</h3>
      <el-form
        :model="formData"
        label-position="top"
        :rules="rules"
        ref="formDataRef"
        hide-required-asterisk
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="password">
          <el-input v-model="formData.password" show-password></el-input>
        </el-form-item>
        <el-form style="margin: 3vh 0">
          <el-checkbox>记住我</el-checkbox>
        </el-form>
        <el-form-item>
          <el-button @click="submitForm" style="width: 100%" type="primary"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item>
          <p>
            仅用于IT培训教学使用，为保障您的个人信息安全，请勿向平台录入任何个人敏感信息（如手机号、身份证号等）！
          </p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  .login-bg {
    width: 70vw;
    height: inherit;
    background-image: url('https://fe-hmzs.itheima.net/assets/login-bg-e4ea539c.svg');
    background-size: cover;
  }

  .login-container {
    width: 30vw;
    padding: 0 10vw;
    height: inherit;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    // align-items: center;
    h3 {
      margin-bottom: 8vh;
      font-weight: 500;
      text-align: left;
      font-size: 25px;
    }
    p {
      font-size: 12px;
      color: red;
      font-weight: bold;
    }
  }
}
</style>
