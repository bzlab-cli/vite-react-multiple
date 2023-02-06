import { useState, useEffect } from 'react'
import { TreeSelect } from 'antd'
import { TreeSelectProps } from 'antd/es/tree-select'

interface BzTreeSelectProps extends TreeSelectProps {
  selectValue: string
  treeData: any
  onChange?: (value: any) => void
}

const BzTreeSelect = (props: BzTreeSelectProps) => {
  const { selectValue, onChange, ...params } = props
  const treeData = Promise.resolve(props.treeData ?? [])
  const [options, setOptions] = useState<TreeSelectProps['treeData']>([])
  const [value, setValue] = useState<string | undefined>(selectValue)

  useEffect(() => {
    treeData.then(val => setOptions(val))
  }, [treeData])

  const handleClear = () => {
    setValue(undefined)
  }

  const handleChange = (val: string) => {
    onChange && onChange(val)
  }

  return (
    <TreeSelect
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
      placeholder="请选择"
      allowClear
      {...params}
      treeData={options}
      onChange={handleChange}
      onClear={handleClear}
    />
  )
}

export default BzTreeSelect
