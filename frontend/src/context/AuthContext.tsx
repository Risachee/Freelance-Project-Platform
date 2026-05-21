import { authService } from '@/api/authService';
import type { User } from '@/types/user';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ViewMode = 'login' | 'register';

type AuthContextType = {
  user: User | null;
  mode: ViewMode;
  isAuthenticated: boolean;
  setMode: (mode: ViewMode) => void;
  handleLogin: (credentials: any) => Promise<void>;
  handleRegister: (credentials: any) => Promise<void>;
  logout: () => void;
  goToGuest: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState<ViewMode>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const handleLogin = async (credentials: { username: string; password: string }) => {
    const responseData = await authService.login(credentials);
    localStorage.setItem('access_token', responseData.access);
    const userData = await authService.user();
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/projects');
  }

  const handleRegister = async (credentials: { username: string; email: string; password: string }) => {
    await authService.register(credentials);
    setMode('login');
    navigate('/login');
  };

  useEffect(() => {
    if (isAuthenticated && !user) {
      authService.user().then(setUser).catch(() => logout());
    }
  }, [isAuthenticated]);

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const goToGuest = () => {
    navigate('/guest');
  };

  const value: AuthContextType = {
    user,
    mode,
    setMode: (m) => {
      setMode(m);
    },
    handleLogin,
    handleRegister,
    goToGuest,
    isAuthenticated,
    logout,
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
