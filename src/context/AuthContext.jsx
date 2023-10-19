import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext();
  
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
 const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    onUserStateChange((user) => setUser(user));
  }, []);
  
  
  return (
    <AuthContext.Provider value={{ user, openModal, closeModal }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
