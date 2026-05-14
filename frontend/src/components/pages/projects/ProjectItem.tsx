import StatusBadge from '@/components/ui/StatusBage';
import { useProjects } from '@/context/ProjectContext';
import type { Project } from '@/types/project';
import React from 'react';
import { Link } from 'react-router-dom';

interface ProjectItemProps {
  project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const { updateProject } = useProjects();

  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 h-2 w-20 rounded-full bg-indigo-500  " />
          <h3 className="text-xl font-semibold text-slate-900 group-hover:text-indigo-700">
            <Link
              to={`/projects/${project.id}`}
              className="text-indigo-600 hover:text-indigo-800 hover:underline"
            >
              {project.title}
            </Link>
          </h3>
        </div>

        <StatusBadge
          status={project.status}
          onStatusChange={(newStatus) => {
            updateProject({ ...project, status: newStatus });
          }}
        />

      </div>

      <p className="mb-4 line-clamp-3 text-sm leading-6 text-slate-600">
        {project.description}
      </p>

      <p className="text-sm text-slate-600 mb-2 j">
        Заказчик: {project.client}
      </p>

      <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-sm">
        <span className="text-slate-500">Бюджет</span>
        <span className="font-semibold text-slate-900">{project.budgetTotal}</span>
      </div>
      <div className="flex items-center justify-between  pt-4 text-sm">
        <span className="text-slate-500">Дедлайн</span>
        <span className="font-semibold text-slate-900">{project.deadline}</span>
      </div>
    </div>
  )
}

export default ProjectItem;