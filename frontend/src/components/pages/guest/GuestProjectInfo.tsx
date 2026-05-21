import { CheckCircle2, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectStatCard from './ProjectStatCard';
import type { Project } from '@/types/project';

interface GuestProjectInfoProps {
  projects: Project[] & { progress?: number };
  onReset: () => void;
}

export default function GuestProjectInfo({ projects, onReset }: GuestProjectInfoProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-end">

        <Button variant="outline" onClick={onReset}>
          Ввести другой токен
        </Button>
      </div>

      {projects.map(project =>
        <div className='mb-10'>
          <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ProjectStatCard
              icon={<CheckCircle2 size={14} />}
              label="Статус"
              value={project.status}
            />

            <ProjectStatCard
              icon={<DollarSign size={14} />}
              label="Бюджет"
              value={`${project.budget.toLocaleString()} ₽`}

            />

            <ProjectStatCard
              icon={<Calendar size={14} />}
              label="Дедлайн"
              value={
                project.deadline
                  ? new Date(project.deadline).toLocaleDateString('ru-RU')
                  : 'Не задано'
              }
            />
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Описание проекта
            </p>
            <p className="mt-2 text-sm text-slate-700">{project.description}</p>
          </div>
        </div>
      )}


      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="w-full sm:w-auto">
          Связаться с исполнителем
        </Button>
      </div>
    </>
  );
}