import { request } from "@/utils/request"
/**
 * 区域管理
 */
// 获取区域管理列表
export const getList = (data: any) => {
  return request('/parking/area/list', 'GET', data)
}

// 获取关联区域的下拉列表
export const getChangeApi = (data: any) => {
  return request('/parking/rule/list', 'GET', data)
}
// 添加区域管理
export const addAreaApi = (data: any) => {
  return request('/parking/area', 'POST', data)
}

// /parking/area
export const editAreaApi = (data: any) => {
  return request('/parking/area', 'PUT', data)
}
// 删除区域
export const deleteAreaApi = (data: number) => {
  return request(`/parking/area/${data}`, 'DELETE')
}

// -----------------------------------------------------------------------------
/**
 * 月卡管理
 */
// 获取月卡占有率/parking/card/proportion
export const getProportionList = (data: any) => {
  return request('/parking/card/proportion', 'GET', data)
}
// 获取月卡列表
export const getMounthCardListApi = (data: any) => {
  return request('/parking/card/list', 'GET', data)
}
// 添加月卡
export const addMounthCardApi = (data: any) => {
  return request('/parking/card', 'POST', data)
}
// 删除月卡
export const deleteMounthCardApi = (data: number) => {
  return request(`/parking/card/${data}`, 'DELETE')
}
// 获取月卡详情编辑
export const getEditDetailsApi = (data: number) => {
  return request(`/parking/card/detail/${data}`, 'GET')
}
// 编辑月卡
export const editAreaApiYue = (data: any) => {
  return request('/parking/card/edit', 'PUT', data)
}
// 查看月卡详情
export const getDetailApi = (data: any) => {
  return request(`/parking/card/${data}`, 'GET')
}
// 续费月卡
export const renewMounthCardApi = (data: any) => {
  return request('/parking/card/recharge', 'POST', data)
}
//-----------------------------------------------------------------------------------------------------------------
/**
 *   停车缴费列表查询接口
 */
export const getPaymentApi = (data: any) => {
  return request('/parking/payment/list', 'GET', data)
}
// ------------------------------------------------------------------------------------------------------------------
/**
 * 获取计费规则列表
 */
export const getRuleListApi = (data: any) => {
  return request('/parking/rule/list', 'GET', data)
}
// 添加计费规则列表
export const addRuleApi=(data:any)=>{
  return request('/parking/rule','POST',data)
}
// 获取计费规则下拉列比饿哦
export const getRulesListApi=(data?:any)=>{
return request("/parking/rule/dropList",'GET',data)
}
export const getDetailListApi=(data:number)=>{
    return request(`/parking/rule/${data}`,'GET')
}
export const editRulesApi=(data:any)=>{
  return request('/parking/rule','PUT',data)
}
// /parking/rule/{id}
export const delRulesApi=(data:any)=>{
  return request(`/parking/rule/${data}`,'DELETE')
}
