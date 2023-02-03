import React from 'react'
import ReactDOM from 'react-dom'

type Props = {
  children: React.ReactChild
  closeModal: () => void
}

const Modal = ({ children, closeModal }: Props) => {
  const domEl = document.getElementById('modal-root')
  if (!domEl) return null

  return ReactDOM.createPortal(
    <div>
      <button onClick={closeModal}>Close</button>
      {children}
    </div>,
    domEl
  )
}

export default Modal

// const modalDivElement = document.getElementById("modal");

// export default function Modal({ children }) {
//   const modalContent = (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: `rgba(0, 0, 0, 0.5)`,
//       }}
//     >
//       {children}
//     </div>
//   );
//   return ReactDOM.createPortal(modalContent, modalDivElement);
// }
