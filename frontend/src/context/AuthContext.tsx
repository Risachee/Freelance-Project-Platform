import { authService } from '@/api/authService';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ViewMode = 'login' | 'register';

type AuthContextType = {
  isLoading: boolean;
  mode: ViewMode;
  isAuthenticated: boolean;
  setMode: (mode: ViewMode) => void;
  handleLogin: (credentials: any) => Promise<void>;
  handleRegister: (credentials: any) => Promise<void>;
  logout: () => void;
  goToGuest: () => void;
  error: string | null;

};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<ViewMode>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setError(null)
  }, [mode])

  const handleLogin = async (credentials: { username: string; password: string }) => {
    setError(null)
    try {
      const responseData = await authService.login(credentials);
      localStorage.setItem('access_token', responseData.access);
      setIsAuthenticated(true);
      navigate('/projects', { replace: true });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError("Пользователь с таким именем не найден");
      }
    }
  }

  const handleRegister = async (values: any) => {
    setError(null)
    const credentials = {
      username: values.username,
      email: values.email,
      password: values.password,
    }
    if (values.password === values.confirmPassword) {
      try {
        await authService.register(credentials);

        window.alert("Вы успешно зарегистрированы");
        setMode('login');
      } catch (error: any) {
        if (error.response?.status === 400) {
          setError("Данные введины неверно или пользователь с таким именем уже существует");
        }
      }
    } else { setError("Пароли не совпадают"); }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const goToGuest = () => {
    navigate('/guest');
  };

  const value: AuthContextType = useMemo(() => ({
    isLoading,
    mode,
    setMode,
    handleLogin,
    handleRegister,
    goToGuest,
    isAuthenticated,
    logout,
    error,
  }), [isLoading, mode, handleLogin, handleRegister, goToGuest, isAuthenticated, logout, error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};
