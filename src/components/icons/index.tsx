import React from 'react'
import * as Icons from '@ant-design/icons'

export default function DynamicIcons({ icon }: { icon?: string }) {
  if (!icon || !Icons[icon]) {
    return null
  }
  return React.createElement(Icons[icon])
}
