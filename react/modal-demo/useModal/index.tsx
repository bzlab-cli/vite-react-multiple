import React, { useState } from 'react'
import Modal from './modal'

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  const show = () => setIsVisible(true)
  const hide = () => setIsVisible(false)

  const RenderModal = ({ children }: { children: React.ReactChild }) => (
    <React.Fragment>{isVisible && <Modal closeModal={hide}>{children}</Modal>}</React.Fragment>
  )

  return {
    show,
    hide,
    RenderModal
  }
}

// 使用
// import React from 'react'

// import { useModal } from './useModal'

// const App = React.memo(() => {
//   const { show, hide, RenderModal } = useModal()
//   return (
//     <div>
//       <div>
//         <p>some content...</p>
//         <button onClick={show}>打开</button>
//         <button onClick={hide}>关闭</button>
//         <RenderModal>
//           <p>这里面的内容将会被渲染到'modal-root'容器里.</p>
//         </RenderModal>
//       </div>
//       <div id='modal-root' />
//     </div>
//   )
// })

// export default App
