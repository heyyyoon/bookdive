import { createContext, useCallback, useContext, useState } from "react";

const ModalContext = createContext();

export function ModalContextProvider({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [dragging, setDragging] = useState(false);
  const openModal = (review, book) => {
    setSelectedItem(review, book);
    !dragging && setIsModalOpen(true);
  };
  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  }


  const beforeChange = useCallback(() => setDragging(true), []);
  const afterChange = useCallback(() => setDragging(false), []);

  return (
    <ModalContext.Provider
      value={{ isModalOpen, openModal, closeModal, selectedItem, beforeChange, afterChange, dragging }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const useModalContext = () => useContext(ModalContext);
