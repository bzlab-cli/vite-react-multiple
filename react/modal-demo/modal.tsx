// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState, useRef, Fragment, useMemo, Ref, useImperativeHandle } from 'react'
// import Portal from './portal'
import { createPortal } from 'react-dom'

// interface ModalProps {
//   open: boolean
//   locked: boolean
//   children: any
//   onClose: () => void
// }

interface ModalProps {
  visible: boolean
  el?: string
  className?: string
  children: any
  innerRef: Ref<{ visible: (params: any) => void }>
}

const Modal = (props: ModalProps) => {
  const [modalVisible, setModalVisible] = useState(false)
  const { visible, el, className, children } = props
  const container = useMemo(() => document.createElement('div'), [])
  useImperativeHandle(props.innerRef, () => ({ visible }))

  useEffect(() => {
    const target = el ? document.querySelector(el) : document.body
    const classList = ['portal-container']
    if (className) className.split(' ').forEach(item => classList.push(item))
    classList.forEach(item => container.classList.add(item))
    target?.appendChild(container)
    return () => {
      target?.removeChild(container)
    }
  }, [container, el, className])

  return modalVisible ? createPortal(children, container) : null
}

export default Modal

/*
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Modal } from 'antd'

interface ModalProps {
  el?: string
  onOk?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onCancel?: (event?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  title: string
  children: any
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
  }
}

export default ModalService
*/

/*
const data = {
  title: 'Test Modal1',
  record
}
dynamic(TestModal, data)
  .then(response => {
    console.log('response: ', response)
  })
  .catch(error => {
    console.log('error: ', error)
  })
showTestModal({
  title: 'Test Modal',
  record
})
  .then(response => {
    console.log('response: ', response)
  })
  .catch(error => {
    console.log('error: ', error)
  })

setAddUserVisible(true)
ModalService.open({
  title: '期待返回promise进行链式调用',
  children: '这是期待的promise返回的格式，这样更好用感觉'
})
.then(() => {
  console.log('modal 点击了确定✅, and close')
})
.catch(() => {
  console.log('modal 点击了取消🈲️, and close')
})
*/
