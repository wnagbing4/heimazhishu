/*
 * @Author: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @Date: 2024-06-20 10:51:24
 * @LastEditors: 3396515303@qq.com 12267007+wangbing56@user.noreply.gitee.com
 * @LastEditTime: 2024-06-20 19:44:42
 * @FilePath: \vue-project\src\api\park\enterprise\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { request } from "@/utils/request"
import type { AddEnterRequestType, Data2, EditEnterRequestType, EnterListRequestType, EnterListResponseType, RentDetailResponseType, ViewResponseType } from "./types"

// 获取企业列表
export const getEnterpriseListApi = (params: EnterListRequestType) => request<EnterListResponseType>("/park/enterprise", "GET", params)

// 删除楼宇
export const delEnterpriseApi = (id: number) => request("/park/enterprise/" + id, "DELETE")

// 展开行数据
export const getRentDetailApi = (id: number) => request<RentDetailResponseType>("/park/enterprise/rent/" + id, "GET")

// 所在行业列表
export const getIndustryListApi = () => request<Data2[]>("/park/industry", "GET")

// 文件上传接口
export const uploadFileApi = (data: FormData) => request<any>("/upload", "POST", data, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
})
// 查询可租聘的楼宇
export const getLouyuApi = (data?: any) => request('/park/rent/building', 'GET', data)
// 新增企业接口
export const addEnterpriseApi = (data: AddEnterRequestType) => request("/park/enterprise", "POST", data)


// 回填接口 查看企业接口
export const editEnterpriseApi = (id: number) => request<ViewResponseType>("/park/enterprise/" + id, "GET")

//编辑企业接口
export const editOkEnterpriseApi = (data: EditEnterRequestType) => request("/park/enterprise", "PUT", data)
// 添加租聘合同
export const addHeTongApi=(data:any)=>request('/park/enterprise/rent','POST',data)
