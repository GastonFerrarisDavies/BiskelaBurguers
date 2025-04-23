import { useContext } from 'react';
import { AuthContext } from '../context/sesion';

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error('No está permitido sin autenticación.');
    }
    return context;
  };