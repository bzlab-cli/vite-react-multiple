import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Modal = ({ isModalOpen, setIsModalOpen }: { isModalOpen: boolean; setIsModalOpen: (boolean) => void }) => {
  return (
    <>
      {isModalOpen &&
        ReactDOM.createPortal(
          <StyledModal onClick={() => setIsModalOpen(false)}>
            <ModalContent className="modalContent" onClick={e => e.stopPropagation()}>
              Clicking outside of the modal will close the modal.
              <button onClick={() => setIsModalOpen(false)}>Close Modal</button>
            </ModalContent>
          </StyledModal>,
          document.getElementById('modal')
        )}
    </>
  )
}

export default Modal

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  backdrop-filter: blur(6px);
`

const ModalContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-color: #fff;
  width: 60%;
  min-height: 50vh;
  padding: 30px;
  box-shadow: 0px 3px 6px #00000029;
  overflow-y: auto;
  max-height: calc(100vh - 100px);
`
