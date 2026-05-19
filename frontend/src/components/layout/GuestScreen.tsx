import { useState } from 'react';
import { useProjects } from '@/context/ProjectContext';
import { useEditableForm } from '@/hooks/useEditableForm';
import type { Project } from '@/types/project';
import Intro from '../pages/auth.tsx/Intro';
import GuestTokenForm from '../pages/guest/GuestTokenForm';
import GuestProjectInfo from '../pages/guest/GuestProjectInfo';

type ProjectInfoView = Project & { progress?: number };

export default function GuestScreen() {
  const { projects } = useProjects();
  const [projectInfo, setProjectInfo] = useState<ProjectInfoView | null>(null);
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

    const foundProject = projects.find((p: Project) => p.guestToken === token.trim());

    if (!foundProject) {
      setError('Проект с таким токеном не найден. Проверьте токен.');
      setProjectInfo(null);
      return;
    }

    setError(null);
    setProjectInfo({
      ...foundProject,
      progress: Math.min(100, Math.max(0, (foundProject.budgetPaid / foundProject.budgetTotal) * 100)),
    });
  };

  const handleResetAll = () => {
    setProjectInfo(null);
    setError(null);
    handleReset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col items-center">
      <Intro />

      <div className="w-full max-w-2xl px-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg sm:p-8">
          {!projectInfo ? (
            <GuestTokenForm
              token={formData.token}
              error={error}
              onTokenChange={handleChange}
              onSubmit={handleSave}
            />
          ) : (
            <GuestProjectInfo project={projectInfo} onReset={handleResetAll} />
          )}
        </div>
      </div>
    </div>
  );
}