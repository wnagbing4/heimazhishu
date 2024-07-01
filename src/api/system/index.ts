import { request } from "@/utils/request"
/**
 * 获取左侧数据
 */
export const getRoleLeftLost=(data?:any)=>{
   return request('/park/sys/role','GET',data)
}
// /park/sys/permision/all/tree
export const getRoleTreeLost=(data?:any)=>{
  return request('/park/sys/permision/all/tree','GET',data)
}
// /park/sys/role/2
export const addLeftAPI=(data:any)=>{
  return request(`/park/sys/role/${data}`,'GET')
}
