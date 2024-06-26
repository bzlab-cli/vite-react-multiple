/*
 * @Author: jrucker
 * @Description:
 * @Date: 2022/10/25 18:56:51
 * @LastEditors: jrucker
 * @LastEditTime: 2024/06/06 17:07:17
 */
import { FormRules } from '@/interface/form'
interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'childTreeList',
  pid: 'pid'
}

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

export function deepClone(source: IObjModel) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach(keys => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {}
      targetObj[keys] = deepClone(source[keys])
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

export const isValidUsername = (str: string) => ['admin', 'editor'].indexOf(str.trim()) >= 0
export const isExternal = (path: string) => /^(https?:|mailto:|tel:)/.test(path)

/**
 * 对象数组排序
 * @param key 键值
 * @param type 降序
 * @returns
 */
export const sort = (key, type = 'down') => {
  return function (m, n) {
    const a = m[key]
    const b = n[key]
    return type === 'down' ? b - a : a - b
  }
}
/**
 * 是否数组
 * @param o
 * @returns
 */
export const isArray = o => {
  return Object.prototype.toString.call(o) === '[object Array]'
}

/**
 * 是否布尔
 * @param o
 * @returns
 */
export const isBoolean = o => {
  return Object.prototype.toString.call(o) === '[object Boolean]'
}

/**
 * 是否对象
 * @param o
 * @returns
 */
export const isObject = o => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

/**
 * 是否字符串
 * @param o
 * @returns
 */
export const isString = o => {
  return Object.prototype.toString.call(o) === '[object String]'
}

/**
 * 是否空值
 * @param o
 * @returns
 */
export const isBlank = varValue => {
  if (varValue !== null && varValue !== undefined && varValue !== '' && varValue !== 'null') {
    return false
  }
  return true
}

/**
 * 过滤对象空值（'', null, undefined）
 * @param data
 * @returns
 */
export function filterObjectEmpty(data) {
  const keys = Object.keys(data)
  if (!keys.length) return
  keys.forEach(currentKey => {
    const currentVal = data[currentKey]
    if (!Array.isArray(currentVal) && currentVal instanceof Object) {
      data[currentKey] = filterObjectEmpty(currentVal)
    } else {
      if (['', null, undefined].includes(currentVal)) {
        delete data[currentKey]
      }
    }
  })
  return data
}

/**
 * 递归过滤指定属性
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function filter<T = any>(tree: T[], func: (n: T) => boolean, config: Partial<TreeHelperConfig> = {}): T[] {
  config = getConfig(config)
  const children = config.children as string
  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter(node => {
        node[children] = node[children] && listFilter(node[children])
        return func(node) || (node[children] && node[children].length)
      })
  }
  return listFilter(tree)
}

/**
 * 表单属性
 * @param items
 * @returns
 */
export function getFormRules<TFormData>(items: { [key in keyof TFormData]: FormRules<keyof TFormData> }): {
  [key in keyof TFormData]: FormRules<keyof TFormData> & { name: string }
} {
  Object.entries(items).forEach(([key, item]: [string, any]) => {
    item.name = key
  })
  return items as any
}

/**
 * 递归树结构
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function forEachTree<T = any>(tree: T[], func: (n: T) => any, config: Partial<TreeHelperConfig> = {}): void {
  config = getConfig(config)
  const list: any[] = [...tree]
  const { children } = config
  for (let i = 0; i < list.length; i++) {
    if (func(list[i])) {
      return
    }
    children && list[i][children] && list.splice(i + 1, 0, ...list[i][children])
  }
}

// 四则运算 js精度丢失
// 解决两个数相加精度丢失问题
export function floatAdd(a: number, b: number) {
  let c = 0
  let d = 0
  let e = 0
  if (undefined === a || a == null || isNaN(a)) {
    a = 0
  }
  if (undefined === b || b == null || isNaN(b)) {
    b = 0
  }
  try {
    c = a.toString().split('.')[1].length
  } catch (f) {
    c = 0
  }
  try {
    d = b.toString().split('.')[1].length
  } catch (f) {
    d = 0
  }
  e = Math.pow(10, Math.max(c, d))
  return (floatMul(a, e) + floatMul(b, e)) / e
}

// 解决两个数相乘精度丢失问题
export function floatMul(a: number, b: number) {
  let c = 0
  const d: string = a.toString()
  const e: string = b.toString()
  try {
    c += d.split('.')[1].length
  } catch (f) {
    console.log()
  }
  try {
    c += e.split('.')[1].length
  } catch (f) {
    console.log()
  }
  return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / Math.pow(10, c)
}

//遍历删除对象中的空值属性
export function delNullProperty(obj: any) {
  for (const i in obj) {
    //遍历对象中的属性
    if (obj[i] === undefined || obj[i] === null || obj[i] === '') {
      //首先除去常规空数据，用delete关键字
      delete obj[i]
    } else if (obj[i].constructor === Object) {
      //如果发现该属性的值还是一个对象，再判空后进行迭代调用
      if (Object.keys(obj[i]).length === 0) delete obj[i] //判断对象上是否存在属性，如果为空对象则删除
      delNullProperty(obj[i])
    } else if (obj[i].constructor === Array) {
      //对象值如果是数组，判断是否为空数组后进入数据遍历判空逻辑
      if (obj[i].length === 0) {
        //如果数组为空则删除
        delete obj[i]
      } else {
        for (let index = 0; index < obj[i].length; index++) {
          //遍历数组
          if (
            obj[i][index] === undefined ||
            obj[i][index] === null ||
            obj[i][index] === '' ||
            JSON.stringify(obj[i][index]) === '{}'
          ) {
            obj[i].splice(index, 1) //如果数组值为以上空值则修改数组长度，移除空值下标后续值依次提前
            index-- //由于数组当前下标内容已经被替换成下一个值，所以计数器需要自减以抵消之后的自增
          }
          if (obj[i].constructor === Object) {
            //如果发现数组值中有对象，则再次进入迭代
            delNullProperty(obj[i])
          }
        }
      }
    }
  }
}

/**
 * 检测图片是否失效
 * @param url
 * @returns
 */
export function checkImgExists(url) {
  return new Promise(function (resolve) {
    const imgObj = new Image()
    imgObj.src = url
    imgObj.onload = function () {
      if (imgObj.width > 0 && imgObj.height > 0) {
        resolve(true)
      } else {
        resolve(false)
      }
    }
    imgObj.onerror = function () {
      resolve(false)
    }
  })
}

// 解决两个数相除精度丢失问题
export function floatDiv(a: number, b: number) {
  let c = 0
  let d = 0
  let e = 0
  let f = 0
  try {
    e = a.toString().split('.')[1].length
  } catch (g) {
    console.log()
  }
  try {
    f = b.toString().split('.')[1].length
  } catch (g) {
    console.log()
  }
  c = Number(a.toString().replace('.', ''))
  d = Number(b.toString().replace('.', ''))
  return floatMul(c / d, Math.pow(10, f - e))
}

export function wait(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve('next'), ms)
  })
}

