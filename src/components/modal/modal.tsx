import React from 'react'
// import PropTypes from 'prop-types'
import ReactDOM from 'react-dom/client'
import { Modal } from 'antd'

interface ModalProps {
  el?: string
  onOk?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onCancel?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title: string
  children: any
  // children: PropTypes.ReactElementLike | string | JSX.Element
}

class ModalService {
  static open(props: ModalProps) {
    const { el } = props
    const target = el ? document.querySelector(el) : document.body
    const container = document.createElement('div')
    if (el) {
      target?.appendChild(container)
    }
    function onOk() {
      props.onOk && props.onOk()
      root.unmount()
    }

    function onCancel() {
      props.onCancel && props.onCancel()
      root.unmount()
    }
    const root = ReactDOM.createRoot(container)
    root.render(<Modal open={true} {...props} onOk={onOk} onCancel={onCancel} />)
    // return new Promise<void>((resolve, reject) => {
    // })
  }
}

export default ModalService
