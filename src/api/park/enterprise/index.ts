
import {request} from "@/utils/request"
import type { AddEnterRequestType, Data2, EditEnterRequestType, EnterListRequestType, EnterListResponseType, RentDetailResponseType, ViewResponseType } from "./types"

// 获取企业列表
export const getEnterpriseListApi = (params: EnterListRequestType) => request<EnterListResponseType>("/park/enterprise","GET", params)

// 删除楼宇
export const delEnterpriseApi = (id:number) => request("/park/enterprise/"+id,"DELETE")

// 展开行数据
export const getRentDetailApi = (id:number) => request<RentDetailResponseType>("/park/enterprise/rent/"+id, "GET")

// 所在行业列表
export const getIndustryListApi = () => request<Data2[]>("/park/industry","GET")

// 文件上传接口
export const uploadFileApi = (data: FormData) => request<any>("/upload", "POST", data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
})

// 新增企业接口
export const addEnterpriseApi = (data:AddEnterRequestType) => request("/park/enterprise","POST",data)


// 回填接口 查看企业接口
export const editEnterpriseApi = (id:number) => request<ViewResponseType>("/park/enterprise/"+id,"GET")

//编辑企业接口
export const editOkEnterpriseApi = (data:EditEnterRequestType) => request("/park/enterprise","PUT",data)

