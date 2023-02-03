/*
 * @Author: jrucker
 * @Description: 加载插件文件
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2023/02/03 15:49:43
 */

/**
 * @description 加载所有Plugins
 * @param app 整个应用的实例
 */
export function loadAllPlugins(app) {
  const files = import.meta.globEager('./*.ts')
  Object.keys(files).forEach(key => {
    if (typeof files[key].default === 'function') {
      if (key !== './index.ts') files[key].default(app)
    }
  })
}
