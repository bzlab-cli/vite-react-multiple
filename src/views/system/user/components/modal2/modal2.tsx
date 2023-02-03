import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const Modal = ({ open, children, onClose }) => {
  const [active, setActive] = useState(false) // 弹窗的存在周期
  const [aniClassName, setAniClassName] = useState('') // 动效的class
  const onTransitionEnd = () => {
    setAniClassName(open ? 'enter-done' : 'exit-done')
    if (!open) {
      setActive(false)
    }
  }

  useEffect(() => {
    if (open) {
      setActive(true)
      setAniClassName('enter')
      setTimeout(() => {
        setAniClassName('enter-active')
      })
    } else {
      setAniClassName('exit')
      setTimeout(() => {
        setAniClassName('exit-active')
      })
    }
  }, [open])

  if (!open && !active) {
    return null
  }

  return createPortal(
    <div className={'modal ' + aniClassName} onTransitionEnd={onTransitionEnd}>
      <div className="modal-content">{children}</div>
      <div className="modal-close-btn" onClick={onClose}>
        x
      </div>
    </div>,
    document.body
    // document.getElementById("app")
  )
}

// const App = () => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="app">
//       <button onClick={() => setOpen(true)}>show modal</button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         modal content
//       </Modal>
//     </div>
//   );
// };
