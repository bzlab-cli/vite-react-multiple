import React from 'react'
import { Link } from 'react-router-dom'

export interface LinkProps {
  children: React.ReactNode
  to: any
  replace?: boolean
  innerRef?: React.Ref<HTMLAnchorElement>
  style?: React.CSSProperties
  className?: string
}

const LinkComponent: React.FC<LinkProps> = props => {
  const { children, to, ...attr } = props

  return (
    <Link to={to} {...attr}>
      {children}
    </Link>
  )
}

export default LinkComponent
