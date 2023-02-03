import { useState } from 'react'
import Modal from './Modal'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import './styles.css'

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <StyledApp>
      <CSSTransition in={isModalOpen} timeout={200} classNames="modal" unmountOnExit>
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      </CSSTransition>
      <Button onClick={() => setIsModalOpen(prevState => !prevState)}>Modal</Button>
    </StyledApp>
  )
}

export default App

const StyledApp = styled.div`
  background: linear-gradient(to right, orangered, red, blue);
  padding-top: 20px;
  text-align: center;
  height: 100vh;
`

const Button = styled.button`
  padding: 15px 30px;
`
