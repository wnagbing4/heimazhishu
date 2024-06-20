
// 用户信息响应参数
/**
 * empty object
 */
export type UserInfoResponseType = {
  /**
   * 报文code:正常返回1000其他返回错误码
   */
  code: number;
  data: Data3;
  /**
   * 报文提示信息
   */
  msg: string;
  [property: string]: any;
}

export type Data3 = {
  /**
   * 主键
   */
  id: number;
  menus: string[];
  /**
   * 员工姓名
   */
  name: string;
  /**
   * 用户权限集合
   */
  permissions: string[];
  /**
   * 用户的角色id
   */
  roleId: number;
  /**
   * 用户角色名称
   */
  roleName: string;
  [property: string]: any;
}

// menu菜单响应参数
export type MenuResponseType = {
  /**
   * 报文code:正常返回1000其他返回错误码
   */
  code?: number;
  /**
   * 报文数据
   */
  data?: Datum2[];
  /**
   * 报文信息
   */
  msg?: string;
  [property: string]: any;
}

export type Datum2 = {
  /**
   * 包含子路由标志，true表示嵌套子路由，false表示没有
   */
  alwaysShow?: boolean;
  /**
   * 子路由
   */
  children?: DatumChild[];
  /**
   * 路由组件地址
   */
  component: string;
  /**
   * 路由图标，只有目录有图标，#表示没有图标
   */
  icon: string;
  /**
   * 路由id
   */
  id: number;
  /**
   * 路由名称
   */
  name: string;
  /**
   * 路由显示信息
   */
  title: string;
  [property: string]: any;
}

export type DatumChild = {
  /**
   * 包含子路由标志，true表示嵌套子路由，false表示没有
   */
  alwaysShow?: boolean;
  /**
   * 按钮
   */
  children?: ChildChild[];
  /**
   * 组件路径
   */
  component: string;
  /**
   * 路由图标，只有目录有图标，#表示没有图标
   */
  icon: string;
  /**
   * 路由名称
   */
  name: string;
  /**
   * 路由显示信息
   */
  title: string;
  [property: string]: any;
}

export type ChildChild = {
  /**
   * 组件路径
   */
  component: string;
  /**
   * 路由图标，只有目录有图标，#表示没有图标
   */
  icon: string;
  /**
   * 路由名称
   */
  name: string;
  /**
   * 路由地址
   */
  path: string;
  /**
   * 路由显示信息
   */
  title: string;
  [property: string]: any;
}

// 临期合同请求参数
export type RentInfoRequestType = {
  page:number|string;
  pageSize:number|string
}

// 临期合同响应参数
export type RentInfoResponseType = {
  /**
   * 10000成功,其他失败
   */
  code: number;
  data: Data2;
  /**
   * 提示信息
   */
  msg: string;
  [property: string]: any;
}

export type Data2 = {
  /**
   * 临期合同提醒集合
   */
  rentAdvent: RentAdvent[];
  /**
   * 总条数
   */
  total: number;
  [property: string]: any;
}

export type RentAdvent = {
  /**
   * 楼宇id
   */
  buildingId: number;
  /**
   * 楼宇名称
   */
  buildingName: string;
  /**
   * 结束日期
   */
  endTime: string;
  /**
   * 企业id
   */
  enterpriseId: number;
  /**
   * 企业名称
   */
  enterpriseName: string;
  /**
   * 租赁id
   */
  id: string;
  startTime: string;
  [property: string]: any;
}

// 获取用户下拉响应参数
export interface UserListResponseType {
  code: number;
  data: Datum[];
  msg: string;
  [property: string]: any;
}

export interface Datum {
  userId: number;
  userName: string;
  [property: string]: any;
}

// 查询所有企业响应参数
export interface EnterpriseResponseType {
  code: number;
  data: Data;
  msg: string;
  [property: string]: any;
}

export interface Data {
  rows: Row[];
  total: number;
  [property: string]: any;
}

export interface Row {
  id: number;
  name: string;
  [property: string]: any;
}


// 获取所有楼宇响应参数
export type BuildingResponseType = {
  code: number;
  data: Datum4[];
  msg: string;
  [property: string]: any;
}

export type Datum4 = {
  id: number;
  name: string;
  [property: string]: any;
}

// 告警记录请求参数
export type PoleRequestType = {
  /**
   * 处置状态0:未派单,1:已派单,2:已接单,3:已完成
   */
  handleStatus?: string;
  /**
   * 数页
   */
  page?: string;
  /**
   * 每页条数
   */
  pageSize?: string;
  /**
   * 一体杆名称
   */
  poleName?: string;
  /**
   * 一体杆编号
   */
  poleNumber?: string;
  [property: string]: any;
}


// 告警记录响应参数
export type PoleResponseType = {
  /**
   * 10000成功 其他失败
   */
  code: number;
  /**
   * 数据
   */
  data: Data5;
  /**
   * 提示信息
   */
  msg: string;
  [property: string]: any;
}
/**
* 数据
*/
export type Data5 = {
  rows: Row2[];
  /**
   * 数据条数
   */
  total: number;
  [property: string]: any;
}

export type Row2 = {
  /**
   * 故障类型
   */
  errorType: ErrorType;
  /**
   * 处置状态0:未派单,1:已派单,2:已接单,3:已完成
   */
  handleStatus: number;
  /**
   * 告警记录id
   */
  id: number;
  /**
   * 一体杆名称
   */
  poleName: string;
  /**
   * 一体杆编号
   */
  poleNumber: string;
  /**
   * 告警时间
   */
  warningTime: string;
  [property: string]: any;
}
/**
* 故障类型
*/
export enum ErrorType {
  LED显示故障 = "LED显示故障",
  传感器失灵 = "传感器失灵",
  开关失灵 = "开关失灵",
  电路短路 = "电路短路",
  矢制盒插件接触不良 = "矢制盒插件接触不良",
  网络中断 = "网络中断",
  车牌识别失效 = "车牌识别失效",
  闸门起落运行异常 = "闸门起落运行异常",
}


// 工作台信息响应参数
export type WorkbenchInfoResponseType = {
  /**
   * 10000成功,其他失败
   */
  code: number;
  data: Data6;
  /**
   * 提示信息
   */
  msg: string;
  [property: string]: any;
}

export type Data6 = {
  /**
   * 年度累计收入
   */
  annualIncome: number;
  annualIncomeArray: AnnualIncomeArray;
  /**
   * 一体杆总数
   */
  chargePoleTotal: number;
  /**
   * 企业总数
   */
  enterpriseTotal: number;
  /**
   * 月卡总数
   */
  monthCardTotal: number;
  [property: string]: any;
}

export type AnnualIncomeArray = {
  /**
   * x轴-月份
   */
  xMonth: number[];
  /**
   * 园区收入
   */
  yBuilding: string[];
  /**
   * 车行收入
   */
  yParking: number[];
  [property: string]: any;
}
