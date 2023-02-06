/*
 * @Author: jrucker
 * @Description: 专业数据
 * @Date: 2022/11/11 10:04:13
 * @LastEditors: jrucker
 * @LastEditTime: 2023/02/06 15:57:52
 */

export interface IProfessSchema {
  label: string
  value: number | null
}

const DEFAULT_CONFIG: IProfessSchema = {
  label: '全部专业',
  value: 0
}

const profess: IProfessSchema[] = [
  {
    label: '地库',
    value: 1
  },
  {
    label: '结构',
    value: 2
  },
  {
    label: '综管',
    value: 3
  }
]
const professLack: IProfessSchema[] = [
  {
    label: '全部',
    value: null
  },
  {
    label: '地库',
    value: 1
  },
  {
    label: '结构',
    value: 2
  }
]
export const professAllList: IProfessSchema[] = [DEFAULT_CONFIG, ...profess]
export const professList: IProfessSchema[] = profess
export const professLackAllList: IProfessSchema[] = [...professLack]
