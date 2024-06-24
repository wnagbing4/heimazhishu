import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig, type Method } from "axios"
// 引入防xss攻击插件
// import DOMPurify from 'dompurify';
import { ElMessage } from "element-plus";

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: "/api",
  timeout: 5000,
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 存储token
    const token = localStorage.getItem("token")
    if (token) {
      config.headers!.Authorization = token
    }
    ElLoading.service({ fullscreen: true ,text: "疯狂加载中……"})
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    ElLoading.service({ fullscreen: true ,text: "疯狂加载中^"}).close()
    return response.data
  },
  (error: AxiosError) => {
    // console.log('error', error);
    // 全局异常处理
    if (error.response) {
      let message: string = ""
      switch (error.response.status) {
        case 400:
          message = error.response.data.msg
          break
        case 401:
          message = "未授权，请登录"
          break
        case 403:
          message = "拒绝访问"
          break
        case 404:
          message = `请求地址出错: ${error.response.config.url}`
          break

        case 408:
          message = "请求超时"
          break
        case 500:
          message = "服务器内部错误"
          break
        case 501:
          message = "服务未实现"
          break
        case 502:
          message = "网关错误"
          break
      }
      ElMessage.error(message)
      ElLoading.service({ fullscreen: true ,text: "疯狂加载中^"}).close()
      return Promise.reject(error)
    }
  }
)
// 响应参数限制
export type ResponseType<T = any> = {
  data: T,
  code: number,
  msg: string
}
const httpRequest: string[] = []

// 封装公共请求方法
export const request = <T = any>(url: string, method: Method = "GET", data?: any, options?: AxiosRequestConfig) => {
  // 优化重复请求
  if (httpRequest.includes(url)) return
  httpRequest.push(url)
  // 处理xss攻击
  // if (method.toLocaleUpperCase() === "GET" && data) {
  //   for (const key in data) {
  //     data[key] = DOMPurify.sanitize(JSON.stringify(data[key] as string))
  //   }
  // } else if (data) {
  //   data = JSON.parse(DOMPurify.sanitize(JSON.stringify(data)))
  // }
  return service.request<T, ResponseType<T>>({
    url,
    method,
    [method === "GET" ? "params" : "data"]: data,
    ...options
  }).finally(() => {
    httpRequest.splice(httpRequest.indexOf(url), 1)
  })
}
