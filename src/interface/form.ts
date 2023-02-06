import { Rule } from 'antd/lib/form'

export interface FormDecorator<T = string> {
  label?: string
  dependencies?: T[]
  rules?: Rule[]
  valuePropName?: string
}
