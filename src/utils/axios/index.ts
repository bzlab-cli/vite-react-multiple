/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/08/24 18:01:09
 */

import { Request } from './request'
import { ContentType } from '@/config/headers'

const request = new Request({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,
  headers: {
    'Content-Type': ContentType.JSON
  }
})

export default request
