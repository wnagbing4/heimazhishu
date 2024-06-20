import { request } from "@/utils/request"
import type { AddBuildingRequestType, BuildingRequestType, BuildingResponseType } from "./types"


// 楼宇列表接口
export const getBuildingListApi = (data:BuildingRequestType) => request<BuildingResponseType>("/park/building","GET",data)

// 删除楼宇接口
export const deleteBuildingApi = (id:number) => request("/park/building/"+id,"DELETE")

// 添加楼宇接口
export const addBuildingApi = (data:AddBuildingRequestType) => request("/park/building","POST",data)


// 编辑楼宇接口
export const editBuildingApi = (data:AddBuildingRequestType) => request("/park/building","PUT",data)
