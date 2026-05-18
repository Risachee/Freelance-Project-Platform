import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ViewMode = 'login' | 'register';

type LoginFormValues = {
  email: string;
  password: string;
};

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthContextType = {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  loginForm: LoginFormValues;
  registerForm: RegisterFormValues;
  handleLoginChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleRegisterChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleLogin: () => void;
  handleRegister: () => void;
  goToGuest: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<ViewMode>('login');

  const [loginForm, setLoginForm] = useState<LoginFormValues>({
    email: '',
    password: '',
  });

  const [registerForm, setRegisterForm] = useState<RegisterFormValues>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({ ...prev, [name]: value }));
  };

  const canLogin = useMemo(() => {
    return loginForm.email.trim().length > 0 && loginForm.password.trim().length > 0;
  }, [loginForm.email, loginForm.password]);

  const canRegister = useMemo(() => {
    return (
      registerForm.name.trim().length > 0 &&
      registerForm.email.trim().length > 0 &&
      registerForm.password.trim().length > 0 &&
      registerForm.password === registerForm.confirmPassword
    );
  }, [registerForm]);

  const handleLogin = () => {
    if (!canLogin) {
      setError('Заполните email и пароль.');
      return;
    }
    setError(null);

    navigate('/projects');
  };

  const handleRegister = () => {
    if (!canRegister) {
      if (registerForm.password !== registerForm.confirmPassword) {
        setError('Пароли не совпадают.');
      } else {
        setError('Заполните все поля и проверьте пароли.');
      }
      return;
    }
    setError(null);
    navigate('/projects');
  };

  const goToGuest = () => {
    navigate('/guest');
  };

  const value: AuthContextType = {
    mode,
    setMode: (m) => {
      setMode(m);
      setError(null);
    },
    loginForm,
    registerForm,
    handleLoginChange,
    handleRegisterChange,
    error,
    setError,
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