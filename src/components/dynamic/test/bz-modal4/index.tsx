import React from 'react'
import NameForm from './components/form'
import Modal from './components/modal'
import './styles.css'

export default function App() {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="App">
      <button
        onClick={() => {
          setIsOpen(true)
        }}
      >
        Open Modal
      </button>

      <Modal
        locked
        onClose={() => {
          setIsOpen(false)
        }}
        open={isOpen}
      >
        <NameForm
          onSubmit={(u, p) => {
            setIsOpen(false)
            alert(`username = ${u} and password = ${p}`)
          }}
        />
      </Modal>
    </div>
  )
}
