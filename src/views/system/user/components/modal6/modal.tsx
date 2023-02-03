import React, { forwardRef, ForwardRefRenderFunction, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { Modal as AntdModal, Spin } from 'antd'
import type { ModalRef, ModalProps } from './type'

const Modal: ForwardRefRenderFunction<ModalRef, ModalProps> = (props, ref) => {
  const { children, onOk, onCancel, ...reset } = props
  const [spinning, setSpinning] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const isStop = useRef<boolean>(false)

  const stopClose = useCallback(() => {
    isStop.current = true
  }, [])

  const handleOnOK = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      setConfirmLoading(true)
      onOk && (await onOk({ ...event, stopClose }))
      setConfirmLoading(false)
      if (isStop.current) isStop.current = false
      else setVisible(false)
    },
    [onOk, stopClose]
  )

  const handleOnCancel = useCallback(() => {
    onCancel && onCancel()
    setVisible(false)
  }, [onCancel])

  useImperativeHandle(ref, () => ({
    async showModal(options = {}) {
      const { afterShowModal } = options
      setVisible(true)
      if (afterShowModal) {
        setSpinning(true)
        await afterShowModal()
        setSpinning(false)
      }
    },
    closeModal() {
      setVisible(false)
    }
  }))

  return (
    <AntdModal {...reset} visible={visible} confirmLoading={confirmLoading} onOk={handleOnOK} onCancel={handleOnCancel}>
      <Spin spinning={spinning}>{children}</Spin>
    </AntdModal>
  )
}

export default forwardRef(Modal)

// 使用
// import React, { useCallback, useEffect, useRef, useState } from 'react'
// import { Button } from 'antd'
// import Modal from '../components/Modal/Modal'
// import TestComponent from '@/components/TestComponent'

// import React, {FC} from 'react'
// import {Empty} from 'antd'

// interface TestComponentProps {
//   message:string
// }
// const TestComponent:FC<TestComponentProps> = React.memo((props) => {
//   const {message} = props
//   return (
//     <>
//       {
//       message ? <div><span>{message}</span></div> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
//       }
//     </>
//   )
// })

// const [content, setContent] = useState<string>('')
// const modalRef = useRef<React.ElementRef<typeof Modal>>(null)
// const handleOnOk = (event: React.MouseEvent<HTMLElement> & { stopClose: () => void }) => {
//   return new Promise<void>(async(resolve) => {
//     // 1.是否需要做校验
//     // event?.stopClose()
//     // resolve()
//     // console.log('校验不通过');
//     // 2.校验通过
//     const res = await mock2()
//     if(res.code === 0) {
//       console.log(res.message);
//       resolve()
//     }
//   })
// }
// // 取消
// const handleOnCancle = () => {
//   console.log('🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆');
// }

// const handleShowModal = useCallback(() => {
//   setContent('')
//   modalRef.current?.showModal({
//     afterShowModal() {
//       return new Promise(async(resolve) => {
//         const res = await mock1()
//         if(res.code === 0) {
//           setContent(res.message)
//           resolve()
//         }
//       })
//     }
//   })
// }, [])

// <Modal
//   destroyOnClose
//   title='弹窗标题'
//   ref={modalRef}
//   onOk={handleOnOk}
//   onCancel={handleOnCancle}
//   okButtonProps = {{
//     style:{
//       display: content ? "" : "none"
//     }
//   }}
//   bodyStyle={{
//     height:'300px',
//     display:'flex',
//     alignItems:'center',
//     justifyContent:'center',
//     fontSize:'18px'
//   }}
// >
//   <TestComponent message={content}></TestComponent>
// </Modal>
//  <Button onClick={handleShowModal}>显示弹窗B</Button>
