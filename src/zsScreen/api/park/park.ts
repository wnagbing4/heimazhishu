import { request } from '@/utils/request';
import type { AreaDetailParamsType, BuildingListParamsType, ParkInfoParamsType } from './parkType';

//获取楼宇概况 收入和产业信息
export const getParkInfoApi = () => {
    return request<ParkInfoParamsType>('/park/statistics/info','GET')
}

//查询楼宇
export const getBuildingListApi=(data:{id:string})=>{
    return request<BuildingListParamsType>('/park/statistics/building','GET',data)
}

//查看大屏中的区域详情
export const getAreaDetailApi=(id:string)=>{
    return request<AreaDetailParamsType>('/parking/area/'+id,'GET')
}
