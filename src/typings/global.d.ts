/*
 * @Author: jrucker
 * @Description:
 * @Date: 2022/10/28 22:49:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/06/01 23:27:38
 */

declare interface IResponseModel<T> {
  retCode: number
  retMsg: string
  data?: T
}0

declare interface IObjModel {
  [propName: string]: any
}

declare type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
	VITE_APP_ENV: string;
	VITE_APP_MOCK_API: string;
	VITE_APP_BASE_API: string;
	VITE_APP_FTP_API: string;
	VITE_APP_FTP_STATIC_API: string;
}

declare namespace Router {
  interface MetaProps {
    title?: string
    subTitle?: string
    icon?: string
    cache?: boolean
    hidden?: boolean
  }

  interface RouteRecordRaw {
    key?: string
    label?: string
    subLabel?: string
    path?: string
    name?: string
    redirect?: string
    element?: React.ReactNode | (() => Promise<any>)
    meta?: MetaProps
    children?: RouteRecordRaw[]
  }
  interface BreadcrumbItem {
    path?: string
    title: string
  }
}

