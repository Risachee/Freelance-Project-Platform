import { useState, useCallback, useMemo } from 'react';
import { useEditableForm } from '@/hooks/useEditableForm';
import { guestService } from '@/api/guestService'; 
import Intro from '../pages/auth.tsx/Intro';
import GuestTokenForm from '../pages/guest/GuestTokenForm';
import GuestProjectInfo from '../pages/guest/GuestProjectInfo';
import type { Project } from '@/types/project';

export default function GuestScreen() {
  const [foundProject, setFoundProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const initialValues = useMemo(() => ({ token: '' }), []);
  const checkToken = useCallback(async (token: string) => {
    if (!token || token.trim().length === 0) {
      setError('Введите токен');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const project = await guestService.getProjectByToken(token.trim());
      setFoundProject(project);
    } catch (err: any) {
          if (err.response?.status === 404) {
        setError('Проект с таким токеном не найден. Проверьте токен.');
      } else if (err.response?.status === 410) {
        setError('Ссылка устарела или была отозвана.');
      } else {
        setError('Ошибка сервера. Попробуйте позже.');
      }
      setFoundProject(null);
    } finally {
      setIsLoading(false);
    }
  }, []); 

  const { formData, handleChange, handleSave, handleReset } = useEditableForm<{ token: string }>(
    (data) => checkToken(data.token),
    initialValues
  );

  const handleResetAll = () => {
    setFoundProject(null);
    setError(null);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center">
      <Intro />

      <div className="w-full max-w-2xl px-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg sm:p-8">
          {!foundProject ? (
            <GuestTokenForm
              token={formData.token}
              error={error}
              onTokenChange={handleChange}
              onSubmit={handleSave}
             
            />
          ) : (
            <GuestProjectInfo project={foundProject} onReset={handleResetAll} />
          )}
        </div>
      </div>
    </div>
  );
}