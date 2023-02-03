const { useEffect, useState, createPortal } = React
const Modal = ({ open, animaionPrefix, children, onClose }) => {
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

  return ReactDOM.createPortal(
    <div className={classNames('modal', `${animaionPrefix}-${aniClassName}`)} onTransitionEnd={onTransitionEnd}>
      <div className="modal-content">{children}</div>
      <div className="modal-close-btn" onClick={onClose}>
        x
      </div>
    </div>,
    document.getElementById('modal-container')
  )
}

const App = () => {
  const [fadeModalOpen, setFadeModalOpen] = useState(false)
  const [zoomModalOpen, setZoomModalOpen] = useState(false)

  return (
    <div className="app">
      <button onClick={() => setFadeModalOpen(!fadeModalOpen)}>show fade modal</button>
      <button onClick={() => setZoomModalOpen(!zoomModalOpen)}>show zoom modal</button>
      <Modal open={fadeModalOpen} animaionPrefix="fade" onClose={() => setFadeModalOpen(false)}>
        fade modal content
      </Modal>
      <Modal open={zoomModalOpen} animaionPrefix="zoom" onClose={() => setZoomModalOpen(false)}>
        zoom modal content
      </Modal>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('app'))
