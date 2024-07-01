import { request } from "@/utils/request"
/**
 * 获取一体杆列表
 */
export const getPoleListPole = (data: any) => {
  return request('/pole/info/list', 'GET', data)
}
/**
 * 删除一体杆的api
 */
export const deletePloeApi = (data: any) => {
  return request(`/pole/info/${data}`, 'DELETE')
}
/**
 * 获取关联区域的api
 */
export const getRelevanceApi = (data?: any) => {
  return request('/parking/area/dropList', 'GET', data)
}
/**
 * 添加一体杆的数据
 */
export const addPoleApi = (data: any) => {
  return request('/pole/info', 'POST', data)
}
/**
 *
 * @param data 修改的接口
 * @returns
 */
export const editPoleApi = (data: any) => {
  return request('/pole/info', 'PUT', data)
}
