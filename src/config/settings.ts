/*
 * @Author: jrucker
 * @Description:
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/08/08 09:50:34
 */
interface LayoutSettings {
  // 是否显示权限路由菜单,默认false本地路由
  showAuthMenu: boolean
}

export enum RouterMode {
  Hash = 'hash',
  History = 'history'
}

export class Keys {
  static collapsedKey = 'collapsedKey'
  static tokenKey = 'nzf-token'
  static projectId = 'projectId'
}

export enum Settings {
  title = '管理系统',
  desc = '诚信卓越服务，创新超越自我',
  logo = '/images/logo/logo.png',
  footer = 'Technology provided by Frog Cloud Technology',
  beian = '浙ICP备16007368号-3'
}

export enum Vite {
  port = 8445
}

export function getEnv(val) {
  const obj = {
    development: 'nzf-dev',
    deployment: 'nzf-dev',
    release: 'nzf-test',
    production: 'nzf-prod'
  }
  return obj[val]
}

export const layoutSettings: LayoutSettings = {
  // 是否显示权限路由菜单,默认false本地路由
  showAuthMenu: true
}
