/*
 * @Author: jrucker
 * @Description:
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/04 17:22:26
 */

import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios'
import axios from 'axios'
import { message } from 'antd'
import { getStoreState } from '@/views/admin/store'
import { loginOut } from '@/views/admin/store/modules/user'

declare module 'axios' {
  export interface AxiosRequestConfig {
    token?: boolean
  }
}

export class Request {
  private axiosInstance: AxiosInstance
  private options: AxiosRequestConfig

  constructor(options: AxiosRequestConfig) {
    this.options = options
    // 创建axios实例
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  getAxios(): AxiosInstance {
    return this.axiosInstance
  }

  // 设置header
  setHeader(headers: any): void {
    if (!this.axiosInstance) return
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  // 拦截器配置
  private setupInterceptors() {
    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use(
      (request: AxiosRequestConfig) => {
        const store = getStoreState()
        const token = store.user.token
        const hasReqToken = typeof request.token !== 'undefined'
        if (!hasReqToken) {
          if (token) request.headers!['token'] = token
        } else {
          if (request.token) request.headers!['token'] = token
        }

        return request
      },
      (e: AxiosError) => {
        Promise.reject(e)
      }
    )

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse<any>) => {
        const res = response.data
        if (res.retCode === 200) {
          return response
        } else {
          message.error(res.retMsg || '服务器响应失败，请重试')
          return Promise.reject(response)
        }
      },
      (e: AxiosError) => {
        const { response } = e
        const { status } = response as AxiosResponse
        if (status === 500) {
          message.error('登录已失效，请重新登录')
          loginOut()
          window.location.href = '/'
        }
        if (status === 502) {
          message.error('服务器响应失败，请重试')
        }
        return Promise.reject(e)
      }
    )
  }

  // 发送请求
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request(config)
        .then((res: AxiosResponse<IResponseModel<any>>) => {
          resolve(res.data as unknown as Promise<T>)
        })
        .catch((e: Error) => {
          reject(e)
        })
    })
  }
}
