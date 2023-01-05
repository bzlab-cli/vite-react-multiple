/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/28 22:49:45
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/04 15:58:48
 */

declare interface IResponseModel<T> {
  retCode: number
  retMsg: string
  data?: T
}

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

declare namespace Menu {
	interface MenuOptions {
		path: string;
    title?: string;
		icon?: string;
		hidden?: boolean;
		cache?: boolean;
		component?: string | (() => Promise<any>);
		name: string;
		redirect?: string;
		meta: MetaProps;
		children?: MenuOptions[];
	}
	interface MetaProps {
    title: string;
		icon: string;
		hidden: boolean;
		cache: boolean;
	}
}

declare namespace Router {
  interface MetaProps {
    keepAlive?: boolean
    requiresAuth?: boolean
    title: string
    key?: string
  }

  interface RouteRecordRaw {
    caseSensitive?: boolean
    children?: RouteRecordRaw[]
    element?: React.ReactNode
    index?: any
    path?: string
    meta?: MetaProps
    isLink?: string
  }
}

