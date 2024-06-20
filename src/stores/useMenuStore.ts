
import { menuListApi, workbenchBaseApi } from '@/api/workbench'
import type { MenuResponseType, WorkbenchInfoResponseType } from '@/api/workbench/types'
import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', () => {
  // 定义侧边栏数据
  const menuList = ref<MenuResponseType[] | null>(null)
  // 定义工作台数据
  const WorkbenchList = ref<WorkbenchInfoResponseType[] | null>(null)
  // 获取菜单
  const getMenuList = async () => {
    const res = await menuListApi()
    // console.log(res);
    menuList.value = res!.data
    return res!.data
  }

  // 获取个工作台基础信息
  const getWorkbenchBase =async () => {
    const res = await workbenchBaseApi()
    // console.log(res);
    WorkbenchList.value = res!.data
    return res!.data
  }
  return {
    menuList,
    getMenuList,
    getWorkbenchBase,
    WorkbenchList
  }
})
