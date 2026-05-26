import { useParams } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import { useTasks } from '@/context/TasksContext';
import BackPageButton from '@/components/ui/BackPageButton';
import ProjectInfo from './ProjectInfo';
import ProjectTasks from './ProjectTasks';
import { useClients } from '@/context/ClientsContext';

export default function ProjectCard() {
  const {clients} = useClients();
  const { id } = useParams();
  const { getProjectById } = useProjects();
  const { projectTasks } = useTasks();
  const project = getProjectById(Number(id))

  if (!project) {
    return <div className="p-6 text-slate-500">Проект не найден</div>;
  }
  
  const tasksproject = projectTasks(Number(id))

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ">
      <BackPageButton />

      <div className="grid my-4 gap-4 md:grid-cols-2">
        <ProjectInfo project={project} clients={clients}/>
        <ProjectTasks tasksproject={tasksproject} />
      </div>
    </div>
  );
}