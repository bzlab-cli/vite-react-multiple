interface IStatus {
  name: string
  id: number
}

export const statusList: IStatus[] = [
  {
    name: '启用',
    id: 1
  },
  {
    name: '禁用',
    id: 0
  }
]
