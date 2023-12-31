import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { ModalContextProvider } from './context/ModalContext';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <ModalContextProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar/>
        <Outlet />
      </QueryClientProvider>
      </ModalContextProvider>
    </AuthContextProvider>
  );
}

export default App;
