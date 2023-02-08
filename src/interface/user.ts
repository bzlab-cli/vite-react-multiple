/*
 * @Author: jrucker
 * @Description:
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/30 10:23:53
 */

export interface ILoginInfo {
  competenceList?: Array<string>
  headUrl: string
  token: string
  roleId: string
  userName: string
  account: number
  password: string
  userId: string
  orgId: number
}

export interface IUserInfo {
  id: number
  account: string
  password: string
  userName: string
  headUrl: string
  userId: string
  roleId: string
  roleName: string
  roles: string[]
  orgId: number
  list: []
  total: number
  professional: number
}
