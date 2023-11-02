import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem ] = useState(null);
  
  const openModal = (review, book) => {
    setSelectedItem(review, book); 
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, selectedItem }}>
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);