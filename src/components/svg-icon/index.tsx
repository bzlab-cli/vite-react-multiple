import { useMemo } from 'react'

interface SvgIconProps {
  prefix?: string
  icon: string
  name?: string
  color?: string
  size?: number | string
}

const SvgIcon = (props: SvgIconProps) => {
  const { prefix = 'icon', icon, name, color, size = 16 } = props
  const symbolId = useMemo(() => `#${prefix}-${icon}`, [prefix, icon])
  return (
    <svg className={name} aria-hidden="true" width={size} height={size} fill={color}>
      <use href={symbolId} fill={color} />
    </svg>
  )
}

export default SvgIcon
