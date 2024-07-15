//获取楼宇概况 收入和产业信息
export type ParkInfoParamsType = {
  base: Base;
  parkIncome: ParkIncome;
  parkIndustry: ParkIndustry[];
}

export type Base = {
  buildingTotal: number;
  chargePoleTotal: number;
  enterpriseTotal: number;
  parkingTotal: number;
}

export type ParkIncome = {
  xMonth: string[];
  yIncome: number[];
}

export type ParkIndustry = {
  name: string;
  value: number;
}


//查询楼宇数据类型
export type BuildingListParamsType = {
  area: number;
  floors: number;
  id: number;
  name: string;
  propertyFeePrice: number;
  rentEnterpriseName: string;
  status: number;
}

//查看大屏中的区域详情的数据类型
export type AreaDetailParamsType = {
  areaName: string;
  areaProportion: number;
  id: number;
  occupancySpaceNum: number;
  remainSpaceNum: number;
  spaceProportion: number;
  totalSpaceNum: number;
}