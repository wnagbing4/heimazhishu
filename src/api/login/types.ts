
// 登录请求参数
export type LoginRequestType = {
  username: string;
  password: string;
};

// 登录响应数据
export type LoginResponseType = {
  code: number;
  msg: string;
  data: DataType
}
type DataType = {
  token: string
}
