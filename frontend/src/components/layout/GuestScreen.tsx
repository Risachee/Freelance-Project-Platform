import { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import { useEditableForm } from '@/hooks/useEditableForm';
import type { Project } from '@/types/project';
import Intro from '../pages/auth.tsx/Intro';
import GuestTokenForm from '../pages/guest/GuestTokenForm';
import GuestProjectInfo from '../pages/guest/GuestProjectInfo';
import { useClients } from '@/context/ClientsContext';


export default function GuestScreen() {
  const { projects } = useProjects();
  const { clients } = useClients();
  const [foundProjects, setFoundProjects] = useState<Project[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { formData, handleChange, handleSave, handleReset } = useEditableForm<{ token: string }>(
    (data) => checkToken(data.token),
    { token: '' }
  );

  const checkToken = (token: string) => {
    if (!token || token.trim().length === 0) {
      setError('Введите токен');
      return;
    }
    const foundClient = clients.find(c => c.guestToken === token.trim())
    console.log(foundClient)

    if (!foundClient) {
      setError('Потзователь с таким токеном не найден. Проверьте токен.');
      setFoundProjects(null);
      return;
    }
    setError(null);
    setFoundProjects(projects.filter(p => p.client === foundClient.id));
  };

  const handleResetAll = () => {
    setFoundProjects(null);
    setError(null);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center">
      <Intro />

      <div className="w-full max-w-2xl px-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg sm:p-8">
          {!foundProjects ? (
            <GuestTokenForm
              token={formData.token}
              error={error}
              onTokenChange={handleChange}
              onSubmit={handleSave}
            />
          ) : (
            <GuestProjectInfo projects={foundProjects} onReset={handleResetAll} />
            
          )}
        </div>
      </div>
    </div>
  );
}