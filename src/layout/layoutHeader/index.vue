<script setup lang="ts">
// 退出登录
const $router = useRouter()
const logout = () => {
  localStorage.removeItem("token")
  $router.push('/login')
}
const goScreen=()=>{
  $router.push('/bigscreen/home')
}
</script>

<template>
  <el-header class="layout-header">
    <el-button style="margin-right: 10px;" size="small" type="primary" plain @click="goScreen">可视化大屏</el-button>
    <el-dropdown>
      <span class="el-dropdown-link" style="font-weight: 600;color: black;outline: none">
        黑马管理员
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>
<style lang="scss" scoped>
.layout-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 20px;
  height: 50px
}
</style>
