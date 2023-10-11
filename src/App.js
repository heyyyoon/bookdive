import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Modal from './components/Modal';
import Login from './components/Login';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
const [isModalOpen, setIsModalOpen] = useState(false)
  const openModal = () => {
    setIsModalOpen(true);
    console.log('open');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Navbar openModal={openModal}/>
        <Outlet />
        <Modal isOpen={isModalOpen} onClose={closeModal} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default App;
