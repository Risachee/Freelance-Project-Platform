import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ViewMode = 'login' | 'register';

type AuthContextType = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  goToGuest: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ViewMode>('login');

  const handleLogin = () => {

    navigate('/projects');
  };

  const handleRegister = () => {

    navigate('/projects');
  };

  const goToGuest = () => {
    navigate('/guest');
  };

  const value: AuthContextType = {
    mode,
    setMode: (m) => {
      setMode(m);
    },
    handleLogin,
    handleRegister,
    goToGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};