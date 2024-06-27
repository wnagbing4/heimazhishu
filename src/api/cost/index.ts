import { request } from "@/utils/request"
/**
 * 获取物业费管理列表
 */
export const getCostListApi = (data: any) => {
  return request('/park/propertyfee', 'GET', data)
}
/**
 * 获取租聘楼宇
 */
export const getLoYuApi=(data?:any)=>{
return request('/park/all/building','GET',data)
}
/**
 * 获取租聘单元
 */
export const getCellApi=(data?:any)=>{
  return request('/park/all/enterprise','GET',data)
}
/***
 * 获取预算金额
 */
export const getYuSuanApi=(data:any)=>{
   return request('/park/propertyfee/pre/payment','POST',data)
}
/**
 * 添加账单
 */
export const addBillApi=(data:any)=>{
  return request('/park/propertyfee','POST',data)
}
/**
 * 查看账单详情
 */
export const getBillDetailApi=(data:any)=>{
  return request(`/park/propertyfee/${data}`,'GET')
  }
/**
 * 删除账单
 */
export const deleteCostApi=(data:any)=>{
   return request(`/park/propertyfee/${data}`,'DELETE')
}

