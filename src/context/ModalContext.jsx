import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [dragging, setDragging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  
  
  const openModal = (review, book) => {
    setSelectedItem({review, book});
    !dragging && setIsModalOpen(true);
    
  };
  const closeModal = () => {
    setSelectedItem({});
    setIsModalOpen(false);
  }

  const beforeChange = () => setDragging(true);
  const afterChange = () => setDragging(false);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, selectedItem, beforeChange, afterChange, dragging }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
