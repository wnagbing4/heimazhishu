<!--
 * @Author: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @Date: 2024-06-20 10:51:27
 * @LastEditors: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @LastEditTime: 2024-06-20 14:34:43
 * @FilePath: \vue-project\src\layout\layoutAside\Menu.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import type { MenuResponseType } from "@/api/workbench/types";

defineProps<{
  menuList: MenuResponseType[];
}>();
</script>
<script lang="ts">
export default {
  name: "MenuList",
};
</script>
<template>
  <template v-for="item in menuList" :key="item.id">
    <!-- 当没有子菜单时 -->
    <el-menu-item v-if="!item.children" :index="item.component">
      <template #title>
        <el-icon v-if="item.icon"
          ><img
            v-if="$route.path === item.component"
            style="width: 15px; height: 15px; margin-right: 10px"
            :src="item.iconActive"
            alt=""
          />
          <img
            style="width: 15px; height: 15px; margin-right: 10px"
            v-else
            :src="item.icon"
            alt=""
          />
        </el-icon>
        <span style="font-size: 15px">{{ item.title }}</span>
      </template>
    </el-menu-item>
    <!-- 当有子菜单时 -->
    <el-sub-menu v-else :index="item.component">
      <template #title>
        <el-icon
          ><img
            style="width: 15px; height: 15px; margin-right: 10px"
            :src="item.icon"
            alt=""
        /></el-icon>
        <span style="font-size: 15px">{{ item.title }}</span>
      </template>
      <MenuList :menuList="item.children"></MenuList>
    </el-sub-menu>
  </template>
</template>
<style lang="scss" scoped></style>
