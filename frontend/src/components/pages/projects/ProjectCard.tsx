import { useParams } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { useTasks } from '@/context/TasksContext';
import BackPageButton from '@/components/ui/BackPageButton';
import ProjectInfo from './ProjectInfo';
import ProjectTasks from './ProjectTasks';
import { useClients } from '@/context/ClientsContext';

export default function ProjectCard() {
  const { id } = useParams();
  const { getProjectById } = useProjects();
  const {getClientById} = useClients();
  const { tasks } = useTasks();
  const project = getProjectById(Number(id))
  if (!project) {
    return <div className="p-6 text-slate-500">Проект не найден</div>;
  }
  const tasksproject = tasks.filter((item) => String(item.project_id) === id)
  const client = getClientById(project.client);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ">
      <BackPageButton />

      <div className="grid my-4 gap-4 md:grid-cols-2">
        <ProjectInfo project={project} client={client} />
        <ProjectTasks tasksproject={tasksproject} />
      </div>
    </div>
  );
}