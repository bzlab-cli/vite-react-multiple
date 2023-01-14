/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/01/14 11:58:28
 */

import { Keys } from '@/config/settings'

export const getCollapsed = () => window.localStorage.getItem(Keys.collapsedKey) || 'opened'
export const setCollapsed = (status: string) => window.localStorage.setItem(Keys.collapsedKey, status)
export const getToken = () => window.localStorage.getItem(Keys.tokenKey)
export const setToken = (token: string) => window.localStorage.setItem(Keys.tokenKey, token)
export const removeToken = () => window.localStorage.removeItem(Keys.tokenKey)
