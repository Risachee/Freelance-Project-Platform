import { useParams } from 'react-router-dom';
import { useProjects } from '@/context/ProjectContext';
import BackPageButton from '@/components/ui/BackPageButton';
import ProjectInfo from './ProjectInfo';

export default function ProjectCard() {
  const { id } = useParams();
  const { projects } = useProjects();


  const project = projects.find((item) => String(item.id) === id)
  if (!project) {
    return <div className="p-6 text-slate-500">Проект не найден</div>;
  }

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 ">
      <BackPageButton />

      <div className="grid my-4 gap-4 md:grid-cols-2">
        <ProjectInfo project={project} />
      </div>
    </div>
  );
}