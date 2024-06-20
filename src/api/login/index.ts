
import { request } from "@/utils/request"
import type { LoginRequestType, LoginResponseType } from "./types"

//  登录接口
export const loginApi = (data:LoginRequestType) => request<LoginResponseType>("/park/login","POST",data)
