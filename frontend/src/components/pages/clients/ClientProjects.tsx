import { Briefcase } from 'lucide-react';
import type { Client } from '@/types/client';
import type { Project } from '@/types/project';
import ProjectItem from '../projects/ProjectItem';

interface ClientProjectsProps {
    client: Client
    clientProjects: Project[]   
}
const ClientProjects: React.FC<ClientProjectsProps> = ({ client,clientProjects }) => (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-500">
            Проекты
        </p>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700">
            <Briefcase size={14} />
            Активных проектов: {client.projectsCount}
        </div>

        <div className="mt-6 space-y-6">
            {clientProjects.map((project) => (
                <ProjectItem key={project.id} project={project} />
            ))}
        </div>
    </div>
);


export default ClientProjects;