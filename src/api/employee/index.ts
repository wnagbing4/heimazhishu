import { request } from '@/utils/request'
/**
 *获取用户的数据
 * */
export const getEmployeeListApi = (data: any) => {
  return request('/park/sys/user', 'GET', data)
}
/**
 * 获取角色
 */
export const getRoleLostApi=()=>{
  return request('/park/sys/role','GET')
}
/**
 * 添加角色
 */
export const addRoleApi=(data:any)=>{
  return request('/park/sys/user','POST',data)
}
/**
 * 用户详情
 */
export const getDetailApi=(data:any)=>{
  return request(`/park/sys/user/${data}`,'GET')
}
/**
 * 修改用户
 */
export const updataRoleApi=(data:any)=>{
  return request('/park/sys/user','PUT',data)
}
/**
 * 删除用户
 */
export const deleteRoleApi=(data:any)=>{
  return request(`/park/sys/user/${data}`,'DELETE')
}
/**
 * 重置密码
 */
export const resetPasswordApi=(data:any)=>{
  return request(`/park/sys/user/resetPwd`,'PUT',data)
}
