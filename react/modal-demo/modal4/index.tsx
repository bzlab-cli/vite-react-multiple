import React, { createContext, useContext, useState } from 'react'

// CONTEXT
const ModalContext = createContext({})

// PROVIDER
export default function ModalProvider({ children }) {
  const [modal, setModal] = useState({ visible: false })

  function openModal(payload) {
    setModal({ ...payload, visible: true })
  }

  function closeModal() {
    setModal({ visible: false })
  }

  return <ModalContext.Provider value={{ modal, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export const useModal = () => useContext(ModalContext)

// 使用
// import React from "react";
// import { Modal } from "antd";

// import { useModal } from "../../context/Modal";

// export default function Modal() {
//   const {
//     modal: { message, visible },
//     closeModal,
//   } = useModal();

//   return (
//     <Modal onCancel={closeModal} onOk={closeModal} visible={visible}>
//       <p>{message}</p>
//     </Modal>
//   );
// }
