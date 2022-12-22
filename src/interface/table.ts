import { InputProps, ElSelect, SwitchProps, TimePickerDefaultProps } from 'element-plus'
import { TimeSelectProps } from 'element-plus/es/components/time-select/src/time-select'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'

export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type Responsive = {
  span?: number
  offset?: number
}

export interface EnumProps {
  label: string // 选项框显示的文字
  value: any // 选项框值
  disabled?: boolean // 是否禁用此选项
  children?: EnumProps[] // 树形选择
  [key: string]: any
}

export type TypeProp = 'index' | 'selection' | 'expand'
export type ShadowProp = 'always' | 'hover' | 'never'

interface Input {
  el: 'el-input'
  props?: Partial<InputProps>
}
interface Select {
  el: 'el-select'
  props?: Partial<typeof ElSelect.__defaults>
}

interface TreeSelect {
  el: 'el-tree-select'
  props?: any
}

interface DatePicker {
  el: 'el-date-picker'
  props?: any
}

interface TimePicker {
  el: 'el-time-picker'
  props?: Partial<TimePickerDefaultProps>
}

interface TimeSelect {
  el: 'el-time-select'
  props?: Partial<TimeSelectProps>
}

interface Switch {
  el: 'el-switch'
  props?: Partial<SwitchProps>
}

export type BaseSearch = {
  el?: string
  key?: string // 指定搜索key
  span?: number // 搜索项占用列数，默认为1
  offset?: number // 搜索字段左偏移列数
  xs: number
  sm: number
  md: number
  lg: number
  xl: number
  defaultValue?: string | number | boolean | any[] // 搜索默认值
  event?: any
}

export type SearchProps = BaseSearch & (Input | Select | DatePicker | TimePicker | TimeSelect | Switch | TreeSelect)

export interface ColumnProps<T = any> extends Partial<TableColumnCtx<T>> {
  isShow?: boolean // 是否显示在表格当中
  label?: string // 标签名称
  prop?: string // 属性名
  filterEnum?: boolean // 是否过滤枚举数据
  enum?: any // 枚举数据
  enumOptions?: {
    data?: string // 当为接口请求时，指定返回值数据字段
    params?: any // 当为接口请求时，传递参数
  }
  fieldNames?: {
    label: string // 枚举字段
    value: string // 枚举值
  }
  fieldRowNames?: {
    name: string // 指定映射属性
    value: string // 指定映射属性值
    rowKey: string // 匹配当前数据行字段
  }
  headerRender?: (row: ColumnProps) => any // 自定义表头渲染
  render?: (scope: { row: T }) => any // 自定义单元格渲染
  children?: any[] // 多级表头数据
}

export interface TabsProps {
  type?: string
  closable?: boolean
  addable?: boolean
  editable?: boolean
  tabPosition?: string
  stretch?: boolean
}

export interface TabsColumnsProps {
  label?: string // 标签名称
  prop?: string // 属性名
  active?: boolean // 活动列
  render?: (scope?) => any
}

export interface SearchColumnProps {
  label?: string // 标签名称
  labelWidth?: boolean // 标签宽度
  prop?: string // 属性名
  enum?: any // 枚举数据
  enumOptions?: {
    data?: string // 当为接口请求时，指定返回值数据字段
    params?: any // 当为接口请求时，传递参数
  }
  fieldNames?: {
    label: string // 枚举字段
    value: string // 枚举值
    children?: string // 子级枚举
  }
  search?: SearchProps | any // 搜索项配置
  render?: (scope?) => any
}

export namespace Table {
  export interface PaginationParams {
    pageNum: number
    pageSize: number
    total: number
    pageSizes?: number[]
    background?: boolean
    layout?: string
  }
  export interface TableStateProps {
    tableData: any[]
    paginationParams: PaginationParams
    searchParams: {
      [key: string]: any
    }
    searchInitParams: {
      [key: string]: any
    }
    totalParam: {
      [key: string]: any
    }
  }
}

export namespace HandleData {
  export type MessageType = '' | 'success' | 'warning' | 'info' | 'error'
}
