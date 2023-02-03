import React from 'react'
import Modal from './components/modal'
import './styles.css'

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [isLocked, setIsLocked] = React.useState(true)
  const [isLockedOpen, setIsLockedOpen] = React.useState(false)
  return (
    <div className="App">
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Modal
      </button>
      <button
        onClick={() => {
          setIsLockedOpen(true)
        }}
      >
        Open Locked Modal
      </button>
      <Modal
        onClose={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <p>I'm a modal window, I use portal so I only exist when I'm open.</p>
        <p>Also tabbing is locked inside me go ahead and try tabbing to the button behind me.</p>
        <p style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsOpen(false)
            }}
          >
            Close
          </button>
        </p>
      </Modal>
      <Modal
        locked={isLocked}
        onClose={() => {
          setIsLockedOpen(false)
          setIsLocked(true)
        }}
        open={isLockedOpen}
      >
        <p>I'm a locked modal, there's no escaping me.</p>
        <p>Once unlocked clicking outside or pressing esc will close me.</p>
        <p style={{ textAlign: 'center' }}>
          <button
            onClick={() => {
              setIsLocked(!isLocked)
            }}
          >
            {isLocked ? 'Unlock' : 'Lock'}
          </button>
        </p>
      </Modal>
    </div>
  )
}
