
import {request} from "@/utils/request"
import type { BuildingResponseType, EnterpriseResponseType, MenuResponseType, PoleRequestType, PoleResponseType, RentInfoRequestType, RentInfoResponseType, UserInfoResponseType, UserListResponseType, WorkbenchInfoResponseType } from "./types";

// 获取用户信息接口
export const userInfoApi = () => request<UserInfoResponseType>("/park/user/profile","GET")


// 获取menu菜单接口
export const menuListApi = () => request<MenuResponseType>("/park/user/router","GET")

// 获取临期合同接口
export const getRentInfotApi = (data:RentInfoRequestType) => request<RentInfoResponseType>("/home/workbench/rentInfo","GET",data)

// 获取用户下拉列表接口
export const getUserListApi = () => request<UserListResponseType>("/system/user/dropList","GET")


// 查询所有企业接口
export const getEnterpriseListApi = () => request<EnterpriseResponseType>("/park/all/enterprise","GET")


// 查找所有楼宇接口
export const getBuildingListApi = () => request<BuildingResponseType>("/park/all/building","GET")

// 查看告警记录接口
export const poleWarningApi = (params:PoleRequestType) => request<PoleResponseType>("/pole/warning/list","GET",params)

// 工作台基础信息接口
export const workbenchBaseApi = () => request<WorkbenchInfoResponseType[]>("/home/workbench/info","GET")
