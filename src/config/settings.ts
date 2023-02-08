/*
 * @Author: jrucker
 * @Description:
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 11:44:58
 */

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
  title = '后台管理',
  logo = '/assets/images/home/logo.png'
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
