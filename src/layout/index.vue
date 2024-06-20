<script setup lang="ts">


</script>
<template>
  <el-container class="layout-container">
    <LayoutAside/>
      <el-container direction="vertical">
        <LayoutHeader/>
        <LayoutMain/>
      </el-container>
    </el-container>
</template>
<style lang='scss' scoped>
.layout-container {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
</style>
