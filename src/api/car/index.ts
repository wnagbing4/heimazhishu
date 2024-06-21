import { request } from "@/utils/request"
// 获取区域管理列表
export const getList=(data:any)=>{
    return request('/parking/area/list','GET',data)
}

// 获取关联区域的下拉列表
export const getChangeApi=(data:any)=>{
  return request('/parking/rule/list','GET',data)
}
// 添加区域管理
export const addAreaApi=(data:any)=>{
  return request('/parking/area','POST',data)
}

// /parking/area
export const editAreaApi=(data:any)=>{
  return request('/parking/area','PUT',data)
}
// 删除区域
export const deleteAreaApi=(data:number)=>{
   return request(`/parking/area/${data}`,'DELETE') 
}
