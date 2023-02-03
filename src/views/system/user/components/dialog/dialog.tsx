import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import './index.less'
import { Divider, Button } from 'antd'

const Dialog = props => {
  const node = document.createElement('div')
  document.body.appendChild(node)
  useEffect(() => {
    return () => {
      document.body.removeChild(node)
    }
  }, [])
  return createPortal(
    <div className="com-dialog">
      <div className="com-dialog-inner" style={{ width: props.dialogWidth }}>
        <div className="dialog-title">{props.title}</div>
        <Divider />
        <div className="content">{props.children}</div>
        <Divider />
        <div className="btn">
          <Button type="default" onClick={props.onCancel}>
            {props.cancelText || '取消'}
          </Button>
          <Button type="primary" onClick={props.onOk}>
            {props.sureText || '确定'}
          </Button>
        </div>
      </div>
    </div>,
    node
  )
}

export default Dialog