export function openWindow(href, type = '_blank') {
  const a = document.createElement('a') as any
  const id = 'window'
  a.setAttribute('href', href)
  a.setAttribute('target', type)
  a.setAttribute('id', id)
  const el = document.getElementById(id)
  if (!el) {
    document.body.appendChild(a)
  }
  a.click()
  ;(document as any).getElementById(id).remove()
}

/**
 * 是否移动端
 * @returns
 */
export function isMobile() {
  const userAgentInfo = navigator.userAgent
  const Agents = ['Android', 'iPhone', 'webOS', 'BlackBerry', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod']
  let flag = false
  for (let v = 0; v < Agents.length; v++) {
    if (userAgentInfo.indexOf(Agents[v]) > 0) {
      flag = true
      break
    }
  }
  return flag
}

/**
 * @description 处理无数据情况
 * @param {String} callValue 需要处理的值
 * @return string
 * */
export function formatValue(callValue: any) {
  if (callValue === '') return '-'
  return callValue ?? '-'
}

/**
 * 扁平化数组
 * @param data
 * @param nodeKey
 * @returns
 */
export function flatArrTree(data: object[] = [], nodeKey: string = 'children') {
  const newData = JSON.parse(JSON.stringify(data))
  if (!newData.length) {
    return []
  }
  let arr = [] as any
  for (const node of newData) {
    const children = node[nodeKey]
    if (children) {
      const flatChild = flatArrTree(children, nodeKey)
      delete node[nodeKey]
      arr = [...arr, node, ...flatChild]
    } else {
      arr.push(node)
    }
  }
  return arr
}

/**
 * 创建命名空间
 * @param s
 * @returns
 */
export function createNamespace(s) {
  const getGlobal = () => {
    return typeof window !== 'undefined' && window !== null
      ? window
      : typeof self !== 'undefined' && self !== null
      ? self
      : global
  }
  let ns = getGlobal()
  const parts = s.split('.')
  for (let i = 0; i < parts.length; ++i) {
    ns[parts[i]] = ns[parts[i]] || {}
    ns = ns[parts[i]]
  }

  return ns
}

/**
 * 递归获取包括/不包括自己的所有子节点的数据
 * @param dataSource
 * @param targetKey
 * @param options { key = 'key', containSelf = true }
 * @returns
 */
export function findAllKeysUnderNode(dataSource, targetKey, options?) {
  const { key = 'key', containSelf = true } = options ?? {}
  const stack = [] as any
  const keys = [] as any
  function findNodeByKey(node) {
    if (node[key] === targetKey) {
      return true
    }
    if (node.children) {
      for (const child of node.children) {
        stack.push(child)
      }
    }
    return false
  }

  for (const node of dataSource) {
    stack.push(node)
    while (stack.length > 0) {
      const currentNode = stack.pop()
      if (findNodeByKey(currentNode)) {
        // eslint-disable-next-line no-inner-declarations
        function traverse(node) {
          if (containSelf) {
            keys.push(node[key])
          } else {
            if (node[key] !== targetKey) {
              keys.push(node[key])
            }
          }
          if (node.children) {
            for (const child of node.children) {
              traverse(child)
            }
          }
        }
        traverse(currentNode)
      }
    }
  }

  return keys
}

/**
 * 递归批量删除子节点的数据
 * @param dataSource
 * @param targetKeys
 * @returns
 */
export function deleteAllKeysUnderNode(dataSource, targetKeys = []) {
  function deleteNodeByKey(data, targetKey) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === targetKey) {
        data.splice(i, 1)
        return true
      }

      if (data[i].children) {
        const childDeleted = deleteNodeByKey(data[i].children, targetKey)
        if (childDeleted) {
          return true
        }
      }
    }

    return false
  }
  for (let i = 0; i < targetKeys.length; i++) {
    const targetKey = targetKeys[i]
    deleteNodeByKey(dataSource, targetKey)
  }
  return dataSource
}

/**
 * 递归获取树最底层的key数据集合
 * @param data
 * @returns
 */
export function findBottomKeys(data, key?: string) {
  const bottomKeys = [] as string[]
  function traverse(node) {
    if (!node.children || node.children.length === 0) {
      bottomKeys.push(node[key || 'key'])
    } else {
      for (const child of node.children) {
        traverse(child)
      }
    }
  }

  for (const node of data) {
    if (node.children && node.children.length > 0) {
      traverse(node)
    }
  }

  return bottomKeys
}

/**
 * 当某个子节点被选中，将其父节点标记为选中
 * @param data
 * @returns
 */
export function updateParentSelectedStatus(data, options?) {
  const defaultParams = { children: 'children', key: 'key' }
  const { children, key } = Object.assign(defaultParams, options)
  const array = JSON.parse(JSON.stringify(data))
  function traverse(data) {
    for (const node of data) {
      if (node[children]) {
        const childSelected = traverse(node[children])
        if (childSelected) {
          node[key] = true
        }
      }
    }
    return data.some(node => node[key])
  }
  traverse(array)
  return array
}
