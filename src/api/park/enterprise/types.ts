
// 列表请求参数
export type EnterListRequestType = {
  /**
   * 根据企业名称模糊搜索
   */
  name?: string;
  /**
   * 不传值默认是1
   */
  page?: string;
  /**
   * 不传值，默认是10
   */
  pageSize?: string;
  [property: string]: any;
}

// 列表响应参数
export type EnterListResponseType = {
  /**
   * 报文code:正常返回1000其他返回错误码
   */
  code: number;
  /**
   * 报文数据
   */
  data: Data;
  /**
   * 报文信息
   */
  msg: string;
  [property: string]: any;
}
export type Data = {
  /**
   * 分页数据
   */
  rows: Row[];
  /**
   * 总记录数
   */
  total: number;
  [property: string]: any;
}
export type Row = {
  /**
   * 企业联系人
   */
  contact: string;
  /**
   * 企业联系电话
   */
  contactNumber: string;
  /**
   * 是否是演示数据，1是0不是，演示数据不可以删除和编辑
   */
  demoFlag: number;
  /**
   * 企业id
   */
  id: number;
  /**
   * 企业名称
   */
  name: string;
  [property: string]: any;
}


// 展开行响应参数
export type RentDetailResponseType = {
  /**
   * 报文code:正常返回1000其他返回错误码
   */
  code: string;
  /**
   * 报文数据
   */
  data: Datum[];
  /**
   * 报文信息
   */
  msg: string;
  [property: string]: any;
}

export type Datum = {
  /**
   * 租赁结束时间
   */
  endTime: string;
  /**
   * 是否可以退租
   */
  exitFlag: number;
  /**
   * 租赁主键
   */
  id:   number;
  /**
   * 楼宇名称
   */
  name: string;
  /**
   * 是否可以续租
   */
  renewFlag: number;
  /**
   * 租赁开始时间
   */
  startTime: string;
  /**
   * 合同的租赁状态0待生效1生效中2已到期3已退租
   * 生效中，只能续签一次，续签后，续签的合同退租后，才可以退租
   */
  status: number;
  [property: string]: any;
}


// 所在行业列表响应参数
/**
 * Request
 */
export type IndustryResponseType = {
  code: number;
  data: Data2;
  msg: string;
  [property: string]: any;
}

export type Data2 = {
  id: number;
  menus: string[];
  name: string;
  permissions: string[];
  roleId: number;
  roleName: string;
  [property: string]: any;
}


// 添加企业请求参数
export type AddEnterRequestType = {
  /**
   * 上传文件id
   */
  businessLicenseId: number;
  /**
   * 上传文件rl
   */
  businessLicenseUrl: string;
  /**
   * 企业联系人
   */
  contact: string;
  /**
   * 企业联系方式
   */
  contactNumber: string;
  /**
   * 行业编号
   */
  industryCode: number;
  /**
   * 企业法人
   */
  legalPerson: string;
  /**
   * 企业名称
   */
  name: string;
  /**
   * 注册地址
   */
  registeredAddress: string;
  [property: string]: any;

}


// 编辑企业请求参数
/**
 * empty object
 */
export type EditEnterRequestType= {
  /**
   * 上传文件id
   */
  businessLicenseId: number;
  /**
   * 上传文件rl
   */
  businessLicenseUrl: string;
  /**
   * 企业联系人
   */
  contact: string;
  /**
   * 企业联系方式
   */
  contactNumber: string;
  /**
   * 企业id
   */
  id: number;
  /**
   * 行业编号
   */
  industryCode: number;
  /**
   * 企业法人
   */
  legalPerson: string;
  /**
   * 企业名称
   */
  name: string;
  /**
   * 注册地址
   */
  registeredAddress: string;
  [property: string]: any;
}


// 查看企业响应参数
export type ViewResponseType = {
  /**
   * 报文code:正常返回1000其他返回错误码
   */
  code: number;
  data: Data3;
  /**
   * 报文信息
   */
  msg: string;
  [property: string]: any;
}

export type Data3 = {
  /**
   * 上传文件id
   */
  businessLicenseId: number;
  /**
   * 上传的营业执照名字
   */
  businessLicenseName: string;
  /**
   * 上传文件url
   */
  businessLicenseUrl: string;
  /**
   * 企业联系人
   */
  contact: string;
  /**
   * 企业联系方式
   */
  contactNumber: string;
  /**
   * 企业id
   */
  id: number;
  /**
   * 行业编号
   */
  industryCode: number;
  /**
   * 行业名称
   */
  industryName: string;
  /**
   * 企业法人
   */
  legalPerson: string;
  /**
   * 企业名称
   */
  name: string;
  /**
   * 注册地址
   */
  registeredAddress: string;
  rent: Rent[];
  [property: string]: any;
}

export type Rent = {
  /**
   * 租赁合同id
   */
  contractId: number;
  /**
   * 租赁合同名称
   */
  contractName: string;
  /**
   * 租赁合同url
   */
  contractUrl: string;
  /**
   * 信息录入时间
   */
  createTime: string;
  /**
   * 租赁截止时间
   */
  endTime: string;
  /**
   * 租赁主键
   */
  id: number;
  /**
   * 楼宇名称
   */
  name: string;
  /**
   * 租赁起始时间
   */
  startTime: string;
  /**
   * 合同的租赁状态0待生效1生效中2已到期3已退租。
   * 生效中，只能续签一次，续签后，续签的合同退租后，才可以退租
   */
  status: number;
  [property: string]: any;
}
