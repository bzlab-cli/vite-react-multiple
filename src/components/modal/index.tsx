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

  // useEffect(() => {
  //   const { current } = backdrop
  //   // const transitionEnd = () => setActive(open)
  //   const keyHandler = e => !locked && [27].indexOf(e.which) >= 0 && onClose()
  //   const clickHandler = e => !locked && e.target === current && onClose()

  //   if (current) {
  //     current.addEventListener('transitionend', transitionEnd)
  //     current.addEventListener('click', clickHandler)
  //     window.addEventListener('keyup', keyHandler)
  //   }

  //   if (open) {
  //     window.setTimeout(() => {
  //       ;(document.activeElement as HTMLElement).blur()
  //       setActive(open)
  //       document.querySelector('#app')!.setAttribute('inert', 'true')
  //     }, 10)
  //   }

  //   return () => {
  //     if (current) {
  //       current.removeEventListener('transitionend', transitionEnd)
  //       current.removeEventListener('click', clickHandler)
  //     }

  //     document.querySelector('#app')!.removeAttribute('inert')
  //     window.removeEventListener('keyup', keyHandler)
  //   }
  // }, [open, locked, onClose])

  // return (
  //   <Fragment>
  //     {(open || active) && (
  //       <Portal className="modal-portal">
  //         <div ref={backdrop} className={active && open && 'active'}>
  //           <div className="modal-content">{props.children}</div>
  //         </div>
  //       </Portal>
  //     )}
  //   </Fragment>
  // )
}

export default Modal
