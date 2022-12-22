/*
 * @Author: jrucker
 * @Description:
 * @Date: 2021/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2022/12/08 15:39:29
 */

import bzTable from '@/components/bz-table/index.vue'
import bzTreeFilter from '@/components/bz-tree-filter/index.vue'
import bzSelectFilter from '@/components/bz-select-filter/index.vue'

export default function loadComponent(app: any) {
  app.component('bz-table', bzTable)
  app.component('bz-tree-filter', bzTreeFilter)
  app.component('bz-select-filter', bzSelectFilter)
}
