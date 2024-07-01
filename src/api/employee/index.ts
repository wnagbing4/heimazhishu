import { request } from '@/utils/request'
/**
 *获取用户的数据
 * */
export const getEmployeeListApi=(data:any)=>{
  return request('/park/sys/user','GET',data)
}
