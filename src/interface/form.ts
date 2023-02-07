import { Rule } from 'antd/lib/form'

export interface FormRules<T = string> {
  label?: string
  dependencies?: T[]
  rules?: Rule[]
  valuePropName?: string
}
