import { CheckCircle2, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProjectStatCard from './ProjectStatCard';
import ProjectProgress from './ProjectProgress';
import type { Project } from '@/types/project';

interface GuestProjectInfoProps {
  project: Project & { progress?: number };
  onReset: () => void;
}

export default function GuestProjectInfo({ project, onReset }: GuestProjectInfoProps) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900">{project.title}</h2>
        <Button variant="outline" onClick={onReset}>
          Ввести другой токен
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ProjectStatCard
          icon={<CheckCircle2 size={14} />}
          label="Статус"
          value={project.status}
        />

        <ProjectStatCard
          icon={<DollarSign size={14} />}
          label="Бюджет"
          value={`${project.budgetTotal.toLocaleString()} ₽`}
          subValue={`оплачено: ${project.budgetPaid.toLocaleString()} ₽`}
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

        {project.progress !== undefined && (
          <ProjectProgress progress={project.progress} />
        )}
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
          Описание проекта
        </p>
        <p className="mt-2 text-sm text-slate-700">{project.description}</p>
      </div>

      <div className="mt-6 flex justify-center">
        <Button variant="outline" className="w-full sm:w-auto">
          Связаться с исполнителем
        </Button>
      </div>
    </>
  );
}