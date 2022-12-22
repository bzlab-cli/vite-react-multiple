/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/12/05 19:46:14
 */

import dropdown from '@/components/drop-down/index.vue'

export default function loadComponent(app: any) {
  app.component('dropdown', dropdown)
}
